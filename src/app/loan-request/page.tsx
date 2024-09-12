import { SiteLayout } from "@/components";
import { PiBankDuotone, PiCardholderDuotone, PiCoinsDuotone, PiHandCoinsDuotone, PiUser } from "react-icons/pi";
import Link from "next/link";

export default function NewLoanRequest() {
  return (
    <SiteLayout headerText={"درخواست تسهیلات جدید"}>
      <header className={"text-center p-4"}>
        <h1 className={"text-lg font-bold text-gray-800"}>مراحل دریافت تسهیلات بانکی</h1>
      </header>
      <section className={"w-full p-4"}>
        <article>
          <ol className={"flex flex-col gap-3"}>
            <li className={"flex flex-row gap-2 items-center text-gray-700"}>
              <div className={"border rounded bg-blue-50 p-1"}>
                <PiBankDuotone size={28} />
              </div>
              <span>انتخاب نوع و مبلغ تسهیلات</span>
            </li>
            <li className={"flex flex-row gap-2 items-center text-gray-700"}>
              <div className={"border rounded bg-blue-50 p-1"}>
                <PiUser size={28} />
              </div>
              <span>وارد کردن اطلاعات مربوط به متقاضی (نام، نام خانوادگی، کد ملی، تاریخ تولد، شماره تماس)</span>
            </li>
            <li className={"flex flex-row gap-2 items-center text-gray-700"}>
              <div className={"border rounded bg-blue-50 p-1"}>
                <PiCardholderDuotone size={28} />
              </div>
              <span>وارد کردن اطلاعات بانکی (شماره حساب، شماره شبا، میانگین ریالی موجودی سالیانه)</span>
            </li>
            <li className={"flex flex-row gap-2 items-center text-gray-700"}>
              <div className={"border rounded bg-blue-50 p-1"}>
                <PiCoinsDuotone size={28} />
              </div>
              <span>انتخاب مدت زمان بازپرداخت و محاسبه آن‌ها طبق فرمول مربوطه (مبلغ، مدت زمان بازپرداخت، تعداد اقساط، مبلغ قسط ماهیانه، درصد سود سالیانه، مبلغ جریمه دیرکرد)</span>
            </li>
            <li className={"flex flex-row gap-2 items-center text-gray-700"}>
              <div className={"border rounded bg-blue-50 p-1"}>
                <PiHandCoinsDuotone size={28} />
              </div>
              <span>دریافت تسهیلات</span>
            </li>
          </ol>
        </article>
      </section>
      <section className={"flex"}>
        <Link href={"#"} className={"ms-auto bg-blue-950 py-2 px-4 rounded text-white"}>شروع درخواست</Link>
      </section>
    </SiteLayout>
  );
}
