"use client";

import CourseSummary from "@/components/CourseSummary";
import { Text } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, SortAsc } from "lucide-react";
import React, { useState } from "react";

const Courses = () => {
  // state
  const [searchText, setSearchText] = useState("");

  return (
    <div className="min-h-screen w-full p-4">
      {/* header search */}
      <Input
        placeholder="Search for courses..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* courses */}
      <div className="w-full mt-6 space-y-4">
        {/* header */}
        <div className="flex justify-between">
          {/* results */}
          <Text size="lg">19 Result Founded</Text>

          {/* filter - sort */}
          <div className="flex items-center gap-4">
            {/* filter */}
            <Button className="bg-white text-black border !border-black/30 flex items-center gap-2 hover:text-white">
              {/* icon */}
              <Filter />
              Filter
            </Button>

            {/* sort */}
            <Button className="bg-white text-black border !border-black/30 flex items-center gap-2 hover:text-white">
              {/* icon */}
              <SortAsc />
              Sort
            </Button>
          </div>
        </div>

        {/* course list */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {/* {Array.from({ length: 9 }).map((_, index) => (
            // <CourseSummary key={index} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Courses;
