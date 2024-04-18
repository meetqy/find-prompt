import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/utils";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            <NavMenu />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export const DeskTopMenu = () => {
  return (
    <aside className="sticky top-[4rem] max-h-[calc(100vh-4rem)] overflow-y-auto">
      <NavMenu className="py-4 pr-4" />
    </aside>
  );
};

const NavMenu = ({ className }: { className?: string }) => {
  return (
    <nav className={cn("grid gap-y-2", className)}>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Button
          key={item}
          variant={item === 1 ? "default" : "ghost"}
          className="justify-between"
        >
          <span>Home-{item}</span>
          <span className="font-sans text-sm font-normal">205678</span>
        </Button>
      ))}
    </nav>
  );
};
