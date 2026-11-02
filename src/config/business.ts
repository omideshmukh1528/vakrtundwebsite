export const BUSINESS_CONFIG = {
  name: "Vakratund Car Accessories",
  phone: "09823154470",
  whatsapp: "919823154470",
  instagram: "vakratund_car_accessories.9991",
  rating: 4.8,
  reviewCount: 23,
  address:
    "Near Big Bang Fitness, Chaurai Nagar, Gat No. 123, Parandwadi Road, Somatane, Maharashtra 410506",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Vakratund+Car+Accessories+Somatane",
  openingHours: "Mon – Sun · 9:30 AM – 8:30 PM",
} as const;

export type Review = {
  name: string;
  text: string;
  rating: number;
  time: string;
};

// Genuine Google reviews, transcribed exactly as supplied. Nothing invented.
export const REVIEWS: Review[] = [
  {
    name: "Swapnil Umap",
    text: "Excellent service and top-quality accessories! The team at Vakratunda Car Accessories is very professional and helped me choose the perfect products for my car. Highly recommended.",
    rating: 5,
    time: "4 months ago",
  },
  {
    name: "Sandesh Kalokhe",
    text: "Best Best quality Service provide Thank you Vakratunda car accessories",
    rating: 5,
    time: "4 months ago",
  },
  {
    name: "Vijay Lingayat",
    text: "Nice and good also budget friendly car accessories shop for all types of cars.",
    rating: 5,
    time: "9 months ago",
  },
  { name: "Ganesh Nisal", text: "Excellent work & Service 👌", rating: 5, time: "3 years ago" },
  {
    name: "Naresh Luktuke",
    text: "Very polite and knowledgable person",
    rating: 5,
    time: "a year ago",
  },
  {
    name: "Prasad Chavan",
    text: "Good service n talking. Feeling happy 😍",
    rating: 5,
    time: "3 years ago",
  },
  {
    name: "shivendra rajput",
    text: "Mast shop he kam 1 no wala",
    rating: 5,
    time: "4 years ago",
  },
  {
    name: "pravin panchal",
    text: "One only somatane, friendly staff",
    rating: 5,
    time: "a year ago",
  },
  { name: "MoJi Saini", text: "Good work 👍", rating: 5, time: "a year ago" },
  {
    name: "Chaitanya ghogare",
    text: "Good experience & service",
    rating: 5,
    time: "a year ago",
  },
  { name: "baba ghare", text: "Good service...👌", rating: 5, time: "3 years ago" },
];
