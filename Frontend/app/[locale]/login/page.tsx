"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", data);
  
      if (response.status === 200 && response.data.message === "Login successful") {
        router.push(`/${locale}/question`);
      } else {
        setApiError("Check your login details");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setApiError("Check your login details");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Log In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-slate-200">Email</label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-200">Password</label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {apiError && (
            <p className="text-sm text-red-500 text-center">{apiError}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl py-2"
          >
            Log In
          </Button>
        </form>

        {/* Not a user? Sign up */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Not a user?{" "}
            <button
              onClick={() => router.push(`/${locale}/signup`)}
              className="text-indigo-400 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
