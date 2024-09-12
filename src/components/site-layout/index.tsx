import React from "react";
import { SiteLayoutType } from "@/DTO";

export const SiteLayout: React.FC<SiteLayoutType> = ({ children, headerText }) => {
  return (
    <div className={"flex flex-col min-h-dvh w-dvw"}>
      <header className={"shadow w-full bg-blue-50"}>
        <div className={"flex flex-row container mx-auto items-center py-4 px-2"}>
          <span className={"text-gray-900"}>{headerText ? headerText : "تسهیلات بانکی"}</span>
        </div>
      </header>
      <main className={'container mx-auto p-2'}>
        {children}
      </main>
      <footer className={"shadow bg-blue-50 mt-auto w-full p-2"}>
        <div className={"flex flex-row container mx-auto items-center"}>
          <span className={"text-sm text-gray-700"}>تمام حقوق سایت محفوظ میباشد</span>
        </div>
      </footer>
    </div>
  );
};