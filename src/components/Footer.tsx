import React from 'react';
import { useCart } from '../context/CartContext';
import { Shield, Truck, RotateCcw, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsCompareOpen, setIsOrderHistoryOpen } = useCart();

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400">
      {/* Trust Markers Bar */}
      <div className="border-b border-neutral-900/80 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Insured Worldwide Courier</div>
                <div className="text-neutral-500">Free 3-day express on all laptop orders</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-white">3-Year Precision Warranty</div>
                <div className="text-neutral-500">Full hardware parts & silicon guarantee</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
                <RotateCcw className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-white">30-Day Evaluation Period</div>
                <div className="text-neutral-500">100% refund with prepaid return label</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-amber-400">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-white">Zero Bloatware Preload</div>
                <div className="text-neutral-500">Pristine operating system installation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">
              Laptops
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#laptops" className="hover:text-white transition-colors">VIDAL 254 Pro 16 Max</a></li>
              <li><a href="#laptops" className="hover:text-white transition-colors">VIDAL 254 Air 14 Ultrabook</a></li>
              <li><a href="#laptops" className="hover:text-white transition-colors">VIDAL 254 Titan 16X Extreme</a></li>
              <li><a href="#laptops" className="hover:text-white transition-colors">VIDAL 254 Edge 15 Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">
              Hardware
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Silicon Architecture</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">ProVision Display</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">CryoFlow Thermals</a></li>
              <li>
                <button
                  onClick={() => setIsCompareOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Comparison Matrix
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">
              Support & Orders
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setIsOrderHistoryOpen(true)}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Track Existing Order
                </button>
              </li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Warranty & Service</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Right to Repair Guides</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Spectrophotometer QA</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">
              VIDAL254COMPUTING
            </h4>
            <p className="text-xs leading-relaxed text-neutral-400">
              High-performance precision computational instruments engineered by VIDAL254 for creators, developers, and researchers.
            </p>
            <div className="mt-4 text-xs text-neutral-500 font-mono">
              Silicon Lab · ISO 9001
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} VIDAL254COMPUTING Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Sale</span>
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Export Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
