"use client";

import { DeskTopMenu, MobileMenu } from "./components/menu";

export default function Page() {
  return (
    <>
      <header className="sticky top-0 z-50 -mb-px h-16 border-b border-border bg-background/75 backdrop-blur">
        <div className="layout-content px-4">
          <div className="flex h-full w-full justify-between">
            <div></div>
            <div className="flex items-center">
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)]">
        <div className="layout-content flex">
          {/* 左边 aside */}
          <div className="hidden w-64 lg:block">
            <DeskTopMenu />
          </div>

          {/* 中间内容 */}
          <div className="flex-1">
            <div className="m-auto min-h-screen border-x"></div>
          </div>
        </div>
      </main>

      <footer className="relative h-16 border-t"></footer>
    </>
  );
}
