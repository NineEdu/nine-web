"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Users,
  BookOpen,
  Star,
  MoreHorizontal,
  Search,
  Filter,
  BarChart3,
  Clock,
  CheckCircle2,
  Mail,
  MoreVertical,
  FileEdit,
  Layers,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data cho chi tiết khóa học
const courseData = {
  id: "1",
  title: "ReactJS Masterclass 2024: From Zero to Hero",
  instructor: "Quốc Dev",
  category: "Web Development",
  status: "Published",
  totalStudents: 1250,
  rating: 4.8,
  totalRevenue: 250000000,
  lessonsCount: 42,
  lastUpdated: "2 days ago",
  students: [
    {
      id: 1,
      name: "Nguyen Van A",
      email: "vana@gmail.com",
      avatar: "",
      progress: 75,
      lastActive: "2 hours ago",
      status: "In Progress",
    },
    {
      id: 2,
      name: "Tran Thi B",
      email: "btran@gmail.com",
      avatar: "",
      progress: 100,
      lastActive: "1 day ago",
      status: "Completed",
    },
    {
      id: 3,
      name: "Le Van C",
      email: "cle@gmail.com",
      avatar: "",
      progress: 12,
      lastActive: "5 days ago",
      status: "In Progress",
    },
    {
      id: 4,
      name: "Pham Thi D",
      email: "dpham@gmail.com",
      avatar: "",
      progress: 45,
      lastActive: "3 hours ago",
      status: "In Progress",
    },
    {
      id: 5,
      name: "Hoang Van E",
      email: "ehoang@gmail.com",
      avatar: "",
      progress: 0,
      lastActive: "1 week ago",
      status: "Not Started",
    },
  ],
};

export default function CourseDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.id;

  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on search
  const filteredStudents = courseData.students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 0. HEADER */}
      <header className="sticky top-0 z-40 w-full border-b bg-white px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/admin/courses")}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-slate-500" />
          </Button>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Course Dashboard
            </span>
            <h1 className="text-sm font-bold text-slate-900 truncate max-w-[200px] md:max-w-md">
              {courseData.title}
            </h1>
          </div>
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 hover:bg-green-100 ml-2 hidden md:inline-flex"
          >
            {courseData.status}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          {/* Action Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex rounded-full border-slate-300"
            asChild
          >
            <Link href={`/admin/courses/edit/${courseId}`}>
              <FileEdit className="mr-2 h-4 w-4 text-slate-500" /> Edit Info
            </Link>
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            asChild
          >
            <Link href={`/admin/courses/${courseId}/content`}>
              <Layers className="mr-2 h-4 w-4" /> Edit Content
            </Link>
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* 1. STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Total Students
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {courseData.totalStudents}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Rating
                </p>
                <div className="flex items-center gap-1">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {courseData.rating}
                  </h3>
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mb-1" />
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Lessons
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {courseData.lessonsCount}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Revenue
                </p>
                <h3 className="text-2xl font-bold text-slate-900">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                    maximumSignificantDigits: 3,
                  }).format(courseData.totalRevenue)}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 2. TABS & CONTENT */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 rounded-full p-1 h-auto">
            <TabsTrigger
              value="students"
              className="rounded-full px-6 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              Students
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-full px-6 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-full px-6 py-2 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* TAB: STUDENTS LIST */}
          <TabsContent value="students" className="space-y-4">
            {/* Filters */}
            <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search students..."
                  className="pl-9 border-none bg-transparent focus-visible:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 pr-2">
                <Button variant="ghost" size="sm" className="text-slate-500">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-slate-300"
                >
                  Export CSV
                </Button>
              </div>
            </div>

            {/* Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="pl-6">Student Name</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-slate-50/50">
                      <TableCell className="pl-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-slate-100">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="bg-indigo-50 text-indigo-600 text-xs font-bold">
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {student.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="w-[30%]">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                student.progress === 100
                                  ? "bg-green-500"
                                  : "bg-indigo-600"
                              }`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-slate-600 w-8 text-right">
                            {student.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                                                border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold
                                                ${
                                                  student.status === "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : student.status ===
                                                      "In Progress"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-slate-100 text-slate-500"
                                                }
                                            `}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{student.lastActive}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                            >
                              <MoreVertical className="h-4 w-4 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="mr-2 h-4 w-4" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600 cursor-pointer">
                              Unenroll
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredStudents.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  No students found.
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="p-12 text-center border border-dashed border-slate-300 rounded-xl bg-slate-50">
              <p className="text-slate-500 font-medium">No reviews yet.</p>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="p-12 text-center border border-dashed border-slate-300 rounded-xl bg-slate-50">
              <p className="text-slate-500 font-medium">
                Analytics charts coming soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
