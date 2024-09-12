"use client";

import {SiteLayout} from "@/components";
import {useParams} from "next/navigation";
import {useMemo} from "react";
import useLoanStore from "@/zustand/loan/store";

export default function NewLoanRequestSelectionCalculation() {
  const params = useParams();
  const {slug} = params;

  const {selectedLoanId} = useLoanStore();
  const selectedLoan = selectedLoanId(String(slug));

  const monthlyPayment = useMemo(() => {
    const interestRate = selectedLoan?.loan?.interestRate
      ? selectedLoan?.loan?.interestRate
      : selectedLoan?.loan?.percentageRate
        ? selectedLoan?.loan?.percentageRate
        : 0;

    const amount = selectedLoan?.loan?.amount || 0;

    if (selectedLoan && selectedLoan?.repaymentType) {
      return Math.floor(
        (amount * interestRate) / 100 +
          amount / selectedLoan?.repaymentType?.value,
      ).toLocaleString();
    } else {
      return "0";
    }
  }, [selectedLoan, selectedLoan?.repaymentType?.value]);

  const penaltyAmount = useMemo(() => {
    if (!selectedLoan?.loan?.amount || !selectedLoan?.loan?.penaltyRate) {
      return "0"; // Return "0" if amount or penaltyRate is missing
    }

    return (
      (selectedLoan.loan?.amount * selectedLoan.loan?.penaltyRate) /
      100
    ).toLocaleString();
  }, [selectedLoan]);

  return (
    <SiteLayout headerText={"تسهیلات من"}>
      <header className={"text-center p-4"}>
        <h1 className={"text-lg font-bold text-gray-800"}>اطلاعات درخواست</h1>
      </header>
      <section className={"p-4"}>
        <div
          className={
            "flex flex-row w-full flex-wrap text-gray-700 h-full border rounded p-3 bg-blue-50"
          }
        >
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>نام متقاضی : </span>
            <span>{selectedLoan?.userInfo?.firstName}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>نام خانوادگی : </span>
            <span>{selectedLoan?.userInfo?.lastName}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>شماره تماس : </span>
            <span>{selectedLoan?.userInfo?.phone}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>تاریخ تولد : </span>
            <span>{selectedLoan?.userInfo?.birthDay}</span>
          </div>
        </div>
      </section>
      <section className={"p-4"}>
        <div
          className={
            "flex flex-row w-full flex-wrap text-gray-700 h-full border rounded p-3 bg-blue-50"
          }
        >
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>شماره حساب : </span>
            <span>{selectedLoan?.bankInfo?.accountNumber}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>شماره شبا : </span>
            <span>{selectedLoan?.bankInfo?.shebaNumber}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>موجودی : </span>
            <span>
              {selectedLoan?.bankInfo?.accountAverage.toLocaleString()}
            </span>
          </div>
        </div>
      </section>
      <section className={"p-4"}>
        <div
          className={
            "flex flex-row w-full flex-wrap text-gray-700 h-full border rounded p-3 bg-blue-50"
          }
        >
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>نام : </span>
            <span>{selectedLoan?.loan?.name}</span>
          </div>
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>مبلغ : </span>
            <span>{selectedLoan?.loan?.amount.toLocaleString()}</span>
          </div>
          {selectedLoan?.loan?.interestRate && (
            <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
              <span>نرخ بهره : </span>
              <span>{selectedLoan?.loan?.interestRate} درصد </span>
            </div>
          )}
          {selectedLoan?.loan?.percentageRate && (
            <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
              <span>نرخ : </span>
              <span>{selectedLoan?.loan?.percentageRate} درصد </span>
            </div>
          )}
          <div className={"flex flex-row gap-2 w-full md:w-1/2 p-2"}>
            <span>جریمه دیرکرد : </span>
            <span>{selectedLoan?.loan?.penaltyRate} درصد </span>
          </div>
          <div
            className={
              "flex flex-row items-center flex-wrap gap-2  mt-auto p-2 w-full"
            }
          >
            <span> مهلت: </span>
            <span className={"bg-gray-50 p-1 rounded border text-sm"}>
              {selectedLoan?.repaymentType?.name}
            </span>
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
    </SiteLayout>
  );
}
