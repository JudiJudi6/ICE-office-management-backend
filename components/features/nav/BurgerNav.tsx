"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import BurgerBtn from "./BurgerBtn";
import { createPortal } from "react-dom";

export default function BurgerNav() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="">
      <BurgerBtn onOpen={setOpen} />
      {createPortal(
        <div className="absolute w-full h-full top-0 left-0  flex justify-center items-center overflow-hidden ">
          <motion.div
            animate={open ? { translateX: "0%" } : { translateX: "-100%" }}
            transition={{ ease: "easeInOut" }}
            className="absolute right-0 top-0 z-50 -translate-x-full h-full w-full bg-blue-700"
          >
            dsa
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
}
