import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative h-full w-full rounded-md border-2 border-neutral-200 bg-white p-6
      dark:border-gray-800 dark:bg-gray-900"
    >
      {children}
    </div>
  );
}
