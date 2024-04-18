"use client";

import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-50 -mb-px h-16 border-b border-border bg-background/75 backdrop-blur">
        <div className="layout-content">
          <div className="h-full w-full">Header</div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)]">
        <div className="layout-content flex">
          {/* 左边 aside */}
          <div className="hidden w-64 lg:block">
            <aside className="sticky top-[4rem] max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="grid gap-y-2 py-4 pr-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Button
                    key={item}
                    variant={item === 1 ? "default" : "ghost"}
                    className="justify-between"
                  >
                    <span>Home-{item}</span>
                    <span className="font-sans text-sm font-normal">
                      205678
                    </span>
                  </Button>
                ))}
              </nav>
            </aside>
          </div>
          <div className="flex-1 border-x"></div>
        </div>
      </main>

      <footer className="relative h-16 border-t"></footer>
    </>
  );
}
