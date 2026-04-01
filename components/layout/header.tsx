import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function Header({ title, description, action }: HeaderProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-zinc-200 bg-white px-6">
      <div className="flex-1">
        <h1 className="text-base font-semibold text-zinc-900">{title}</h1>
        {description && <p className="text-xs text-zinc-500">{description}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <Input className="w-48 pl-8 text-xs" placeholder="Buscar..." />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        {action}
      </div>
    </header>
  );
}
