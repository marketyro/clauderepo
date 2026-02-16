import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "KLF Agent Zone - Keep Learning French",
  description: "Espace agent dédié à Keep Learning French — Ressources, chat IA et médiathèques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-poppins antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 ml-72 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
