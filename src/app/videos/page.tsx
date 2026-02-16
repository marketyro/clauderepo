"use client";

import { useState } from "react";

interface Video {
  id: string;
  title: string;
  school: string;
  destination: string;
  youtubeId: string;
  description: string;
}

const destinations = [
  { id: "all", label: "Toutes", emoji: "🇫🇷" },
  { id: "montpellier", label: "Montpellier", emoji: "☀️" },
  { id: "annecy", label: "Annecy", emoji: "🏔️" },
  { id: "lyon", label: "Lyon", emoji: "🦁" },
  { id: "toulouse", label: "Toulouse", emoji: "🏛️" },
  { id: "bordeaux", label: "Bordeaux", emoji: "🍷" },
];

const videos: Video[] = [
  {
    id: "v1",
    title: "LSF Montpellier — Présentation",
    school: "LSF",
    destination: "montpellier",
    youtubeId: "72VALTR9SNI",
    description: "Découvrez l'école LSF à Montpellier : cours de français, activités culturelles et vie étudiante dans le sud de la France.",
  },
  {
    id: "v2",
    title: "Ifalpes Annecy — Présentation",
    school: "Ifalpes",
    destination: "annecy",
    youtubeId: "lXDLsHXBVA4",
    description: "Visite de l'école Ifalpes à Annecy : apprendre le français au pied des Alpes avec vue sur le lac.",
  },
  {
    id: "v3",
    title: "Discover Lyon",
    school: "Lyon Bleu",
    destination: "lyon",
    youtubeId: "f9JGU_4hJoA",
    description: "Explorez Lyon, la capitale gastronomique de la France : patrimoine UNESCO, traboules et art de vivre.",
  },
  {
    id: "v4",
    title: "Langue Onze Toulouse — Présentation",
    school: "Langue Onze",
    destination: "toulouse",
    youtubeId: "SY4jBf4poKk",
    description: "L'école Langue Onze vous accueille à Toulouse, la ville rose : cours de français et immersion culturelle.",
  },
  {
    id: "v5",
    title: "New Deal Bordeaux — Présentation",
    school: "New Deal",
    destination: "bordeaux",
    youtubeId: "zNgiGZRsUk0",
    description: "Découvrez New Deal Institut à Bordeaux : français langue étrangère dans l'une des plus belles villes de France.",
  },
];

export default function VideosPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const filtered = activeFilter === "all" ? videos : videos.filter((v) => v.destination === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-klf-lavender-light/50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-klf-lavender/30 px-8 py-8">
        <div className="max-w-6xl">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-klf-pink flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-klf-blue">Médiathèque Vidéos</h1>
              <p className="text-sm text-klf-blue/50">Vidéos de présentation de nos écoles et destinations</p>
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
            {filtered.length} vidéo{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="px-8 pb-16">
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((video) => (
            <div
              key={video.id}
              className="card-hover bg-white rounded-2xl overflow-hidden shadow-sm border border-klf-lavender/20"
            >
              {/* Video Embed / Thumbnail */}
              <div className="aspect-video relative bg-black">
                {playingVideo === video.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                ) : (
                  <div
                    className="absolute inset-0 cursor-pointer group"
                    onClick={() => setPlayingVideo(video.id)}
                  >
                    {/* YouTube Thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-klf-pink ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 rounded-md">
                      <span className="text-white text-[10px] font-medium">YouTube</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-klf-blue text-lg mb-1">{video.title}</h3>
                    <p className="text-sm text-klf-blue/50 leading-relaxed">{video.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <span className="px-3 py-1 bg-klf-lavender-light rounded-full text-xs font-semibold text-klf-blue">
                    {video.school}
                  </span>
                  <span className="px-3 py-1 bg-klf-pink/10 rounded-full text-xs font-semibold text-klf-pink capitalize">
                    {video.destination}
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-klf-blue/40 hover:text-klf-pink transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Ouvrir sur YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
