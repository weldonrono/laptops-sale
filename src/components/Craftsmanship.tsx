import React from 'react';
import { ShieldCheck, Award, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  const pillars = [
    {
      title: 'Zero Bloatware Guarantee',
      desc: 'Our operating systems ship completely pristine. No trial antivirus, no OEM promo software, no background telemetry junk. Only raw unthrottled performance.',
      metric: '0.0% Overhead',
    },
    {
      title: 'Individual Optical Calibration',
      desc: 'Every single Mini-LED and OLED panel undergoes an individualized 48-point spectrophotometer color pass. A physical signed Delta-E report card is included in every box.',
      metric: 'ΔE < 0.8 Certified',
    },
    {
      title: 'Right-to-Repair Architecture',
      desc: 'Standard Torx T5 fasteners with modular socketed dual NVMe slots, serviceable battery packs, and freely published schematics. We respect ownership.',
      metric: '9/10 Repairability',
    },
    {
      title: 'Anechoic Chamber Acoustic Testing',
      desc: 'Tested inside calibrated acoustic chambers to ensure fan harmonics never create shrill high-frequency whines. Even at maximum 150W compute, acoustics stay gentle.',
      metric: '< 38 dB Full Load',
    },
  ];

  return (
    <section id="craftsmanship" className="border-b border-neutral-800/80 bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
            <span>Silicon Philosophy</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>Munich Cleanrooms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Craftsmanship Rooted in Physical Rigor
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            We reject the disposable planned-obsolescence hardware cycle. Every VIDAL254 machine is built as an heirloom-grade computational instrument.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 hover:border-neutral-700 transition-colors"
            >
              <div>
                <div className="text-xs font-mono text-amber-400/90 mb-3">{pillar.metric}</div>
                <h3 className="text-base font-bold text-white font-display">{pillar.title}</h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center gap-2 text-xs text-neutral-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Verified in Cleanroom QA</span>
              </div>
            </div>
          ))}
        </div>

        {/* Adjacency Proof Box */}
        <div className="mt-12 rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                3-Year
              </div>
              <div className="text-xs text-neutral-400 mt-1">Full Hardware Warranty</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                100%
              </div>
              <div className="text-xs text-neutral-400 mt-1">Recycled Aerospace Alloy</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                30 Days
              </div>
              <div className="text-xs text-neutral-400 mt-1">Hassle-Free Return Window</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
                4.95 / 5
              </div>
              <div className="text-xs text-neutral-400 mt-1">Verified Customer Score</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
