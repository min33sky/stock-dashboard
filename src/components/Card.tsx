import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full rounded-md border-2 border-neutral-200 bg-white p-8">
      {children}
    </div>
  );
}
