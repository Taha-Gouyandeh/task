import React from "react";
import "./style.scss";
import {SiteLayout} from "@/components";

export default function NotFound() {
  return (
    <SiteLayout>
      <div
        className={
          "flex flex-col  h-full w-full justify-center items-center pt-52 pb-40"
        }
      >
        <div className="center">
          <div className="error">
            <div className="number">4</div>
            <div className="illustration">
              <div className="circle"></div>
              <div className="clip">
                <div className="paper">
                  <div className="face">
                    <div className="eyes">
                      <div className="eye eye-left"></div>
                      <div className="eye eye-right"></div>
                    </div>
                    <div className="rosyCheeks rosyCheeks-left"></div>
                    <div className="rosyCheeks rosyCheeks-right"></div>
                    <div className="mouth"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="number">4</div>
          </div>

          <div className="text mb-3">متاسفانه این صفحه وجود ندارد</div>
          <a
            className="rounded-lg cursor-pointer bg-blue-900 py-2 px-4 text-white"
            href="/"
          >
            برگرد به خانه
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}
