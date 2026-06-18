import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  gradient: string;
}

const Footer: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "Thanks to DocuBrain for making document understanding effortless. It changed how I structure lecture prep.",
      author: "John",
      role: "Teacher",
      gradient: "from-indigo-500 to-cyan-500"
    },
    {
      quote: "Grateful to DocuBrain for helping us work smarter with documents. Studying research papers is 10x faster now.",
      author: "Ryan",
      role: "Student",
      gradient: "from-fuchsia-500 to-indigo-500"
    },
    {
      quote: "DocuBrain made working with dense contracts and files so much easier. The interactive chat citations are a lifesaver.",
      author: "Emily",
      role: "Legal Advisor",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-24 px-4 bg-zinc-950 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-xs uppercase font-extrabold text-fuchsia-400 tracking-widest mb-3">Wall of Love</h2>
        <h3 className="text-3xl md:text-4.5xl font-extrabold tracking-tight">What our users are saying</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative group overflow-hidden">
            {/* Ambient hover glow */}
            <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-xl transition-all duration-500`} />
            
            <div>
              {/* Quote marks icon */}
              <span className="text-5xl font-serif text-zinc-700/60 select-none leading-none inline-block mb-2">“</span>
              <p className="text-zinc-300 text-sm font-light leading-relaxed relative z-10 -mt-4">
                {t.quote}
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-8 pt-5 border-t border-white/5">
              {/* SVG Profile Avatar */}
              <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} p-0.5 flex items-center justify-center shadow-lg`}>
                <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase">
                  {t.author.substring(0, 2)}
                </div>
              </div>
              <div>
                <p className="font-bold text-zinc-100 text-sm">{t.author}</p>
                <p className={`text-xs font-semibold bg-gradient-to-r ${t.gradient} text-transparent bg-clip-text mt-0.5`}>
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Footer;