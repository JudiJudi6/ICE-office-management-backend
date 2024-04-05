import * as THREE from "three";

import Render3D from "@/components/models3d/Render3D";
import RenderFloor from "@/components/models3d/RenderFloor";
import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Image from "next/image";

interface FloorSectionProps {
  appendFloor: (e: React.MouseEvent<HTMLButtonElement>, color: string) => void;
}

export default function FloorSection({ appendFloor }: FloorSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Floors</p>
      <button
        onClick={(e) => appendFloor(e, "#f3ebe6")}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="flex justify-center items-center h-[50px]">
          <Image
            src="/creatorImages/floor_v1.jpg"
            alt=""
            width={35}
            height={35}
          />
        </div>
        <div>
          <p className="text-sm">Floor v.1</p>
        </div>
      </button>
      <button
        onClick={(e) => appendFloor(e, "#8e807f")}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="flex justify-center items-center h-[50px]">
          <Image
            src="/creatorImages/floor_v2.jpg"
            alt=""
            width={35}
            height={35}
          />
        </div>
        <div>
          <p className="text-sm">Floor v.2</p>
        </div>
      </button>
    </div>
  );
}
