"use client";

import { useState } from "react";

interface Document {
  id: string;
  title: string;
  category: string;
  school?: string;
  year: string;
  fileSize: string;
  fileName: string;
  description: string;
}

const categories = [
  { id: "all", label: "Tous les documents", icon: "📁" },
  { id: "photobook", label: "Photobook", icon: "📸" },
  { id: "brochures", label: "School Brochures", icon: "📖" },
  { id: "pricelist", label: "Pricelist", icon: "💰" },
  { id: "sales-guide", label: "Sales Guide", icon: "📊" },
  { id: "junior-camp", label: "Junior Camp", icon: "🏕️" },
  { id: "senior-program", label: "Senior Program", icon: "🎓" },
];

// Sample document data — replace paths with actual documents from your Google Drive
const documents: Document[] = [
  // Photobooks
  {
    id: "pb1",
    title: "Photobook Montpellier 2026",
    category: "photobook",
    school: "LSF",
    year: "2026",
    fileSize: "15.2 MB",
    fileName: "KLF_Photobook_Montpellier_2026.pdf",
    description: "Livre photo de notre école et destination à Montpellier",
  },
  {
    id: "pb2",
    title: "Photobook Annecy 2026",
    category: "photobook",
    school: "Ifalpes",
    year: "2026",
    fileSize: "12.8 MB",
    fileName: "KLF_Photobook_Annecy_2026.pdf",
    description: "Livre photo de notre école et destination à Annecy",
  },
  {
    id: "pb3",
    title: "Photobook Lyon 2026",
    category: "photobook",
    school: "Lyon Bleu",
    year: "2026",
    fileSize: "14.1 MB",
    fileName: "KLF_Photobook_Lyon_2026.pdf",
    description: "Livre photo de notre école et destination à Lyon",
  },
  // School Brochures
  {
    id: "br1",
    title: "Brochure LSF Montpellier 2026",
    category: "brochures",
    school: "LSF",
    year: "2026",
    fileSize: "8.5 MB",
    fileName: "KLF_Brochure_LSF_Montpellier_2026.pdf",
    description: "Brochure complète de l'école LSF : programmes, cours, hébergements",
  },
  {
    id: "br2",
    title: "Brochure Ifalpes Annecy 2026",
    category: "brochures",
    school: "Ifalpes",
    year: "2026",
    fileSize: "7.2 MB",
    fileName: "KLF_Brochure_Ifalpes_Annecy_2026.pdf",
    description: "Brochure complète de l'école Ifalpes : programmes, cours, hébergements",
  },
  {
    id: "br3",
    title: "Brochure Lyon Bleu 2026",
    category: "brochures",
    school: "Lyon Bleu",
    year: "2026",
    fileSize: "9.1 MB",
    fileName: "KLF_Brochure_LyonBleu_2026.pdf",
    description: "Brochure complète de l'école Lyon Bleu International",
  },
  {
    id: "br4",
    title: "Brochure Langue Onze Toulouse 2026",
    category: "brochures",
    school: "Langue Onze",
    year: "2026",
    fileSize: "6.8 MB",
    fileName: "KLF_Brochure_LangueOnze_Toulouse_2026.pdf",
    description: "Brochure complète de l'école Langue Onze à Toulouse",
  },
  {
    id: "br5",
    title: "Brochure New Deal Bordeaux 2026",
    category: "brochures",
    school: "New Deal",
    year: "2026",
    fileSize: "7.5 MB",
    fileName: "KLF_Brochure_NewDeal_Bordeaux_2026.pdf",
    description: "Brochure complète de l'école New Deal Institut à Bordeaux",
  },
  {
    id: "br6",
    title: "Brochure Accord Paris 2026",
    category: "brochures",
    school: "Accord",
    year: "2026",
    fileSize: "8.0 MB",
    fileName: "KLF_Brochure_Accord_Paris_2026.pdf",
    description: "Brochure complète de l'école Accord à Paris",
  },
  // Pricelist
  {
    id: "pl1",
    title: "Grille Tarifaire KLF 2026",
    category: "pricelist",
    year: "2026",
    fileSize: "2.3 MB",
    fileName: "KLF_Pricelist_2026.pdf",
    description: "Grille tarifaire complète pour toutes les destinations et formules 2026",
  },
  {
    id: "pl2",
    title: "Tarifs Hébergement 2026",
    category: "pricelist",
    year: "2026",
    fileSize: "1.8 MB",
    fileName: "KLF_Accommodation_Prices_2026.pdf",
    description: "Tarifs détaillés pour toutes les options d'hébergement par destination",
  },
  {
    id: "pl3",
    title: "Tarifs Transferts & Services 2026",
    category: "pricelist",
    year: "2026",
    fileSize: "1.2 MB",
    fileName: "KLF_Transfers_Services_2026.pdf",
    description: "Tarifs des transferts aéroport et services additionnels",
  },
  // Sales Guide
  {
    id: "sg1",
    title: "Sales Guide KLF 2026",
    category: "sales-guide",
    year: "2026",
    fileSize: "5.4 MB",
    fileName: "KLF_Sales_Guide_2026.pdf",
    description: "Guide de vente complet avec argumentaires et points forts de chaque destination",
  },
  {
    id: "sg2",
    title: "FAQ Agents — Questions Fréquentes",
    category: "sales-guide",
    year: "2026",
    fileSize: "1.1 MB",
    fileName: "KLF_FAQ_Agents_2026.pdf",
    description: "Réponses aux questions les plus fréquentes posées par les agents",
  },
  {
    id: "sg3",
    title: "Comparatif Destinations KLF",
    category: "sales-guide",
    year: "2026",
    fileSize: "3.2 MB",
    fileName: "KLF_Destination_Comparison_2026.pdf",
    description: "Tableau comparatif de toutes les destinations pour aider au conseil client",
  },
  // Junior Camp
  {
    id: "jc1",
    title: "Junior Camp — Programme Complet 2026",
    category: "junior-camp",
    year: "2026",
    fileSize: "6.7 MB",
    fileName: "KLF_Junior_Camp_2026.pdf",
    description: "Programme détaillé des camps juniors : activités, hébergement, encadrement",
  },
  {
    id: "jc2",
    title: "Junior Camp — Fiche Inscription",
    category: "junior-camp",
    year: "2026",
    fileSize: "0.8 MB",
    fileName: "KLF_Junior_Camp_Registration_2026.pdf",
    description: "Formulaire d'inscription pour les programmes juniors",
  },
  // Senior Program
  {
    id: "sp1",
    title: "Programme Senior 50+ — 2026",
    category: "senior-program",
    year: "2026",
    fileSize: "4.5 MB",
    fileName: "KLF_Senior_Program_2026.pdf",
    description: "Programme spécial pour les 50+ : cours de français et découverte culturelle",
  },
  {
    id: "sp2",
    title: "Senior Program — Calendrier & Activités",
    category: "senior-program",
    year: "2026",
    fileSize: "2.1 MB",
    fileName: "KLF_Senior_Calendar_2026.pdf",
    description: "Calendrier détaillé des sessions et activités culturelles pour le programme senior",
  },
];

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = documents.filter((doc) => {
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.school && doc.school.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryCount = (catId: string) =>
    catId === "all" ? documents.length : documents.filter((d) => d.category === catId).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-klf-lavender-light/50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-klf-lavender/30 px-8 py-8">
        <div className="max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-klf-blue to-klf-pink flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-klf-blue">Bibliothèque PDF</h1>
              <p className="text-sm text-klf-blue/50">Brochures, tarifs et documents téléchargeables</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-klf-blue/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un document..."
              className="w-full pl-11 pr-4 py-3 bg-klf-lavender-light/50 border border-klf-lavender/30 rounded-xl text-sm text-klf-blue placeholder:text-klf-blue/30 focus:outline-none focus:ring-2 focus:ring-klf-pink/30 focus:border-klf-pink/50 transition-all"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Category Sidebar */}
        <div className="w-72 bg-white border-r border-klf-lavender/20 min-h-[calc(100vh-180px)] p-4 hidden lg:block">
          <p className="text-[10px] uppercase tracking-wider text-klf-blue/40 font-semibold px-3 mb-3">
            Catégories
          </p>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-klf-pink to-klf-blue text-white shadow-lg"
                    : "text-klf-blue/70 hover:bg-klf-lavender-light hover:text-klf-blue"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span className="flex-1 text-left">{cat.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-klf-lavender-light text-klf-blue/50"
                  }`}
                >
                  {categoryCount(cat.id)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Category Filter */}
        <div className="lg:hidden px-8 py-4 w-full">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-klf-pink to-klf-blue text-white"
                    : "bg-white text-klf-blue/70 border border-klf-lavender/40"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Document List */}
        <div className="flex-1 px-8 py-6">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-klf-blue">
                  {categories.find((c) => c.id === activeCategory)?.label || "Tous"}
                </h2>
                <p className="text-xs text-klf-blue/40">
                  {filtered.length} document{filtered.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map((doc) => (
                <div
                  key={doc.id}
                  className="card-hover group bg-white rounded-2xl p-5 shadow-sm border border-klf-lavender/20 flex items-center gap-5"
                >
                  {/* File Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-white font-bold text-xs">PDF</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-klf-blue text-sm truncate">{doc.title}</h3>
                    <p className="text-xs text-klf-blue/50 mt-0.5 truncate">{doc.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      {doc.school && (
                        <span className="px-2 py-0.5 bg-klf-lavender-light rounded text-[10px] font-semibold text-klf-blue">
                          {doc.school}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-klf-pink/10 rounded text-[10px] font-semibold text-klf-pink">
                        {doc.year}
                      </span>
                      <span className="text-[10px] text-klf-blue/30">{doc.fileSize}</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <button className="flex-shrink-0 px-5 py-2.5 bg-gradient-to-r from-klf-pink to-klf-blue text-white rounded-xl font-semibold text-xs shadow-md hover:shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger
                  </button>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-klf-blue/10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-klf-blue/40">Aucun document trouvé</p>
                <p className="text-xs text-klf-blue/25 mt-1">Essayez un autre filtre ou terme de recherche</p>
              </div>
            )}

            {/* Info Banner */}
            <div className="mt-8 bg-klf-lavender-light border border-klf-lavender/30 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-klf-blue/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-klf-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-klf-blue text-sm mb-1">Mise à jour des documents</h3>
                <p className="text-xs text-klf-blue/60 leading-relaxed">
                  Les documents 2026 sont priorisés lorsqu&apos;ils sont disponibles. Si un document n&apos;est pas encore disponible en version 2026,
                  la version la plus récente est affichée. Pour toute question, contactez votre conseiller KLF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
