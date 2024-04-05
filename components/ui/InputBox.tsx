"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface InputBoxProps {
  label: string;
  register: UseFormRegister<FieldValues>;
  type?: "text" | "email" | "number" | "password";
  validateFunction?: () => boolean | string;
  id: string;
  error:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}

export default function InputBox({
  type = "text",
  id,
  label,
  error,
  validateFunction,
  register,
}: InputBoxProps) {
  const [inputValue, setInputValue] = useState<string | number>("");
  const [focus, setFocus] = useState(false);

  function changeValue(val: string | number) {
    setInputValue(val);
  }

  useEffect(
    function () {
      if (inputValue) {
        setFocus(true);
      }
    },
    [inputValue, focus]
  );

  return (
    <div className="relative h-[50px] w-full">
      <motion.label
        htmlFor={id}
        className={`absolute top-1/2 left-3 text-gray cursor-text transition-colors duration-300 ${
          focus ? "text-main1" : ""
        } `}
        animate={
          focus
            ? { translateX: "-15px", translateY: "-170%", scale: 0.8 }
            : { translateX: "0px", translateY: "-50%", scale: 1 }
        }
        initial={{ translateX: "0px", translateY: "-50%", scale: 1 }}
        transition={{ ease: "linear", duration: 0.15 }}
      >
        {label}
      </motion.label>
      <input
        id={id}
        className="border-none focus:outline-none px-3 py-2 w-full"
        type={type}
        {...register(id, {
          required: "This field is required",
          validate: validateFunction,
          onChange: (e) => changeValue(e.target.value),
          onBlur: () => setFocus(false),
        })}
        onFocus={() => setFocus(true)}
      />
      <div className="absolute h-[1.5px] w-full bg-gradient-to-r from-main1 to-main2"></div>
      {error && (
        <p className="text-[10px] mt-1 text-main2">{error.toString()}</p>
      )}
    </div>
  );
}
