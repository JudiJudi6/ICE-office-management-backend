import React, { Suspense, useState } from "react";

import Render3D from "@/components/models3d/Render3D";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor, Stats } from "@react-three/drei";

import * as THREE from "three";
import Spinner from "@/components/ui/Spinner";

function Frame() {
  useFrame(({ camera }) => {
    function animate(e: MouseEvent) {
      let scale = 0.003;
      camera.position.x = -5 - (e.clientX * scale) / 2;
      camera.position.y = 2 + (e.clientY * scale) / 2;
      camera.position.z = 6 + (-e.clientX * scale) / 2;
    }

    document.addEventListener("mousemove", animate);

    return () => {
      document.removeEventListener("mousemove", animate);
    };
  });

  return (
    <>
      <OrbitControls
        target={new THREE.Vector3(0, -1, 0)}
        enableZoom={false}
        enableRotate={false}
        enableDamping={false}
        enablePan={false}
      />
      <Render3D path="desk" x={0} y={-1.5} z={0} />
      <Render3D path="monitor" x={0.2} y={0.08} z={0} />
      <Render3D
        path="chair_black"
        x={-2}
        y={-1.5}
        z={-1}
        scale={0.8}
        rotY={2}
      />
      <Render3D path="pot_cactus" x={0} y={-1.5} z={2} scale={0.4} rotY={2} />
      <Render3D path="pc" x={0} y={-1.5} z={-0.85} rotY={3.15} />
      <Render3D path="keyboard" x={-0.3} y={0.08} z={0} rotY={1.5} />
      <Render3D path="mouse_better" x={-0.3} y={0.08} z={0.8} rotY={3} />
      <Render3D path="lamp3" x={-0.3} y={0.08} z={-0.8} rotY={-1.5} scale={1} />
      <mesh
        position={new THREE.Vector3(-1, -1.5, 0)}
        geometry={new THREE.BoxGeometry(4, 0.1, 5)}
        receiveShadow={true}
        castShadow={true}
      >
        <meshPhongMaterial color={"#e4d3c8"} />
      </mesh>
      {/* <AxesHelper /> */}
      <ambientLight intensity={4} />
      <directionalLight
        castShadow={true}
        position={[1, 3, 0]}
        intensity={10}
        color="#fff"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

export default function PageCanvas() {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Suspense fallback={<Spinner />}>
      <Canvas
        camera={{
          fov: 75,
          position: [-5, 2, 6],
        }}
        shadows={true}
        dpr={dpr}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        />
        <Frame />
      </Canvas>
    </Suspense>
  );
}
