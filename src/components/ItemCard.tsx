import { Star, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ItemCardProps {
  product: Product;
  compact?: boolean;
}

const ItemCard = ({ product, compact }: ItemCardProps) => {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className={`${compact ? "h-32" : "h-40"} w-full overflow-hidden`}>
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover"
  />
</div>
      <div className="p-3.5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-display text-sm font-semibold leading-snug">{product.name}</h3>
          {product.isVeg && (
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-green-600">
              <span className="h-2 w-2 rounded-full bg-green-600" />
            </span>
          )}
        </div>
        {product.description && !compact && (
          <p className="mb-2 text-xs text-muted-foreground line-clamp-1">{product.description}</p>
        )}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
            <Star className="h-3 w-3 fill-current" /> {product.rating}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display text-base font-bold">₹{product.price}</span>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
            className="flex items-center gap-1 rounded-md border border-primary bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> ADD
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
