"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { authService } from "@/services/authServices";

// Key cho React Query để cache user info
const CURRENT_USER_KEY = ["currentUser"];

/**
 * 1. HOOK ĐĂNG NHẬP
 * - Gọi API login
 * - Lưu token vào Cookie
 * - Lưu sơ bộ user info
 * - Chuyển hướng trang
 */
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data: any) => {
      if (data?.token) {
        // Lưu token vào Cookie (Hết hạn sau 7 ngày)
        Cookies.set("token", data.token, { expires: 7 });

        // Lưu thông tin user cơ bản (để dùng nhanh nếu chưa fetch kịp API /me)
        Cookies.set(
          "user",
          JSON.stringify({
            name: data.fullName,
            role: data.role,
            avatar: data.avatar,
          }),
          { expires: 7 }
        );
      }

      // Làm mới cache user để UI (Navbar) tự cập nhật avatar/tên
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_KEY });

      toast.success("Đăng nhập thành công!");

      // Chuyển hướng dựa trên Role (Admin vào trang quản trị, User về trang chủ)
      if (data?.role === "admin" || data?.role === "instructor") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Email hoặc mật khẩu không đúng.";
      toast.error(message);
    },
  });
};

/**
 * 2. HOOK ĐĂNG KÝ
 */
export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      router.push("/login");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Đăng ký thất bại.";
      toast.error(message);
    },
  });
};

/**
 * 3. HOOK LẤY USER HIỆN TẠI (Current User)
 * - Tự động chạy khi có Token trong Cookie
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: authService.getMe, // Gọi API /auth/me để lấy thông tin mới nhất
    // Chỉ fetch khi có token trong Cookie
    enabled: !!Cookies.get("token"),
    // Không retry nếu lỗi 401 (Unauthorized) -> Tránh vòng lặp vô tận
    retry: false,
    // Data được coi là "tươi" trong 5 phút
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * 4. HOOK ĐĂNG XUẤT (Logout)
 * - Xóa Cookie
 * - Xóa Cache
 * - Chuyển về trang Login
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    // 1. Xóa Cookie
    Cookies.remove("token");
    Cookies.remove("user");

    // 2. Xóa dữ liệu User trong Cache của React Query
    queryClient.setQueryData(CURRENT_USER_KEY, null);
    // Hoặc invalidate để đảm bảo sạch sẽ hoàn toàn
    queryClient.invalidateQueries({ queryKey: CURRENT_USER_KEY });

    toast.success("Đã đăng xuất");
    router.push("/login");
  };
};
