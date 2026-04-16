"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets, Home, Activity, Play, BarChart3, Microscope, Settings } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: "/", label: "Ana Sayfa", icon: Home },
    { href: "/dashboard", label: "Panel", icon: Activity },
    { href: "/simulation", label: "Simülasyon", icon: Play },
    { href: "/analytics", label: "Analiz", icon: BarChart3 },
    { href: "/science", label: "Bilim", icon: Microscope },
    { href: "/settings", label: "Ayarlar", icon: Settings },
  ];

  return (
    <nav className="glass-effect border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-cyan-400">
            <Droplets className="w-6 h-6" />
            <span className="hidden sm:inline">Gri Su Arıtma</span>
          </Link>
          
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline text-sm">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
