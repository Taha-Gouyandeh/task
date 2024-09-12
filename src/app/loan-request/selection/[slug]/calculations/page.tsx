"use client";

import {SiteLayout} from "@/components";
import {PiCaretRightBold} from "react-icons/pi";
import {useParams, useRouter} from "next/navigation";
import {LoanType, repaymentType} from "@/DTO";
import file from "@/assets/files/data.json";
import {useEffect, useMemo, useState} from "react";
import useLoanStore from "@/zustand/loan/store";

export default function NewLoanRequestSelectionCalculation() {
  const router = useRouter();
  const params = useParams();
  const {slug} = params;
  const loanData: LoanType[] = file.data;
  const selectedLoan = loanData.find((el) => el.id === slug);

  const {setSelectedLoanList, selectedLoanId} = useLoanStore();

  useEffect(() => {
    // Validation of the existence of previous information
    const loan = selectedLoanId(String(slug));
    if (
      loan &&
      loan?.loan &&
      loan?.userInfo === undefined &&
      loan?.bankInfo === undefined
    ) {
      router.push("/loan-request/selection");
    }
  }, []);

  const [selectMonth, setSelectMonth] = useState<repaymentType>();

  const monthlyPayment = useMemo(() => {
    if (!selectMonth) {
      return "لطفا ابتدا تعداد ماه را انتخاب کنید";
    }

    const interestRate = selectedLoan?.interestRate
      ? selectedLoan?.interestRate
      : selectedLoan?.percentageRate
        ? selectedLoan?.percentageRate
        : 0;

    const amount = selectedLoan?.amount || 0;

    return Math.floor(
      (amount * interestRate) / 100 + amount / selectMonth?.value,
    ).toLocaleString();
  }, [selectedLoan, selectMonth?.value]);

  const penaltyAmount = useMemo(() => {
    if (!selectedLoan?.amount || !selectedLoan?.penaltyRate) {
      return "0"; // Return "0" if amount or penaltyRate is missing
    }

    return (
      (selectedLoan.amount * selectedLoan.penaltyRate) /
      100
    ).toLocaleString();
  }, [selectedLoan]);

  return (
    <SiteLayout headerText={"درخواست تسهیلات جدید"}>
      <header className={"text-center p-4"}>
        <h1 className={"text-lg font-bold text-gray-800"}>محاسبه اقساط</h1>
      </header>
      <section className={"p-4"}>
        <div
          className={
            "flex flex-row w-full flex-wrap text-gray-700 h-full border rounded p-3 bg-blue-50"
          }
        >
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>نام : </span>
            <span>{selectedLoan?.name}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>مبلغ : </span>
            <span>{selectedLoan?.amount.toLocaleString()}</span>
          </div>
          {selectedLoan?.interestRate && (
            <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
              <span>نرخ بهره : </span>
              <span>{selectedLoan?.interestRate} درصد </span>
            </div>
          )}
          {selectedLoan?.percentageRate && (
            <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
              <span>نرخ : </span>
              <span>{selectedLoan?.percentageRate} درصد </span>
            </div>
          )}
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>جریمه دیرکرد : </span>
            <span>{selectedLoan?.penaltyRate} درصد </span>
          </div>
          <div className={"flex flex-col flex-wrap gap-2  mt-auto p-2 w-full"}>
            <span>لطفا مهلت بازپرداخت خود را انتخاب کنید: </span>
            <ul className={"flex flex-row flex-wrap gap-1 items-center"}>
              {selectedLoan?.repaymentType.map(
                (repaymentItem, repaymentItemIndex) => (
                  <button
                    key={repaymentItemIndex}
                    className={`bg-gray-50 p-1 rounded border text-sm cursor-pointer ${repaymentItem.value === selectMonth?.value && "shadow-lg border-gray-500"}`}
                    onClick={() => {
                      setSelectMonth(repaymentItem);
                    }}
                  >
                    {repaymentItem.name}
                  </button>
                ),
              )}
            </ul>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>قسط تسهیلات : </span>
            <span>{monthlyPayment}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>مبلغ جریمه دیرکرد : </span>
            <span>{penaltyAmount}</span>
          </div>
        </div>
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
          disabled={selectMonth === undefined}
          onClick={() => {
            if (slug) {
              setSelectedLoanList({
                loanId: String(slug),
                status: "end",
                repaymentType: selectMonth,
              });

              router.push(`#`);
            }
          }}
        >
          <span>ارسال درخواست</span>
        </button>
      </section>
    </SiteLayout>
  );
}
