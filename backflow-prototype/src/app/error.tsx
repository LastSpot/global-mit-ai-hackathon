"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Terminal>
        <TypingAnimation className="text-wrap">{`> encountered an error: ${error.message}`}</TypingAnimation>

        <AnimatedSpan delay={1500} className="text-green-500">
          <span>✔ Checking for errors</span>
        </AnimatedSpan>
        <AnimatedSpan delay={2000} className="text-green-500">
          <span>✔ Checking for solutions</span>
        </AnimatedSpan>
        <AnimatedSpan delay={3500} className="text-green-500">
          <span>✔ Uploading findings</span>
        </AnimatedSpan>
        <AnimatedSpan delay={4000} className="text-green-500">
          <span>✔ Done</span>
        </AnimatedSpan>

        <TypingAnimation delay={5000} className="text-muted-foreground">
          Solutions found:
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
