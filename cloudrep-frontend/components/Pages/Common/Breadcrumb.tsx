import React from "react";
import { ChevronRight, Home } from "lucide-react";

const BreadcrumbComponent = ({
  title = "Clothing Collection",
  breadcrumbs = [
    { label: "Home", href: "/", icon: true },
    { label: "Clothing Collection", href: "/collection", active: true },
  ],
}) => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-r from-pink-50 to-yellow-50 overflow-hidden">
      {/* Background with floral elements */}

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center font-serif italic">
          {title}
        </h1>

        {/* Breadcrumb navigation */}
        <nav className="flex items-center space-x-2 text-sm md:text-base">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <a
                href={crumb.href}
                className={`flex items-center space-x-1 transition-colors duration-200 ${
                  crumb.active
                    ? "text-gray-800 font-medium"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {crumb.icon && <Home className="w-4 h-4" />}
                <span>{crumb.label}</span>
              </a>
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};
export default BreadcrumbComponent;
