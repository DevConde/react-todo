import Link from "next/link";

export default function Home() {
  return (
    <div>      
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/todos">About Us</Link>
        </li>
        <li>
          <Link href="/blog/hello-world">Blog Post</Link>
        </li>
      </ul>
    </div>
  );
}