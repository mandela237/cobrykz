"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface TrustFieldProps {
  className?: string;
}

export default function TrustField({ className = "" }: TrustFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(max-width: 1023px)").matches) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8.8);

    const structure = new THREE.Group();
    structure.rotation.set(-0.08, -0.22, -0.04);
    scene.add(structure);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1f5eff,
      transparent: true,
      opacity: 0.2,
    });
    const softLineMaterial = new THREE.LineBasicMaterial({
      color: 0x78b7ff,
      transparent: true,
      opacity: 0.12,
    });
    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0xdbeafe,
      transparent: true,
      opacity: 0.13,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const panelGeometry = new THREE.PlaneGeometry(3.35, 4.25);
    const edgeGeometries: THREE.EdgesGeometry[] = [];
    const panelPositions = [
      { x: -1.6, y: 0.25, z: -0.45, ry: 0.12 },
      { x: 0.35, y: -0.2, z: 0.15, ry: -0.08 },
      { x: 2.0, y: 0.45, z: -0.75, ry: -0.24 },
    ];

    panelPositions.forEach((position, index) => {
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.set(position.x, position.y, position.z);
      panel.rotation.y = position.ry;
      structure.add(panel);

      const edgeGeometry = new THREE.EdgesGeometry(panelGeometry);
      edgeGeometries.push(edgeGeometry);
      const edges = new THREE.LineSegments(
        edgeGeometry,
        index === 1 ? lineMaterial : softLineMaterial,
      );
      edges.position.copy(panel.position);
      edges.rotation.copy(panel.rotation);
      structure.add(edges);
    });

    const frameGeometry = new THREE.BoxGeometry(5.9, 4.9, 1.7);
    const frameEdgeGeometry = new THREE.EdgesGeometry(frameGeometry);
    const frame = new THREE.LineSegments(
      frameEdgeGeometry,
      softLineMaterial,
    );
    frame.position.set(0.35, 0.05, -0.9);
    structure.add(frame);

    const connectorGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.5, -2.6, -0.3),
      new THREE.Vector3(-1.1, -1.55, 0.15),
      new THREE.Vector3(1.2, -2.25, -0.15),
      new THREE.Vector3(3.6, -1.15, -0.65),
    ]);
    const connector = new THREE.Line(connectorGeometry, lineMaterial);
    structure.add(connector);

    let pointerX = 0;
    let pointerY = 0;
    let frameId = 0;

    const handlePointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.12;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.08;
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return false;

      const nextWidth = Math.floor(width * renderer.getPixelRatio());
      const nextHeight = Math.floor(height * renderer.getPixelRatio());
      const needsResize =
        canvas.width !== nextWidth || canvas.height !== nextHeight;

      if (needsResize) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      return true;
    };

    const render = (time = 0) => {
      if (!resize()) {
        frameId = window.requestAnimationFrame(render);
        return;
      }

      if (!reduceMotion) {
        structure.rotation.y +=
          (pointerX - 0.22 - structure.rotation.y) * 0.025;
        structure.rotation.x +=
          (-pointerY - 0.08 - structure.rotation.x) * 0.025;
        structure.position.y = Math.sin(time * 0.00042) * 0.08;
      }

      renderer.render(scene, camera);
      if (!reduceMotion) frameId = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) renderer.render(scene, camera);
    });
    resizeObserver.observe(canvas);
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointer);
      resizeObserver.disconnect();
      panelGeometry.dispose();
      frameGeometry.dispose();
      frameEdgeGeometry.dispose();
      edgeGeometries.forEach((geometry) => geometry.dispose());
      connectorGeometry.dispose();
      lineMaterial.dispose();
      softLineMaterial.dispose();
      panelMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  );
}
