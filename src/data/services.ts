
export type Service = {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: string;
  rating: number;
  image: string;
  description: string;
};

export const services: Service[] = [
  {
    id: 1,
    name: "Signature Haircut",
    category: "Hair Styling",
    price: 45,
    duration: "45 min",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800",
    description:
      "Experience a professional haircut designed to match your style and personality. Our expert stylists help you achieve a fresh and beautiful look.",
  },
  {
    id: 2,
    name: "Luxury Facial",
    category: "Skincare",
    price: 65,
    duration: "60 min",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800",
    description:
      "Relax and refresh your skin with our luxury facial treatment. This service focuses on cleansing, hydration, and improving your skin's appearance.",
  },
  {
    id: 3,
    name: "Hair Coloring",
    category: "Hair Styling",
    price: 90,
    duration: "90 min",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800",
    description:
      "Transform your look with professional hair coloring. Choose a beautiful shade and let our stylists create a look that suits you.",
  },
];
