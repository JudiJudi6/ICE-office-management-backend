import Render3D from "@/components/models3d/Render3D";
import { Canvas } from "@react-three/fiber";
import React from "react";

interface FurnitureSectionProps {
  appendElement: (
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) => void;
}

export default function FurnitureSection({
  appendElement,
}: FurnitureSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Furniture</p>
      <button
        onClick={(e) => appendElement(e, "sofa", "static", 1.3)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="h-[50px]">
          <Canvas frameloop="demand">
            <Render3D
              path="sofa"
              x={0}
              y={-2}
              z={0}
              scale={1}
              rotX={0}
              rotY={-0.8}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Sofa</p>
        </div>
      </button>
      <button
        onClick={(e) => appendElement(e, "table", "static", 1.3)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="h-[50px]">
          <Canvas frameloop="demand">
            <Render3D
              path="table"
              x={0}
              y={-1}
              z={0}
              scale={1.2}
              rotX={0.4}
              rotY={2}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Table</p>
        </div>
      </button>
    </div>
  );
}
