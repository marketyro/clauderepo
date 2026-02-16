"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "Quelle école KLF propose un Summer Camp ?",
  "Quel est le tarif pour 3 semaines en famille d'accueil à Annecy ?",
  "Quels programmes sont disponibles pour les juniors ?",
  "Quelles sont les dates de début des cours à Montpellier ?",
  "Proposez-vous des cours de préparation au DELF ?",
  "Quelle est la différence entre les formules intensives et standard ?",
];

const sampleResponses: Record<string, string> = {
  "summer camp": `🏕️ **Summer Camp KLF**\n\nPlusieurs de nos écoles partenaires proposent des programmes Summer Camp pour les juniors :\n\n- **Ifalpes Annecy** — Camp d'été avec activités nautiques sur le lac d'Annecy, randonnées et cours de français le matin.\n- **LSF Montpellier** — Programme estival combinant cours de français et activités culturelles dans le sud de la France.\n\nPour obtenir les dates exactes et tarifs 2026, je vous recommande de consulter notre brochure Junior Camp ou de contacter directement un conseiller KLF.`,
  "annecy": `🏔️ **Séjour en famille d'accueil à Annecy — Ifalpes**\n\nPour un séjour de 3 semaines en hébergement famille d'accueil en demi-pension à Annecy :\n\n- **Cours standard (20h/sem)** + hébergement famille demi-pension\n- Consultez notre grille tarifaire 2026 pour les prix exacts\n- L'hébergement en famille d'accueil inclut : chambre individuelle, petit-déjeuner et dîner\n\n📋 Pour un devis personnalisé, cliquez sur le bouton \"Parler à un conseiller\" ci-dessous.`,
  "juniors": `👦 **Programmes Juniors KLF**\n\nNos programmes juniors sont disponibles dans plusieurs destinations :\n\n- **Summer Camp** (Annecy, Montpellier)\n- **Séjours linguistiques juniors** (13-17 ans)\n- **Programmes famille** (parent + enfant)\n\nChaque programme comprend : cours de français, activités, hébergement et pension complète.\n\nConsultez notre brochure \"Junior Camp\" dans la bibliothèque PDF pour tous les détails.`,
  "default": `Merci pour votre question ! En tant qu'assistant IA KLF, je peux vous aider avec des informations sur :\n\n- 📍 Nos destinations (Montpellier, Annecy, Lyon, Toulouse, Bordeaux, Paris)\n- 🏫 Nos écoles partenaires\n- 💰 Les tarifs et formules\n- 🏠 Les options d'hébergement\n- 📅 Les dates et durées des programmes\n\n*Ceci est un template de démonstration. En production, cet assistant sera alimenté par l'IA et les brochures KLF pour répondre avec précision à toutes vos questions.*`,
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("summer") || lower.includes("camp")) return sampleResponses["summer camp"];
  if (lower.includes("annecy") || lower.includes("famille") || lower.includes("hébergement")) return sampleResponses["annecy"];
  if (lower.includes("junior") || lower.includes("jeune") || lower.includes("enfant")) return sampleResponses["juniors"];
  return sampleResponses["default"];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! 👋 Je suis l'assistant virtuel **Keep Learning French**. Je connais toutes nos brochures, tarifs et programmes.\n\nComment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-klf-lavender-light/50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-klf-lavender/30 px-8 py-5">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-klf-pink to-klf-blue flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-klf-blue">Assistant Virtuel KLF</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-klf-blue/50">En ligne — Alimenté par IA + Brochures KLF</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-4xl space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-bubble-enter flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-klf-pink to-klf-blue text-white rounded-br-md"
                    : "bg-white text-klf-blue shadow-md border border-klf-lavender/20 rounded-bl-md"
                }`}
              >
                <div
                  className={`text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "assistant" ? "text-klf-blue/80" : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>"),
                  }}
                />
                <p
                  className={`text-[10px] mt-2 ${
                    msg.role === "user" ? "text-white/50" : "text-klf-blue/30"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md px-5 py-4 shadow-md border border-klf-lavender/20">
                <div className="flex gap-1.5">
                  <span className="typing-dot w-2 h-2 bg-klf-pink rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-klf-pink/70 rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-klf-pink/40 rounded-full" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-8 pb-4">
          <div className="max-w-4xl">
            <p className="text-xs text-klf-blue/40 font-medium mb-3">Questions suggérées :</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-4 py-2 bg-white border border-klf-lavender/40 rounded-full text-klf-blue/70 hover:bg-klf-lavender-light hover:text-klf-blue hover:border-klf-pink/30 transition-all duration-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-klf-lavender/30 px-8 py-4">
        <div className="max-w-4xl">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Posez votre question sur les programmes KLF..."
                className="w-full px-5 py-3.5 bg-klf-lavender-light/50 border border-klf-lavender/30 rounded-xl text-sm text-klf-blue placeholder:text-klf-blue/30 focus:outline-none focus:ring-2 focus:ring-klf-pink/30 focus:border-klf-pink/50 transition-all"
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="px-5 py-3.5 bg-gradient-to-r from-klf-pink to-klf-blue text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Talk to Advisor Button */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-[10px] text-klf-blue/30">
              Assistant IA alimenté par les brochures KLF — Les réponses peuvent être approximatives
            </p>
            <a
              href="mailto:agents@klf.fr?subject=Question%20Agent%20-%20Demande%20de%20conseiller"
              className="flex items-center gap-2 px-4 py-2 bg-klf-lavender-light border border-klf-lavender rounded-full hover:bg-klf-pink hover:text-white hover:border-klf-pink transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-klf-pink group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs font-semibold text-klf-blue group-hover:text-white transition-colors">
                Parler à un conseiller KLF
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
