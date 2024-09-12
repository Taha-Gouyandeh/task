"use client";

import {CustomInput, SiteLayout} from "@/components";
import {useEffect, useState} from "react";
import {PiCaretLeftBold, PiCaretRightBold} from "react-icons/pi";
import {useParams, useRouter} from "next/navigation";
import {ConvertNumber, phoneNumberRegex} from "@/utils";
import dynamic from "next/dynamic";
import useLoanStore from "@/zustand/loan/store";

const DateSelector = dynamic(() => import("@/components/date-selector"), {
  loading: () => <span>loading...</span>,
});

export default function NewLoanRequestSelectionUserInfo() {
  const router = useRouter();
  const params = useParams();
  const {slug} = params;

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("");

  const {setSelectedLoanList, selectedLoanId} = useLoanStore();

  useEffect(() => {
    // Validation of the existence of previous information
    const loan = selectedLoanId(String(slug));
    if ((loan && loan?.loan === undefined) || loan?.status === "end") {
      router.push("/loan-request/selection");
    }
  }, []);

  return (
    <SiteLayout headerText={"درخواست تسهیلات جدید"}>
      <header className={"text-center p-4"}>
        <h1 className={"text-lg font-bold text-gray-800"}>اطلاعات متقاضی</h1>
      </header>
      <section className={"w-full p-4"}>
        <span className={"text-gray-600"}>
          لطفا تمام موارد زیر را با دقت کامل نمایید.
        </span>
        <form className={"flex flex-row flex-wrap text-gray-700"}>
          <label className={"p-2 w-full md:w-1/2 flex flex-col"}>
            <span>نام*</span>
            <CustomInput
              className={"border outline-0 rounded p-1"}
              type={"text"}
              aria-label={"نام کاربر"}
              name={"first name"}
              value={firstName}
              onChange={(text) => {
                setFirstName(text);
              }}
              validation={firstName.length >= 3}
              textErr={"حداقل ۳ کاراکتر وارد کنید."}
            />
          </label>
          <label className={"p-2 w-full md:w-1/2 flex flex-col"}>
            <span>نام خانوادگی*</span>
            <CustomInput
              className={"border outline-0 rounded p-1"}
              type={"text"}
              aria-label={"نام خانودگی  کاربر"}
              name={"last name"}
              value={lastName}
              onChange={(text) => {
                setLastName(text);
              }}
              validation={lastName.length >= 3}
              textErr={"حداقل ۳ کاراکتر وارد کنید."}
            />
          </label>
          <label className={"p-2 w-full md:w-1/2 flex flex-col"}>
            <span>شماره تماس*</span>
            <CustomInput
              dir={"ltr"}
              className={"border outline-0 rounded p-1"}
              type={"tel"}
              aria-label={"شماره تماس کاربر"}
              name={"phone number"}
              value={phone}
              onChange={(text) => {
                setPhone(ConvertNumber(text));
              }}
              validation={phoneNumberRegex.test(phone)}
              textErr={"فرمت وارد شده صحیح نیست"}
            />
          </label>
          <div className={"p-2 w-full md:w-1/2 flex flex-col"}>
            <span>تاریخ تولد*</span>
            <DateSelector
              handleSelect={(date) => {
                setBirthDay(date);
              }}
            />
          </div>
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
              firstName.length > 2 &&
              lastName.length > 2 &&
              birthDay.length >= 8 &&
              birthDay.length <= 10 &&
              phoneNumberRegex.test(phone)
            )
          }
          onClick={() => {
            if (slug) {
              setSelectedLoanList({
                loanId: String(slug),
                userInfo: {
                  firstName: firstName,
                  lastName: lastName,
                  birthDay: birthDay,
                  phone: phone,
                },
                status: "in_progress",
              });

              router.push(`/loan-request/selection/${slug}/user-bank-info`);
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
