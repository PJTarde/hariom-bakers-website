import { Link } from "react-router-dom";
import { ShoppingCart, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/hariom-logo.png"
            alt="Hariom Bakers"
            className="h-10 w-auto"
          />

          <div>
            <h1 className="font-display text-xl font-bold text-foreground leading-tight">
              Hariom Bakers
            </h1>

            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              Sambhaji Nagar
            </p>
          </div>
        </Link>

        {/* Menu Section */}
        <div className="flex items-center gap-6">
          <Link
            to="/menu"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Menu
          </Link>

          <Link
            to="/customize"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Custom Cake
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-warm-brown-light"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart

            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;