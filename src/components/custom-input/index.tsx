"use client";
import {FC, memo} from "react";
import {CustomInputType} from "@/DTO";

const CustomInput: FC<CustomInputType> = ({
  className,
  type,
  value,
  onChange,
  dir,
  name,
  aria,
  validation = true,
  textErr,
}) => {
  return (
    <div className={"flex flex-col w-full "}>
      <input
        dir={dir}
        className={
          className +
          ` ${value !== "" && !validation ? "border-red-800" : value !== "" && validation && "border-green-800"}`
        }
        type={type}
        aria-label={aria}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {value !== "" && !validation && textErr && (
        <span className={"text-red-800 text-sm"}>{textErr}</span>
      )}
    </div>
  );
};

export default memo(CustomInput);
