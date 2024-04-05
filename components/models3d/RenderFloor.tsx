import { floorInterface } from "@/app/view/creator/page";
import React, { useState } from "react";

export default function RenderFloor({
  x,
  y,
  z,
  endX,
  endY,
  endZ,
  id,
  destroyElement,
  mouseInteractions,
  color,
}: floorInterface) {
  const [enter, setEnter] = useState(false);

  const width = Math.abs(endX - x);
  const depth = Math.abs(endZ - z);

  const centerX = (x + endX) / 2;
  const centerZ = (z + endZ) / 2;

  return (
    <>
      <mesh
        position={[centerX, -0.26, centerZ]}
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
        <boxGeometry
          args={[width, 0.5 - +("0.000" + id.slice(10, 13)), depth]}
        />
        {mouseInteractions && enter ? (
          <meshStandardMaterial color={0xff0000} opacity={0.5} transparent />
        ) : (
          <meshPhongMaterial color={color} />
        )}
      </mesh>
    </>
  );
}
