"use client";

import { useState } from "react";
import Image from "next/image";

interface Photo {
  id: string;
  src: string;
  alt: string;
  destination: string;
  width: number;
  height: number;
}

const destinations = [
  { id: "all", label: "Toutes", emoji: "🇫🇷" },
  { id: "montpellier", label: "Montpellier", emoji: "☀️" },
  { id: "annecy", label: "Annecy", emoji: "🏔️" },
  { id: "lyon", label: "Lyon", emoji: "🦁" },
  { id: "toulouse", label: "Toulouse", emoji: "🏛️" },
  { id: "bordeaux", label: "Bordeaux", emoji: "🍷" },
  { id: "paris", label: "Paris", emoji: "🗼" },
];

// Sample photo data — replace with actual photos from your drive
const photos: Photo[] = [
  // Montpellier
  { id: "m1", src: "/photos/montpellier/place-comedie.jpg", alt: "Place de la Comédie, Montpellier", destination: "montpellier", width: 800, height: 600 },
  { id: "m2", src: "/photos/montpellier/aqueduc.jpg", alt: "Aqueduc Saint-Clément, Montpellier", destination: "montpellier", width: 800, height: 533 },
  { id: "m3", src: "/photos/montpellier/ecole-lsf.jpg", alt: "École LSF Montpellier", destination: "montpellier", width: 800, height: 600 },
  { id: "m4", src: "/photos/montpellier/antigone.jpg", alt: "Quartier Antigone, Montpellier", destination: "montpellier", width: 800, height: 500 },
  // Annecy
  { id: "a1", src: "/photos/annecy/lac.jpg", alt: "Lac d'Annecy", destination: "annecy", width: 800, height: 533 },
  { id: "a2", src: "/photos/annecy/vieille-ville.jpg", alt: "Vieille ville d'Annecy", destination: "annecy", width: 800, height: 600 },
  { id: "a3", src: "/photos/annecy/ifalpes.jpg", alt: "École Ifalpes Annecy", destination: "annecy", width: 800, height: 600 },
  { id: "a4", src: "/photos/annecy/montagnes.jpg", alt: "Montagnes autour d'Annecy", destination: "annecy", width: 800, height: 500 },
  // Lyon
  { id: "l1", src: "/photos/lyon/vieux-lyon.jpg", alt: "Vieux Lyon", destination: "lyon", width: 800, height: 600 },
  { id: "l2", src: "/photos/lyon/place-bellecour.jpg", alt: "Place Bellecour, Lyon", destination: "lyon", width: 800, height: 533 },
  { id: "l3", src: "/photos/lyon/basilique.jpg", alt: "Basilique de Fourvière, Lyon", destination: "lyon", width: 800, height: 600 },
  // Toulouse
  { id: "t1", src: "/photos/toulouse/capitole.jpg", alt: "Place du Capitole, Toulouse", destination: "toulouse", width: 800, height: 600 },
  { id: "t2", src: "/photos/toulouse/canal-midi.jpg", alt: "Canal du Midi, Toulouse", destination: "toulouse", width: 800, height: 533 },
  { id: "t3", src: "/photos/toulouse/cite-espace.jpg", alt: "Cité de l'Espace, Toulouse", destination: "toulouse", width: 800, height: 600 },
  // Bordeaux
  { id: "b1", src: "/photos/bordeaux/place-bourse.jpg", alt: "Place de la Bourse, Bordeaux", destination: "bordeaux", width: 800, height: 600 },
  { id: "b2", src: "/photos/bordeaux/miroir-eau.jpg", alt: "Miroir d'eau, Bordeaux", destination: "bordeaux", width: 800, height: 533 },
  { id: "b3", src: "/photos/bordeaux/vignobles.jpg", alt: "Vignobles bordelais", destination: "bordeaux", width: 800, height: 500 },
  // Paris
  { id: "p1", src: "/photos/paris/tour-eiffel.jpg", alt: "Tour Eiffel, Paris", destination: "paris", width: 800, height: 1000 },
  { id: "p2", src: "/photos/paris/montmartre.jpg", alt: "Montmartre, Paris", destination: "paris", width: 800, height: 600 },
  { id: "p3", src: "/photos/paris/seine.jpg", alt: "Bords de Seine, Paris", destination: "paris", width: 800, height: 533 },
];

export default function PhotosPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filtered = activeFilter === "all" ? photos : photos.filter((p) => p.destination === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-klf-lavender-light/50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-klf-lavender/30 px-8 py-8">
        <div className="max-w-6xl">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-klf-blue to-blue-400 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-klf-blue">Médiathèque Photos</h1>
              <p className="text-sm text-klf-blue/50">Photos haute qualité de nos destinations — triées par ville</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-8 py-6">
        <div className="max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setActiveFilter(dest.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === dest.id
                    ? "bg-gradient-to-r from-klf-pink to-klf-blue text-white shadow-lg"
                    : "bg-white text-klf-blue/70 border border-klf-lavender/40 hover:border-klf-pink/30 hover:text-klf-blue"
                }`}
              >
                <span>{dest.emoji}</span>
                {dest.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-klf-blue/40 mt-3">
            {filtered.length} photo{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="px-8 pb-16">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="card-hover group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-klf-lavender/20 cursor-pointer"
              >
                <div className="aspect-[4/3] bg-klf-lavender-light relative overflow-hidden">
                  {/* Placeholder — replace with actual images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-klf-blue/10 to-klf-pink/10 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-klf-blue/20 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-klf-blue/30">{photo.alt}</p>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-klf-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white text-sm font-semibold">{photo.alt}</p>
                      <p className="text-white/70 text-xs capitalize">{photo.destination}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-8 pb-16">
        <div className="max-w-6xl bg-klf-lavender-light border border-klf-lavender/30 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-klf-blue/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-klf-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-klf-blue text-sm mb-1">Photos pour vos présentations</h3>
            <p className="text-xs text-klf-blue/60 leading-relaxed">
              Toutes ces photos sont libres d&apos;utilisation pour vos présentations commerciales et supports marketing liés aux programmes KLF.
              Cliquez sur une photo pour la voir en grand et la télécharger en haute résolution.
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[16/10] bg-klf-lavender-light relative">
              <div className="absolute inset-0 bg-gradient-to-br from-klf-blue/5 to-klf-pink/5 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-20 h-20 text-klf-blue/20 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-klf-blue/40">{selectedPhoto.alt}</p>
                  <p className="text-xs text-klf-blue/25 mt-1">Remplacez par vos photos haute résolution</p>
                </div>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-klf-blue">{selectedPhoto.alt}</h3>
                <p className="text-sm text-klf-blue/50 capitalize">{selectedPhoto.destination}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-gradient-to-r from-klf-pink to-klf-blue text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Télécharger
                  </span>
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-5 py-2.5 border border-klf-lavender rounded-xl text-sm font-semibold text-klf-blue/60 hover:bg-klf-lavender-light transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
