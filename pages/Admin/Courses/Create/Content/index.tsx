"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Video,
  FileText,
  Trash2,
  GripVertical,
  CheckCircle2,
  Clock,
  MonitorPlay,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/Text";

// Interface Lesson giả lập theo API
interface Lesson {
  id: string;
  title: string;
  duration: string; // "10:00"
  videoUrl: string;
  isPublished: boolean;
  hasQuiz: boolean;
}

export default function CourseContentPage() {
  const router = useRouter();
  const params = useParams();
  //   const courseId = params.id; // Lấy ID khóa học từ URL

  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([
    // Mock data bài học có sẵn
    {
      id: "1",
      title: "Introduction to the Course",
      duration: "05:20",
      videoUrl: "https://youtu.be/...",
      isPublished: true,
      hasQuiz: false,
    },
    {
      id: "2",
      title: "Setup Environment",
      duration: "15:00",
      videoUrl: "",
      isPublished: false,
      hasQuiz: true,
    },
  ]);

  // State cho bài học mới đang nhập
  const [newLessonTitle, setNewLessonTitle] = useState("");

  // Hàm thêm bài học mới (Gọi API POST /api/lessons)
  const handleAddLesson = () => {
    if (!newLessonTitle.trim()) return;

    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: newLessonTitle,
      duration: "00:00",
      videoUrl: "",
      isPublished: false,
      hasQuiz: false,
    };

    setLessons([...lessons, newLesson]);
    setNewLessonTitle("");
    // TODO: Call API createLesson({ courseId, title: newLessonTitle })
  };

  // Hàm xóa bài học
  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id));
    // TODO: Call API deleteLesson(id)
  };

  const handleFinish = async () => {
    setIsLoading(true);
    // Giả lập lưu
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/admin/courses"); // Xong thì về danh sách
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* 0. HEADER (Giống trang trước) */}
      <header className="sticky top-0 z-40 w-full border-b bg-white px-6 h-16 flex items-center text-center justify-center">
        <Text className=" text-center font-bold">Setup Course</Text>
      </header>

      {/* 1. TITLE CENTER */}
      <div className="py-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Curriculum & Content
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage lessons, videos and quizzes for this course.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- CỘT TRÁI: THÔNG TIN KHÓA HỌC (TÓM TẮT) --- */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardContent className="p-6">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 block">
                  Course Summary
                </Label>

                {/* Thumbnail Preview */}
                <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden mb-4 relative">
                  {/* Giả lập ảnh course */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <MonitorPlay className="h-10 w-10 opacity-50" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  ReactJS Masterclass 2024
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  Learn ReactJS from scratch with hands-on projects and
                  examples...
                </p>

                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50"
                  >
                    Web Dev
                  </Badge>
                  <Badge variant="outline" className="text-slate-500">
                    20 Sections
                  </Badge>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    Instructor
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    Quốc Dev
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200 bg-indigo-600 text-white">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">Tips for Content</h4>
                <ul className="text-sm text-indigo-100 space-y-2 list-disc pl-4">
                  <li>Keep videos under 10 minutes for better engagement.</li>
                  <li>Add a quiz after every major section.</li>
                  <li>
                    Upload resources (PDF, Code) for students to download.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* --- CỘT PHẢI: QUẢN LÝ BÀI HỌC --- */}
          <div className="lg:col-span-8">
            <Card className="shadow-sm border-slate-200 min-h-[500px]">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Lessons ({lessons.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    Expand All
                  </Button>
                </div>

                {/* DANH SÁCH BÀI HỌC (ACCORDION) */}
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {lessons.map((lesson, index) => (
                    <AccordionItem
                      key={lesson.id}
                      value={lesson.id}
                      className="border border-slate-200 rounded-xl px-4 data-[state=open]:border-indigo-600 data-[state=open]:ring-1 data-[state=open]:ring-indigo-600 transition-all bg-white"
                    >
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-3 w-full pr-4">
                          <div className="cursor-move text-slate-300 hover:text-slate-600">
                            <GripVertical className="h-5 w-5" />
                          </div>
                          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                            {index + 1}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-slate-900">
                              {lesson.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-slate-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />{" "}
                                {lesson.duration}
                              </span>
                              {lesson.hasQuiz && (
                                <Badge
                                  variant="outline"
                                  className="h-4 text-[9px] px-1 border-orange-200 text-orange-600 bg-orange-50"
                                >
                                  Quiz
                                </Badge>
                              )}
                            </div>
                          </div>
                          {/* Status Indicator */}
                          <div
                            className={`h-2 w-2 rounded-full ${
                              lesson.isPublished
                                ? "bg-green-500"
                                : "bg-slate-300"
                            }`}
                          ></div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-4 pt-2 border-t border-slate-100 mt-2">
                        <div className="space-y-4 pl-11">
                          {/* 1. Edit Title & Description */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase">
                              Lesson Title
                            </Label>
                            <Input
                              defaultValue={lesson.title}
                              className="h-10 border-slate-200"
                            />
                          </div>

                          {/* 2. Video URL */}
                          <div className="space-y-2">
                            <Label className="text-xs font-bold text-slate-500 uppercase">
                              Video URL (Youtube/Vimeo)
                            </Label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <Video className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                  defaultValue={lesson.videoUrl}
                                  placeholder="https://..."
                                  className="pl-9 h-10 border-slate-200"
                                />
                              </div>
                              <Button
                                variant="outline"
                                className="h-10 text-slate-600"
                              >
                                Preview
                              </Button>
                            </div>
                          </div>

                          {/* 3. Actions Row */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs border-dashed border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600"
                              >
                                <FileText className="mr-1.5 h-3 w-3" /> Add
                                Resources
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs border-dashed border-slate-300 text-slate-600 hover:border-orange-500 hover:text-orange-600"
                              >
                                <HelpCircle className="mr-1.5 h-3 w-3" />{" "}
                                {lesson.hasQuiz ? "Edit Quiz" : "Add Quiz"}
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2 mr-4">
                                <Switch
                                  id={`publish-${lesson.id}`}
                                  checked={lesson.isPublished}
                                />
                                <Label
                                  htmlFor={`publish-${lesson.id}`}
                                  className="text-xs text-slate-600"
                                >
                                  Publish
                                </Label>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteLesson(lesson.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* ADD NEW LESSON INPUT */}
                <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-indigo-400 group-hover:text-indigo-500">
                      <Plus className="h-4 w-4" />
                    </div>
                    <Input
                      placeholder="Enter new lesson title..."
                      className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 h-10 placeholder:text-slate-400 text-slate-900 font-medium"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddLesson()}
                    />
                    <Button
                      onClick={handleAddLesson}
                      size="sm"
                      disabled={!newLessonTitle}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
                    >
                      Add Lesson
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 3. FOOTER BAR (Fixed Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="rounded-full px-8 h-12 border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
          >
            Back
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <div className="h-2 w-12 bg-green-400 rounded-full"></div>
            <div className="h-2 w-12 bg-green-400 rounded-full"></div>
            <span className="text-xs font-bold text-slate-500 ml-2 uppercase tracking-wide">
              Step 2 of 2
            </span>
          </div>

          <Button
            onClick={handleFinish}
            disabled={isLoading}
            className="rounded-full px-10 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5" /> Finish & Publish
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
