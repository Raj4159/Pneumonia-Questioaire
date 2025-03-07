"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for conditional classnames

export default function QuestionsPage() {
    const t = useTranslations();
    const questions = t.raw("questions");

    const title = questions.Title;
    const questionKeys = Object.keys(questions).filter((key) => key !== "Title");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const handleNext = (answer: string | number) => {
        const currentKey = questionKeys[currentIndex];
        setAnswers((prev) => ({ ...prev, [currentKey]: answer }));
        setSelectedAnswer(answer.toString());

        setTimeout(() => {
            if (currentIndex < questionKeys.length - 1) {
                setCurrentIndex((prev) => prev + 1);
                setSelectedAnswer(null);
            } else {
                submitAnswers({ ...answers, [currentKey]: answer });
            }
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
            handleNext(Number(e.currentTarget.value));
        }
    };

    const submitAnswers = async (finalAnswers: { [key: string]: string | number }) => {
        try {
            // Convert answers to expected format (string values -> numbers)
            const formattedAnswers = {
                Age: Number(finalAnswers["Age"]),
                iron_deficiency: finalAnswers["iron_deficiency"] === "Yes" ? 1 : 0,
                chronic_obstructive_pulmonary_disease: finalAnswers["chronic_obstructive_pulmonary_disease"] === "Yes" ? 1 : 0,
                sepsis: finalAnswers["sepsis"] === "Yes" ? 1 : 0,
                cerebrovascular_disease: finalAnswers["cerebrovascular_disease"] === "Yes" ? 1 : 0,
                cardiorespitory_failure: finalAnswers["cardiorespitory_failure"] === "Yes" ? 1 : 0,
                dementia: finalAnswers["dementia"] === "Yes" ? 1 : 0,
                protein_calorie_malnutrition: finalAnswers["protein_calorie_malnutrition"] === "Yes" ? 1 : 0,
                vascular_disease: finalAnswers["vascular_disease"] === "Yes" ? 1 : 0,
                chronic_lung_disorder: finalAnswers["chronic_lung_disorder"] === "Yes" ? 1 : 0,
                parkinson: finalAnswers["parkinson"] === "Yes" ? 1 : 0,
                tracheostomy: finalAnswers["tracheostomy"] === "Yes" ? 1 : 0,
                history_of_pneumonia: finalAnswers["history_of_pneumonia"] === "Yes" ? 1 : 0,
                hypertension: finalAnswers["hypertension"] === "Yes" ? 1 : 0,
                gender_Male: finalAnswers["gender_Male"] === "Male" ? 1 : 0,
            };

            const response = await fetch("http://127.0.0.1:8000/api/question", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedAnswers),
            });

            if (!response.ok) {
                throw new Error("Failed to get a response from the server.");
            }

            const data = await response.json();
            setResult(data.Prediction); // Display the prediction
        } catch (error) {
            console.error("Error submitting data:", error);
            setResult("Error processing request.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold text-blue-400 text-center leading-relaxed mb-6">
                {title.split(" ").slice(0, 5).join(" ")} <br />
                {title.split(" ").slice(5).join(" ")}
            </h1>

            <Card className="w-full max-w-md bg-gray-800 shadow-lg p-6 rounded-2xl">
                <CardContent className="text-center">
                    {result ? (
                        <h2 className="text-xl font-semibold text-green-400">{result}</h2>
                    ) : (
                        <>
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
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
