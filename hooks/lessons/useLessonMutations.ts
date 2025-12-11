"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import lessonApis from "@/shared/apis/lessonApis";

// Hook thêm bài học
export const useAddLesson = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; courseId: string }) => {
      // Gọi API tạo bài học (Giả sử API cần courseId và title, các trường khác default)
      return lessonApis.createLesson({
        ...data,
        content: "",
        videoUrl: "",
        resources: [],
        order: 99, // Backend nên tự handle order
        duration: 10,
      });
    },
    onSuccess: () => {
      toast.success("Thêm bài học thành công!");
      // Invalidate để fetch lại list bài học mới nhất
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Thêm thất bại");
    },
  });
};

// Hook cập nhật bài học
export const useUpdateLesson = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lessonId,
      dataToUpdate,
    }: {
      lessonId: string;
      dataToUpdate: any;
    }) => {
      return lessonApis.updateLesson({ lessonId, dataToUpdate });
    },
    onSuccess: () => {
      toast.success("Đã lưu thay đổi!");
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Cập nhật thất bại");
    },
  });
};

// Hook xóa bài học
export const useDeleteLesson = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonId: string) => {
      return lessonApis.deleteLesson({ lessonId });
    },
    onSuccess: () => {
      toast.success("Đã xóa bài học");
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Xóa thất bại");
    },
  });
};
