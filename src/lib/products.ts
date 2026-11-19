import sleeveless from "@/assets/products/sleeveless.jpg.asset.json";
import hoodie from "@/assets/products/hoodie.jpg.asset.json";
import cap from "@/assets/products/trucker-cap.jpg.asset.json";
import nfrTee from "@/assets/products/no-free-rides-tee.png.asset.json";
import lookbook from "@/assets/brand/street-lookbook.jpg.asset.json";

export type ProductImage = { src: string; alt: string; fit?: "cover" | "contain" };

export type Product = {
  slug: string;
  name: string;
  line: string;
  /** PLACEHOLDER price in Rand — edit to the real price. */
  price: number;
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  images: ProductImage[];
  badge?: string;
};

const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];

/**
 * ============================================================
 *  PRODUCTS — edit names, PRICES (Rand), descriptions, sizes here.
 *  All four prices below are PLACEHOLDERS until confirmed.
 * ============================================================
 */
export const products: Product[] = [
  {
    slug: "long-live-dr-sleeveless-shirt",
    name: "Long Live DR Sleeveless Shirt",
    line: "Long Live DR",
    price: 499, // PLACEHOLDER
    description:
      "A cut-off sleeveless shirt carrying the full Mandela Motion back graphic — bold flared lettering framing the seated figure artwork. Built for heat, stages and the street.",
    details: [
      "Sleeveless cut with raw open armholes",
      "Large Mandela Motion graphic",
      "Relaxed, boxy fit",
    ],
    sizes: APPAREL_SIZES,
    colors: ["White"],
    images: [
      { src: sleeveless.url, alt: "Long Live DR sleeveless shirt in white with Mandela Motion graphic", fit: "contain" },
    ],
    badge: "New drop",
  },
  {
    slug: "long-live-dr-hoodie",
    name: "Long Live DR Hoodie",
    line: "Long Live DR",
    price: 899, // PLACEHOLDER
    description:
      "Heavyweight-look black hoodie with a cropped, boxy body and dropped shoulders. Twin MM claw marks across the chest in acid green.",
    details: ["Cropped boxy silhouette", "Dropped shoulders, ribbed hem", "Twin MM chest graphic"],
    sizes: APPAREL_SIZES,
    colors: ["Black"],
    images: [{ src: hoodie.url, alt: "Black Long Live DR hoodie with green MM graphic against a brick wall" }],
    badge: "Limited",
  },
  {
    slug: "mm-tour-trucker-cap",
    name: "MM Tour Trucker Cap",
    line: "MM Tour",
    price: 399, // PLACEHOLDER
    description:
      "Classic foam-front trucker with mesh back. Pixel-blur Mandela Motion wordmark across the front panel, Johannesburg stamped underneath.",
    details: ["Foam front, mesh back", "Curved brim", "Adjustable snapback — one size"],
    sizes: ["One size"],
    colors: ["Black / White"],
    images: [{ src: cap.url, alt: "MM Tour trucker cap in black and white with Mandela Motion wordmark" }],
  },
  {
    slug: "no-free-rides-t-shirt",
    name: "No Free Rides T-Shirt",
    line: "No Free Rides",
    price: 449, // PLACEHOLDER
    description:
      "The No Free Rides tee — road-sign style chest print with the Mandela OR Motion lockup. Oversized, heavy and straight off the block.",
    details: ["Oversized fit", "Road-sign chest print", "Available in white and black"],
    sizes: APPAREL_SIZES,
    colors: ["White", "Black"],
    images: [
      { src: nfrTee.url, alt: "White No Free Rides t-shirt with Mandela OR Motion sign print", fit: "contain" },
      { src: lookbook.url, alt: "No Free Rides tee in black worn on the street in Johannesburg" },
    ],
    badge: "Best seller",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
