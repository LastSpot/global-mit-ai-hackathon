import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { BreadcrumbHeader } from "@/components/breadcrumb-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <BreadcrumbHeader />
          <div className="flex-grow min-h-screen">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}