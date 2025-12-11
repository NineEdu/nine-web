"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useCreateCourse from "@/hooks/courses/useCreateCourse";
import { Text } from "@/components/Text";
import { Loader2, CheckCircle2 } from "lucide-react";
import { ConfirmModal } from "@/shared/modals/ConfirmModal";
import Step1, { CourseFormValues } from "./Step1"; // Import Type từ Step 1

const CreateCoursePage = () => {
  const router = useRouter();

  // -- State --
  const [step, setStep] = useState(1);
  const [createdCourseId, setCreatedCourseId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // -- Hook API --
  const { mutate, isPending } = useCreateCourse();

  // -- Handlers --

  const handleCancelClick = () => setShowConfirm(true);

  const onConfirmCancel = () => {
    setShowConfirm(false);
    router.back();
  };

  // --- QUAN TRỌNG: Hàm này nhận data từ Step 1 khi Validate thành công ---
  const onStep1Submit = (values: CourseFormValues) => {
    // 1. Chuẩn hóa dữ liệu trước khi gửi API
    const payload = {
      ...values,
      // API thường nhận category là string, nhưng MultiSelect trả về mảng
      category: values.category[0] || "Frontend",
      // Đảm bảo các field optional không bị undefined
      description: values.description || "",
      thumbnail: values.thumbnail || "",
    };

    console.log("Submitting Payload:", payload);

    // 2. Gọi API
    mutate(payload as any, {
      onSuccess: (data) => {
        console.log("Tạo xong, ID:", data._id);
        setCreatedCourseId(data._id);
        setStep(2); // Chuyển bước
      },
      onError: (err) => {
        console.error("Lỗi tạo khóa học:", err);
      },
    });
  };

  // Xử lý hoàn tất (Step 2)
  const handleFinish = () => {
    router.push(`/courses/${createdCourseId}`);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50/50 pb-24">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-white px-6 h-16 flex items-center text-center justify-center mb-6">
          <Text className="text-center font-bold text-lg">
            {step === 1 ? "Create Course" : "Setup Course Content"}
          </Text>
        </header>

        {/* Body Content */}

        {/* STEP 1 FORM */}
        {step === 1 && (
          <Step1
            onNext={onStep1Submit} // Truyền hàm xử lý submit xuống
            // initialData={...} // Truyền dữ liệu cũ nếu là edit
          />
        )}

        {/* STEP 2 UPLOAD */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h2 className="text-xl font-bold text-green-600">Thêm bài học</h2>
            <div className="p-4 bg-blue-50 text-blue-800 rounded text-sm border border-blue-100">
              Đang thêm nội dung cho ID: <strong>{createdCourseId}</strong>
            </div>

            <div className="h-64 bg-white rounded-xl border-dashed border-2 border-slate-300 flex flex-col items-center justify-center hover:bg-slate-50 transition cursor-pointer">
              <span className="text-slate-500 font-medium">
                Khu vực Upload Video/Tài liệu
              </span>
              <span className="text-xs text-slate-400 mt-2">
                (Component Upload Lesson sẽ đặt ở đây)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER ACTIONS --- */}

      {/* Footer Step 1 */}
      {step === 1 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelClick}
              className="rounded-full border-slate-300 font-bold text-slate-700 hover:bg-slate-50 px-6"
            >
              Cancel
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <div className="h-2 w-12 bg-indigo-600 rounded-full"></div>
              <div className="h-2 w-2 bg-slate-200 rounded-full"></div>
              <span className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-wide">
                Step 1 of 2
              </span>
            </div>

            {/* QUAN TRỌNG: Nút này kích hoạt form bên trong Step 1 */}
            <Button
              type="submit"
              form="step1-form" // <--- PHẢI KHỚP VỚI ID FORM BÊN STEP 1
              disabled={isPending}
              className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Footer Step 2 */}
      {step === 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="rounded-full px-8 h-10 border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
            >
              Back
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <div className="h-2 w-12 bg-green-500 rounded-full"></div>
              <div className="h-2 w-12 bg-green-500 rounded-full"></div>
              <span className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-wide">
                Step 2 of 2
              </span>
            </div>

            <Button
              onClick={handleFinish}
              className="rounded-full px-10 h-10 bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg shadow-green-200"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" /> Finish & Publish
            </Button>
          </div>
        </div>
      )}

      {/* --- MODAL CONFIRM --- */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={onConfirmCancel}
        loading={false}
        title="Cancel creation?"
        description="All unsaved progress will be lost."
        confirmText="Discard"
        cancelText="Stay"
        variant="destructive"
      />
    </>
  );
};

export default CreateCoursePage;
