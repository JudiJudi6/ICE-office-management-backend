import * as THREE from "three";
import { ThreeEvent, useLoader } from "@react-three/fiber";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Mesh, MeshPhongMaterial } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Clone } from "@react-three/drei";
interface ModelProps {
  id?: string;
  path: string;
  x: number;
  y: number;
  z: number;
  scale?: number;
  rotX?: number;
  rotY?: number;
  rotZ?: number;
  mouseInteractions?: boolean;
  destroyElement?: (e: ThreeEvent<MouseEvent>, id: string) => void;
}

export default function Render3D({
  id,
  x,
  y,
  z,
  scale,
  rotX = 0,
  rotY = 0,
  rotZ = 0,
  path,
  mouseInteractions = false,
  destroyElement,
}: ModelProps) {
  const [enter, setEnter] = useState(false);
  const fileUrl = `/assets3d/${path}.glb`;
  const mesh = useRef<Mesh>(null!);
  const { scene } = useLoader(GLTFLoader, fileUrl);

  return (
    <Suspense fallback={null}>
      <mesh
        ref={mesh}
        position={[x, y, z]}
        scale={scale}
        rotation={[rotX, rotY, rotZ]}
        receiveShadow
        castShadow={true}
      >
        <Clone
          object={scene}
          castShadow
          receiveShadow
          onPointerEnter={(e) => {
            e.stopPropagation();
            setEnter(true);
          }}
          onPointerLeave={() => setEnter(false)}
          onClick={(e) => {
            destroyElement && id && destroyElement(e, id);
          }}
          inject={
            mouseInteractions &&
            enter && (
              <meshStandardMaterial
                color={0xff0000}
                opacity={0.5}
                transparent
              />
            )
          }
        />
      </mesh>
    </Suspense>
  );
}
