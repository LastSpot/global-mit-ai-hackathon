'use client'

import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

export function BreadcrumbHeader() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathParts.length < 5 ? (
              pathParts.map((part, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {index !== pathParts.length - 1 ? (
                      <BreadcrumbLink href={`/${pathParts.slice(0, index + 1).join('/')}`}>{part}</BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{part}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index !== pathParts.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))
            ) : (
              <>
                {/* First two */}
                {[0, 1].map((index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/${pathParts.slice(0, index + 1).join('/')}`}>{pathParts[index]}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                ))}
                {/* Ellipsis */}
                <BreadcrumbEllipsis />
                <BreadcrumbSeparator />
                {/* Last two */}
                {[pathParts.length - 2, pathParts.length - 1].map((index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {index !== pathParts.length - 1 ? (
                        <BreadcrumbLink href={`/${pathParts.slice(0, index + 1).join('/')}`}>{pathParts[index]}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{pathParts[index]}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index !== pathParts.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
}