"use client";

import {CustomInput, SiteLayout} from "@/components";
import {useState} from "react";
import {PiCaretLeftBold, PiCaretRightBold} from "react-icons/pi";
import {useParams, useRouter} from "next/navigation";
import {ConvertNumber} from "@/utils";
import useLoanStore from "@/zustand/loan/store";

export default function NewLoanRequestSelectionBankInfo() {
  const router = useRouter();
  const params = useParams();
  const {slug} = params;

  const [accountNumber, setAccountNumber] = useState<string>("");
  const [shebaNumber, setShebaNumber] = useState<string>("");
  const [accountAverage, setAccountAverage] = useState<string>("");

  const {setSelectedLoanList} = useLoanStore();

  return (
    <SiteLayout headerText={"درخواست تسهیلات جدید"}>
      <header className={"text-center p-4"}>
        <h1 className={"text-lg font-bold text-gray-800"}>
          اطلاعات بانکی متقاضی
        </h1>
      </header>
      <section className={"w-full p-4"}>
        <span className={"text-gray-600"}>
          لطفا تمام موارد زیر را با دقت کامل نمایید.
        </span>
        <form className={"flex flex-row flex-wrap text-gray-700"}>
          <label className={"p-2 w-full md:w-1/2 flex flex-col"}>
            <span>شماره حساب*</span>
            <CustomInput
              dir={"ltr"}
              className={"border outline-0 rounded p-1"}
              type={"text"}
              aria-label={"شماره حساب"}
              name={"Account Number"}
              value={accountNumber}
              onChange={(text) => {
                setAccountNumber(ConvertNumber(text));
              }}
              validation={
                accountNumber.length >= 12 && accountNumber.length <= 16
              }
              textErr={"حداقل بین ۱۲ تا ۱۶ کاراکتر وارد کنید."}
            />
          </label>
          <label className={"p-2 w-full md:w-1/2 flex flex-col"}>
            <span>شماره شبا*</span>
            <CustomInput
              dir={"ltr"}
              className={"border outline-0 rounded p-1"}
              type={"text"}
              aria-label={"شماره شبا"}
              name={"Sheba Number"}
              value={shebaNumber}
              onChange={(text) => {
                setShebaNumber("IR" + ConvertNumber(text));
              }}
              validation={shebaNumber.length == 24}
              textErr={"حداقل ۲۴ کاراکتر وارد کنید."}
            />
          </label>
          <label className={"p-2 w-full md:w-1/2 flex flex-col"}>
            <span>میانگین حساب*</span>
            <CustomInput
              dir={"ltr"}
              className={"border outline-0 rounded p-1"}
              type={"text"}
              aria-label={"میانگین حساب"}
              name={"phone number"}
              value={accountAverage}
              onChange={(text) => {
                setAccountAverage(ConvertNumber(text, true));
              }}
              validation={accountAverage.length >= 4}
              textErr={"حداقل 4 کاراکتر وارد کنید."}
            />
          </label>
        </form>
      </section>
      <section className={"flex flex-row justify-between items-center"}>
        <button
          onClick={() => {
            router.back();
          }}
          className={
            "bg-gray-500 py-2 px-4 rounded text-white flex gap-1 items-center"
          }
        >
          <PiCaretRightBold />
          <span>قبلی</span>
        </button>
        <button
          className={`py-2 px-4 rounded text-white flex gap-1 items-center bg-blue-950 disabled:bg-blue-300 `}
          disabled={
            !(
              accountNumber.length >= 12 &&
              accountNumber.length <= 16 &&
              shebaNumber.length == 24 &&
              accountAverage.length >= 4
            )
          }
          onClick={() => {
            if (slug) {
              setSelectedLoanList({
                loanId: String(slug),
                bankInfo: {
                  accountNumber: accountNumber,
                  shebaNumber: shebaNumber,
                  accountAverage: accountAverage,
                },
                status: "in_progress",
              });

              router.push(`/loan-request/selection/${slug}/calculations`);
            }
          }}
        >
          <span>بعدی</span>
          <PiCaretLeftBold />
        </button>
      </section>
    </SiteLayout>
  );
}
