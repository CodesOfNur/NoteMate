"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StepProgress from "../components/StepProgress";
import QuizCardItem from "./_components/QuizCardItem";
import { toast } from "sonner"; // Import toast for notifications
import { Button } from "@/components/ui/button";

function Quiz() {
  const { courseId } = useParams();
  const router = useRouter();
  const [quizData, setQuizData] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false); // Add state to track data fetch

  useEffect(() => {
    GetQuiz();
  }, []);

  const GetQuiz = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "Quiz",
      });
      const questions = result?.data?.content?.questions || [];
      setQuiz(questions);
      setQuizData(result.data);

      if (!isDataFetched) {
        toast.success("Pls Refresh! If Quiz is not displayed");
        setIsDataFetched(true);
      }

      if (questions.length > 0) {
        setCorrectAnswer(questions[0]?.answer);
      }
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      toast.error("Failed to fetch quiz data. Please try again later.");
    }
  };

  const checkAnswer = (userAnswer, currentQuestion) => {
    if (userAnswer === currentQuestion.answer) {
      setIsCorrectAnswer(true);
      setCorrectAnswer(currentQuestion.answer);
    } else {
      setIsCorrectAnswer(false);
    }
  };

  useEffect(() => {
    if (quiz.length > 0) {
      setCorrectAnswer(quiz[stepCount]?.answer);
      setIsCorrectAnswer(null);
    }
  }, [stepCount, quiz]);

  const goToCoursePage = () => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mb-8">Quiz</h2>

      {quiz.length > 0 ? (
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

            {quiz.map((_, index) => (
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
              disabled={stepCount === quiz.length - 1}
              onClick={() =>
                setStepCount((prev) => Math.min(prev + 1, quiz.length - 1))
              }
            >
              Next
            </Button>
          </div>

          <div>
            <QuizCardItem
              className="mt-10 mb-5"
              quiz={quiz[stepCount]}
              userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
            />
          </div>

          {isCorrectAnswer === false && (
            <div className="border p-3 border-red-700 bg-red-200 rounded-lg mt-16">
              <h2 className="font-bold text-lg text-red-600">Incorrect</h2>
              <p className="text-red-600">Correct answer is {correctAnswer}</p>
            </div>
          )}
          {isCorrectAnswer === true && (
            <div className="border p-3 border-green-700 bg-green-200 rounded-lg">
              <h2 className="font-bold text-lg text-green-600">Correct</h2>
              <p className="text-green-600">Your answer is correct</p>
            </div>
          )}

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

            {quiz.map((_, index) => (
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
              disabled={stepCount === quiz.length - 1}
              onClick={() =>
                setStepCount((prev) => Math.min(prev + 1, quiz.length - 1))
              }
            >
              Next
            </Button>
          </div>

          {/* End of Quiz Message */}
          {stepCount === quiz.length - 1 && (
            <div className="flex items-center gap-10 flex-col mt-5">
              <h2>📝 End of quiz. Great job! 🎉</h2>
              <Button className="rounded-full" onClick={goToCoursePage}>
                Go to course page
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600">Loading quiz...</p>
      )}
    </div>
  );
}

export default Quiz;
