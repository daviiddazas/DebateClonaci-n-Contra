import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MainMotive, ThemeMode } from '../types';

interface ThreeCanvasProps {
  motives: MainMotive[];
  selectedMotiveId: number; // 0 = Central Organization Globe, 1-4 = Main Motives
  selectedSubSlideIndex: number;
  themeMode: ThemeMode;
  onSelectMotive: (id: number) => void;
  onSelectSubSlide: (index: number) => void;
  onCanvasClickEmpty?: () => void;
}

// Preallocated math helpers to eliminate GC
const _tempVec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  motives,
  selectedMotiveId,
  selectedSubSlideIndex,
  themeMode,
  onSelectMotive,
  onSelectSubSlide,
  onCanvasClickEmpty,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    selectedMotiveId,
    selectedSubSlideIndex,
    themeMode,
    motives,
    onSelectMotive,
    onSelectSubSlide,
    onCanvasClickEmpty,
  });

  stateRef.current = {
    selectedMotiveId,
    selectedSubSlideIndex,
    themeMode,
    motives,
    onSelectMotive,
    onSelectSubSlide,
    onCanvasClickEmpty,
  };

  const spriteRefs = useRef<Map<string, { sprite: THREE.Sprite; canvas: HTMLCanvasElement; texture: THREE.CanvasTexture }>>(new Map());
  const clickableObjects = useRef<THREE.Object3D[]>([]);
  const isTransitioningRef = useRef<boolean>(true);

  // Conduits registry
  const subConduitsRef = useRef<Map<string, { tube: THREE.Mesh; pulse: THREE.Mesh; curve: THREE.CatmullRomCurve3 }>>(new Map());
  const masterConduitsRef = useRef<Map<number, { tube: THREE.Mesh; pulse: THREE.Mesh; curve: THREE.CatmullRomCurve3 }>>(new Map());

  // Trigger camera refocus when selection changes
  useEffect(() => {
    isTransitioningRef.current = true;
  }, [selectedMotiveId, selectedSubSlideIndex]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    const isDark = stateRef.current.themeMode === 'dark';
    const bgColor = isDark ? 0x070b14 : 0xf1f5f9;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.012);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 36);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.2 : 1.0;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = 'grab';

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 85;
    controls.minDistance = 6;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.target.set(0, 2, 0);

    controls.addEventListener('start', () => {
      isTransitioningRef.current = false;
      renderer.domElement.style.cursor = 'grabbing';
    });

    controls.addEventListener('end', () => {
      renderer.domElement.style.cursor = 'grab';
    });

    // Lighting rig
    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.4 : 2.6);
    keyLight.position.set(15, 25, 20);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x93c5fd, isDark ? 1.1 : 0.85);
    fillLight.position.set(-20, 10, -15);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(
      isDark ? 0x1e293b : 0xffffff,
      isDark ? 0x090d16 : 0xcfd8dc,
      isDark ? 1.2 : 1.0
    );
    scene.add(hemiLight);

    const gridHelper = new THREE.GridHelper(80, 50, isDark ? 0x0284c7 : 0x0369a1, isDark ? 0x1e293b : 0xe2e8f0);
    gridHelper.position.y = -6;
    scene.add(gridHelper);

    // Reusable Text Sprite Generator
    const createTextSprite = (
      textId: string,
      mainText: string,
      badgeText: string,
      colorHex: string,
      scaleX: number = 4.8,
      scaleY: number = 1.6
    ) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext('2d')!;

      const drawCanvas = (text: string, badge: string, isDarkTheme: boolean) => {
        ctx.clearRect(0, 0, 512, 160);

        const r = 16;
        const x = 8, y = 8, w = 496, h = 144;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();

        ctx.fillStyle = isDarkTheme ? 'rgba(15, 23, 42, 0.94)' : 'rgba(255, 255, 255, 0.98)';
        ctx.fill();

        ctx.lineWidth = 5;
        ctx.strokeStyle = colorHex;
        ctx.stroke();

        ctx.fillStyle = colorHex;
        ctx.fillRect(14, 18, 10, 124);

        ctx.beginPath();
        ctx.roundRect(36, 20, 180, 32, 6);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
        ctx.textBaseline = 'middle';
        ctx.fillText(badge.toUpperCase(), 46, 36);

        ctx.fillStyle = isDarkTheme ? '#f8fafc' : '#0f172a';
        ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
        const displayMain = text.length > 25 ? text.slice(0, 24) + '…' : text;
        ctx.fillText(displayMain, 36, 88);

        ctx.fillStyle = isDarkTheme ? '#94a3b8' : '#64748b';
        ctx.font = '600 17px system-ui, -apple-system, sans-serif';
        ctx.fillText('Clic para abrir sustentación', 36, 124);
      };

      drawCanvas(mainText, badgeText, isDark);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(scaleX, scaleY, 1);
      spriteRefs.current.set(textId, { sprite, canvas, texture });
      return sprite;
    };

    const rootCluster = new THREE.Group();
    scene.add(rootCluster);

    // =========================================================================
    // 0. CENTRAL GLOBO PRINCIPAL: ORGANIZACIÓN OICRV (Estructura y Marco Legal)
    // =========================================================================
    const orgGroup = new THREE.Group();
    orgGroup.position.set(0, 2.5, 0);

    // Central Globe Biosphere Geometry
    const globeGeo = new THREE.SphereGeometry(3.0, 32, 32);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      metalness: 0.2,
      roughness: 0.15,
      transmission: isSoftwareGl ? 0 : 0.75,
      transparent: true,
      opacity: 0.7,
      clearcoat: 1.0,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeMesh.name = 'org-globe-mesh';
    orgGroup.add(globeMesh);

    // Meridian & Latitude wireframe rings (Earth/Life Biosphere)
    const meridianMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.4 });
    const meridianMesh = new THREE.Mesh(new THREE.SphereGeometry(3.05, 18, 18), meridianMat);
    orgGroup.add(meridianMesh);

    // Golden Halo Ring of Bioethics
    const goldHalo = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.08, 16, 64),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 0.6, metalness: 0.8, roughness: 0.2 })
    );
    goldHalo.rotation.x = Math.PI / 2.3;
    orgGroup.add(goldHalo);

    // Internal radiant heart core
    const heartCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 2),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.2, roughness: 0.1 })
    );
    orgGroup.add(heartCore);

    // Hit Sphere for the central Organization globe
    const orgHitSphere = new THREE.Mesh(
      new THREE.SphereGeometry(4.4, 16, 16),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    orgHitSphere.userData = { isOrganization: true, motiveId: 0 };
    orgGroup.add(orgHitSphere);
    clickableObjects.current.push(orgHitSphere);

    // Billboard Text Sprite for Central Organization
    const orgSprite = createTextSprite(
      'org-central',
      'Organización OICRV',
      'Globo Principal',
      '#0284c7',
      6.2,
      2.3
    );
    orgSprite.position.set(0, 5.2, 0);
    orgGroup.add(orgSprite);

    rootCluster.add(orgGroup);

    // 4 Motive orbital positions arranged in a balanced radius around the central organization
    const motivePositions: [number, number, number][] = [
      [-15, 2, -7],  // Motivo 1 (Top Left)
      [-9, 1, 12],   // Motivo 2 (Bottom Left)
      [9, 1, 12],    // Motivo 3 (Bottom Right)
      [15, 2, -7],   // Motivo 4 (Top Right)
    ];

    const motiveGroups: Map<number, THREE.Group> = new Map();
    const subNodeGroups: Map<string, THREE.Group> = new Map();

    // Procedural Motive Geometries
    const createMotivo1Mesh = () => {
      const g = new THREE.Group();
      const cellGeo = new THREE.IcosahedronGeometry(2.3, 2);
      const cellMat = new THREE.MeshPhysicalMaterial({
        color: 0x0284c7,
        metalness: 0.1,
        roughness: 0.15,
        transmission: isSoftwareGl ? 0 : 0.8,
        transparent: true,
        opacity: 0.65,
        clearcoat: 1.0,
      });
      g.add(new THREE.Mesh(cellGeo, cellMat));

      const coreGeo = new THREE.DodecahedronGeometry(1.1, 1);
      const coreMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5, roughness: 0.3 });
      g.add(new THREE.Mesh(coreGeo, coreMat));

      const needleGeo = new THREE.CylinderGeometry(0.12, 0.28, 4.2, 16);
      needleGeo.rotateZ(Math.PI / 3);
      needleGeo.translate(2.2, 1.4, 0);
      g.add(new THREE.Mesh(needleGeo, new THREE.MeshStandardMaterial({ color: 0xe0f2fe, metalness: 0.9, roughness: 0.1 })));

      for (let i = 0; i < 6; i++) {
        const bl = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0x991b1b, emissiveIntensity: 0.6 }));
        const ang = (i / 6) * Math.PI * 2;
        bl.position.set(Math.cos(ang) * 3.3, Math.sin(ang) * 1.2, Math.sin(ang) * 2.8);
        g.add(bl);
      }
      return g;
    };

    const createMotivo2Mesh = () => {
      const g = new THREE.Group();
      const turns = 2.5, height = 4.8, radius = 1.3, steps = 30;
      const p1: THREE.Vector3[] = [], p2: THREE.Vector3[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps);
        const angle = t * turns * Math.PI * 2;
        const y = (t - 0.5) * height;
        p1.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
        p2.push(new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius));
      }
      const strandMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2, metalness: 0.6 });
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p1), 40, 0.12, 8, false), strandMat));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p2), 40, 0.12, 8, false), strandMat));

      for (let i = 0; i <= steps; i += 2) {
        const rung = new THREE.LineCurve3(p1[i], p2[i]);
        g.add(new THREE.Mesh(new THREE.TubeGeometry(rung, 4, 0.08, 6, false), new THREE.MeshStandardMaterial({ color: i % 4 === 0 ? 0x34d399 : 0xfbbf24, roughness: 0.3 })));
      }

      const haloGeo = new THREE.TorusGeometry(2.6, 0.08, 16, 64);
      haloGeo.rotateX(Math.PI / 2);
      g.add(new THREE.Mesh(haloGeo, new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.8 })));
      return g;
    };

    const createMotivo3Mesh = () => {
      const g = new THREE.Group();
      const xArmGeo = new THREE.TorusGeometry(2.0, 0.28, 16, 32, Math.PI * 0.7);
      const chrMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.35, metalness: 0.4 });
      const arm1 = new THREE.Mesh(xArmGeo, chrMat);
      arm1.rotation.z = Math.PI / 4;
      g.add(arm1);
      const arm2 = new THREE.Mesh(xArmGeo, chrMat);
      arm2.rotation.z = -Math.PI / 4;
      arm2.rotation.y = Math.PI;
      g.add(arm2);

      g.add(new THREE.Mesh(new THREE.OctahedronGeometry(1.0, 1), new THREE.MeshStandardMaterial({ color: 0xd97706, emissive: 0xb45309, emissiveIntensity: 0.6, wireframe: true })));

      const neuralGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const neuralMat = new THREE.MeshStandardMaterial({ color: 0xfde047 });
      for (let i = 0; i < 8; i++) {
        const nMesh = new THREE.Mesh(neuralGeo, neuralMat);
        const theta = (i / 8) * Math.PI * 2;
        nMesh.position.set(Math.cos(theta) * 2.8, Math.sin(theta * 2) * 1.5, Math.sin(theta) * 2.8);
        g.add(nMesh);
      }
      return g;
    };

    const createMotivo4Mesh = () => {
      const g = new THREE.Group();
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.85, roughness: 0.2 });
      const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.12, 16, 64), ringMat);
      const r2 = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.12, 16, 64), ringMat);
      r2.rotation.x = Math.PI / 3;
      const r3 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.12, 16, 64), ringMat);
      r3.rotation.y = Math.PI / 3;
      g.add(r1);
      g.add(r2);
      g.add(r3);

      g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 2), new THREE.MeshStandardMaterial({ color: 0xc084fc, emissive: 0x9333ea, emissiveIntensity: 0.9, roughness: 0.1 })));
      g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(3.3, 1), new THREE.MeshStandardMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.45 })));
      return g;
    };

    const motiveBuilders = [createMotivo1Mesh, createMotivo2Mesh, createMotivo3Mesh, createMotivo4Mesh];

    stateRef.current.motives.forEach((mot, idx) => {
      const pos = motivePositions[idx];
      const motiveGroup = new THREE.Group();
      motiveGroup.position.set(pos[0], pos[1], pos[2]);

      const heroMesh = motiveBuilders[idx]();
      heroMesh.name = `motive-mesh-${mot.id}`;
      heroMesh.userData = { isMotive: true, motiveId: mot.id };
      motiveGroup.add(heroMesh);

      const hitSphere = new THREE.Mesh(
        new THREE.SphereGeometry(3.6, 16, 16),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitSphere.userData = { isMotive: true, motiveId: mot.id };
      motiveGroup.add(hitSphere);
      clickableObjects.current.push(hitSphere);

      const sprite = createTextSprite(
        `motive-${mot.id}`,
        mot.shortTitle,
        `Motivo ${mot.number}`,
        mot.themeColor,
        5.8,
        2.2
      );
      sprite.position.set(0, 4.3, 0);
      motiveGroup.add(sprite);

      // 4 Sub-nodes for each motive
      const subRadius = 5.8;
      mot.subSlides.forEach((sub, sIdx) => {
        const subGroup = new THREE.Group();
        const angle = (-Math.PI / 2) + (sIdx - 1.5) * 0.72;
        const sx = Math.sin(angle) * subRadius;
        const sy = Math.cos(angle) * (subRadius * 0.65) + 0.8;
        const sz = (sIdx - 1.5) * 1.5;

        subGroup.position.set(sx, sy, sz);

        const subArtifactGeo = new THREE.DodecahedronGeometry(0.85, 0);
        const subArtifactMat = new THREE.MeshStandardMaterial({
          color: mot.themeColor,
          roughness: 0.25,
          metalness: 0.7,
          emissive: mot.themeColor,
          emissiveIntensity: 0.35,
        });
        const subArtifact = new THREE.Mesh(subArtifactGeo, subArtifactMat);
        subArtifact.userData = { isSubSlide: true, motiveId: mot.id, subIndex: sub.subIndex };
        subGroup.add(subArtifact);

        const haloRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.1, 0.05, 12, 32),
          new THREE.MeshBasicMaterial({ color: mot.accentColor, wireframe: true })
        );
        subGroup.add(haloRing);

        const subHit = new THREE.Mesh(
          new THREE.SphereGeometry(1.6, 12, 12),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        subHit.userData = { isSubSlide: true, motiveId: mot.id, subIndex: sub.subIndex };
        subGroup.add(subHit);
        clickableObjects.current.push(subHit);

        const subSprite = createTextSprite(
          `sub-${mot.id}-${sub.subIndex}`,
          sub.title,
          `${mot.id}.${sub.subIndex}`,
          mot.accentColor,
          4.4,
          1.5
        );
        subSprite.position.set(0, 1.8, 0);
        subGroup.add(subSprite);

        motiveGroup.add(subGroup);
        subNodeGroups.set(`${mot.id}-${sub.subIndex}`, subGroup);

        // Sub-node curved conduit
        const pStart = new THREE.Vector3(0, 0, 0);
        const pMid = new THREE.Vector3(sx * 0.5, sy * 0.5 + 1.2, sz * 0.5);
        const pEnd = new THREE.Vector3(sx, sy, sz);

        const curve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);
        const tubeMesh = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 24, 0.07, 8, false),
          new THREE.MeshStandardMaterial({
            color: mot.accentColor,
            emissive: mot.themeColor,
            emissiveIntensity: 0.7,
            transparent: true,
            opacity: 0.85,
            roughness: 0.2,
          })
        );
        motiveGroup.add(tubeMesh);

        const pulseMesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xffffff })
        );
        motiveGroup.add(pulseMesh);

        subConduitsRef.current.set(`${mot.id}-${sub.subIndex}`, {
          tube: tubeMesh,
          pulse: pulseMesh,
          curve,
        });
      });

      rootCluster.add(motiveGroup);
      motiveGroups.set(mot.id, motiveGroup);

      // =========================================================================
      // MASTER CONDUIT: From Central OICRV Globe (0, 2.5, 0) to this Motive pos
      // =========================================================================
      const mCenter = new THREE.Vector3(0, 2.5, 0);
      const mTarget = new THREE.Vector3(pos[0], pos[1], pos[2]);
      const mMid = new THREE.Vector3(
        (mCenter.x + mTarget.x) * 0.5,
        Math.max(mCenter.y, mTarget.y) + 2.0,
        (mCenter.z + mTarget.z) * 0.5
      );

      const mCurve = new THREE.CatmullRomCurve3([mCenter, mMid, mTarget]);
      const mTube = new THREE.Mesh(
        new THREE.TubeGeometry(mCurve, 32, 0.12, 8, false),
        new THREE.MeshStandardMaterial({
          color: mot.themeColor,
          emissive: mot.themeColor,
          emissiveIntensity: 0.9,
          transparent: true,
          opacity: 0.8,
          roughness: 0.2,
        })
      );
      rootCluster.add(mTube);

      const mPulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      rootCluster.add(mPulse);

      masterConduitsRef.current.set(mot.id, {
        tube: mTube,
        pulse: mPulse,
        curve: mCurve,
      });
    });

    // Pointer hover & click detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects.current, true);

      if (intersects.length > 0) {
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects.current, true);

      if (intersects.length > 0) {
        const target = intersects[0].object;
        const { isOrganization, isMotive, isSubSlide, motiveId, subIndex } = target.userData;

        if (isOrganization) {
          stateRef.current.onSelectMotive(0);
        } else if (isMotive) {
          stateRef.current.onSelectMotive(motiveId);
        } else if (isSubSlide) {
          stateRef.current.onSelectMotive(motiveId);
          stateRef.current.onSelectSubSlide(subIndex);
        }
      } else {
        if (stateRef.current.onCanvasClickEmpty) {
          stateRef.current.onCanvasClickEmpty();
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotate Central Organization Globe
      globeMesh.rotation.y += delta * 0.2;
      meridianMesh.rotation.y += delta * 0.15;
      goldHalo.rotation.z += delta * 0.25;

      const isOrgSelected = stateRef.current.selectedMotiveId === 0;
      const orgScale = isOrgSelected ? 1.15 : 1.0;
      orgGroup.scale.lerp(_tempVec3.set(orgScale, orgScale, orgScale), 0.08);

      // Rotate motive meshes & animate conduits
      motiveGroups.forEach((group, id) => {
        const mesh = group.getObjectByName(`motive-mesh-${id}`);
        if (mesh) {
          mesh.rotation.y += delta * 0.3;
          mesh.rotation.x = Math.sin(elapsed * 0.7 + id) * 0.12;
        }

        const isCurrentMotive = id === stateRef.current.selectedMotiveId;
        const scaleTarget = isCurrentMotive ? 1.05 : 0.8;
        group.scale.lerp(_tempVec3.set(scaleTarget, scaleTarget, scaleTarget), 0.08);

        // Sub-nodes & conduits
        [1, 2, 3, 4].forEach((sIdx) => {
          const subKey = `${id}-${sIdx}`;
          const subGroup = subNodeGroups.get(subKey);
          const conduit = subConduitsRef.current.get(subKey);

          if (subGroup) {
            const isCurrentSub = isCurrentMotive && sIdx === stateRef.current.selectedSubSlideIndex;
            const targetScale = isCurrentSub ? 1.35 : isCurrentMotive ? 1.0 : 0.55;
            subGroup.scale.lerp(_tempVec3.set(targetScale, targetScale, targetScale), 0.1);
            subGroup.position.y += Math.sin(elapsed * 2.5 + sIdx) * 0.003;
          }

          if (conduit) {
            const pulseSpeed = isCurrentMotive ? 0.6 : 0.25;
            const t = (elapsed * pulseSpeed + sIdx * 0.33) % 1.0;
            const pt = conduit.curve.getPointAt(t);
            conduit.pulse.position.copy(pt);

            const isCurrentSub = isCurrentMotive && sIdx === stateRef.current.selectedSubSlideIndex;
            const mat = conduit.tube.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = isCurrentSub ? 1.5 : isCurrentMotive ? 0.8 : 0.3;
            mat.opacity = isCurrentMotive ? 0.95 : 0.4;
          }
        });
      });

      // Animate Master Conduits radiating from Central Globe
      masterConduitsRef.current.forEach((conduit, motId) => {
        const isCurrentMotive = motId === stateRef.current.selectedMotiveId;
        const pulseSpeed = isCurrentMotive ? 0.7 : 0.35;
        const t = (elapsed * pulseSpeed + (motId * 0.25)) % 1.0;
        const pt = conduit.curve.getPointAt(t);
        conduit.pulse.position.copy(pt);

        const mat = conduit.tube.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = isCurrentMotive ? 1.6 : 0.6;
        mat.opacity = isCurrentMotive ? 1.0 : 0.5;
      });

      // Smooth camera transition when selection changes
      if (isTransitioningRef.current) {
        const currentMotId = stateRef.current.selectedMotiveId;

        if (currentMotId === 0) {
          // Focus on Central Organization Globe
          _targetLookAt.set(0, 2.8, 0);
          _targetCamPos.set(0, 9.0, 24);
        } else {
          // Focus on specific Motive
          const motiveIdx = currentMotId - 1;
          const mPos = motivePositions[motiveIdx] || [0, 0, 0];
          _targetLookAt.set(mPos[0], mPos[1] + 1.2, mPos[2]);
          _targetCamPos.set(mPos[0] * 0.75, mPos[1] + 6.0, mPos[2] + 15.5);
        }

        camera.position.lerp(_targetCamPos, 0.06);
        controls.target.lerp(_targetLookAt, 0.07);

        if (camera.position.distanceTo(_targetCamPos) < 0.25) {
          isTransitioningRef.current = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      clickableObjects.current = [];
      subConduitsRef.current.clear();
      masterConduitsRef.current.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};
