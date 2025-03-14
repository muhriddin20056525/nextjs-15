import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Blog",
  },
};

export default async function Blog() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve("intentional delay");
    }, 2000);
  });

  return <h1>Blog</h1>;
}
