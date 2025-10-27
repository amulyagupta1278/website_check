// Mock data for ProEvent Display & Fabrication (frontend-only placeholder)
// Replace with backend integration later

export const BRAND = {
  name: "ProEvent Display & Fabrication",
  colors: {
    primary: "#F47C1E",
    dark: "#121212",
    darkAlt: "#1C1C1C",
    light: "#FFFFFF",
    softGray: "#E0E0E0",
  },
};

export const HERO = {
  headline: "ProEvent Display & Fabrication",
  subheading:
    "Complete Stall Setup, Branding & Event Support Solutions Across India.",
  // Curated stock photo with event exhibition look
  image:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop",
};

export const OVERVIEW = {
  title: "Overview",
  // Copy exactly from brief (PDF)
  text:
    "ProEvent Display & Fabrication is a full-service exhibition and event support company providing complete stall setup, branding, and display solutions for trade fairs, expos, and corporate events across India.\nWe specialize in designing, fabricating, and managing customized exhibition spaces with end-to-end support — from structure to screens, lights to logistics.",
  image:
    "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1400&auto=format&fit=crop",
};

export const SERVICES = [
  {
    key: "fabrication",
    icon: "Hammer",
    title: "Stall Fabrication & Setup",
    text:
      "Octonorm & Wooden stalls, custom design, flooring, partitions, and storage.",
  },
  {
    key: "printing",
    icon: "Printer",
    title: "Printing & Branding",
    text:
      "Flex, vinyl, sunboard, foam board, standees, backdrops, signage.",
  },
  {
    key: "displays",
    icon: "Monitor",
    title: "Display & LED Screens",
    text:
      "LED TVs (32”, 43”, 55”, 65”) with stands, large LED walls (P3/P4), HDMI playback.",
  },
  {
    key: "furniture",
    icon: "Lamp",
    title: "Furniture & Lighting",
    text:
      "Chairs, sofas, tables, counters, brochure stands, par lights, focus lights.",
  },
  {
    key: "manpower",
    icon: "Users",
    title: "Manpower & Hospitality",
    text:
      "Hostesses, promoters, tea/coffee setup, cleaning staff.",
  },
  {
    key: "others",
    icon: "Truck",
    title: "Others",
    text:
      "Generators, carpets, flower decor, logistics, and transport.",
  },
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488998527040-85054a85150e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514512364185-4c2b3a1a3c09?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1200&auto=format&fit=crop",
].map((url, i) => ({ id: i + 1, url, alt: `ProEvent work ${i + 1}` }));

export const CONTACT = {
  email: "proeventdisplay@gmail.com",
  website: "www.proeventdisplay.com",
  phones: ["7060007626", "9555442857", "9911391853"],
};

export const FAQS = [
  {
    q: "Do you operate pan-India?",
    a: "Yes, we support trade fairs and corporate events across major Indian cities and expo venues.",
  },
  {
    q: "How early should we book?",
    a: "For best availability, 2–4 weeks in advance. We also handle urgent projects subject to resources.",
  },
  {
    q: "Can you manage end-to-end setup?",
    a: "Absolutely. From structure to screens, lights to logistics — we manage it all.",
  },
];
