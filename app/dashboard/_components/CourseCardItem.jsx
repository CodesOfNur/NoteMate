"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CourseCardItem({ course }) {
  // Initialize status from the course prop
  const [status, setStatus] = useState(course?.status);

  useEffect(() => {
    // Only poll if the status is "Generating"
    if (status === "Generating") {
      const interval = setInterval(async () => {
        try {
          // Fetch the latest course data from your existing API
          const res = await fetch(`/api/courses?courseId=${course.courseId}`);
          if (!res.ok) throw new Error("Failed to fetch status");

          const data = await res.json();

          // Your API returns course in data.result
          const newStatus = data.result?.status;

          // Update state if status has changed
          if (newStatus && newStatus !== status) {
            setStatus(newStatus);
          }
        } catch (err) {
          console.error("Error fetching course status:", err);
        }
      }, 3000); // Poll every 3 seconds

      // Clear interval on unmount or when status changes
      return () => clearInterval(interval);
    }
  }, [status, course.courseId]);

  return (
    <div className="border rounded-lg shadow-md p-5">
      <div>
        {/* Top section: icon and status */}
        <div className="flex justify-between items-center">
          <Image src="/knowledge.png" alt="other" width={50} height={50} />
          <h2 className="text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white">
            {status}
          </h2>
        </div>

        {/* Course title */}
        <h2 className="mt-3 font-medium text-lg">
          {course?.courseLayout?.courseTitle}
        </h2>

        {/* Course summary */}
        <p className="text-sm line-clamp-2 text-gray-500 mt-3">
          {course?.courseLayout?.courseSummary}
        </p>

        {/* Button section */}
        <div className="mt-3 flex justify-end">
          {status === "Generating" ? (
            <h2 className="text-sm p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400 text-white">
              <RefreshCw className="h-5 w-5 animate-spin" />
              Generating...
            </h2>
          ) : (
            <Link href={`/course/${course?.courseId}`}>
              <Button>View</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCardItem;
