"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Loader2, Bell } from "lucide-react";

// --- SHADCN UI IMPORTS ---
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Text } from "@/components/Text";

// --- CUSTOM COMPONENTS ---
import { InputField } from "@/shared/components/InputField";
import { MultiSelectV2 } from "@/shared/components/MutiSelectV2";

// --- HOOKS API ---
import { UploadV2 } from "@/shared/components/UploadV2";
import { useCurrentUser } from "@/hooks/useAuth";
import CourseSummary from "@/components/CourseSummary";
// import { useUpdateCourse } from "@/hooks/courses/useUpdateCourse";

// 1. ĐỊNH NGHĨA SCHEMA
const formSchema = z.object({
  title: z.string().min(1, { message: "Course Title is required" }).max(255),
  description: z.string().max(5000).optional(),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number" }),
  category: z
    .array(z.string())
    .min(1, { message: "Select at least one category" }),
  tags: z.array(z.string()).min(1, { message: "Select at least one tag" }),
  thumbnail: z.string().optional(),
  isPublished: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof formSchema>;

const CATEGORY_OPTIONS = [
  { label: "Web Development", value: "Web Development" },
  { label: "Backend", value: "Backend" },
  { label: "Mobile App", value: "Mobile App" },
  { label: "Data Science", value: "Data Science" },
  { label: "Design", value: "Design" },
];

const TAG_OPTIONS = [
  { label: "ReactJS", value: "ReactJS" },
  { label: "NextJS", value: "NextJS" },
  { label: "TailwindCSS", value: "TailwindCSS" },
  { label: "NodeJS", value: "NodeJS" },
  { label: "MongoDB", value: "MongoDB" },
  { label: "TypeScript", value: "TypeScript" },
];

interface CourseFormProps {
  initialData?: any;
  titlePage?: string;
}

export default function CourseForm({
  initialData,
  titlePage = "Create Course",
}: CourseFormProps) {
  // router
  const router = useRouter();

  //useAuth
  const { data: user } = useCurrentUser();

  // use create courses
  // const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  // loading
  // const isLoading = isCreating;

  // form
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema) as any, // Ép kiểu tạm thời nếu zodResolver gây lỗi type
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category ? [initialData.category] : [],
      tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
      thumbnail: initialData?.thumbnail || "",
      isPublished: initialData?.isPublished || false,
    },
  });

  // --- HANDLER ---
  const onSubmit = (values: CourseFormValues) => {
    const payload = {
      ...values,
      category: values.category[0],
    };

    if (initialData) {
      console.log("Update payload:", payload);
    } else {
      // createCourse(payload);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white px-6 h-16 flex items-center text-center justify-center">
        <Text className=" text-center font-bold">Create Course</Text>
      </header>

      {/* content */}
      <div className="max-w-7xl mx-auto p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* --- LEFT COLUMN --- */}
            <div className="lg:col-span-5 space-y-6 flex flex-col ">
              {/* Instructor Card */}
              <Card className="shadow-sm border-slate-200">
                <CardContent className="p-6">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">
                    Instructor Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white shadow-sm">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>QD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {user?.fullName}
                        </p>
                        <p className="text-xs text-slate-500">That's you!</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="text-indigo-600 font-semibold hover:text-indigo-700 hover:bg-indigo-50"
                    >
                      Change
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnail Upload Card (Dùng UploadV2) */}

              <UploadV2
                control={form.control}
                name="thumbnail"
                description="Supported formats: JPG, PNG, WEBP (Max 5MB)"
                accept="image/png, image/jpeg, image/webp"
                maxSize={5}
                className="h-full flex flex-col" // Để UploadV2 chiếm hết chiều cao
              />

              {/* preview */}
              <div className="space-y-2 flex justify-center flex-col  items-center">
                <Text className="font-bold">Preview</Text>
                {/* <CourseSummary  key={"tt"} /> */}
              </div>
            </div>

            {/* --- RIGHT COLUMN --- */}
            <div className="lg:col-span-7">
              <Card className="shadow-sm border-slate-200 h-full">
                <CardContent className="p-8 space-y-8">
                  <div className="mb-2">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Course Details
                    </h2>
                  </div>

                  {/* 1. TITLE */}
                  <InputField
                    control={form.control}
                    name="title"
                    label="Course Title"
                    placeholder="Enter course title"
                    description="0/255 characters"
                  />

                  {/* 2. DESCRIPTION */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your course content..."
                            className="min-h-[140px] resize-none border-slate-200 focus-visible:ring-indigo-600 rounded-lg text-base p-4"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-right">
                          0/5000 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 3. CATEGORY & PRICE */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MultiSelectV2
                      control={form.control}
                      name="category"
                      label="Category"
                      options={CATEGORY_OPTIONS}
                      placeholder="Select category..."
                    />

                    <InputField
                      control={form.control}
                      name="price"
                      label="Price (VND)"
                      type="number"
                      placeholder="e.g. 500,000"
                    />
                  </div>

                  {/* 4. TAGS & VISIBILITY */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <MultiSelectV2
                      control={form.control}
                      name="tags"
                      label="Tags"
                      options={TAG_OPTIONS}
                      placeholder="Select tags..."
                      searchPlaceholder="Search tags..."
                    />

                    <FormField
                      control={form.control}
                      name="isPublished"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-3 pt-1">
                          <FormLabel>Visibility</FormLabel>
                          <div className="flex items-center gap-3 h-10">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <span className="font-medium text-slate-700 cursor-pointer">
                              {field.value
                                ? "Public (Visible)"
                                : "Draft (Private)"}
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FOOTER BAR */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50">
              <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="rounded-full border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </Button>

                <div className="hidden md:flex items-center gap-2">
                  <div className="h-2 w-12 bg-green-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-wide">
                    Step 1 of 2
                  </span>
                </div>

                <Button
                  type="submit"
                  // disabled={isLoading}
                  className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  {false ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
