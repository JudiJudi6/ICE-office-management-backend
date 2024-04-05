import React from "react";

interface ConfirmClearProps {
  onCloseModal: () => void;
  clearWorkspace: () => void;
}

export default function ConfirmClear({
  clearWorkspace,
  onCloseModal,
}: ConfirmClearProps) {
  return (
    <div className="w-[200px] md500:w-full">
      <p>Are you sure you want to clear your workspace?</p>
      <div className="flex gap-4 justify-end items-center p-3 mt-5 flex-col md500:flex-row">
        <button
          onClick={onCloseModal}
          className="w-[110px] text-sm text-center bg-gradient-to-r to-main1 via-main2 from-main1 bg-size-200 bg-pos-0 hover:bg-pos-100 py-2 text-white  tracking-wide rounded-full transition-all duration-300 px-6"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            clearWorkspace();
            onCloseModal();
          }}
          className="w-[110px] text-sm text-center  py-2 text-red-500 border-2 border-solid border-red-500  tracking-wide rounded-full transition-all duration-300 px-6 hover:text-white hover:bg-red-500"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
