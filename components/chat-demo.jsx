"use client";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { Chat } from "@/components/ui/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define available models
const MODELS = [
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" },
  // { id: "gemini-1.5-pro", name: "Coming Soon..!!!" },
];

export function ChatDemo(props) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].id);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    isLoading,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  });

  return (
    <div className={cn("flex", "flex-col", "h-[500px]", "w-full")}>
      {/* Dropdown for selecting model */}
      <div className={cn("flex", "justify-end", "mb-2")}>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px] border border-gray-300 rounded-md bg-white text-black">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent className="bg-white text-black border border-gray-200 shadow-md rounded-md">
            {MODELS.map((model) => (
              <SelectItem
                key={model.id}
                value={model.id}
                className="bg-white text-black hover:bg-gray-100 cursor-pointer"
              >
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chat Component */}
      <Chat
        className="grow"
        messages={messages}
        handleSubmit={handleSubmit}
        input={input}
        handleInputChange={handleInputChange}
        isGenerating={isLoading}
        stop={stop}
        append={append}
        setMessages={setMessages}
        suggestions={[
          "Design a detailed daily/weekly study routine, including specific times for studying each subject, breaks, and other activities. Include time for review and practice tests.",
          "Create a study routine using the Pomodoro Technique (e.g., 25 minutes of focused study followed by a 5-minute break). Specify the number of Pomodoros per study session and the types of breaks.",
          "Design a study routine that utilizes mind mapping or a specific note-taking method (e.g., Cornell Notes) to improve organization and understanding of the material.",
        ]}
      />
    </div>
  );
}
