//@ts-nocheck

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import courseApis from "@/shared/apis/courseApis";

const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bodyPayload) => {
      return courseApis.createCourse(bodyPayload);
    },

    onSuccess: (data) => {
      toast.success("Tạo khóa học thành công!");
      queryClient.invalidateQueries({ queryKey: ["getCourses"] });
    },

    onError: (error) => {
      const msg = error?.response?.data?.message || "Tạo thất bại";

      toast.error(msg);
    },
  });
};

export default useCreateCourse;
