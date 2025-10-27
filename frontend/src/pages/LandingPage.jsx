import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { toast } from "sonner";
import { ChevronRight, Hammer, Printer, Monitor, Lamp, Users, Truck } from "lucide-react";
import { BRAND, HERO, OVERVIEW, SERVICES, GALLERY, CONTACT, FAQS } from "../mock/mock";

const NavLink = ({ href, children }) => (
  <a href={href} className="text-sm font-medium text-white/90 hover:text-white transition-colors px-3 py-2">
    {children}
  </a>
);

const HeaderNav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
      scrolled ? "backdrop-blur-xl bg-black/40 border-b border-white/10" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-[var(--brand)] shadow-inner"></div>
          <span className="text-white font-semibold tracking-wide">{BRAND.name}</span>
        </div>
        <nav className="hidden md:flex items-center">
          <NavLink href="#overview">Overview</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#gallery">Work</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <div className="hidden md:block">
          <Button className="bg-[var(--brand)] hover:bg-[#e06f17] text-white rounded-md">Get a Quote</Button>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => {
  const onQuote = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const onWork = () => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden" aria-label="Hero">
      <div
        className="absolute inset-0 -z-10 bg-center bg-cover will-change-transform hero-zoom"
        style={{ backgroundImage: `url(${HERO.image})` }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-[#121212]" />
      <div className="mx-auto max-w-5xl px-6 text-center md:text-left">
        <div className="inline-block md:backdrop-blur-2xl md:bg-white/5 md:border md:border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            {HERO.headline}
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-xl max-w-2xl">
            {HERO.subheading}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button onClick={onQuote} className="bg-[var(--brand)] hover:bg-[#e06f17] text-white rounded-md px-6 py-6 text-base">
              Get a Quote
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={onWork} variant="outline" className="border-white/70 text-white hover:bg-white/10 rounded-md px-6 py-6 text-base">
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const OverviewSection = () => (
  <section id="overview" className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#121212]">Overview</h2>
        <p className="mt-6 text-[#333] leading-relaxed whitespace-pre-line">
          {OVERVIEW.text}
        </p>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img src={OVERVIEW.image} alt="Exhibition setup" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/0 to-[#F47C1E]/10" />
      </div>
    </div>
  </section>
);

const iconMap = { Hammer, Printer, Monitor, Lamp, Users, Truck };

const ServicesSection = () => (
  <section id="services" className="py-20 bg-neutral-50">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#121212]">Our Core Services</h2>
      <p className="text-neutral-600 mt-2">Everything you need for a standout presence.</p>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s) => {
          const Icon = iconMap[s.icon] ?? Hammer;
          return (
            <Card key={s.key} className="group border-neutral-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-[#121212] text-white flex items-center justify-center ring-1 ring-black/10 group-hover:ring-[#F47C1E] transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#121212]">{s.title}</h3>
                    <p className="text-neutral-600 mt-1">{s.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

const GallerySection = () => {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const onOpen = (img) => {
    setActive(img);
    setOpen(true);
  };
  return (
    <section id="gallery" className="py-20 bg-[#0f0f10]">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Our Work Speaks for Itself</h2>
        <p className="text-white/70 mt-2">A quick look at stalls and event setups we’ve delivered.</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((img) => (
            <button
              key={img.id}
              onClick={() => onOpen(img)}
              className="group relative overflow-hidden rounded-xl focus:outline-none"
              aria-label={img.alt}
            >
              <img src={img.url} alt={img.alt} className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <span className="hidden" />
          </DialogTrigger>
          <DialogContent className="max-w-5xl p-0 bg-black/90 border-white/10">
            {active && (
              <img src={active.url} alt={active.alt} className="w-full h-auto object-contain" />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-24 bg-gradient-to-br from-[#121212] to-[#1C1C1C] relative">
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div className="absolute -inset-10 bg-[radial-gradient(600px_200px_at_20%_0%,rgba(244,124,30,0.15),transparent)]" />
    </div>
    <div className="mx-auto max-w-7xl px-6 text-center">
      <h3 className="text-3xl md:text-4xl font-bold text-white">We don’t just build displays — we build trust.</h3>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="#contact">
          <Button className="bg-white text-[#121212] hover:bg-white/90 rounded-md px-6 py-6 text-base">Contact Us</Button>
        </a>
        <a href="#contact">
          <Button className="bg-[var(--brand)] hover:bg-[#e06f17] text-white rounded-md px-6 py-6 text-base">Get Free Consultation</Button>
        </a>
      </div>
      <div className="mx-auto max-w-3xl text-white/80 mt-10">
        <Accordion type="single" collapsible className="w-full text-left">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

const ContactFooter = () => {
  const formRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!data.name || !data.email) {
      toast.error("Please enter name and email");
      return;
    }
    setSaving(true);
    // mock saving to localStorage
    const entries = JSON.parse(localStorage.getItem("proevent_leads") || "[]");
    entries.push({ ...data, ts: Date.now() });
    localStorage.setItem("proevent_leads", JSON.stringify(entries));
    setTimeout(() => {
      setSaving(false);
      formRef.current?.reset();
      toast.success("Thanks! We will get back within 24 hours.");
    }, 500);
  };

  return (
    <footer id="contact" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h4 className="text-2xl font-semibold text-[#121212]">Let’s discuss your next event</h4>
          <p className="mt-3 text-neutral-600">Share a few details and our team will reach out.</p>
          <form ref={formRef} onSubmit={onSubmit} className="mt-8 grid grid-cols-1 gap-4 max-w-xl">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Your full name" className="mt-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="Mobile number" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="req">Requirement</Label>
              <Textarea id="req" name="requirement" placeholder="Tell us about stall size, city, dates, and support needed" className="mt-1" rows={4} />
            </div>
            <div className="flex items-center gap-3">
              <Button disabled={saving} className="bg-[var(--brand)] hover:bg-[#e06f17] text-white rounded-md px-6">
                {saving ? "Submitting..." : "Submit"}
              </Button>
              <p className="text-xs text-neutral-500">This form is frontend-only (mock). No data is sent to server yet.</p>
            </div>
          </form>
        </div>
        <div>
          <div className="rounded-2xl border border-neutral-200 p-6 bg-white/70 backdrop-blur-xl">
            <h5 className="text-xl font-semibold text-[#121212]">Contact</h5>
            <ul className="mt-4 space-y-2 text-neutral-700">
              <li><span className="font-medium">Email:</span> {CONTACT.email}</li>
              <li><span className="font-medium">Website:</span> {CONTACT.website}</li>
              <li><span className="font-medium">Phone:</span> {CONTACT.phones.join(" | ")}</li>
            </ul>
            <div className="mt-6 text-sm text-neutral-500">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  useEffect(() => {
    // CSS var for brand color set at runtime
    document.documentElement.style.setProperty("--brand", BRAND.colors.primary);
  }, []);
  return (
    <main className="bg-[#121212] text-white">
      <HeaderNav />
      <HeroSection />
      <OverviewSection />
      <ServicesSection />
      <GallerySection />
      <CTASection />
      <ContactFooter />
    </main>
  );
}
