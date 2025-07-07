"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, TrendingUp, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import AuthenticatedCall from "@/src/apiService/AuthenticatedCall";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
interface FormData {
  username: string;
  password: string;
}
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const isBlocked: boolean = loginAttempts >= 3;
  const onSubmit = async (data: any): Promise<void> => {
    setIsLoading(true);
    setSuccessMessage("");

    try {
      await AuthenticatedCall({
        method: "POST",
        url: "/users/login",
        data: data,
      })
        .then((res) => {
          setSuccessMessage("Login successful! Redirecting to dashboard...");
          setLoginAttempts(0);

          setCookie("token", res.data.access_token);

          // Simulate redirect after success
          setTimeout(() => {
            reset();
          }, 2000);
          router.push("/dashboard/orders");
        })
        .catch((err) => {
          setLoginAttempts((prev) => prev + 1);
          throw new Error("Invalid credentials");
        });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";

      // Show error for invalid credentials
      if (loginAttempts < 2) {
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}

        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  disabled={isBlocked || isLoading}
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-z0-9._-]+$/,
                      message:
                        "Only lowercase letters, numbers, ., - allowed (no spaces)",
                    },
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                disabled={isBlocked || isLoading}
                type="submit"
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                href="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
