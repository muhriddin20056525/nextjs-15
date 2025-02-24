import React from "react";
import { notFound } from "next/navigation";

export default function ProductReview({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  const { productId, reviewId } = params;

  if (parseInt(reviewId) > 1000) {
    notFound();
  }

  return (
    <div>
      <h1>ProductId {productId}</h1>
      <h1>RewievId {reviewId}</h1>
    </div>
  );
}
