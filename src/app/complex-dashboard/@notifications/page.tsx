import Card from "@/components/Card";
import Link from "next/link";
import React from "react";

export default function Notifications() {
  return (
    <Card>
      <div>Notification</div>
      <div>
        <Link
          href={"/complex-dashboard/archived"}
          className="ml-2 text-purple-700"
        >
          Archived
        </Link>
      </div>
    </Card>
  );
}
