import React, { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="p-24 m-2 shadow-md border border-[#ddd] flex justify-center items-center">
      {children}
    </div>
  );
}
