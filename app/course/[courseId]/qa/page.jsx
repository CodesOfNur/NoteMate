"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "../components/StepProgress";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function QnAPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [qnaData, setQnaData] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetQnA();
  }, []);

  const GetQnA = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Question/Answer",
      });
      setQnaData(result?.data?.content || []);
    } catch (error) {
      console.error("Error fetching Q&A data:", error);
    } finally {
      setLoading(false);
      toast.success("Pls Refresh! If QnA is not displayed");
    }
  };

  const goToCoursePage = () => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="p-6">
      <h2 className="font-bold text-3xl mb-8 text-center">Question & Answer</h2>

      {loading ? (
        <div className="text-center text-gray-500 mt-10">Loading Q&A...</div>
      ) : qnaData.length > 0 ? (
        <>
          {/* Top Navigation */}
          <div className="flex gap-5 items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={stepCount === 0}
              onClick={() => setStepCount((prev) => Math.max(prev - 1, 0))}
            >
              Previous
            </Button>

            {qnaData.map((_, index) => (
              <div
                key={index}
                className={`w-full h-2 rounded-full ${
                  index <= stepCount ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={stepCount === qnaData.length - 1}
              onClick={() =>
                setStepCount((prev) => Math.min(prev + 1, qnaData.length - 1))
              }
            >
              Next
            </Button>
          </div>

          <div className="mt-8">
            {/* Question Box */}
            <div className="p-6 bg-blue-100 border border-blue-400 rounded-lg shadow-md mb-6">
              <h3 className="font-bold text-xl text-blue-700">Question</h3>
              <p className="text-blue-900 mt-2">
                {qnaData[stepCount]?.question}
              </p>
            </div>

            {/* Answer Box */}
            <div className="p-6 bg-green-100 border border-green-400 rounded-lg shadow-md">
              <h3 className="font-bold text-xl text-green-700">Answer</h3>
              <p className="text-green-900 mt-2">
                {qnaData[stepCount]?.answer}
              </p>
            </div>

            {/* Bottom Navigation */}
            <div className="flex gap-5 items-center mt-10">
              <Button
                variant="outline"
                size="sm"
                disabled={stepCount === 0}
                onClick={() => setStepCount((prev) => Math.max(prev - 1, 0))}
              >
                Previous
              </Button>

              {qnaData.map((_, index) => (
                <div
                  key={index}
                  className={`w-full h-2 rounded-full ${
                    index <= stepCount ? "bg-primary" : "bg-gray-200"
                  }`}
                ></div>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={stepCount === qnaData.length - 1}
                onClick={() =>
                  setStepCount((prev) => Math.min(prev + 1, qnaData.length - 1))
                }
              >
                Next
              </Button>
            </div>

            {/* Show "Go to Course Page" on Last Question */}
            {stepCount === qnaData.length - 1 && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={goToCoursePage}
                  className="rounded-full"
                >
                  Go to Course Page
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No Q&A data available for this course.
        </div>
      )}
    </div>
  );
}

export default QnAPage;
