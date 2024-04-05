"use client";

import { Spiral as Hamburger } from "hamburger-react";
import React, { Dispatch, SetStateAction } from "react";

interface BurgerBtnProps {
  onOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerBtn({ onOpen }: BurgerBtnProps) {
  return (
    <div className="relative z-[60]">
      <Hamburger
        color="#fc4508"
        direction="left"
        rounded
        onToggle={(open) => onOpen(open)}
      />
    </div>
  );
}
