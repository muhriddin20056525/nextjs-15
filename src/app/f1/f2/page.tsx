import Link from "next/link";
import React from "react";

export default function F2() {
  return (
    <div>
      F2 Page{" "}
      <Link href={"/f4"} className="text-purple-600 ml-3">
        F4
      </Link>
    </div>
  );
}
