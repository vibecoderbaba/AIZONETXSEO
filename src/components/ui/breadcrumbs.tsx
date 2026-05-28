"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center space-x-2 text-xs font-medium text-white/40">
        <li>
          <Link href="/" className="hover:text-primary transition-colors flex items-center">
            <Home className="h-3 w-3 mr-1" />
            Home
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          const title = path.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <li key={path} className="flex items-center space-x-2">
              <ChevronRight className="h-3 w-3" />
              {isLast ? (
                <span className="text-white/80 font-semibold">{title}</span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
