"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function QuestionsPage() {
    const t = useTranslations();
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;

    const questions = t.raw("questions");
    const title = questions.Title;
    const questionKeys = Object.keys(questions).filter((key) => key !== "Title");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleNext = (answer: string | number) => {
        const currentKey = questionKeys[currentIndex];
        setAnswers((prev) => ({ ...prev, [currentKey]: answer }));
        setSelectedAnswer(answer.toString());

        setTimeout(() => {
            if (currentIndex < questionKeys.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setSelectedAnswer(null);
            } else {
                router.push(`/${locale}/predict`);
            }
        }, 300);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
            handleNext(Number(e.currentTarget.value));
        }
    };

    if (!questions || questionKeys.length === 0) return null;

    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold text-blue-400 text-center leading-relaxed mb-4">
                Pneumonia and AI Prediction
            </h1>

            <h2 className="text-xl text-center font-semibold text-white mb-6">
                {title.split(" ").slice(0, 5).join(" ")} <br />
                {title.split(" ").slice(5).join(" ")}
            </h2>

            <Card className="w-full max-w-md bg-gray-800 shadow-lg p-6 rounded-2xl">
                <CardContent className="text-center">
                    <h2 className="text-xl font-semibold text-white">
                        {questions[questionKeys[currentIndex]]}
                    </h2>

                    {questionKeys[currentIndex] === "Age" ? (
                        <input
                            type="number"
                            className="w-full mt-4 p-2 bg-transparent border border-white text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onKeyDown={handleKeyPress}
                        />
                    ) : questionKeys[currentIndex] === "gender_Male" ? (
                        <div className="flex justify-center gap-4 mt-4">
                            <Button
                                className={cn(
                                    "px-6 py-2 rounded-lg",
                                    selectedAnswer === "Male"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-700 hover:bg-gray-600"
                                )}
                                onClick={() => handleNext("Male")}
                            >
                                Male
                            </Button>
                            <Button
                                className={cn(
                                    "px-6 py-2 rounded-lg",
                                    selectedAnswer === "Female"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-700 hover:bg-gray-600"
                                )}
                                onClick={() => handleNext("Female")}
                            >
                                Female
                            </Button>
                        </div>
                    ) : (
                        <div className="flex justify-center gap-4 mt-4">
                            <Button
                                className={cn(
                                    "px-6 py-2 rounded-lg",
                                    selectedAnswer === "Yes"
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-700 hover:bg-gray-600"
                                )}
                                onClick={() => handleNext("Yes")}
                            >
                                Yes
                            </Button>
                            <Button
                                className={cn(
                                    "px-6 py-2 rounded-lg",
                                    selectedAnswer === "No"
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-700 hover:bg-gray-600"
                                )}
                                onClick={() => handleNext("No")}
                            >
                                No
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
