import Render3D from "@/components/models3d/Render3D";
import { Canvas } from "@react-three/fiber";
import React from "react";

interface ChairsSectionProps {
  appendElement: (
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) => void;
}

export default function ChairsSection({ appendElement }: ChairsSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Seat</p>
      <button
        onClick={(e) => appendElement(e, "chair2", "static", 1.3)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="h-[50px]">
          <Canvas>
            <Render3D
              path="chair2"
              x={0}
              y={-2}
              z={0}
              scale={1.4}
              rotX={0.2}
              rotY={2}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Chair blue</p>
        </div>
      </button>
      <button
        onClick={(e) => appendElement(e, "chair_black", "static", 1.3)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none "
      >
        <div className="h-[50px]">
          <Canvas>
            <Render3D
              path="chair_black"
              x={0}
              y={-2}
              z={0}
              scale={1.4}
              rotX={0.2}
              rotY={2}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Chair black</p>
        </div>
      </button>
      <button
        onClick={(e) => appendElement(e, "chair", "static", 1.3)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="h-[50px]">
          <Canvas>
            <Render3D
              path="chair"
              x={0}
              y={-2}
              z={0}
              scale={1.8}
              rotX={0.2}
              rotY={-1}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Chair v.1</p>
        </div>
      </button>
    </div>
  );
}
