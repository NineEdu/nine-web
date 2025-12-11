"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  PlayCircle,
  HelpCircle,
  Award,
  Calendar,
  Users,
  Share2,
  Heart,
  Layers,
  MonitorPlay,
  Loader2,
} from "lucide-react";

// --- Hooks & APIs ---
import useGetCourseById from "@/hooks/courses/useGetCourseById";

// --- Shadcn UI Components ---
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/useAuth";
import useModal from "@/modals/useModal";
import NotiLogin from "@/shared/modals/NotiLogin";
import useEnrollCourse from "@/hooks/courses/useEnrollCourse";

// --- Helper Functions ---

// 1. Format Currency
const formatCurrency = (amount: number) => {
  if (amount === 0) return "Free";
  // Keeping vi-VN for currency formatting to ensure correct VND display (dots vs commas)
  // even if the UI text is English.
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

// 2. Format Duration (Seconds -> Minutes:Seconds)
const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
};

const CourseDetail = () => {
  // --- 1. Get ID from URL ---
  const params = useParams();
  // @ts-ignore
  const rawId = params?.courseId;
  const courseId = typeof rawId === "string" ? rawId : "";
  const { data: user } = useCurrentUser();

  const { show: showMessageNotiUserLogin } = useModal(NotiLogin);

  // --- 2. UI State ---
  const [isExpanded, setIsExpanded] = useState(false); // For Show More description

  // --- 3. Call API ---
  const {
    data: course,
    isLoading,
    error,
  } = useGetCourseById({
    queryKey: ["course", courseId],
    queryParams: {
      courseId: courseId,
    },
  });

  //@ts-ignore
  const { enrollCourse } = useEnrollCourse();

  const onEnrollCourse = () => {
    if (!courseId) return;
    if (!user) {
      showMessageNotiUserLogin();
      return;
    }
    enrollCourse({ courseId });
  };

  // --- 4. Handle Loading / Error ---
  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: Course ID not found in URL.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-800" />
        <p className="text-gray-500">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Course data not found or API error.
      </div>
    );
  }

  // --- 5. Calculate Display Data ---
  const lessons = course.lessons || [];
  const totalDuration = lessons.reduce(
    (acc: number, cur: any) => acc + (cur.duration || 0),
    0
  );
  const totalVideos = lessons.length; // Assuming 1 video per lesson

  return (
    <div className="min-h-screen py-12 font-sans">
      {/* ================= MAIN CONTENT GRID ================= */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN (Main Content) --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header / Hero Section (Integrated into Left Column like design) */}
            <div className="mx-auto p-6 bg-[#020080] rounded-xl text-white shadow-lg">
              <div className="max-w-4xl">
                <h1 className="text-3xl md:text-2xl font-bold mb-4 leading-tight">
                  {course.title}
                </h1>
                <p className="text-base text-blue-100 mb-6 line-clamp-2 font-medium">
                  {course.description}
                </p>

                {/* Metadata Badges */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Badge
                    variant="secondary"
                    className="bg-blue-800/50 hover:bg-blue-700 text-blue-100 border-none px-3 py-1 flex items-center font-normal"
                  >
                    <Layers className="w-4 h-4 mr-2" />
                    {course.level || "Beginner"}
                  </Badge>

                  <div className="flex items-center gap-2 text-blue-100">
                    <Users className="w-4 h-4" />
                    <span>{course.learners || 120} Learners</span>
                  </div>

                  <div className="hidden md:block h-4 w-[1px] bg-blue-700/50"></div>

                  <div className="flex items-center gap-2">
                    <span className="text-blue-200">Educator:</span>
                    <div className="flex items-center gap-2 font-medium text-white">
                      <Avatar className="w-6 h-6 border border-white/20">
                        <AvatarImage src={course.instructorId?.avatar} />
                        <AvatarFallback>GV</AvatarFallback>
                      </Avatar>
                      <span className="underline underline-offset-2">
                        {course.instructorId?.fullName || "Admin"}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block h-4 w-[1px] bg-blue-700/50"></div>

                  <div className="flex items-center gap-2 text-blue-200">
                    <Calendar className="w-4 h-4" />
                    <span>Last updated {new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 1. Description */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Details To Know
              </h2>
              <div className="relative">
                <p
                  className={`text-gray-700 leading-relaxed whitespace-pre-line ${
                    !isExpanded ? "line-clamp-3" : ""
                  }`}
                >
                  {course.description}
                  {/* Mock text for longer description if needed */}
                  <br />
                  <br />
                  This course is designed for those who want to master
                  foundational knowledge in a structured way. Through practical
                  lessons, you will understand how the technology operates and
                  how to apply it to real-world projects. From Idea to MVP,
                  supported by experienced mentors.
                </p>
                <Button
                  variant="link"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-600 font-medium p-0 h-auto mt-2 hover:no-underline"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              </div>
            </div>

            {/* 2. Educator Info */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Educator & Collabs
              </h2>
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 border border-gray-100">
                  <AvatarImage src={course.instructorId?.avatar} />
                  <AvatarFallback>GV</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {course.instructorId?.fullName}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-600 mt-1">
                    <span>
                      <strong className="text-gray-900">15</strong> Followers
                    </span>
                    <span>
                      <strong className="text-gray-900">12</strong> Courses
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Programming expert with years of experience in the{" "}
                    {course.category} field.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Course Content (Accordion) */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Course Content
              </h2>

              <div className="text-sm text-gray-500 mb-4 flex gap-2">
                <span>• {lessons.length} lessons</span>
                <span>
                  • Duration: {Math.floor(totalDuration / 60)} minutes
                </span>
              </div>

              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue="section-1"
              >
                {/* Wrapping flat list into one section for now */}
                <AccordionItem
                  value="section-1"
                  className="border rounded-lg overflow-hidden mb-2"
                >
                  <AccordionTrigger className="hover:no-underline bg-gray-50/80 px-4 py-4 data-[state=open]:bg-gray-100">
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">
                        Course Curriculum
                      </div>
                      <div className="text-xs text-gray-500 font-normal mt-1">
                        {lessons.length} lessons
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0 bg-white">
                    <div className="divide-y">
                      {lessons.length > 0 ? (
                        lessons.map((lesson: any, index: number) => (
                          <div
                            key={lesson._id}
                            className="flex items-center gap-3 text-sm text-gray-700 p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                          >
                            <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-600 shrink-0" />
                            <span className="flex-1 font-medium">
                              {lesson.title}
                            </span>
                            <span className="text-xs text-gray-400 shrink-0">
                              {formatDuration(lesson.duration)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No lessons updated yet.
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* --- RIGHT COLUMN (Sticky Sidebar) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card className="shadow-lg overflow-hidden border-0 ring-1 ring-gray-200 rounded-xl !p-0">
                {/* Thumbnail */}
                <div className="relative w-full aspect-video bg-gray-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <CardContent className="p-6">
                  {/* Includes List */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-bold text-gray-900 text-sm">
                      This Course Includes:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-gray-600 text-sm">
                        <MonitorPlay className="w-4 h-4 text-gray-400" />
                        {totalVideos} video lectures
                      </li>
                      <li className="flex items-center gap-3 text-gray-600 text-sm">
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                        Practice exercises
                      </li>
                      <li className="flex items-center gap-3 text-gray-600 text-sm">
                        <Layers className="w-4 h-4 text-gray-400" />
                        Full lifetime access
                      </li>
                      <li className="flex items-center gap-3 text-gray-600 text-sm">
                        <Award className="w-4 h-4 text-gray-400" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>

                  <Separator className="my-4" />

                  {/* Price */}
                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatCurrency(course.price)}
                    </span>
                    {course.price > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatCurrency(course.price * 1.5)}{" "}
                        {/* Fake original price for discount effect */}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-[#020080] hover:bg-blue-900 text-white font-bold py-6 text-base shadow-sm transition-all"
                      onClick={onEnrollCourse}
                    >
                      Enroll now
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-700"
                      >
                        <Heart className="w-4 h-4 mr-2" /> Save
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-700"
                      >
                        <Share2 className="w-4 h-4 mr-2" /> Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
