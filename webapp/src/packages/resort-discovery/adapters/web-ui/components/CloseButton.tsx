"use client";
import { useNavigation } from "@shared/adapters/web-ui/hooks/useNavigation";
import React from "react";

interface CloseButtonProps {
  className?: string;
}

export default function CloseButton({ className }: CloseButtonProps) {
  const navigation = useNavigation();
  return (
    <button
      onClick={() => navigation.back()}
      aria-label="Close resort details"
      className={`absolute -top-10 -right-4 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer ${className || ""}`}
      type="button"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
} 