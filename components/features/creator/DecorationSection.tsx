import Render3D from "@/components/models3d/Render3D";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { SectionsToolTip } from "./SectionsToolTip";

interface DecorationSectionProps {
  appendElement: (
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) => void;
}

export default function DecorationSection({
  appendElement,
}: DecorationSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Decorations</p>
      <button
        onClick={(e) => appendElement(e, "pot_ball_short", "static", 1)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="h-[50px]">
          <Canvas frameloop="demand">
            <Render3D
              path="pot_ball_short"
              x={0}
              y={-2}
              z={0}
              scale={1.5}
              rotX={0}
              rotY={-0.8}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Plant short</p>
        </div>
      </button>
      <button
        onClick={(e) => appendElement(e, "pot_ball_tall", "static", 1)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="h-[50px]">
          <Canvas frameloop="demand">
            <Render3D
              path="pot_ball_tall"
              x={0}
              y={-2}
              z={0}
              scale={1.1}
              rotX={0}
              rotY={-0.8}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Plant tall</p>
        </div>
      </button>
      <button
        onClick={(e) => appendElement(e, "pot_cactus", "static", 1)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="h-[50px]">
          <Canvas frameloop="demand">
            <Render3D
              path="pot_cactus"
              x={0}
              y={-2}
              z={0}
              scale={1.2}
              rotX={0}
              rotY={-0.8}
            />
            <ambientLight intensity={4} />
          </Canvas>
        </div>
        <div>
          <p className="text-sm">Cactus</p>
        </div>
      </button>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Fancy Plant</h1>
            <ul className="mt-1">
              <li>Plant with beautiful leaves</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) => appendElement(e, "pot_leaves", "static", 0.8)}
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="h-[50px]">
            <Canvas frameloop="demand">
              <Render3D
                path="pot_leaves"
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
            <p className="text-sm">Fancy plant</p>
          </div>
        </button>
      </SectionsToolTip>
    </div>
  );
}
