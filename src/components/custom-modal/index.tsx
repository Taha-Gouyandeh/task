"use client";

import React from "react";
import {CustomModal} from "@/DTO";

export const CustomModal: React.FC<CustomModal> = ({
  showModal,
  setShowModal,
  children,
}) => {
  return (
    <div
      className={`fixed  h-full overflow-y-auto top-0 z-50 w-dvw left-0  transition-opacity ease-in duration-100 delay-100 ${!showModal ? "!opacity-0 scale-0" : ""} `}
    >
      <div
        className={
          "custom-modal-back bg-gray-500 bg-opacity-40 fixed top-0 right-0 w-dvw h-dvh z-10 blur-md  backdrop-blur-sm"
        }
        onClick={() => {
          setShowModal(false);
        }}
      ></div>

      <div
        className={`absolute p-3 bg-white w-11/12 rounded-lg mt-32 left-1/2 z-[11] -translate-x-1/2 md:2/3 lg:w-1/3`}
        onClick={() => {}}
      >
        {children}
      </div>
    </div>
  );
};
