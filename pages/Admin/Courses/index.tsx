"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Plus,
  Search,
  Filter,
  BookOpen,
  CheckCircle,
  FileText,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Nếu chưa có component Card thì dùng div với class border

// Interface mô phỏng dữ liệu từ API
interface Course {
  _id: string;
  title: string;
  instructorId: {
    fullName: string;
    avatar: string;
  };
  price: number;
  isPublished: boolean;
  category: string;
  createdAt: string;
}

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // State cho Delete Dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 1. Fetch dữ liệu từ API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Mock Data
        const mockData = [
          {
            _id: "1",
            title: "ReactJS từ cơ bản đến nâng cao",
            instructorId: { fullName: "Quốc Dev", avatar: "" },
            price: 500000,
            isPublished: true,
            category: "Web Development",
            createdAt: "2025-11-20",
          },
          {
            _id: "2",
            title: "NodeJS & Express Masterclass",
            instructorId: { fullName: "Souta", avatar: "" },
            price: 0,
            isPublished: false,
            category: "Backend",
            createdAt: "2025-11-25",
          },
          {
            _id: "3",
            title: "UI/UX Design for Beginners",
            instructorId: { fullName: "Design Team", avatar: "" },
            price: 1200000,
            isPublished: true,
            category: "Design",
            createdAt: "2025-12-01",
          },
        ];
        setCourses(mockData);
      } catch (error) {
        console.error("Lỗi fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // 2. Xử lý xóa khóa học
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      console.log("Đang xóa course ID:", deleteId);
      setCourses(courses.filter((c) => c._id !== deleteId));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Xóa thất bại", error);
    }
  };

  // 3. Filter tìm kiếm
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructorId.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Helper format tiền tệ
  const formatCurrency = (amount: number) => {
    return amount === 0
      ? "Miễn phí"
      : new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
  };

  // --- TÍNH TOÁN THỐNG KÊ (NEW) ---
  const totalCourses = courses.length;
  const publishedCourses = courses.filter((c) => c.isPublished).length;
  const draftCourses = totalCourses - publishedCourses;
  // Giả sử tính tổng giá trị các khóa học (hoặc doanh thu giả định)
  const totalValue = courses.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* HEADER: Tiêu đề + Nút tạo mới */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Quản lý khóa học
          </h1>
          <p className="text-muted-foreground text-sm">
            Tổng quan và quản lý tất cả các khóa học trên hệ thống NineEdu.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
        >
          <Link href="/admin/courses/create">
            <Plus className="mr-2 h-4 w-4" /> Tạo khóa học mới
          </Link>
        </Button>
      </div>

      {/* --- SECTION 1: THỐNG KÊ (OVERVIEW) --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Tổng số */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">
              Tổng khóa học
            </h3>
            <BookOpen className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {totalCourses}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            +2 khóa mới trong tháng này
          </p>
        </div>

        {/* Card 2: Đang hoạt động */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">
              Đang hoạt động
            </h3>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {publishedCourses}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Hiển thị công khai trên web
          </p>
        </div>

        {/* Card 3: Bản nháp */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">
              Bản nháp (Draft)
            </h3>
            <FileText className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {draftCourses}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Cần chỉnh sửa thêm
          </p>
        </div>

        {/* Card 4: Tổng giá trị */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium text-slate-500">
              Tổng giá trị niêm yết
            </h3>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {formatCurrency(totalValue)}
          </div>
          <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
            <TrendingUp className="h-3 w-3 mr-1" /> +12% so với tháng trước
          </p>
        </div>
      </div>

      {/* --- SECTION 2: DANH SÁCH KHÓA HỌC --- */}
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Tìm kiếm theo tên khóa học, giảng viên..."
              className="pl-9 border-none bg-transparent focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
          <Button variant="ghost" size="sm" className="text-slate-600">
            <Filter className="h-4 w-4 mr-2" /> Bộ lọc
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[80px] pl-6">Ảnh</TableHead>
                <TableHead className="w-[300px]">Thông tin khóa học</TableHead>
                <TableHead>Giảng viên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Học phí</TableHead>
                <TableHead className="w-[50px] pr-6"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course._id} className="hover:bg-slate-50/50">
                  {/* 1. Ảnh thumbnail */}
                  <TableCell className="pl-6 py-4">
                    <div className="h-12 w-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-medium">
                        IMG
                      </div>
                    </div>
                  </TableCell>

                  {/* 2. Tên & Category */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div
                        className="font-semibold text-slate-900 truncate max-w-[280px]"
                        title={course.title}
                      >
                        {course.title}
                      </div>
                      <Badge
                        variant="outline"
                        className="w-fit text-[10px] h-5 font-normal text-slate-500 border-slate-200"
                      >
                        {course.category}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* 3. Giảng viên */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-slate-100">
                        <AvatarImage src={course.instructorId.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {course.instructorId.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700">
                        {course.instructorId.fullName}
                      </span>
                    </div>
                  </TableCell>

                  {/* 4. Trạng thái Badge */}
                  <TableCell>
                    <Badge
                      variant={course.isPublished ? "default" : "secondary"}
                      className={
                        course.isPublished
                          ? "bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-100 border-none shadow-none"
                      }
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>

                  {/* 5. Giá tiền */}
                  <TableCell className="text-right font-medium text-slate-900">
                    {formatCurrency(course.price)}
                  </TableCell>

                  {/* 6. Action Menu */}
                  <TableCell className="pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full hover:bg-slate-100"
                        >
                          <MoreHorizontal className="h-4 w-4 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/courses/edit/${course._id}`}
                            className="cursor-pointer"
                          >
                            <Pencil className="mr-2 h-4 w-4 text-slate-500" />{" "}
                            Chỉnh sửa
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600 cursor-pointer focus:bg-red-50"
                          onClick={() => {
                            setDeleteId(course._id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Xóa khóa học
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-slate-50 p-4 rounded-full mb-3">
                <Search className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-900 font-medium">
                Không tìm thấy kết quả
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* DIALOG: Xác nhận xóa */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa khóa học này?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xóa vĩnh viễn khóa học và toàn bộ dữ liệu bài
              học, bài kiểm tra liên quan. Bạn không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Xóa vĩnh viễn
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
