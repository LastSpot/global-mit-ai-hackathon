"use client";

import Link from "next/link"
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { useRouter, usePathname } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Terminal>
        <TypingAnimation className="text-wrap">{`> find ${pathname}`}</TypingAnimation>

        <AnimatedSpan delay={1500} className="text-green-500">
          <span>✔ Check routes</span>
        </AnimatedSpan>
        <AnimatedSpan delay={2000} className="text-green-500">
          <span>✔ Check files</span>
        </AnimatedSpan>
        <AnimatedSpan delay={2500} className="text-green-500">
          <span>✔ Check folders</span>
        </AnimatedSpan>
        <AnimatedSpan delay={3000} className="text-green-500">
          <span>✔ Check entire codebase</span>
        </AnimatedSpan>
        <AnimatedSpan delay={3500} className="text-green-500">
          <span>✔ Uploading findings</span>
        </AnimatedSpan>
        <AnimatedSpan delay={4000} className="text-green-500">
          <span>✔ Done</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4500} className="text-red-500">
          <span>ℹ Route not found:</span>
          <span className="pl-2">- {pathname}</span>
        </AnimatedSpan>

        <TypingAnimation delay={5000} className="text-muted-foreground">
          Press the links below to navigate.
        </TypingAnimation>
        
        <AnimatedSpan delay={5250} className="flex flex-col gap-2">
          <Link href="/" className="text-cyan-400 hover:underline">
            &gt; Return to home
          </Link>
        </AnimatedSpan>
        <AnimatedSpan delay={5500} className="flex flex-col gap-2">
          <Link href="/dashboard" className="text-cyan-400 hover:underline">
            &gt; Return to dashboard
          </Link>
        </AnimatedSpan>
        <AnimatedSpan delay={5750} className="flex flex-col gap-2">
        <button 
            onClick={() => router.back()}
            className="text-cyan-400 hover:underline text-left"
          >
            &gt; Go back to previous page
          </button>
        </AnimatedSpan>
      </Terminal>
    </div>
  )
}
