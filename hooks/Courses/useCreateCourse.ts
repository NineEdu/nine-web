"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // Đã đổi sang react-hot-toast
import { courseService } from "@/services/courseServices";

// Key chung khớp với hook useGetCourses
const COURSE_QUERY_KEY = ["courses"];

export const useCreateCourse = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    // 1. Hàm gọi API (Service)
    mutationFn: courseService.create,

    // 2. Xử lý khi thành công
    onSuccess: (data: any) => {
      // Làm mới cache danh sách
      queryClient.invalidateQueries({
        queryKey: [...COURSE_QUERY_KEY, "list"],
      });

      // Hiện thông báo (react-hot-toast style)
      toast.success("Khởi tạo khóa học thành công! Đang chuyển hướng...", {
        duration: 3000,
        position: "top-center",
      });

      // Chuyển hướng sang trang Step 2 (Content)
      if (data?._id) {
        router.push(`/admin/courses/${data._id}/content`);
      }
    },

    // 3. Xử lý khi thất bại
    onError: (error: any) => {
      // Lấy message lỗi từ Backend
      const errorMessage =
        error?.response?.data?.message || "Có lỗi xảy ra khi tạo khóa học.";

      toast.error(errorMessage, {
        duration: 4000,
        position: "top-center",
      });

      console.error("Create Course Error:", error);
    },
  });
};
