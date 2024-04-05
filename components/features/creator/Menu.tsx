import {
  deskInterface,
  elementInterface,
  floorInterface,
} from "@/app/view/creator/page";
import Render3D from "@/components/models3d/Render3D";
import { Box } from "@react-three/drei";
import React, {
  Dispatch,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Vector3 } from "three";

import { RiArrowGoBackFill } from "react-icons/ri";
import { MdOutlinePartyMode } from "react-icons/md";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TfiHummer } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";

import { Canvas } from "@react-three/fiber";
import DesksSection from "./DesksSection";
import FloorSection from "./FloorSection";
import WallsSection from "./WallsSection";
import ChairsSection from "./ChairsSection";
import FurnitureSection from "./FurnitureSection";
import DecorationSection from "./DecorationSection";
import Modal from "@/components/ui/Modal";
import ConfirmClear from "./ConfirmClear";
import { SectionsToolTip } from "./SectionsToolTip";

interface MenuProps {
  canvasRef: MutableRefObject<HTMLElement | null>;
  setActiveElement: Dispatch<SetStateAction<string>>;
  setElements: Dispatch<SetStateAction<elementInterface[]>>;
  setFloor: Dispatch<SetStateAction<floorInterface[]>>;
  setDesks: Dispatch<SetStateAction<deskInterface[]>>;
  setWalls: Dispatch<SetStateAction<floorInterface[]>>;
  setFreeCamera: Dispatch<SetStateAction<boolean>>;
  freeCamera: boolean;
  setDestroyer: Dispatch<SetStateAction<boolean>>;
  destroyer: boolean;
  setHistory: Dispatch<SetStateAction<string[]>>;
  backChanges: () => void;
  clearWorkspace: () => void;
  activeElement: string;
}

export default function Menu({
  canvasRef,
  setActiveElement,
  setElements,
  setFloor,
  setFreeCamera,
  setHistory,
  setWalls,
  backChanges,
  setDestroyer,
  destroyer,
  setDesks,
  freeCamera,
  clearWorkspace,
  activeElement,
}: MenuProps) {
  function appendElement(
    e: React.MouseEvent<HTMLButtonElement>,
    path: string,
    type: "desk" | "static",
    scale: number
  ) {
    if (activeElement) {
      backChanges();
    }
    setDestroyer(false);
    const id = `${new Date().getTime().toString()}-${path}`;
    setFreeCamera(false);
    setElements((elements) => [
      ...elements,
      {
        id: id,
        path: path,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        scale: scale,
        type: "static",
        x: e.clientX,
        y: 0,
        z: e.clientY,
      },
    ]);
    setActiveElement(id);
    setHistory((his) => [...his, "element"]);
  }

  function appendDesk(
    e: React.MouseEvent<HTMLButtonElement>,
    deskPath: string,
    equipPath: string,
    type: "desk" | "static",
    scale: number,
    equipment: string[]
  ) {
    if (activeElement) {
      backChanges();
    }
    setDestroyer(false);
    const id = `${new Date().getTime().toString()}-desk`;
    setFreeCamera(false);
    setDesks((elements) => [
      ...elements,
      {
        id: id,
        deskPath: deskPath,
        equipPath: equipPath,
        rotX: 0,
        rotY: 0,
        rotZ: 0,
        scale: scale,
        type: "static",
        x: e.clientX,
        y: 0,
        z: e.clientY,
        equipment: equipment,
      },
    ]);
    setActiveElement(id);
    setHistory((his) => [...his, "desk"]);
  }

  function appendFloor(e: React.MouseEvent<HTMLButtonElement>, color: string) {
    if (activeElement) {
      backChanges();
    }
    setDestroyer(false);
    const id = `${new Date().getTime().toString()}-floor`;
    setFreeCamera(false);
    setFloor((elements) => [
      ...elements,
      {
        id: id,
        x: e.clientX,
        y: 0,
        z: e.clientY,
        endX: 0,
        endY: 0,
        endZ: 0,
        color: color,
      },
    ]);
    setActiveElement(id);
    setHistory((his) => [...his, "floor"]);
  }

  function appendWall(
    e: React.MouseEvent<HTMLButtonElement>,
    color: string,
    height: number,
    transparent?: boolean
  ) {
    if (activeElement) {
      backChanges();
    }
    setDestroyer(false);
    const id = `${new Date().getTime().toString()}-wall`;
    setFreeCamera(false);
    setWalls((elements) => [
      ...elements,
      {
        id: id,
        x: e.clientX,
        y: height,
        z: e.clientY,
        endX: 0,
        endY: 0,
        endZ: 0,
        color: color,
        transparent: transparent,
      },
    ]);
    setActiveElement(id);
    setHistory((his) => [...his, "wall"]);
  }

  return (
    <div className="flex flex-col w-72 pr-4">
      <Modal>
        <Modal.Open opens="info">
          <SectionsToolTip
            title={
              <>
                <h1 className="text-xs text-main2">Info</h1>
              </>
            }
          >
            <button className="p-2  hover:bg-bgWhite1 rounded-xl text-lg transition-colors duration-300 my- 2 flex justify-center items-center gap-3">
              Office <span className="text-main2 ">Creator</span>{" "}
              <span className="text-xl">
                <IoIosHelpCircleOutline />
              </span>
            </button>
          </SectionsToolTip>
        </Modal.Open>
        <Modal.Window name="info">
          <div>
            <p>
              Here will be instructions and explanations to the office creator,
              but for now this functionality is not available :(
            </p>
          </div>
        </Modal.Window>
      </Modal>
      <div className="flex w-full justify-between my-2 bg-bgWhite1 p-1 rounded-xl">
        <Modal>
          <Modal.Open opens="clearWorkspace">
            <SectionsToolTip
              title={
                <>
                  <h1 className="text-xs text-main2">Clear Workspace</h1>
                </>
              }
            >
              <button
                // onClick={clearWorkspace}
                className="p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300"
              >
                <RxCross2 />
              </button>
            </SectionsToolTip>
          </Modal.Open>
          <Modal.Window name="clearWorkspace">
            <ConfirmClear
              onCloseModal={undefined as never}
              clearWorkspace={clearWorkspace}
            />
          </Modal.Window>
        </Modal>

        <SectionsToolTip
          title={
            <>
              <h1 className="text-xs text-main2">Change Camera Mode</h1>
            </>
          }
        >
          <button
            onClick={() => setFreeCamera((s) => !s)}
            className={`p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300  ${
              freeCamera && "text-main2"
            }`}
          >
            <MdOutlinePartyMode />
          </button>
        </SectionsToolTip>

        <SectionsToolTip
          title={
            <>
              <h1 className="text-xs text-main2">Destroy elements</h1>
            </>
          }
        >
          <button
            onClick={() => setDestroyer((s) => !s)}
            className={`p-2 hover:text-main2 rounded-xl text-xl transition-colors duration-300  ${
              destroyer && "text-main2"
            }`}
          >
            <TfiHummer />
          </button>
        </SectionsToolTip>

        <SectionsToolTip
          title={
            <>
              <h1 className="text-xs text-main2">Undo changes</h1>
            </>
          }
        >
          <button
            onClick={backChanges}
            className="p-2  hover:text-main2 rounded-xl text-xl transition-colors duration-300"
          >
            <RiArrowGoBackFill />
          </button>
        </SectionsToolTip>
      </div>
      <div className="overflow-y-auto mt-2">
        <FloorSection appendFloor={appendFloor} />
        <WallsSection appendWall={appendWall} />
        <DesksSection appendDesk={appendDesk} />
        <ChairsSection appendElement={appendElement} />
        <FurnitureSection appendElement={appendElement} />
        <DecorationSection appendElement={appendElement} />
      </div>
    </div>
  );
}
