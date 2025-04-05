"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useLocale } from "next-intl"

const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  })

  const [apiError, setApiError] = useState("")
  const router = useRouter()
  const locale = useLocale()

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/signup", {
        email: data.email,
        password: data.password,
        // name: data.name, // uncomment if backend accepts name
      })

      if (response.status === 200 && response.data.message === "User signed up successfully!") {
        router.push(`/${locale}/login`)
      } else {
        setApiError("Something went wrong. Try again.")
      }
    } catch (err: any) {
      console.error("Signup error:", err)
      setApiError("Something went wrong. Try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-black/60 backdrop-blur-md rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-slate-200">Name</label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
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
              placeholder="Create a password"
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
            Sign Up
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
