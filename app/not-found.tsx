import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/shared/layouts/PublicLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <div className="relative w-full max-w-md aspect-[4/3] mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/not-found.jpg"
            alt="404 Not Found"
            className="object-cover hover:scale-105 transition-transform duration-500" // Hiệu ứng zoom nhẹ khi hover
          />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
          Oops! Không tìm thấy trang
        </h2>

        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Có vẻ như trang bạn đang tìm kiếm đã bị xóa hoặc đường dẫn không chính
          xác.
        </p>

        <Link href="/" className="mt-6">
          <Button variant={"outline"}>Quay về Trang chủ</Button>
        </Link>
      </div>
    </PublicLayout>
  );
}
