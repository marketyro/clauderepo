"use client";

import { useState } from "react";

type Origin = "" | "eu" | "non-eu";
type Duration = "" | "short" | "long";

interface TimelineStep {
  title: string;
  description: string;
  icon: string;
  urgency: "high" | "medium" | "low" | "none";
}

interface TimelinePhase {
  phase: string;
  color: string;
  steps: TimelineStep[];
}

function getTimeline(origin: Origin, duration: Duration): TimelinePhase[] | null {
  if (!origin || !duration) return null;

  if (origin === "eu") {
    return [
      {
        phase: "Before Departure",
        color: "klf-blue",
        steps: [
          {
            title: "European Health Insurance Card (EHIC)",
            description:
              "Ensure the student has a valid EHIC or equivalent. This covers healthcare across the EU — no extra paperwork needed.",
            icon: "🏥",
            urgency: "low",
          },
        ],
      },
      {
        phase: "First Week in France",
        color: "klf-pink",
        steps: [
          {
            title: "No admin required",
            description:
              "EU citizens enjoy freedom of movement. No visa, no OFII, no registration needed for stays of any duration.",
            icon: "✅",
            urgency: "none",
          },
        ],
      },
      {
        phase: "First Month",
        color: "klf-blue",
        steps: [
          {
            title: "No admin required",
            description:
              "EU students can focus entirely on their studies. No government registrations or social security applications needed.",
            icon: "🎉",
            urgency: "none",
          },
        ],
      },
    ];
  }

  if (origin === "non-eu" && duration === "short") {
    return [
      {
        phase: "Before Departure",
        color: "klf-blue",
        steps: [
          {
            title: "Schengen Visa or Exemption",
            description:
              "Check if the student's nationality requires a Schengen short-stay visa (Type C). Some nationalities are exempt for stays under 90 days.",
            icon: "🛂",
            urgency: "medium",
          },
        ],
      },
      {
        phase: "First Week in France",
        color: "klf-pink",
        steps: [
          {
            title: "No admin required",
            description:
              "Short-term students do not need to register with OFII or open a French bank account. A simple and smooth arrival.",
            icon: "✅",
            urgency: "none",
          },
        ],
      },
      {
        phase: "First Month",
        color: "klf-blue",
        steps: [
          {
            title: "No admin required",
            description:
              "No social security or housing aid applications for short-term stays. The student can fully focus on their French immersion.",
            icon: "🎉",
            urgency: "none",
          },
        ],
      },
    ];
  }

  // Non-EU & Long-term
  return [
    {
      phase: "Before Departure",
      color: "klf-blue",
      steps: [
        {
          title: "Campus France Registration",
          description:
            "The student must create a Campus France account and complete the Études en France procedure (mandatory in most countries).",
          icon: "🏛️",
          urgency: "high",
        },
        {
          title: "VLS-TS Visa Application",
          description:
            'Apply for a "Visa de Long Séjour valant Titre de Séjour" at the French consulate. This serves as both visa and residence permit for the first year.',
          icon: "🛂",
          urgency: "high",
        },
        {
          title: "CVEC Tax Payment",
          description:
            "Pay the CVEC (Contribution Vie Étudiante et de Campus) — a mandatory €100 student tax — online before enrollment.",
          icon: "💰",
          urgency: "medium",
        },
      ],
    },
    {
      phase: "First Week in France",
      color: "klf-pink",
      steps: [
        {
          title: "Validate OFII Online",
          description:
            "Within the first 3 months, the student must validate their VLS-TS visa online on the OFII (ANEF) platform. Best done in the first week.",
          icon: "📋",
          urgency: "high",
        },
        {
          title: "Open a French Bank Account",
          description:
            "Required for receiving CAF aid and paying rent. Most banks require a passport, visa, proof of address, and student certificate.",
          icon: "🏦",
          urgency: "high",
        },
      ],
    },
    {
      phase: "First Month",
      color: "klf-blue",
      steps: [
        {
          title: "Apply for French Social Security (Ameli)",
          description:
            "Register on ameli.fr to obtain a French social security number. This gives access to the French healthcare system at reduced costs.",
          icon: "🏥",
          urgency: "high",
        },
        {
          title: "Apply for CAF Housing Aid",
          description:
            "Apply on caf.fr for APL (Aide Personnalisée au Logement). This can cover 30-50% of rent — a significant financial help for students.",
          icon: "🏠",
          urgency: "medium",
        },
      ],
    },
  ];
}

function getUrgencyStyles(urgency: TimelineStep["urgency"]) {
  switch (urgency) {
    case "high":
      return {
        badge: "bg-red-100 text-red-700",
        border: "border-red-200",
        label: "High priority",
      };
    case "medium":
      return {
        badge: "bg-amber-100 text-amber-700",
        border: "border-amber-200",
        label: "Medium priority",
      };
    case "low":
      return {
        badge: "bg-green-100 text-green-700",
        border: "border-green-200",
        label: "Low priority",
      };
    case "none":
      return {
        badge: "bg-klf-lavender text-klf-blue",
        border: "border-klf-lavender",
        label: "No action needed",
      };
  }
}

function getPhaseAccent(color: string) {
  if (color === "klf-pink") {
    return {
      bg: "bg-klf-pink",
      bgLight: "bg-klf-pink/10",
      text: "text-klf-pink",
      border: "border-klf-pink/30",
      line: "bg-klf-pink/20",
      dot: "bg-klf-pink",
    };
  }
  return {
    bg: "bg-klf-blue",
    bgLight: "bg-klf-blue/10",
    text: "text-klf-blue",
    border: "border-klf-blue/30",
    line: "bg-klf-blue/20",
    dot: "bg-klf-blue",
  };
}

export default function AdminDemystifier() {
  const [origin, setOrigin] = useState<Origin>("");
  const [duration, setDuration] = useState<Duration>("");
  const [showExportToast, setShowExportToast] = useState(false);

  const timeline = getTimeline(origin, duration);

  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => setShowExportToast(false), 3000);
  };

  const getComplexityLabel = () => {
    if (!origin || !duration) return null;
    if (origin === "eu") return { text: "Minimal admin", color: "text-green-600", bg: "bg-green-50 border-green-200" };
    if (duration === "short") return { text: "Light admin", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" };
    return { text: "Heavy admin", color: "text-red-600", bg: "bg-red-50 border-red-200" };
  };

  const complexity = getComplexityLabel();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="gradient-bg px-8 pt-14 pb-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-klf-pink/20 rounded-full blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/90 text-xs font-medium mb-5">
              B2B Lead Magnet Tool
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              French Admin<br />
              <span className="text-klf-lavender">Demystifier</span>
            </h1>
            <p className="text-white/80 text-base lg:text-lg max-w-2xl leading-relaxed">
              Generate a custom admin timeline for your students in 2 clicks.
            </p>
          </div>
        </div>
        <div className="relative -mt-8">
          <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1440,40 L1440,60 L0,60 Z" fill="#f8f9ff" />
          </svg>
        </div>
      </section>

      {/* Selector Section */}
      <section className="px-8 -mt-4 pb-8">
        <div className="max-w-4xl">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-md border border-klf-lavender/20 animate-fade-in-up">
            <h2 className="text-lg font-bold text-klf-blue mb-1">Student Profile</h2>
            <p className="text-sm text-klf-blue/50 mb-6">
              Select the student&apos;s origin and intended stay duration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Origin Select */}
              <div>
                <label
                  htmlFor="origin"
                  className="block text-sm font-semibold text-klf-blue mb-2"
                >
                  Origin
                </label>
                <div className="relative">
                  <select
                    id="origin"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value as Origin)}
                    className="w-full appearance-none bg-klf-lavender-light border border-klf-lavender rounded-xl px-4 py-3.5 text-sm font-medium text-klf-blue focus:outline-none focus:ring-2 focus:ring-klf-pink/40 focus:border-klf-pink transition-all duration-300 cursor-pointer"
                  >
                    <option value="">Select origin...</option>
                    <option value="eu">EU Citizen</option>
                    <option value="non-eu">Non-EU Citizen</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-4 h-4 text-klf-blue/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Duration Select */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-semibold text-klf-blue mb-2"
                >
                  Duration of Stay
                </label>
                <div className="relative">
                  <select
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value as Duration)}
                    className="w-full appearance-none bg-klf-lavender-light border border-klf-lavender rounded-xl px-4 py-3.5 text-sm font-medium text-klf-blue focus:outline-none focus:ring-2 focus:ring-klf-pink/40 focus:border-klf-pink transition-all duration-300 cursor-pointer"
                  >
                    <option value="">Select duration...</option>
                    <option value="short">Short-term (&lt; 90 days)</option>
                    <option value="long">Long-term (&gt; 90 days)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-4 h-4 text-klf-blue/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Badge */}
            {complexity && (
              <div className="mt-5 animate-fade-in-up">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${complexity.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${complexity.color === "text-green-600" ? "bg-green-500" : complexity.color === "text-amber-600" ? "bg-amber-500" : "bg-red-500"}`} />
                  <span className={complexity.color}>{complexity.text}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {timeline && (
        <section className="px-8 pb-8 animate-fade-in-up">
          <div className="max-w-4xl">
            <h2 className="text-xl font-bold text-klf-blue mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-klf-blue flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              Admin Timeline
            </h2>

            <div className="space-y-8">
              {timeline.map((phase, phaseIdx) => {
                const accent = getPhaseAccent(phase.color);
                return (
                  <div
                    key={phase.phase}
                    className="relative"
                    style={{ animationDelay: `${phaseIdx * 150}ms` }}
                  >
                    {/* Phase Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                        {phaseIdx + 1}
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold ${accent.text}`}>
                          {phase.phase}
                        </h3>
                        <p className="text-xs text-klf-blue/40 font-medium">
                          {phase.steps.length} {phase.steps.length === 1 ? "step" : "steps"}
                        </p>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="ml-5 border-l-2 border-dashed pl-8 space-y-4" style={{ borderColor: phase.color === "klf-pink" ? "#ea4d80" : "#243391", opacity: 0.2 }}>
                      {phase.steps.map((step, stepIdx) => {
                        const urgency = getUrgencyStyles(step.urgency);
                        return (
                          <div
                            key={step.title}
                            className={`relative bg-white rounded-2xl p-5 shadow-sm border ${urgency.border} card-hover group`}
                            style={{ animationDelay: `${(phaseIdx * 3 + stepIdx) * 100}ms` }}
                          >
                            {/* Connector dot */}
                            <div
                              className={`absolute -left-[calc(2rem+5px)] top-6 w-3 h-3 rounded-full ${accent.dot} ring-4 ring-white`}
                            />

                            <div className="flex items-start gap-4">
                              <span className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform duration-300">
                                {step.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                  <h4 className="font-bold text-klf-blue text-sm">
                                    {step.title}
                                  </h4>
                                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${urgency.badge}`}>
                                    {urgency.label}
                                  </span>
                                </div>
                                <p className="text-sm text-klf-blue/60 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleExport}
                className="group flex items-center gap-2.5 px-6 py-3 bg-klf-blue text-white rounded-xl font-semibold text-sm shadow-lg shadow-klf-blue/20 hover:shadow-xl hover:shadow-klf-blue/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Timeline to PDF for my client
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!timeline && (
        <section className="px-8 pb-8">
          <div className="max-w-4xl">
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-klf-lavender/20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-klf-lavender-light flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-klf-blue/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-klf-blue mb-1">No timeline yet</h3>
              <p className="text-sm text-klf-blue/40">
                Select the student&apos;s origin and duration above to generate their admin timeline.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-8 pb-16">
        <div className="max-w-4xl">
          <div className="relative overflow-hidden bg-gradient-to-br from-klf-pink to-klf-blue rounded-2xl p-8 lg:p-10 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    Hate dealing with paperwork?
                  </h3>
                  <p className="text-white/80 text-sm lg:text-base leading-relaxed max-w-xl">
                    When you book with KLF, our dedicated <strong className="text-white">Student Support Team</strong> handles{" "}
                    <strong className="text-white">100% of this</strong> for your clients. Zero stress, zero mistakes.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="mailto:partners@klf.fr"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-klf-pink font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact our Partner Team
                </a>
                <a
                  href="https://klf.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 backdrop-blur-sm text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-white/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  Learn more about KLF
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Toast */}
      {showExportToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
          <div className="bg-klf-blue text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <svg className="w-5 h-5 text-klf-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold text-sm">PDF Export — Demo Only</p>
              <p className="text-xs text-klf-lavender">This feature is available in the full version.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
