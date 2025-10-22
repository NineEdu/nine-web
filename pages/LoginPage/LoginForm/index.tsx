"use client";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/shared/components/InputField";
import { PasswordField } from "@/shared/components/PasswordField";
import { SelectV2 } from "@/shared/components/SelectV2";

const profileFormSchema = z.object({
  username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự."),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự."),
  framework: z.string().min(1, "Vui lòng chọn một framework."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const LoginForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      password: "",
      framework: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // ... (logic onSubmit)
  }

  return (
    <div>
      {/* heading  */}
      <Heading className="text-[#10069d]">Login</Heading>

      {/* login by google */}
      <Button>Login with Google</Button>

      <div className="flex justify-around items-center space-x-2 my-4">
        <div className="border-1 w-[90px] h-[1px] border-black/30" />
        <Text>Or continue with</Text>
        <div className="border-1 w-[90px] h-[1px] border-black/30" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* === SỬ DỤNG INPUT FIELD === */}
          <InputField
            control={form.control}
            name="username"
            label="Tên người dùng"
            placeholder="vinh_nguyen"
          />

          {/* === SỬ DỤNG PASSWORD FIELD === */}
          <PasswordField
            control={form.control}
            name="password"
            label="Mật khẩu"
            placeholder="••••••••"
            description="Mật khẩu phải dài ít nhất 8 ký tự."
          />

          {/* === SỬ DỤNG SELECT V2 === */}
          <SelectV2
            control={form.control}
            name="framework"
            label="Framework"
            placeholder="Chọn một framework..."
            options={[]}
          />

          <Button type="submit">Gửi</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
