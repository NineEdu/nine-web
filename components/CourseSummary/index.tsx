import React from "react";
import { Card, CardContent } from "../ui/card";
import { Text } from "../Text";
import { Button } from "../ui/button";

const CourseSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col gap-3">
      {/* img */}
      <div className="w-full h-40 rounded-lg overflow-hidden shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
          alt="course"
          className="w-full h-full object-cover"
        />
      </div>

      {/* title */}
      <Text className="font-semibold text-lg">Introduction to React.js</Text>

      {/* description */}
      <Text className="text-sm text-gray-600">
        Learn the basics of React.js, a popular JavaScript library for building
        user interfaces.
      </Text>

      {/* button */}
      <Button className="mt-auto bg-blue-600 hover:bg-blue-700 text-white">
        View Course
      </Button>
    </div>
  );
};

export default CourseSummary;
