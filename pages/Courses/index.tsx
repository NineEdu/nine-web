"use client";

import CourseSummary from "@/components/CourseSummary";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetCourses from "@/hooks/courses/useGetCourses";
import { Filter, Loader2, Search, SortAsc, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const Courses = () => {
  // -- Main State (State chính thức dùng để gọi API) --
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const [appliedFilter, setAppliedFilter] = useState({
    category: "all",
    level: "all",
    minPrice: "",
    maxPrice: "",
  });

  const [appliedSort, setAppliedSort] = useState("newest");

  // -- UI State (State tạm thời trong Popover) --
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // State tạm lưu giá trị khi người dùng đang thao tác trong Popover
  const [tempFilter, setTempFilter] = useState(appliedFilter);
  const [tempSort, setTempSort] = useState(appliedSort);

  // Debounce search text
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchText]);

  // Đồng bộ state tạm khi mở popover (Reset về giá trị đang áp dụng nếu mở lại)
  useEffect(() => {
    if (filterOpen) {
      setTempFilter(appliedFilter);
    }
  }, [filterOpen, appliedFilter]);

  useEffect(() => {
    if (sortOpen) {
      setTempSort(appliedSort);
    }
  }, [sortOpen, appliedSort]);

  // -- Data Fetching --
  const { data, isFetching: isLoading } = useGetCourses({
    // Thêm dependencies vào queryKey để auto-refetch
    queryKey: ["courses", debouncedSearchText, appliedFilter, appliedSort],
    queryParams: {
      keyword: debouncedSearchText,
      // Logic: Nếu là 'all' hoặc rỗng thì gửi undefined để backend bỏ qua
      category:
        appliedFilter.category === "all" ? undefined : appliedFilter.category,
      level: appliedFilter.level === "all" ? undefined : appliedFilter.level,
      minPrice: appliedFilter.minPrice || undefined,
      maxPrice: appliedFilter.maxPrice || undefined,
      sort: appliedSort,
    },
  });

  const courses = data?.data;

  // -- Handlers --

  // Apply Filter: Đẩy state tạm -> state chính
  const handleApplyFilter = () => {
    setAppliedFilter(tempFilter);
    setFilterOpen(false);
  };

  // Apply Sort
  const handleApplySort = () => {
    setAppliedSort(tempSort);
    setSortOpen(false);
  };

  // Reset toàn bộ
  const handleResetAll = () => {
    setSearchText("");
    setAppliedFilter({
      category: "all",
      level: "all",
      minPrice: "",
      maxPrice: "",
    });
    setAppliedSort("newest");
  };

  // Kiểm tra xem có đang filter gì không (để hiện chấm đỏ hoặc nút xóa)
  const isFiltering =
    searchText !== "" ||
    appliedFilter.category !== "all" ||
    appliedFilter.level !== "all" ||
    appliedFilter.minPrice !== "" ||
    appliedFilter.maxPrice !== "" ||
    appliedSort !== "newest";

  // Helper update state tạm cho filter
  const updateTempFilter = (key: string, value: string) => {
    setTempFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen w-full container mx-auto p-4 py-8 space-y-8">
      {/* --- Header: Search & Toolbar --- */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-end lg:items-center">
        {/* 1. Search Box */}
        <div className="w-full lg:max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Tìm kiếm khóa học..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* 2. Actions */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          {/* --- POPOVER LỌC (Nâng cấp) --- */}
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`flex items-center gap-2 border-gray-300 hover:bg-gray-100 ${
                  // Logic highlight nút: Nếu có bất kỳ filter nào khác default
                  appliedFilter.category !== "all" ||
                  appliedFilter.level !== "all" ||
                  appliedFilter.minPrice ||
                  appliedFilter.maxPrice
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : ""
                }`}
              >
                <Filter className="w-4 h-4" />
                Lọc
                {(appliedFilter.category !== "all" ||
                  appliedFilter.level !== "all" ||
                  appliedFilter.minPrice ||
                  appliedFilter.maxPrice) && (
                  <span className="flex h-2 w-2 rounded-full bg-blue-600 ml-1" />
                )}
              </Button>
            </PopoverTrigger>

            {/* Nội dung Popover */}
            <PopoverContent className="w-[340px] p-0" align="end">
              <div className="p-4 border-b bg-gray-50/50">
                <Text className="font-semibold">Bộ lọc tìm kiếm</Text>
              </div>

              <div className="p-4 space-y-5">
                {/* 1. Danh mục */}
                <div className="space-y-2">
                  <Text size="sm" className="font-medium text-gray-700">
                    Danh mục
                  </Text>
                  <Select
                    value={tempFilter.category}
                    onValueChange={(val) => updateTempFilter("category", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Fullstack">Fullstack</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 2. Trình độ (Mới) */}
                <div className="space-y-2">
                  <Text size="sm" className="font-medium text-gray-700">
                    Trình độ
                  </Text>
                  <Select
                    value={tempFilter.level}
                    onValueChange={(val) => updateTempFilter("level", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả trình độ</SelectItem>
                      <SelectItem value="Beginner">
                        Người mới (Beginner)
                      </SelectItem>
                      <SelectItem value="Intermediate">
                        Trung cấp (Intermediate)
                      </SelectItem>
                      <SelectItem value="Advanced">
                        Nâng cao (Advanced)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* 3. Khoảng giá (Mới) */}
                <div className="space-y-2">
                  <Text size="sm" className="font-medium text-gray-700">
                    Khoảng giá (VNĐ)
                  </Text>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Thấp nhất"
                      value={tempFilter.minPrice}
                      onChange={(e) =>
                        updateTempFilter("minPrice", e.target.value)
                      }
                      className="text-sm"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                      type="number"
                      placeholder="Cao nhất"
                      value={tempFilter.maxPrice}
                      onChange={(e) =>
                        updateTempFilter("maxPrice", e.target.value)
                      }
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50 flex justify-end gap-2 rounded-b-lg">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilterOpen(false)}
                >
                  Hủy bỏ
                </Button>
                <Button size="sm" onClick={handleApplyFilter}>
                  Áp dụng
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* --- POPOVER SẮP XẾP --- */}
          <Popover open={sortOpen} onOpenChange={setSortOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
              >
                <SortAsc className="w-4 h-4" />
                {appliedSort === "newest" ? "Mới nhất" : "Sắp xếp"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="end">
              <div className="p-4 border-b bg-gray-50/50">
                <Text className="font-semibold">Sắp xếp theo</Text>
              </div>
              <div className="p-4">
                <Select value={tempSort} onValueChange={setTempSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kiểu sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="oldest">Cũ nhất</SelectItem>
                    <SelectItem value="price_asc">Giá: Thấp đến Cao</SelectItem>
                    <SelectItem value="price_desc">
                      Giá: Cao đến Thấp
                    </SelectItem>
                    <SelectItem value="name_asc">Tên: A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-end gap-2 rounded-b-lg">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOpen(false)}
                >
                  Hủy bỏ
                </Button>
                <Button size="sm" onClick={handleApplySort}>
                  Áp dụng
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Nút Xóa bộ lọc */}
          {isFiltering && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetAll}
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <X className="w-4 h-4 mr-1" /> Xóa bộ lọc
            </Button>
          )}
        </div>
      </div>

      {/* --- Kết quả --- */}
      <div className="flex items-center justify-between border-b pb-4">
        <Text size="lg" className="font-medium">
          {isLoading
            ? "Đang tải dữ liệu..."
            : `Tìm thấy ${courses?.length || 0} khóa học`}
        </Text>
      </div>

      {/* --- Danh sách khóa học --- */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            <Text className="text-gray-500">
              Đang tìm kiếm khóa học phù hợp...
            </Text>
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course: any) => (
              <CourseSummary key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed">
            <Text className="text-gray-500 font-medium mb-2">
              Không tìm thấy khóa học nào phù hợp.
            </Text>
            <Button
              variant="link"
              onClick={handleResetAll}
              className="text-blue-600"
            >
              Xóa bộ lọc và thử lại
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
