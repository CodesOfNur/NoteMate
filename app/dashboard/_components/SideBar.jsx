"use client";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supportsFlags } from "framer-motion";
import { ChartBar, CloudUpload, CloudUploadIcon, CodeSquare, CogIcon, CommandIcon, HelpCircle, HistoryIcon, LayoutDashboard, MagnetIcon, MessageCircle, MessageCircleQuestion, MoveVerticalIcon, Slack, Space, SparkleIcon, Sparkles, Twitch, UploadCloud, UserCircle, WandSparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

function SideBar() {
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Problem Solver",
      icon: Twitch,
      path: "/dashboard/aichat"
    },
  
    {
      name: "Profile",
      icon: UserCircle,
      path: "/dashboard/settings",
    },
      {
      name: "Support",
      icon: MessageCircle,
      path: "/dashboard/#"
    },
  ];

  const { totalCourse, setTotlaCourse } = useContext(CourseCountContext);
  const path = usePathname();
  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
        <h2 className="font-bold text-2xl">StudyGenie </h2>
      </div>

      <div className="mt-10">
        <Link href={"/create"} className="w-full">
          <Button className="w-full">+&nbsp;Create New</Button>
        </Link>
        <div className="mt-5">
          {MenuList.map((menu, index) => (
            <div
              key={index}
              className={`flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${
                path == menu.path && "bg-slate-200"
              }`}
            >
              <menu.icon />
              <a href={menu.path}>{menu.name}</a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}



export default SideBar;
