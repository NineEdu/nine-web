"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- SHADCN UI IMPORTS ---
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
import { Button } from "@/components/ui/button";

// --- CUSTOM COMPONENTS ---
// Giả định bạn đã có các component này như trong code cũ của bạn
import { InputField } from "@/shared/components/InputField";
import { MultiSelectV2 } from "@/shared/components/MutiSelectV2";
import { UploadV2 } from "@/shared/components/UploadV2";
import CourseSummary from "@/components/CourseSummary";
import { useCurrentUser } from "@/hooks/useAuth"; // Nếu chưa có thì comment lại

// --- 1. CONSTANTS & SCHEMA ---

const CATEGORY_OPTIONS = [
  { label: "Frontend Development", value: "Frontend" },
  { label: "Backend Development", value: "Backend" },
  { label: "Fullstack", value: "Fullstack" },
  { label: "DevOps", value: "DevOps" },
  { label: "Mobile App", value: "Mobile" },
];

const TAG_OPTIONS = [
  { label: "ReactJS", value: "ReactJS" },
  { label: "NextJS", value: "NextJS" },
  { label: "NodeJS", value: "NodeJS" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "TailwindCSS", value: "TailwindCSS" },
];

const formSchema = z.object({
  title: z.string().min(1, { message: "Tiêu đề không được để trống" }).max(255),
  description: z.string().max(5000).optional(),
  price: z.coerce.number().min(0, { message: "Giá phải là số dương" }),
  // Lưu ý: MultiSelect trả về mảng, nhưng nếu category chỉ chọn 1 thì vẫn để mảng rồi xử lý sau
  category: z.array(z.string()).min(1, { message: "Chọn ít nhất 1 danh mục" }),
  tags: z.array(z.string()).min(1, { message: "Chọn ít nhất 1 tag" }),
  thumbnail: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export type CourseFormValues = z.infer<typeof formSchema>;

// --- 2. PROPS INTERFACE ---
interface Step1Props {
  initialData?: Partial<CourseFormValues>;
  onNext: (data: CourseFormValues) => void;
}

const Step1: React.FC<Step1Props> = ({ initialData, onNext }) => {
  const { data: user } = useCurrentUser() || {
    user: { fullName: "Admin", avatar: "" },
  };

  // Setup Form
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || [],
      tags: initialData?.tags || [],
      thumbnail: initialData?.thumbnail || "",
      isPublished: initialData?.isPublished || false,
    },
  });

  // Watch values để làm Live Preview
  const watchedValues = form.watch();

  // Handle Submit (Chỉ gửi data ra ngoài, không gọi API ở đây)
  const onSubmit = (values: CourseFormValues) => {
    onNext(values);
  };

  return (
    <div className="max-w-7xl mx-auto p-0 md:p-6 pb-24">
      <Form {...form}>
        <form
          id="step1-form" // ID để trigger submit từ bên ngoài nếu cần
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* --- LEFT COLUMN (Profile, Upload, Preview) --- */}
          <div className="lg:col-span-5 space-y-6 flex flex-col">
            {/* 1. Instructor Card */}
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">
                  Giảng viên <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-white shadow-sm">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-slate-500">Chính là bạn</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Upload Thumbnail */}
            <div>
              <UploadV2
                control={form.control}
                name="thumbnail"
                label="Ảnh bìa khóa học"
                description="Hỗ trợ: JPG, PNG, WEBP (Tối đa 5MB)"
                maxSize={5}
                className="h-full"
              />
            </div>
          </div>

          {/* --- RIGHT COLUMN (Form Fields) --- */}
          <div className="lg:col-span-7">
            <Card className="shadow-sm border-slate-200 h-full">
              <CardContent className="p-8 space-y-8">
                <div className="mb-2 border-b pb-4">
                  <h2 className="text-lg font-bold text-slate-800">
                    Thông tin chi tiết
                  </h2>
                  <p className="text-sm text-slate-500">
                    Điền đầy đủ thông tin để thu hút học viên
                  </p>
                </div>

                {/* 1. TITLE */}
                <InputField
                  control={form.control}
                  name="title"
                  label="Tên khóa học"
                  placeholder="Ví dụ: ReactJS từ Zero đến Hero"
                  description="Tên khóa học nên ngắn gọn, gây ấn tượng."
                />

                {/* 2. DESCRIPTION */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả ngắn</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Mô tả nội dung chính của khóa học..."
                          className="min-h-[140px] resize-none border-slate-200 focus-visible:ring-indigo-600 rounded-lg text-base p-4"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-right text-xs">
                        {field.value?.length || 0}/5000 ký tự
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
                    label="Danh mục"
                    options={CATEGORY_OPTIONS}
                    placeholder="Chọn danh mục..."
                  />

                  <InputField
                    control={form.control}
                    name="price"
                    label="Giá bán (VND)"
                    type="number"
                    placeholder="VD: 500000"
                  />
                </div>

                {/* 4. TAGS & VISIBILITY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <MultiSelectV2
                    control={form.control}
                    name="tags"
                    label="Thẻ (Tags)"
                    options={TAG_OPTIONS}
                    placeholder="Chọn tags..."
                    searchPlaceholder="Tìm kiếm tags..."
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-3 pt-1">
                        <FormLabel>Trạng thái</FormLabel>
                        <div className="flex items-center gap-3 h-10 border rounded-lg px-3 bg-slate-50">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <span
                            className={`font-medium cursor-pointer ${
                              field.value ? "text-green-600" : "text-slate-500"
                            }`}
                          >
                            {field.value
                              ? "Công khai (Public)"
                              : "Nháp (Private)"}
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step1;
