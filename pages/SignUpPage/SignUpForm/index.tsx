"use client";

import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import React from "react";
import { email, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/shared/components/InputField";
import { PasswordField } from "@/shared/components/PasswordField";
import Link from "next/link";

const profileFormSchema = z.object({
  name: z.string().nonempty("Name is required."),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email address."),
  password: z.string().nonempty("Password is required."),
  repeatPassword: z.string().nonempty("Please confirm your password."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const SignUpForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  function onSubmit(data: ProfileFormValues) {
    // ... (logic onSubmit)
  }

  return (
    <div className="flex flex-col space-y-6 min-h-screen justify-center ">
      {/* heading  */}
      <Heading className="text-[#10069d]">Sign Up</Heading>

      {/* login by google */}
      <Button className="bg-white text-black space-y-2">
        {/* logo  */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
          alt=""
          className="w-4 h-4"
        />
        Login with Google
      </Button>

      {/* or continute with */}
      <div className="flex justify-around items-center space-x-4">
        <div className="border-1 w-[90px] h-[1px] border-black/30" />
        <Text>Or signup with your email</Text>
        <div className="border-1 w-[90px] h-[1px] border-black/30" />
      </div>

      {/* signup form  */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* name */}
          <InputField
            control={form.control}
            name="name"
            label="Display Name"
            placeholder="Enter your display name"
          />

          {/* email */}
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          {/* password */}
          <PasswordField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          {/* conform password */}
          <PasswordField
            control={form.control}
            name="repeatPassword"
            label="Confirm Password"
            placeholder="Enter your confirm password"
          />

          {/* signup button */}
          <Button className="w-full bg-[#10069d]" type="submit">
            Sign Up
          </Button>

          {/* terms */}
          <Text className="text-center text-sm text-gray-600">
            By signing up to create an account, you agree to our's{" "}
            <Link
              href={"/terms"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10069d] font-semibold hover:underline"
            >
              terms and conditions
            </Link>
          </Text>

          {/* sign up */}
          <Text className="text-center">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-[#10069d] font-semibold hover:underline"
            >
              Login
            </Link>
          </Text>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
