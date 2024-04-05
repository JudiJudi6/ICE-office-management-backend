import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import React from "react";
import { SectionsToolTip } from "./SectionsToolTip";

interface WallsSectionProps {
  appendWall: (
    e: React.MouseEvent<HTMLButtonElement>,
    color: string,
    height: number,
    transparent?: boolean
  ) => void;
}

export default function WallsSection({ appendWall }: WallsSectionProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-3 w-full">
      <p className="text-lg w-full pl-2">Walls</p>
      <button
        onClick={(e) => appendWall(e, "#87b6d6", 5)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="flex justify-center items-center h-[50px]">
          <Image
            src="/creatorImages/wall_v1.jpg"
            alt=""
            width={35}
            height={35}
          />
        </div>
        <div>
          <p className="text-sm">Wall v.1</p>
        </div>
      </button>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Wall v.1 S</h1>
            <ul className="mt-1">
              <li>Walls that are lower</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) => appendWall(e, "#87b6d6", 2.5)}
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/wall_v1.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Wall v.1 S</p>
          </div>
        </button>
      </SectionsToolTip>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Wall v.1 T</h1>
            <ul className="mt-1">
              <li>Walls that are transparent</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) => appendWall(e, "#87b6d6", 5, true)}
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/wall_v1.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Wall v.1 T</p>
          </div>
        </button>
      </SectionsToolTip>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Wall v.1 ST</h1>
            <ul className="mt-1">
              <li>Walls that are lower and transparent</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) => appendWall(e, "#87b6d6", 2.5, true)}
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/wall_v1.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Wall v.1 ST</p>
          </div>
        </button>
      </SectionsToolTip>
      <button
        onClick={(e) => appendWall(e, "#209495", 5)}
        className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
      >
        <div className="flex justify-center items-center h-[50px]">
          <Image
            src="/creatorImages/wall_v2.jpg"
            alt=""
            width={35}
            height={35}
          />
        </div>
        <div>
          <p className="text-sm">Wall v.2</p>
        </div>
      </button>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Wall v.2 S</h1>
            <ul className="mt-1">
              <li>Walls that are lower</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) => appendWall(e, "#209495", 2.5)}
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/wall_v2.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Wall v.2 S</p>
          </div>
        </button>
      </SectionsToolTip>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Wall v.2 T</h1>
            <ul className="mt-1">
              <li>Walls that are transparent</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) => appendWall(e, "#209495", 5, true)}
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/wall_v2.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Wall v.2 T</p>
          </div>
        </button>
      </SectionsToolTip>

      <SectionsToolTip
        title={
          <>
            <h1 className="text-xs text-main2">Wall v.2 ST</h1>
            <ul className="mt-1">
              <li>Walls that are lower and transparent</li>
            </ul>
          </>
        }
      >
        <button
          onClick={(e) => appendWall(e, "#209495", 2.5, true)}
          className="w-[90px] h-[90px] border border-solid border-slate-200 rounded-lg p-2 hover:bg-bgWhite1 hover:text-main2 transition-colors duration-300 focus:outline-none"
        >
          <div className="flex justify-center items-center h-[50px]">
            <Image
              src="/creatorImages/wall_v2.jpg"
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="text-sm">Wall v.2 ST</p>
          </div>
        </button>
      </SectionsToolTip>
    </div>
  );
}
