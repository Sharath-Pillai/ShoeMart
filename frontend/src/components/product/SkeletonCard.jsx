import React from "react";

const SkeletonCard = ({ variant = "grid" }) => {
  if (variant === "list") {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white animate-pulse">
        <div className="h-32 w-32 shrink-0 rounded-xl bg-gray-200"></div>
        <div className="flex-1 space-y-4 w-full">
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="h-3 w-1/2 rounded bg-gray-200"></div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-5 w-1/4 rounded bg-gray-200"></div>
            <div className="h-8 w-24 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white animate-pulse h-full">
      {/* Image Placeholder */}
      <div className="aspect-[4/5] w-full bg-gray-200 relative">
        <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/50"></div>
      </div>
      
      {/* Content Placeholder */}
      <div className="p-5 flex flex-col flex-1 space-y-4">
        {/* Brand & Category */}
        <div className="h-3 w-1/3 rounded bg-gray-200"></div>
        
        {/* Name */}
        <div className="h-5 w-3/4 rounded bg-gray-200"></div>
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Footer (Price & Button) */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-1/4 rounded bg-gray-200"></div>
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
