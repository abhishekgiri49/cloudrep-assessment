// app/not-found.tsx
"use client";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Animated 404 Text */}
        <div className="relative">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-blue-100 -z-10 translate-x-2 translate-y-2">
            404
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              The page you're looking for seems to have wandered off into the
              digital void. Don't worry, it happens to the best of us!
            </p>
          </div>

          {/* Current Path Display */}
          <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-gray-500 mb-1">You tried to visit:</p>
            <code className="text-red-600 font-mono text-sm break-all">
              {pathname}
            </code>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={"/"}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Home size={20} />
              Go Home
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Here are some helpful links instead:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:support@example.com"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>
    </div>
  );
}
