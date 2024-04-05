import React from "react";
import { HashLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <HashLoader color="#fc4508" />
    </div>
  );
}
