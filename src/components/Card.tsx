import React from 'react';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full rounded-md relative p-8 bottom-2 bg-gray-300">
      {children}
    </div>
  );
}
