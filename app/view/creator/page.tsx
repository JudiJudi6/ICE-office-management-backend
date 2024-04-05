"use client";

import * as THREE from "three";

import Menu from "@/components/features/creator/Menu";
import AxesHelper from "@/components/models3d/AxesHelper";
import Desk3D from "@/components/models3d/Desk3D";
import Render3D from "@/components/models3d/Render3D";
import RenderFloor from "@/components/models3d/RenderFloor";
import RenderWall from "@/components/models3d/RenderWall";
import Spinner from "@/components/ui/Spinner";
import { Box, OrbitControls, Stats, useHelper } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { SectionsToolTip } from "@/components/features/creator/SectionsToolTip";

export interface elementInterface {
  id: string;
  type: "static" | "desk";
  path: string;
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
}

export interface floorInterface {
  id: string;
  x: number;
  y: number;
  z: number;
  endX: number;
  endY: number;
  endZ: number;
  color: string;
  mouseInteractions?: boolean;
  transparent?: boolean;
  destroyElement?: (e: ThreeEvent<MouseEvent>, id: string) => void;
}

export interface deskInterface {
  id: string;
  deskPath: string;
  equipPath: string;
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  scale: number;
  mouseInteractions?: boolean;
  transparent?: boolean;
  destroyElement?: (e: ThreeEvent<MouseEvent>, id: string) => void;
  equipment: string[];
}

interface SpyProps {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  freeCamera: boolean;
}

function Spy({ setX, setY, freeCamera }: SpyProps) {
  useFrame(({ mouse, viewport, camera }) => {
    const position = new Vector3();
    const x =
      (mouse.x * viewport.width) / (camera.zoom / 15) +
      camera.getWorldPosition(position).x;
    const y =
      (mouse.y * viewport.height) / (camera.zoom / 15) -
      camera.getWorldPosition(position).z;
    setX(x);
    setY(-y);
  });

  return (
    <gridHelper visible={!freeCamera} args={[50, 50, 0x000000, "lightgray"]} />
  );
}

export default function Creator(): JSX.Element {
  const [elements, setElements] = useState<elementInterface[]>([]);
  const [floor, setFloor] = useState<floorInterface[]>([]);
  const [walls, setWalls] = useState<floorInterface[]>([]);
  const [desks, setDesks] = useState<deskInterface[]>([]);

  const [activeElement, setActiveElement] = useState("");
  const [clientX, setClientX] = useState(0);
  const [clientZ, setClientZ] = useState(0);

  const [mouseDown, setMouseDown] = useState(false);
  const [freeCamera, setFreeCamera] = useState(false);
  const [destroyer, setDestroyer] = useState(false);
  const [highlightDesks, setHighlightDesks] = useState(false);

  const [floorSize, setFloorSize] = useState({ x: 0, z: 0, endX: 0, endZ: 0 });

  const [rotY, setRotY] = useState(0);

  const [history, setHistory] = useState<string[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<any>(null);

  useEffect(
    function () {
      function clearActive() {
        setActiveElement("");
        setRotY(0);
      }

      function rotate(e: KeyboardEvent) {
        if (e.key === "ArrowRight") {
          setRotY((s) => (s += Math.PI / 8));
        }
        if (e.key === "ArrowLeft") {
          setRotY((s) => (s -= Math.PI / 8));
        }
        if (e.key === "Escape") {
          if (activeElement) {
            if (activeElement.includes("floor")) {
              setFloor((s) => s.slice(0, -1));
            } else if (activeElement.includes("wall")) {
              setWalls((s) => s.slice(0, -1));
            } else if (activeElement.includes("desk")) {
              setDesks((s) => s.slice(0, -1));
            } else {
              setElements((s) => s.slice(0, -1));
            }
            setActiveElement("");
            setRotY(0);
          }
        }
        if (e.key === " ") {
          setFreeCamera((s) => !s);
        }
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current?.addEventListener("click", clearActive);
        document?.addEventListener("keydown", rotate);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current?.removeEventListener("click", clearActive);
          document?.removeEventListener("keydown", rotate);
        }
      };
    },
    [
      canvasRef,
      setActiveElement,
      elements,
      activeElement,
      clientX,
      clientZ,
      floorSize,
      floor,
      history,
    ]
  );

  useEffect(
    function () {
      function startPos() {
        setMouseDown(true);
        setFloorSize((s) => ({
          ...s,
          x: clientX,
          z: clientZ,
        }));
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current?.addEventListener("mousedown", startPos);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current?.removeEventListener("mousedown", startPos);
        }
      };
    },
    [clientX, clientZ]
  );

  useEffect(
    function () {
      function endPos() {
        setFloorSize((s) => ({
          ...s,
          endX: clientX,
          endZ: clientZ,
        }));
        setActiveElement("");
        setFloorSize({ x: 0, z: 0, endX: 0, endZ: 0 });
        setMouseDown(false);
      }

      if (canvasRef && canvasRef.current) {
        canvasRef.current?.addEventListener("mouseup", endPos);
      }

      return () => {
        if (canvasRef && canvasRef.current) {
          canvasRef.current?.removeEventListener("mouseup", endPos);
        }
      };
    },
    [clientZ, clientX]
  );

  useEffect(
    function () {
      if (!freeCamera && controlsRef.current) {
        controlsRef.current.reset();
      }
    },
    [freeCamera]
  );

  function backChanges() {
    if (history.length > 0) {
      if (history.at(history.length - 1) === "floor") {
        setFloor((s) => s.slice(0, -1));
      } else if (history.at(history.length - 1) === "wall") {
        setWalls((s) => s.slice(0, -1));
      } else if (history.at(history.length - 1) === "desk") {
        setDesks((s) => s.slice(0, -1));
      } else if (history.at(history.length - 1) === "element") {
        setElements((s) => s.slice(0, -1));
      }
      history.pop();
    }
  }

  function destroyElement(e: ThreeEvent<MouseEvent>, id: string) {
    e.stopPropagation();

    if (destroyer) {
      if (id.includes("floor")) {
        setFloor((floor) => floor.filter((item) => item.id !== id));
      } else if (id.includes("wall")) {
        setWalls((wall) => wall.filter((item) => item.id !== id));
      } else if (id.includes("desk")) {
        setDesks((desk) => desk.filter((item) => item.id !== id));
      } else {
        setElements((element) => element.filter((item) => item.id !== id));
      }
    }
  }

  function clearWorkspace() {
    setFloor([]);
    setWalls([]);
    setElements([]);
    setDesks([]);
  }

  return (
    <div className="flex pt-[80px] h-screen p-4">
      {/* <Suspense fallback={<Spinner />}> */}
      <Menu
        canvasRef={canvasRef}
        setActiveElement={setActiveElement}
        setElements={setElements}
        setFloor={setFloor}
        setWalls={setWalls}
        setDesks={setDesks}
        setFreeCamera={setFreeCamera}
        setHistory={setHistory}
        backChanges={backChanges}
        setDestroyer={setDestroyer}
        destroyer={destroyer}
        freeCamera={freeCamera}
        clearWorkspace={clearWorkspace}
        activeElement={activeElement}
      />
      <div className="w-full h-full">
        <div className="h-11 flex justify-between items-center mb-2">
          <div className="flex gap-5 text-sm">
            <p>
              Elements:{" "}
              <span>{elements.length + floor.length + walls.length}</span>
            </p>
            <SectionsToolTip
              title={
                <>
                  <h1 className="text-xs text-main2">Highlight desks</h1>
                </>
              }
            >
              <button
                onClick={() => setHighlightDesks((s) => !s)}
                className={`${highlightDesks && "text-main2"}`}
              >
                Desks: <span>{desks.length}</span>
              </button>
            </SectionsToolTip>
          </div>
          <button
            onClick={() => {
              const officeBuild = {
                floor,
                walls,
                elements,
                desks,
              };
              console.log(officeBuild);
            }}
            className="w-[110px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white  tracking-wide rounded-full transition-all duration-300 px-6"
          >
            Save
          </button>
        </div>
        <div className="h-[calc(100%-52px)]">
          <Suspense fallback={<Spinner />}>
            <Canvas
              ref={canvasRef}
              orthographic
              camera={{ zoom: 30, position: [0, 200, 0] }}
              shadows={true}
            >
              <Spy
                setX={setClientX}
                setY={setClientZ}
                freeCamera={freeCamera}
              />
              {elements.map((element) => {
                if (element.id === activeElement) {
                  element.x = clientX;
                  element.z = clientZ;
                  element.rotY = rotY;
                  return (
                    <Render3D
                      id={element.id}
                      key={element.id}
                      path={element.path}
                      x={clientX}
                      y={element.y}
                      z={clientZ}
                      rotX={element.rotX}
                      rotY={rotY}
                      rotZ={element.rotZ}
                      scale={element.scale}
                    />
                  );
                } else {
                  return (
                    <Render3D
                      id={element.id}
                      key={element.id}
                      path={element.path}
                      x={element.x}
                      y={element.y}
                      z={element.z}
                      rotX={element.rotX}
                      rotY={element.rotY}
                      rotZ={element.rotZ}
                      scale={element.scale}
                      destroyElement={destroyElement}
                      mouseInteractions={destroyer}
                    />
                  );
                }
              })}
              {desks.map((element) => {
                if (element.id === activeElement) {
                  element.x = clientX;
                  element.z = clientZ;
                  element.rotY = rotY;
                  return (
                    <Desk3D
                      id={element.id}
                      key={element.id}
                      deskPath={element.deskPath}
                      equipPath={element.equipPath}
                      x={clientX}
                      y={element.y}
                      z={clientZ}
                      rotX={element.rotX}
                      rotY={rotY}
                      rotZ={element.rotZ}
                      scale={element.scale}
                      equipment={element.equipment}
                    />
                  );
                } else {
                  return (
                    <Desk3D
                      id={element.id}
                      key={element.id}
                      deskPath={element.deskPath}
                      equipPath={element.equipPath}
                      x={element.x}
                      y={element.y}
                      z={element.z}
                      rotX={element.rotX}
                      rotY={element.rotY}
                      rotZ={element.rotZ}
                      scale={element.scale}
                      transparent={highlightDesks}
                      destroyElement={destroyElement}
                      mouseInteractions={destroyer}
                      equipment={element.equipment}
                    />
                  );
                }
              })}
              {floor.map((element) => {
                if (element.id === activeElement) {
                  element.x = floorSize.x;
                  element.z = floorSize.z;
                  element.endZ = clientZ;
                  element.endX = clientX;

                  if (mouseDown) {
                    return (
                      <RenderFloor
                        id={element.id}
                        key={element.id}
                        x={floorSize.x}
                        y={element.y}
                        z={floorSize.z}
                        endX={clientX}
                        endZ={clientZ}
                        endY={element.endY}
                        color={element.color}
                      />
                    );
                  } else {
                    return (
                      <Box
                        key={1}
                        position={
                          new Vector3(clientX + 0.5, element.y, clientZ + 0.5)
                        }
                        material={
                          new THREE.MeshPhongMaterial({ color: element.color })
                        }
                      />
                    );
                  }
                } else {
                  return (
                    <RenderFloor
                      id={element.id}
                      key={element.id}
                      x={element.x}
                      y={element.y}
                      z={element.z}
                      endX={element.endX}
                      endZ={element.endZ}
                      endY={element.y}
                      color={element.color}
                      destroyElement={destroyElement}
                      mouseInteractions={destroyer}
                    />
                  );
                }
              })}
              {walls.map((element) => {
                if (element.id === activeElement) {
                  element.x = floorSize.x;
                  element.z = floorSize.z;
                  element.endZ = clientZ;
                  element.endX = clientX;

                  if (mouseDown) {
                    return (
                      <RenderWall
                        id={element.id}
                        key={element.id}
                        x={floorSize.x}
                        y={element.y}
                        z={floorSize.z}
                        endX={clientX}
                        endZ={clientZ}
                        endY={element.endY}
                        color={element.color}
                        transparent={element.transparent}
                      />
                    );
                  } else {
                    return (
                      <mesh
                        key={2}
                        position={
                          new Vector3(clientX + 0.25, 2, clientZ + 0.25)
                        }
                      >
                        <boxGeometry args={[0.5, 5, 0.5]} />
                        <meshPhongMaterial color={element.color} />
                      </mesh>
                    );
                  }
                } else {
                  return (
                    <RenderWall
                      id={element.id}
                      key={element.id}
                      x={element.x}
                      y={element.y}
                      z={element.z}
                      endX={element.endX}
                      endZ={element.endZ}
                      endY={element.y}
                      color={element.color}
                      destroyElement={destroyElement}
                      mouseInteractions={destroyer}
                      transparent={element.transparent}
                    />
                  );
                }
              })}
              <OrbitControls
                ref={controlsRef}
                enableRotate={freeCamera}
                enableDamping={false}
                minPolarAngle={0}
                maxPolarAngle={Math.PI / 2 - 0.1}
              />
              <ambientLight intensity={4} />
              <directionalLight
                castShadow={true}
                position={[5, 100, 0]}
                intensity={4}
                color="#fff"
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-left={-30}
                shadow-camera-right={20}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
                shadow-camera-far={200}
              />
              {/* <Stats /> */}
            </Canvas>
          </Suspense>
        </div>
      </div>
      {/* </Suspense> */}
    </div>
  );
}
