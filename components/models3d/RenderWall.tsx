import { floorInterface } from "@/app/view/creator/page";
import { Box } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { Vector3 } from "three";

export default function RenderWall({
  x,
  y,
  z,
  endX,
  endY,
  endZ,
  color,
  id,
  transparent,
  destroyElement,
  mouseInteractions,
}: floorInterface) {
  const [enter, setEnter] = useState(false);

  const width = Math.abs(endX - x);
  const depth = Math.abs(endZ - z);

  const centerX = (x + endX) / 2;
  const centerZ = (z + endZ) / 2;

  return (
    <>
      <mesh
        position={[centerX, y === 5 ? 2 : 0.75, centerZ]}
        receiveShadow
        castShadow
        onPointerEnter={(e) => {
          e.stopPropagation();
          setEnter(true);
        }}
        onPointerLeave={() => setEnter(false)}
        onClick={(e) => {
          destroyElement && id && destroyElement(e, id);
        }}
      >
        {width > depth ? (
          <boxGeometry args={[width, y, 0.5]} />
        ) : (
          <boxGeometry args={[0.5, y, depth]} />
        )}
        {mouseInteractions && enter ? (
          <meshStandardMaterial color={0xff0000} opacity={0.5} transparent />
        ) : transparent ? (
          <meshPhongMaterial color={color} opacity={0.5} transparent />
        ) : (
          <meshPhongMaterial color={color} />
        )}
      </mesh>
    </>
  );
}
