import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>homepage</h1>
      <Link href="/profile">Dashboard</Link>
    </div>
  );
}
