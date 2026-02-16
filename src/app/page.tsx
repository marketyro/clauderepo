import Link from "next/link";

const features = [
  {
    href: "/chat",
    title: "Assistant IA",
    description: "Posez toutes vos questions sur les programmes KLF. Notre IA connaît nos brochures par cœur.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    gradient: "from-klf-pink to-pink-400",
    shadow: "shadow-klf-pink/25",
  },
  {
    href: "/photos",
    title: "Médiathèque Photos",
    description: "Explorez nos photos haute qualité triées par destination pour vos présentations.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-klf-blue to-blue-400",
    shadow: "shadow-klf-blue/25",
  },
  {
    href: "/videos",
    title: "Médiathèque Vidéos",
    description: "Vidéos de présentation de nos écoles et destinations pour inspirer vos clients.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-purple-500 to-klf-pink",
    shadow: "shadow-purple-500/25",
  },
  {
    href: "/documents",
    title: "Bibliothèque PDF",
    description: "Brochures, tarifs, guides de vente et programmes téléchargeables instantanément.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: "from-klf-blue to-klf-pink",
    shadow: "shadow-klf-blue/25",
  },
];

const destinations = [
  { name: "Montpellier", school: "LSF", emoji: "☀️" },
  { name: "Annecy", school: "Ifalpes", emoji: "🏔️" },
  { name: "Lyon", school: "Lyon Bleu", emoji: "🦁" },
  { name: "Toulouse", school: "Langue Onze", emoji: "🏛️" },
  { name: "Bordeaux", school: "New Deal", emoji: "🍷" },
  { name: "Paris", school: "Accord", emoji: "🗼" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg px-8 pt-16 pb-24">
          {/* Decorative circles */}
          <div className="absolute top-10 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-klf-pink/20 rounded-full blur-3xl" />

          <div className="relative max-w-5xl">
            <div className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium mb-6">
              Espace réservé aux agents partenaires
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Bienvenue dans votre<br />
              <span className="text-klf-lavender">Zone Agent</span>
            </h1>
            <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
              Tout ce dont vous avez besoin pour vendre les programmes Keep Learning French :
              assistant IA, photos, vidéos et documents à portée de clic.
            </p>
          </div>
        </div>

        {/* Wave separator */}
        <div className="relative -mt-8">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 720,0 1440,40 L1440,60 L0,60 Z"
              fill="#f8f9ff"
            />
          </svg>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-8 -mt-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {features.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className={`card-hover group block bg-white rounded-2xl p-6 shadow-md ${feature.shadow} border border-klf-lavender/20 animate-fade-in-up-delay-${index + 1}`}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-klf-blue mb-2">{feature.title}</h3>
              <p className="text-sm text-klf-blue/60 leading-relaxed">{feature.description}</p>
              <div className="mt-4 flex items-center gap-2 text-klf-pink font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Accéder
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Destinations Section */}
      <section className="px-8 pb-16">
        <div className="max-w-5xl">
          <h2 className="text-2xl font-bold text-klf-blue mb-2">Nos Destinations</h2>
          <p className="text-sm text-klf-blue/50 mb-6">
            Découvrez les écoles partenaires KLF à travers la France
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {destinations.map((dest) => (
              <div
                key={dest.name}
                className="card-hover bg-white rounded-2xl p-4 text-center shadow-sm border border-klf-lavender/20 cursor-default"
              >
                <span className="text-3xl mb-2 block">{dest.emoji}</span>
                <h4 className="font-bold text-klf-blue text-sm">{dest.name}</h4>
                <p className="text-[11px] text-klf-pink font-medium">{dest.school}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-8 pb-16">
        <div className="max-w-5xl bg-gradient-to-r from-klf-blue to-klf-blue-light rounded-3xl p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "6", label: "Destinations" },
              { value: "30+", label: "Années d'expérience" },
              { value: "6", label: "Écoles partenaires" },
              { value: "24/7", label: "Assistant IA disponible" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-klf-lavender font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
