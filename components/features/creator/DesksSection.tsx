"use client";

import Render3D from "@/components/models3d/Render3D";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import React from "react";
import { SectionsToolTip } from "./SectionsToolTip";

interface DesksSectionProps {
  appendDesk: (
    e: React.MouseEvent<HTMLButtonElement>,
    deskPath: string,
    equipPath: string,
    type: "desk" | "static",
    scale: number,
    equipment: string[]
  ) => void;
}

export default function DesksSection({ appendDesk }: DesksSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Desks</p>
      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Desk Equipment:</h1>
            <ul className="mt-1">
              <li>- Basic PC Set</li>
              <li>- Second monitor</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) =>
            appendDesk(e, "desk", "pc", "static", 1.3, [
              "basic pc set",
              "second monitor, ",
            ])
          }
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/desk.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Desk v.1</p>
          </div>
        </button>
      </SectionsToolTip>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Desk Equipment:</h1>
            <ul className="mt-1">
              <li>- Basic PC Set</li>
              <li>- Second monitor</li>
              <li>- Lamp</li>
              <li>- Laptop</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) =>
            appendDesk(e, "desk", "lamp", "static", 1.3, [
              "second monitor",
              "lamp",
              "laptop",
            ])
          }
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/desk.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Desk v.2</p>
          </div>
        </button>
      </SectionsToolTip>
    </div>
  );
}
