import Link from "next/link";

export default function F1() {
  return (
    <div className="p-5">
      <h1>F1 Page</h1>
      <div className="flex gap-3">
        <Link href={"/f1/f2"} className="link">
          F2
        </Link>
        <Link href={"/f3"} className="link">
          F3
        </Link>
      </div>
    </div>
  );
}
