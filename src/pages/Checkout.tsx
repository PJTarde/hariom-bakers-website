import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Checkout = () => {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("upi");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const handleOrder = () => {
    clearCart();
    navigate("/");
    // In a real app, this would submit to a backend
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: "📱", desc: "Google Pay, PhonePe, Paytm" },
    { id: "card", label: "Card", icon: "💳", desc: "Credit / Debit Card" },
    { id: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
  ];

  return (
    <div className="container max-w-2xl py-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold mb-6">Checkout</h1>

        {/* Customer Details */}
        <div className="mb-6 rounded-lg border border-border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">Delivery Details</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
            <textarea
              placeholder="Delivery Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6 rounded-lg border border-border bg-card p-5">
          <h3 className="font-display font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Packaging</span>
              <span>₹25</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-display font-bold">
              <span>Total</span>
              <span>₹{totalAmount + 25}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-6 rounded-lg border border-border bg-card p-5">
          <h3 className="font-display font-semibold mb-4">Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setPayment(m.id)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-left transition-colors ${
                  payment === m.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <div>
                  <p className="text-sm font-medium">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleOrder}
          disabled={!form.name || !form.phone || !form.address}
          className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-warm-brown-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Place Order · ₹{totalAmount + 25}
        </button>
      </motion.div>
    </div>
  );
};

export default Checkout;
