"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    name: "Dr. Priya Sharma",
    clinic: "City Care Hospital",
    contact: "9876543210",
  },
  {
    name: "Dr. Rahul Verma",
    clinic: "Health First Clinic",
    contact: "9123456789",
  },
  {
    name: "Dr. Anjali Patil",
    clinic: "Wellness Center",
    contact: "9988776655",
  },
  {
    name: "Dr. Arjun Desai",
    clinic: "Healing Hands Hospital",
    contact: "9090909090",
  },
];

export default function ConsultPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center p-6">
      <div className="max-w-4xl w-full space-y-8 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-red-400">
          Pneumonia Detected
        </h1>
        <p className="text-lg text-gray-300">
          Please connect to a consultant/doctor as early as possible
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-8">
          {doctors.map((doc, index) => (
            <Card key={index} className="bg-gray-800 border border-gray-700 shadow-lg">
              <CardContent className="p-6 space-y-3">
                <h2 className="text-xl font-semibold text-white">{doc.name}</h2>
                <p className="text-gray-300">Clinic: {doc.clinic}</p>
                <p className="text-gray-400">Contact: {doc.contact}</p>
                <Button
                  onClick={() => alert(`Calling ${doc.contact}...`)}
                  className="bg-blue-600 hover:bg-blue-700 w-full"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}