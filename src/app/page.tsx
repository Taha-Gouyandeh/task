import { SiteLayout } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <SiteLayout>
      <section className={'flex flex-row flex-wrap w-full p-4'}>
        <div className={'w-full md:w-1/2 p-2 flex'}>
          <Link href={'/'} className={'w-full shadow p-6 rounded-lg text-center bg-blue-50'}>
            <span className={'text-gray-700'}>درخواست تسهیلات جدید</span>
          </Link>
        </div>
        <div className={'w-full md:w-1/2 p-2 flex'}>
          <Link href={'/'} className={'w-full shadow p-6 rounded-lg text-center bg-blue-50'}>
            <span className={'text-gray-700'}>تسهیلات های فعال من</span>
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
