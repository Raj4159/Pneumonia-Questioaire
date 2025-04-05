"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const questions = [
  "Do you have high blood pressure?",
  "Do you have diabetes (sugar)?",
  "Do you have thyroid issues?",
  "Do you have hypertension?",
  "Do you have anxiety?",
];

export default function MedicalHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const [answers, setAnswers] = useState<Record<number, boolean | null>>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const handleAnswer = (index: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleNext = () => {
    // Optionally handle validation or saving answers here
    router.push(`/${locale}/question`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center p-6">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
            Medical History
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Please let us know about your medical history. Your answers will help us
            provide better predictions. <br /> <br />
          </p>
        </div>

        {questions.map((question, index) => (
          <Card
            key={index}
            className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-4 shadow-lg transition duration-300 hover:shadow-xl"
          >
            <CardContent className="space-y-4">
              <p className="text-white text-lg font-medium">{question}</p>
              <div className="flex gap-4">
                <Button
                  variant={answers[index] === true ? "default" : "outline"}
                  className={`w-full ${
                    answers[index] === true
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                  }`}
                  onClick={() => handleAnswer(index, true)}
                >
                  Yes
                </Button>
                <Button
                  variant={answers[index] === false ? "default" : "outline"}
                  className={`w-full ${
                    answers[index] === false
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                  }`}
                  onClick={() => handleAnswer(index, false)}
                >
                  No
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-end pt-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
