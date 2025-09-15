import { ChatDemo } from "@/components/chat-demo";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Safanur() {
  return (
    <main className="flex items-center justify-normal">
      <Card className="flex-auto items-center justify-normal">
        <CardHeader>
          <CardTitle>Problem Solver Chatbot</CardTitle>
          <CardDescription>
            This chatbot is currently under development on gemini-2.5-pro-preview-05-06.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChatDemo />
        </CardContent>
      </Card>
    </main>
  );
}
