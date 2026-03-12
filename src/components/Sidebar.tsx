"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Tableau de bord",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </svg>
    ),
  },
  {
    href: "/chat",
    label: "Assistant IA",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    href: "/photos",
    label: "Médiathèque Photos",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/videos",
    label: "Médiathèque Vidéos",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/documents",
    label: "Bibliothèque PDF",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/admin-demystifier",
    label: "Admin Demystifier",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl z-50 flex flex-col border-r border-klf-lavender/50">
      {/* Logo Section */}
      <div className="p-6 border-b border-klf-lavender/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">KLF</span>
          </div>
          <div>
            <h1 className="font-bold text-klf-blue text-lg leading-tight">Keep Learning</h1>
            <p className="text-klf-pink font-semibold text-sm">French</p>
          </div>
        </div>
        <div className="mt-4 px-3 py-2 bg-klf-lavender-light rounded-lg">
          <p className="text-xs text-klf-blue font-medium">Zone Agent</p>
          <p className="text-[10px] text-klf-blue/60">Espace réservé aux partenaires</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] uppercase tracking-wider text-klf-blue/40 font-semibold px-3 mb-3">
          Navigation
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                isActive
                  ? "bg-gradient-to-r from-klf-pink to-klf-blue text-white shadow-lg shadow-klf-pink/20"
                  : "text-klf-blue/70 hover:bg-klf-lavender-light hover:text-klf-blue"
              }`}
            >
              <span className={`transition-transform duration-300 ${!isActive ? "group-hover:scale-110" : ""}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Contact Quick Access */}
      <div className="p-4 border-t border-klf-lavender/30">
        <a
          href="mailto:contact@klf.fr"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-klf-lavender-light hover:bg-klf-lavender transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 text-klf-pink group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-xs font-semibold text-klf-blue">Contacter KLF</p>
            <p className="text-[10px] text-klf-blue/50">contact@klf.fr</p>
          </div>
        </a>
        <p className="text-center text-[10px] text-klf-blue/30 mt-4">
          © 2026 Keep Learning French
        </p>
      </div>
    </aside>
  );
}
