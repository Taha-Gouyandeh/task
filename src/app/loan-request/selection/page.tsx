"use client";

import {SiteLayout} from "@/components";
import {useState} from "react";
import {PiCaretLeftBold, PiCaretRightBold} from "react-icons/pi";
import {useRouter} from "next/navigation";
import {LoanType} from "@/DTO";
import file from "@/assets/files/data.json";
import useLoanStore from "@/zustand/loan/store";

export default function NewLoanRequestSelection() {
  const router = useRouter();
  const loanData: LoanType[] = file.data;

  const [selectedLoan, setSelectedLoan] = useState<LoanType>();

  const {selectedLoanId, setSelectedLoanList} = useLoanStore();

  return (
    <SiteLayout headerText={"درخواست تسهیلات جدید"}>
      <header className={"text-center p-4"}>
        <h1 className={"text-lg font-bold text-gray-800"}>
          انتخاب نوع و مبلغ تسهیلات
        </h1>
      </header>
      <section className={"w-full p-4"}>
        <article>
          <span className={"text-gray-600"}>
            لطفا یکی از موارد زیر را انتخاب کنید.
          </span>
          <ul className={"flex flex-row flex-wrap"}>
            {loanData.map((item, index) => (
              <li key={index} className={"text-gray-700 w-full md:w-1/2 p-2"}>
                {/*if selected add shadow style*/}
                <label
                  className={`flex flex-row gap-2 w-full h-full border rounded p-3 bg-blue-50 cursor-pointer ${selectedLoan?.id === item.id && "shadow-lg"}`}
                >
                  <input
                    className={""}
                    aria-label={`انتخاب وام ${item.name}`}
                    type={"radio"}
                    name={"LoanSelect"}
                    onChange={() => {
                      setSelectedLoan(item);
                    }}
                  />
                  <div className={"flex flex-col gap-2"}>
                    <div className={"flex flex-row gap-2"}>
                      <span>نام : </span>
                      <span>{item.name}</span>
                    </div>
                    <div className={"flex flex-row gap-2"}>
                      <span>مبلغ : </span>
                      <span>{item.amount.toLocaleString()}</span>
                    </div>
                    {item?.interestRate && (
                      <div className={"flex flex-row gap-2"}>
                        <span>نرخ بهره : </span>
                        <span>{item?.interestRate} درصد </span>
                      </div>
                    )}
                    {item?.percentageRate && (
                      <div className={"flex flex-row gap-2"}>
                        <span>نرخ : </span>
                        <span>{item?.percentageRate} درصد </span>
                      </div>
                    )}
                    <div className={"flex flex-row gap-2"}>
                      <span>جریمه دیرکرد : </span>
                      <span>{item?.penaltyRate} درصد </span>
                    </div>
                    <div
                      className={
                        "flex flex-row flex-wrap gap-2 items-center mt-auto"
                      }
                    >
                      <span>مهلت بازپرداخت : </span>
                      <ul
                        className={"flex flex-row flex-wrap gap-1 items-center"}
                      >
                        {item.repaymentType.map(
                          (repaymentItem, repaymentItemIndex) => (
                            <span
                              key={repaymentItemIndex}
                              className={
                                "bg-gray-50 p-1 rounded border text-sm"
                              }
                            >
                              {repaymentItem.name}
                            </span>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </article>
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
        {/*If loan was not selected, the button will be disabled*/}
        <button
          className={`py-2 px-4 rounded text-white flex gap-1 items-center bg-blue-950 disabled:bg-blue-300`}
          disabled={selectedLoan?.id === undefined}
          onClick={() => {
            if (selectedLoan) {
              const loan = selectedLoanId(selectedLoan.id);

              if (loan && loan.status === "end") {
                alert("شما قبلا این تسهیلات را دریافت کردید");
              } else {
                setSelectedLoanList({
                  loanId: selectedLoan.id,
                  loan: selectedLoan,
                  status: "in_progress",
                });
                router.push(
                  `/loan-request/selection/${selectedLoan?.id}/user-information`,
                );
              }
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
