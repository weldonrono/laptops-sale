import React, { useState } from 'react';
import { LAPTOP_CATALOG } from '../data/laptops';
import { useCart } from '../context/CartContext';
import {
  Cpu,
  Monitor,
  Flame,
  Layers,
  BatteryCharging,
  Sliders,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Volume2,
  Gauge,
  Eye,
  Thermometer,
} from 'lucide-react';

export const FeatureShowcase: React.FC = () => {
  const { addToCart, setActiveConfigLaptop } = useCart();
  const laptop = LAPTOP_CATALOG[0]; // AURA Pro 16
  const [activeTab, setActiveTab] = useState<number>(0);

  // Interactive state for Silicon simulation
  const [workload, setWorkload] = useState<'8k_render' | 'llm_inference' | 'unreal_compile'>('8k_render');

  // Interactive state for Display simulation
  const [displayMode, setDisplayMode] = useState<'sdr' | 'hdr' | 'calibrated'>('hdr');

  // Interactive state for Thermal simulation
  const [thermalProfile, setThermalProfile] = useState<'whisper' | 'studio' | 'maximum'>('studio');

  // Interactive state for Battery slider (minutes of charge)
  const [chargeMinutes, setChargeMinutes] = useState<number>(28);

  const workloads = {
    '8k_render': {
      title: '8K ProRes 422 HQ Export',
      speed: '142 FPS',
      power: '64W',
      noise: '24 dB (Barely Audible)',
      efficiency: '4.8× vs Previous Gen',
    },
    'llm_inference': {
      title: 'Llama-3 70B Local Inference',
      speed: '38.4 tokens/sec',
      power: '78W',
      noise: '28 dB (Quiet Studio)',
      efficiency: 'Unified 800GB/s Bandwidth',
    },
    'unreal_compile': {
      title: 'Unreal Engine 5.4 Full C++ Build',
      speed: '2m 14s total',
      power: '135W',
      noise: '36 dB (Gentle Whoosh)',
      efficiency: '16 Parallel Cores Active',
    },
  };

  const thermalProfiles = {
    whisper: { label: 'Silent Studio', temp: '48°C', acoustic: '19 dB', watts: '45W' },
    studio: { label: 'Balanced Creative', temp: '62°C', acoustic: '27 dB', watts: '95W' },
    maximum: { label: 'Maximum 150W Sustain', temp: '74°C', acoustic: '37 dB', watts: '150W' },
  };

  const featureTabs = [
    {
      id: 'silicon',
      label: 'Silicon Architecture',
      icon: Cpu,
      number: '01',
    },
    {
      id: 'display',
      label: '1600-Nit Display',
      icon: Monitor,
      number: '02',
    },
    {
      id: 'thermals',
      label: 'CryoFlow Thermals',
      icon: Flame,
      number: '03',
    },
    {
      id: 'chassis',
      label: 'Aerospace Billet CNC',
      icon: Layers,
      number: '04',
    },
    {
      id: 'battery',
      label: 'FAA Max 99.8Wh Battery',
      icon: BatteryCharging,
      number: '05',
    },
  ];

  return (
    <section id="features" className="border-b border-neutral-800/80 bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
              <span>Deep Architecture Showcase</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-400">VIDAL 254 Pro 16 Max</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
              Scroll Every Engineering Layer
            </h2>
            <p className="mt-3 max-w-2xl text-base text-neutral-400">
              Inspect silicon benchmarks, optical Mini-LED calibration, cryogenic vapor thermals, and aerospace CNC machining.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveConfigLaptop(laptop)}
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-neutral-200 border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Customize Specs</span>
            </button>
            <button
              onClick={() => addToCart(laptop)}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
            >
              <span>Add to Bag</span>
              <span className="font-mono tabular-nums text-neutral-900 font-bold">$2,499</span>
            </button>
          </div>
        </div>

        {/* Feature Navigation Bar (interactive segmented controls) */}
        <div className="mt-8 flex overflow-x-auto pb-4 gap-2 no-scrollbar border-b border-neutral-900">
          {featureTabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700 shadow-inner'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60 border border-transparent'
                }`}
              >
                <span className="font-mono text-[11px] text-amber-400/90">{tab.number}</span>
                <Icon className={`h-4 w-4 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Stage */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Descriptive Editorial & Quantitative Rigor */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-8 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                <span className="text-amber-400 font-semibold">{featureTabs[activeTab].number}</span>
                <span aria-hidden="true">/</span>
                <span className="uppercase tracking-wider">{laptop.features[activeTab]?.visualTag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight [text-wrap:balance]">
                {laptop.features[activeTab]?.headline}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed">
                {laptop.features[activeTab]?.description}
              </p>

              {/* Highlight callout without pill badge */}
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80 p-4">
                <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-neutral-300">
                  {laptop.features[activeTab]?.highlight}
                </p>
              </div>

              {/* Quantitative Metrics Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-800/70 pt-6">
                {laptop.features[activeTab]?.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xs text-neutral-500">{metric.label}</span>
                    <span className="mt-1 text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-neutral-800/70 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-neutral-400">
                <span>Standard with VIDAL 254 Pro 16 Max</span>
                <span aria-hidden="true" className="mx-2 text-neutral-700">·</span>
                <span>3-Year Hardware Warranty</span>
              </div>
              <button
                onClick={() => setActiveConfigLaptop(laptop)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <span>Select this configuration</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Interactive Sandbox for each feature */}
          <div className="lg:col-span-6 flex flex-col rounded-2xl border border-neutral-800/80 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-sm">
            {/* Feature 0: Silicon Simulator */}
            {activeTab === 0 && (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Live Silicon Workload Benchmarking
                    </div>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      3nm Architecture Active
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-400">
                    Switch between simulated creative and engineering loads to view live power draw and acoustic levels:
                  </p>

                  {/* Workload Selectors */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => setWorkload('8k_render')}
                      className={`p-3 rounded-lg text-left text-xs font-medium transition-colors border cursor-pointer ${
                        workload === '8k_render'
                          ? 'bg-neutral-800 border-amber-400 text-white'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">8K ProRes RAW</div>
                      <div className="text-[10px] text-neutral-500 mt-1">DaVinci Resolve Studio</div>
                    </button>

                    <button
                      onClick={() => setWorkload('llm_inference')}
                      className={`p-3 rounded-lg text-left text-xs font-medium transition-colors border cursor-pointer ${
                        workload === 'llm_inference'
                          ? 'bg-neutral-800 border-amber-400 text-white'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">Llama-3 70B LLM</div>
                      <div className="text-[10px] text-neutral-500 mt-1">Local Ollama / vLLM</div>
                    </button>

                    <button
                      onClick={() => setWorkload('unreal_compile')}
                      className={`p-3 rounded-lg text-left text-xs font-medium transition-colors border cursor-pointer ${
                        workload === 'unreal_compile'
                          ? 'bg-neutral-800 border-amber-400 text-white'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-semibold">Unreal Engine 5</div>
                      <div className="text-[10px] text-neutral-500 mt-1">Full C++ Clang compilation</div>
                    </button>
                  </div>

                  {/* Active Simulation Readouts */}
                  <div className="mt-6 rounded-xl bg-neutral-950 p-5 border border-neutral-800">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                      <span className="text-sm font-semibold text-white">{workloads[workload].title}</span>
                      <span className="text-xs font-mono text-amber-400 font-bold">{workloads[workload].speed}</span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                          <Gauge className="h-3.5 w-3.5 text-neutral-400" />
                          <span>Continuous Power</span>
                        </div>
                        <div className="mt-1 text-base font-bold font-mono text-neutral-200">
                          {workloads[workload].power}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                          <Volume2 className="h-3.5 w-3.5 text-neutral-400" />
                          <span>Acoustic Output</span>
                        </div>
                        <div className="mt-1 text-base font-bold font-mono text-neutral-200">
                          {workloads[workload].noise}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded bg-neutral-900/80 p-3 text-xs text-neutral-300 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{workloads[workload].efficiency}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-xs text-neutral-400">
                  <span>Unified memory architecture eliminates PCIe bus bottlenecks.</span>
                </div>
              </div>
            )}

            {/* Feature 1: Display Calibration Simulator */}
            {activeTab === 1 && (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Display Calibrator & Luminance Preview
                    </div>
                    <span className="text-xs font-mono text-amber-400">10,240 Mini-LED Zones</span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-400">
                    Compare standard laptop panels with factory-calibrated Liquid ProVision Mini-LED:
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setDisplayMode('sdr')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                        displayMode === 'sdr'
                          ? 'bg-neutral-800 border-neutral-500 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Standard SDR (400 nits)
                    </button>
                    <button
                      onClick={() => setDisplayMode('hdr')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                        displayMode === 'hdr'
                          ? 'bg-neutral-800 border-amber-400 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      Liquid HDR (1600 nits Peak)
                    </button>
                    <button
                      onClick={() => setDisplayMode('calibrated')}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                        displayMode === 'calibrated'
                          ? 'bg-neutral-800 border-amber-400 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      DCI-P3 Mastering (ΔE &lt; 0.7)
                    </button>
                  </div>

                  {/* Visual Screen simulation box */}
                  <div className="mt-6 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 relative aspect-[16/9] flex items-center justify-center p-6 text-center">
                    {displayMode === 'sdr' && (
                      <div className="space-y-2 opacity-60">
                        <div className="text-xs font-mono text-neutral-400">Standard 400-Nit SDR Simulation</div>
                        <div className="text-sm text-neutral-300">Lifted black levels (0.2 nits) and compressed highlights</div>
                        <div className="inline-block text-[11px] font-mono text-neutral-500">sRGB 96% coverage</div>
                      </div>
                    )}

                    {displayMode === 'hdr' && (
                      <div className="space-y-3 relative z-10">
                        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/30">
                          <Eye className="h-3.5 w-3.5" />
                          <span>1,600 Nits Full Sustained Peak</span>
                        </div>
                        <div className="text-base font-bold text-white tracking-wide">
                          True 0.00005 Nit Pure Blacks
                        </div>
                        <div className="text-xs text-neutral-300 max-w-sm">
                          1,000,000:1 real contrast ratio with zero edge bleed or blooming artifacts.
                        </div>
                      </div>
                    )}

                    {displayMode === 'calibrated' && (
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-emerald-400">Spectrophotometer Report</div>
                        <div className="text-sm font-semibold text-white">Delta-E Avg: 0.68 · Max: 1.12</div>
                        <div className="flex justify-center gap-3 text-[11px] font-mono text-neutral-400 mt-2">
                          <span>DCI-P3: 100%</span>
                          <span>·</span>
                          <span>Adobe RGB: 99.4%</span>
                          <span>·</span>
                          <span>Rec.2020: 88%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-xs text-neutral-400">
                  Variable 120Hz ProMotion dynamically drops to 24Hz when viewing films to preserve battery.
                </div>
              </div>
            )}

            {/* Feature 2: CryoFlow Thermals */}
            {activeTab === 2 && (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Acoustic & Thermal Regulator
                    </div>
                    <span className="text-xs font-mono text-amber-400">Gallium Liquid Metal TIM</span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-400">
                    Select acoustic profile to view real-time silicon temperature and fan noise under load:
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {(['whisper', 'studio', 'maximum'] as const).map((key) => (
                      <button
                        key={key}
                        onClick={() => setThermalProfile(key)}
                        className={`p-3 rounded-lg text-left text-xs transition-colors border cursor-pointer ${
                          thermalProfile === key
                            ? 'bg-neutral-800 border-amber-400 text-white'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        <div className="font-semibold">{thermalProfiles[key].label}</div>
                        <div className="text-[10px] text-neutral-500 mt-1">{thermalProfiles[key].watts}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl bg-neutral-950 p-5 border border-neutral-800">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                          <Thermometer className="h-4 w-4 text-amber-400" />
                          <span>Die Temperature</span>
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono text-white">
                          {thermalProfiles[thermalProfile].temp}
                        </div>
                        <div className="mt-1 text-[11px] text-neutral-500">Liquid metal vapor dissipation</div>
                      </div>

                      <div>
                        <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                          <Volume2 className="h-4 w-4 text-neutral-400" />
                          <span>Sound Pressure</span>
                        </div>
                        <div className="mt-2 text-2xl font-bold font-mono text-white">
                          {thermalProfiles[thermalProfile].acoustic}
                        </div>
                        <div className="mt-1 text-[11px] text-neutral-500">Twin aeronautic impellers</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-neutral-400">
                  Bottom intake gills with rear concealed hinge exhaust preserve clean, pristine desk airflow.
                </div>
              </div>
            )}

            {/* Feature 3: CNC Chassis & Craftsmanship */}
            {activeTab === 3 && (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Structural Metallurgy
                    </div>
                    <span className="text-xs font-mono text-amber-400">Series 7000 Alloy</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-lg bg-neutral-950 p-4 border border-neutral-800">
                      <div className="text-xs font-semibold text-white">5-Axis Billet Machining</div>
                      <div className="text-xs text-neutral-400 mt-1">
                        Milled from a solid 6.8kg ingot down to an ultra-rigid 2.14kg unibody shell.
                      </div>
                    </div>

                    <div className="rounded-lg bg-neutral-950 p-4 border border-neutral-800">
                      <div className="text-xs font-semibold text-white">Solid-State Haptic Glass Force Trackpad</div>
                      <div className="text-xs text-neutral-400 mt-1">
                        Dual linear resonant actuators simulate natural mechanical clicks anywhere on the entire 160mm surface.
                      </div>
                    </div>

                    <div className="rounded-lg bg-neutral-950 p-4 border border-neutral-800">
                      <div className="text-xs font-semibold text-white">Laser Acoustic Micro-Grilles</div>
                      <div className="text-xs text-neutral-400 mt-1">
                        3,480 individual 0.3mm perforations drill through the aluminum deck for uninhibited spatial stereo sound.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-neutral-400">
                  Zero chassis flex under 150 lbs of vertical palm pressure.
                </div>
              </div>
            )}

            {/* Feature 4: Battery & Charging Simulator */}
            {activeTab === 4 && (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                      140W GaN Fast-Charge Curve
                    </div>
                    <span className="text-xs font-mono text-emerald-400">FAA 99.8Wh Maximum</span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-400">
                    Adjust charge time to simulate battery percentage and flight duration:
                  </p>

                  <div className="mt-6 rounded-xl bg-neutral-950 p-5 border border-neutral-800">
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span>Plugged into 140W GaN Adapter</span>
                      <span className="font-mono text-white font-bold">{chargeMinutes} Minutes</span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={90}
                      step={2}
                      value={chargeMinutes}
                      onChange={(e) => setChargeMinutes(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                    />

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-neutral-500">Battery Level</div>
                        <div className="mt-1 text-2xl font-bold font-mono text-amber-400">
                          {Math.min(100, Math.round((chargeMinutes / 60) * 100))}%
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-neutral-500">Run Time Available</div>
                        <div className="mt-1 text-2xl font-bold font-mono text-white">
                          {(Math.min(100, Math.round((chargeMinutes / 60) * 100)) * 0.21).toFixed(1)} hrs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-neutral-400">
                  Silicon chemistry preserves 80% original capacity after 1,200 full charge cycles.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
