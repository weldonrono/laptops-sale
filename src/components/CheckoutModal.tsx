import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShippingAddress, PaymentMethodType } from '../types/laptop';
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Loader2,
  Sparkles,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    tax,
    shippingCost,
    total,
    placeOrder,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping, 2: Method & Payment, 3: Processing
  const [isProcessing, setIsProcessing] = useState(false);

  // Shipping Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Alex Vance',
    email: 'alex.vance@studio-engineering.io',
    phone: '+1 (555) 392-8819',
    street: '450 Innovation Parkway, Suite 400',
    apartment: 'Floor 4',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('891');
  const [cardName, setCardName] = useState('Alex Vance');

  // M-Pesa details
  const [mpesaPhone, setMpesaPhone] = useState('+254 712 345 678');
  const [mpesaPushSent, setMpesaPushSent] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!address.fullName || !address.email || !address.street || !address.city || !address.postalCode) {
      alert('Please fill out all required shipping fields.');
      return false;
    }
    return true;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleFinalOrderSubmit = () => {
    setIsProcessing(true);

    if (paymentMethod === 'mpesa') {
      setMpesaPushSent(true);
    }

    // Simulate real bank/payment network authorization & silicon scheduling
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder(address, shippingMethod, paymentMethod);
    }, 1800);
  };

  const finalShippingAmount = shippingMethod === 'express' ? 29 : shippingCost;
  const grandTotal = subtotal - discount + tax + finalShippingAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        {!isProcessing && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute right-5 top-5 rounded-lg p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="pb-6 border-b border-neutral-900">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Direct Silicon Acquisition
          </h2>

          {/* Stepper */}
          <div className="mt-4 flex items-center gap-4 text-xs font-mono">
            <span className={step >= 1 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}>
              01. Shipping Destination
            </span>
            <span className="text-neutral-700">/</span>
            <span className={step >= 2 ? 'text-amber-400 font-semibold' : 'text-neutral-500'}>
              02. Payment & Courier
            </span>
          </div>
        </div>

        {/* Processing Screen */}
        {isProcessing ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
            <Loader2 className="h-10 w-10 text-amber-400 animate-spin" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white font-display">
                {paymentMethod === 'mpesa'
                  ? 'Prompt Sent to Mobile Phone...'
                  : 'Authorizing Silicon Order & Payment...'}
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm">
                {paymentMethod === 'mpesa'
                  ? `Please enter your M-Pesa PIN on ${mpesaPhone} to complete your order.`
                  : 'Securing factory assembly queue, generating order ID and packaging logistics...'}
              </p>
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              Munich Cleanroom Dispatch · Zero Lead Time Delay
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form: Step 1 or Step 2 */}
            <div className="lg:col-span-7">
              {step === 1 && (
                <form onSubmit={handleNextToPayment} className="space-y-4">
                  <div className="text-sm font-semibold text-white mb-2">Shipping Information</div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={address.fullName}
                      onChange={handleAddressChange}
                      className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={address.email}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Mobile / Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={address.phone}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Street Address *</label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={address.street}
                      onChange={handleAddressChange}
                      className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Apt / Suite</label>
                      <input
                        type="text"
                        name="apartment"
                        value={address.apartment}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={address.city}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">State / Region</label>
                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Postal / ZIP Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={address.postalCode}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 block mb-1">Country *</label>
                      <select
                        name="country"
                        value={address.country}
                        onChange={handleAddressChange}
                        className="w-full rounded-lg bg-neutral-900 px-3.5 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none cursor-pointer"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Australia">Australia</option>
                        <option value="Japan">Japan</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Continue to Courier & Payment</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {/* Courier Option */}
                  <div>
                    <div className="text-sm font-semibold text-white mb-2">Delivery Service Speed</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setShippingMethod('standard')}
                        className={`p-3.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          shippingMethod === 'standard'
                            ? 'border-amber-400 bg-neutral-900 text-white'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        <div className="flex justify-between items-center font-semibold text-white">
                          <span>Worldwide Insured Express</span>
                          <span className="font-mono text-emerald-400">FREE</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          Delivery in 3–4 business days via DHL Express
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShippingMethod('express')}
                        className={`p-3.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                          shippingMethod === 'express'
                            ? 'border-amber-400 bg-neutral-900 text-white'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        <div className="flex justify-between items-center font-semibold text-white">
                          <span>Priority Air Overnight</span>
                          <span className="font-mono text-amber-400">+$29</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          Next-day white-glove direct courier delivery
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <div className="text-sm font-semibold text-white mb-2">Payment Mechanism</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-lg border text-xs text-center transition-colors cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'border-amber-400 bg-neutral-900 text-white'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        <CreditCard className="h-4 w-4 mx-auto mb-1 text-amber-400" />
                        <span>Credit / Debit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mpesa')}
                        className={`p-3 rounded-lg border text-xs text-center transition-colors cursor-pointer ${
                          paymentMethod === 'mpesa'
                            ? 'border-amber-400 bg-neutral-900 text-white'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        <Smartphone className="h-4 w-4 mx-auto mb-1 text-emerald-400" />
                        <span>M-Pesa STK</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple_pay')}
                        className={`p-3 rounded-lg border text-xs text-center transition-colors cursor-pointer ${
                          paymentMethod === 'apple_pay'
                            ? 'border-amber-400 bg-neutral-900 text-white'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        <span className="font-bold text-xs block mb-1"> Pay</span>
                        <span>Apple Pay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-lg border text-xs text-center transition-colors cursor-pointer ${
                          paymentMethod === 'cod'
                            ? 'border-amber-400 bg-neutral-900 text-white'
                            : 'border-neutral-800 bg-neutral-950 text-neutral-400'
                        }`}
                      >
                        <Truck className="h-4 w-4 mx-auto mb-1 text-blue-400" />
                        <span>Pay on Delivery</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Details Container */}
                  {paymentMethod === 'card' && (
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-3">
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full rounded-lg bg-neutral-950 px-3 py-2 text-xs text-white font-mono border border-neutral-800 focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">Expiration</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full rounded-lg bg-neutral-950 px-3 py-2 text-xs text-white font-mono border border-neutral-800 focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">CVC Code</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full rounded-lg bg-neutral-950 px-3 py-2 text-xs text-white font-mono border border-neutral-800 focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full rounded-lg bg-neutral-950 px-3 py-2 text-xs text-white border border-neutral-800 focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'mpesa' && (
                    <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 space-y-3">
                      <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Smartphone className="h-4 w-4" />
                        <span>M-Pesa Express STK Push</span>
                      </div>
                      <p className="text-[11px] text-neutral-400">
                        An instant authorization push will appear on your Safaricom line to authorize the payment in KES equivalent.
                      </p>
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Safaricom Mobile Number</label>
                        <input
                          type="text"
                          value={mpesaPhone}
                          onChange={(e) => setMpesaPhone(e.target.value)}
                          className="w-full rounded-lg bg-neutral-950 px-3 py-2 text-xs text-white font-mono border border-neutral-800 focus:border-emerald-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple_pay' && (
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-center space-y-2">
                      <div className="text-sm font-semibold text-white">Apple Pay Ready</div>
                      <p className="text-xs text-neutral-400">
                        Biometric Touch ID / Face ID authorization will prompt upon confirmation.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 space-y-2">
                      <div className="text-xs font-semibold text-white">Cash / POS On Delivery</div>
                      <p className="text-[11px] text-neutral-400">
                        Inspect the tamper-evident serial seal upon courier delivery before providing payment via card terminal or cash.
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to Shipping</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFinalOrderSubmit}
                      className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
                    >
                      <span>Authorize & Place Order</span>
                      <span className="font-mono tabular-nums">${grandTotal.toLocaleString()}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Summary: Live Order Breakdown */}
            <div className="lg:col-span-5 rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-5 space-y-4">
              <div className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Order Manifest ({cart.length} Models)
              </div>

              <div className="max-h-56 overflow-y-auto space-y-3 divide-y divide-neutral-900 pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-2 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.laptop.image}
                      alt={item.laptop.name}
                      className="h-12 w-12 rounded object-cover bg-neutral-950 border border-neutral-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-white truncate font-display">
                        {item.laptop.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        {item.config.ram} · {item.config.storage} · {item.config.color}
                      </div>
                      <div className="text-[10px] text-neutral-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-white tabular-nums">
                      ${(item.itemPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-800 pt-3 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Promo Discount</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Sales Tax</span>
                  <span className="text-white">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Courier Delivery</span>
                  <span className="text-emerald-400">
                    {finalShippingAmount === 0 ? 'FREE' : `$${finalShippingAmount}`}
                  </span>
                </div>
                <div className="border-t border-neutral-800 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Acquisition Total</span>
                  <span className="text-amber-400">${grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="rounded-lg bg-neutral-950/80 p-3 border border-neutral-800/80 text-[11px] text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                  <span>Buyer Protection Guaranteed</span>
                </div>
                <p>Includes full transit insurance, tamper-evident seals, and priority cleanroom assembly.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
