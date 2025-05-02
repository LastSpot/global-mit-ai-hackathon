import Link from "next/link";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-row justify-between px-3">
        <h2 className="text-lg font-semibold text-normal text-center items-center justify-center">Dashboard</h2>
        <Link href="/dashboard/whiteboard/create">
          <InteractiveHoverButton className="w-fit">Create</InteractiveHoverButton>
        </Link>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div>Skeletons maybe?</div>
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  )
}
