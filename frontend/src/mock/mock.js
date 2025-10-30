// Mock data for ProEvent Display & Fabrication (frontend-only placeholder)
// Replace with backend integration later

export const BRAND = {
  name: "ProEvent Display & Fabrication",
  colors: {
    primary: "#F47C1E", // Accent color (orange)
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
  // Curated stock photo for fallback parallax
  image:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop",
  // Placeholder 60s-like sample video (can be replaced with YouTube or MP4 provided by user)
  videoMp4: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  youtubeUrl: "", // e.g., https://www.youtube.com/embed/VIDEO_ID
};

export const OVERVIEW = {
  title: "Overview",
  text:
    "ProEvent Display & Fabrication is a full-service exhibition and event support company providing complete stall setup, branding, and display solutions for trade fairs, expos, and corporate events across India.\nWe specialize in designing, fabricating, and managing customized exhibition spaces with end-to-end support — from structure to screens, lights to logistics.",
  image:
    "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1400&auto=format&fit=crop",
};

export const SERVICES = [
  { key: "fabrication", icon: "Hammer", title: "Stall Fabrication & Setup", text: "Octonorm & Wooden stalls, custom design, flooring, partitions, and storage." },
  { key: "printing", icon: "Printer", title: "Printing & Branding", text: "Flex, vinyl, sunboard, foam board, standees, backdrops, signage." },
  { key: "displays", icon: "Monitor", title: "Display & LED Screens", text: "LED TVs (32”, 43”, 55”, 65”) with stands, large LED walls (P3/P4), HDMI playback." },
  { key: "furniture", icon: "Lamp", title: "Furniture & Lighting", text: "Chairs, sofas, tables, counters, brochure stands, par lights, focus lights." },
  { key: "manpower", icon: "Users", title: "Manpower & Hospitality", text: "Hostesses, promoters, tea/coffee setup, cleaning staff." },
  { key: "others", icon: "Truck", title: "Others", text: "Generators, carpets, flower decor, logistics, and transport." },
];

export const CORE_SERVICES = [
  {
    title: "Stall Fabrication & Setup",
    icon: "Hammer",
    items: [
      "Octonorm & Wooden stall fabrication",
      "Customized design and on-site installation",
      "Flooring, partitions, and storage area setup",
    ],
  },
  {
    title: "Printing & Branding",
    icon: "Printer",
    items: [
      "Flex, vinyl, sunboard, foam board printing",
      "Standees, backdrops, directional signage",
      "On-site branding installation and dismantling",
    ],
  },
  {
    title: "Display & LED Screens",
    icon: "Monitor",
    items: [
      "LED TVs (32”, 43”, 55”, 65”) with stands",
      "Large LED walls (P3/P4 panels)",
      "Content playback support (USB/HDMI)",
    ],
  },
  {
    title: "Furniture & Lighting",
    icon: "Lamp",
    items: [
      "Chair, sofa, table, counter, brochure stand",
      "External and decorative lights, par lights, focus lights",
      "Extension cords and electrical setup",
    ],
  },
  {
    title: "Manpower & Hospitality",
    icon: "Users",
    items: [
      "Hostess / promoter staff",
      "Tea, coffee, and water setup",
      "Cleaning and daily maintenance staff",
    ],
  },
  {
    title: "Others",
    icon: "Truck",
    items: [
      "Generator & power backup",
      "Flower decoration & carpet setup",
      "Logistics and transport arrangements",
    ],
  },
  {
    title: "Complete Event Management",
    icon: "CheckCircle2",
    items: [
      "Single-window execution from planning to wrap-up",
      "Budgeting, vendor coordination, and on-ground control",
      "Post-event dismantling and handover",
    ],
  },
];

export const WHY = [
  { title: "Design Excellence", text: "Purpose-built booths that reflect your brand with modular or custom builds." },
  { title: "On-Time Delivery", text: "Tight, dependable timelines from fabrication to on-site assembly." },
  { title: "End-to-End Support", text: "From structure to screens, lights to logistics — we handle everything." },
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488998527040-85054a85150e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
].map((url, i) => ({ id: i + 1, url, alt: `ProEvent work ${i + 1}` }));

export const TESTIMONIALS = [
  { name: "Aarav Mehta", company: "Nimbus Robotics", quote: "They turned our 6x6 space into a brand magnet. Smooth delivery and great attention to detail." },
  { name: "Priya Sharma", company: "EvoMed", quote: "End-to-end support meant I didn’t worry about a thing. The LED wall setup was perfect." },
  { name: "Karan Patel", company: "VistaTech Solutions", quote: "Professional, reliable, and fast. The booth looked premium and aligned with our guidelines." },
];

export const CONTACT = {
  email: "proeventdisplay@gmail.com",
  website: "www.proeventdisplay.com",
  phones: ["7060007626", "9555442857", "9911391853"],
};

export const FAQS = [
  { q: "Do you operate pan-India?", a: "Yes, we support trade fairs and corporate events across major Indian cities and expo venues." },
  { q: "How early should we book?", a: "For best availability, 2–4 weeks in advance. We also handle urgent projects subject to resources." },
  { q: "Can you manage end-to-end setup?", a: "Absolutely. From structure to screens, lights to logistics — we manage it all." },
];
