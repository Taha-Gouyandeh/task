"use client";
import {SiteLayout} from "@/components";
import useLoanStore from "@/zustand/loan/store";
import Link from "next/link";

export default function MyLoanRequest() {
  const {selectedLoanList} = useLoanStore();

  return (
    <SiteLayout headerText={"تسهیلات های من"}>
      <header className={"text-center p-4"}>
        <h1 className={"text-lg font-bold text-gray-800"}>تسهیلات های من</h1>
      </header>
      <section className={"w-full p-4"}>
        <article>
          {selectedLoanList.length === 0 ? (
            <span className={"text-red-800 font-bold"}>
              شما هنوز درخواستی ثبت نکردید
            </span>
          ) : (
            <ul className={"flex flex-row flex-wrap"}>
              {selectedLoanList.map((item, index) => (
                <li key={index} className={"text-gray-700 w-full md:w-1/2 p-2"}>
                  {/*if selected add shadow style*/}
                  <Link
                    href={`/my-loan/${item.loanId}`}
                    className={`flex flex-col gap-2 w-full h-full border rounded p-3 bg-blue-50 cursor-pointer hover:shadow-lg`}
                  >
                    <div className={"flex flex-row gap-2"}>
                      <span>نام : </span>
                      <span>{item?.loan?.name}</span>
                    </div>
                    <div className={"flex flex-row gap-2"}>
                      <span>مبلغ : </span>
                      <span>{item?.loan?.amount.toLocaleString()}</span>
                    </div>
                    {item?.loan?.interestRate && (
                      <div className={"flex flex-row gap-2"}>
                        <span>نرخ بهره : </span>
                        <span>{item?.loan?.interestRate} درصد </span>
                      </div>
                    )}
                    {item?.loan?.percentageRate && (
                      <div className={"flex flex-row gap-2"}>
                        <span>نرخ : </span>
                        <span>{item?.loan?.percentageRate} درصد </span>
                      </div>
                    )}
                    <div className={"flex flex-row gap-2"}>
                      <span>جریمه دیرکرد : </span>
                      <span>{item?.loan?.penaltyRate} درصد </span>
                    </div>
                    <div
                      className={
                        "flex flex-row flex-wrap gap-2 items-center mt-auto"
                      }
                    >
                      <span>مهلت بازپرداخت : </span>
                      <span className={"bg-gray-50 p-1 rounded border text-sm"}>
                        {item.repaymentType?.name}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </SiteLayout>
  );
}
