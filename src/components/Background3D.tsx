import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  className?: string;
  intensity?: 'ultra-suave' | 'suave' | 'moderado';
}

export const Background3D: React.FC<Background3DProps> = ({
  className = '',
  intensity = 'suave'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 45);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);

    // 2. Objects in Scene:
    // A. Subtle undulating 3D Particle Wave (Champagne Gold & Soft Navy)
    const particleCount = 650;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalY = new Float32Array(particleCount);

    const goldColor = new THREE.Color(0xd4af37); // Champagne Gold
    const navyColor = new THREE.Color(0x3b82f6); // Soft Navy/Blue

    let idx = 0;
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 40;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;
      originalY[i] = y;

      // Subtle blend between gold and navy
      const mixRatio = Math.random();
      const mixedColor = goldColor.clone().lerp(navyColor, mixRatio);
      colors[idx] = mixedColor.r;
      colors[idx + 1] = mixedColor.g;
      colors[idx + 2] = mixedColor.b;

      idx += 3;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.4, 'rgba(212, 175, 55, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.4,
      map: particleTexture,
      transparent: true,
      opacity: intensity === 'ultra-suave' ? 0.25 : intensity === 'moderado' ? 0.55 : 0.38,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // B. Subtle Floating Wireframe Geometry (Very faint geometric constellation)
    const wireframeGroup = new THREE.Group();

    // Subtle icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(7, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x1e3e62,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(22, 5, -10);
    wireframeGroup.add(icoMesh);

    // Subtle Torus ring
    const torusGeo = new THREE.TorusGeometry(12, 0.12, 12, 48);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.14
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    torusMesh.position.set(-20, -6, -15);
    wireframeGroup.add(torusMesh);

    // Subtle Octahedron
    const octGeo = new THREE.OctahedronGeometry(4, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(-25, 12, -8);
    wireframeGroup.add(octMesh);

    scene.add(wireframeGroup);

    // 3. Mouse Parallax (Damped & Soft)
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 3;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 3;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 4. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.03;
      currentMouseY += (targetMouseY - currentMouseY) * 0.03;

      if (!prefersReducedMotion) {
        // Slow organic rotation
        particles.rotation.y = elapsedTime * 0.02 + currentMouseX * 0.2;
        particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05 + currentMouseY * 0.15;

        // Gentle floating wireframes
        icoMesh.rotation.x = elapsedTime * 0.04;
        icoMesh.rotation.y = elapsedTime * 0.06;

        torusMesh.rotation.z = elapsedTime * 0.03;
        torusMesh.rotation.y = Math.sin(elapsedTime * 0.02) * 0.2;

        octMesh.rotation.x = elapsedTime * 0.05;
        octMesh.rotation.z = elapsedTime * 0.03;

        // Wave motion on particles
        const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          const idxY = i * 3 + 1;
          const x = array[i * 3];
          // Gentle vertical breathing wave
          array[idxY] = originalY[i] + Math.sin(elapsedTime * 0.8 + x * 0.08) * 0.8;
        }
        posAttr.needsUpdate = true;
      }

      // Soft camera sway
      camera.position.x = currentMouseX * 1.5;
      camera.position.y = -currentMouseY * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 5. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 6. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose Three.js resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      aria-hidden="true"
    />
  );
};
