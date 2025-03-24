import Card from "@/components/Card";
import Link from "next/link";
import React from "react";

export default function ArchivedNotifications() {
  return (
    <Card>
      <div>Archived notifications</div>
      <div>
        <Link href={"/complex-dashboard"} className="ml-2 text-purple-700">
          Default
        </Link>
      </div>
    </Card>
  );
}
