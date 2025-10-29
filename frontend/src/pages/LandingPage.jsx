import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ChevronRight, Hammer, Printer, Monitor, Lamp, Users, Truck, Quote, Linkedin, Facebook, Instagram } from "lucide-react";
import { BRAND, HERO, WHY, GALLERY, TESTIMONIALS, CONTACT } from "../mock/mock";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";
import { toast } from "sonner";
import axios from "axios";

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
      scrolled ? "backdrop-blur-xl bg-black/50 border-b border-white/10" : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-[var(--brand)] shadow-inner"></div>
          <span className="text-white font-semibold tracking-wide">{BRAND.name}</span>
        </div>
        <nav className="hidden md:flex items-center">
          <NavLink href="#top">Home</NavLink>
          <NavLink href="#why">Why Us</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <div className="hidden md:block">
          <a href="#contact"><Button className="bg-[var(--brand)] hover:bg-[#e06f17] text-white rounded-md">Get a Quote</Button></a>
        </div>
      </div>
    </header>
  );
};

const VideoEmbed = ({ youtubeUrl, mp4Url }) => {
  if (youtubeUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
        <iframe
          className="h-full w-full"
          src={youtubeUrl}
          title="ProEvent Intro"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <video
      className="aspect-video w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10"
      src={mp4Url}
      controls
      playsInline
      poster={HERO.image}
    />
  );
};

const HeroTop = () => {
  const formRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("Booth Design");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (!data.name || !data.email) {
      toast.error("Please enter name and email");
      return;
    }
    const payload = { ...data, service };
    setSaving(true);

    // Save to backend
    try {
      const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
      const res = await axios.post(`${API}/leads`, payload);
      if (res.data?.ok) {
        setSubmitted(true);
        toast.success("Thanks! We’ll get back within 24 hours.");
      } else {
        toast.message("Saved locally. Backend not fully configured yet.");
        const entries = JSON.parse(localStorage.getItem("proevent_leads") || "[]");
        entries.push({ ...payload, ts: Date.now() });
        localStorage.setItem("proevent_leads", JSON.stringify(entries));
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not reach server. Saved locally.");
      const entries = JSON.parse(localStorage.getItem("proevent_leads") || "[]");
      entries.push({ ...payload, ts: Date.now() });
      localStorage.setItem("proevent_leads", JSON.stringify(entries));
    } finally {
      setSaving(false);
      formRef.current?.reset();
    }
  };

  return (
    <section id="top" className="relative pt-28 pb-14 bg-gradient-to-b from-[#121212] to-[#1C1C1C] text-white">
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute -inset-24 bg-[radial-gradient(700px_260px_at_20%_0%,rgba(244,124,30,0.18),transparent)]" />
      </div>
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-start">
        <div className="order-2 lg:order-1">
          <VideoEmbed youtubeUrl={HERO.youtubeUrl} mp4Url={HERO.videoMp4} />
        </div>
        <div className="order-1 lg:order-2">
          <div className="rounded-2xl md:backdrop-blur-2xl bg-white/5 border border-white/10 p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Event Booths That Win Attention</h1>
            <p className="mt-2 text-white/80">Design, fabrication, and on-ground support for expos and corporate events across India.</p>

            {!submitted ? (
              <form ref={formRef} onSubmit={onSubmit} className="mt-6 grid grid-cols-1 gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name<span className="text-red-500"> *</span></Label>
                    <Input id="name" name="name" placeholder="Your full name" className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email<span className="text-red-500"> *</span></Label>
                    <Input id="email" name="email" type="email" placeholder="name@example.com" className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" placeholder="Company name" className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                  <div>
                    <Label>Service</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="mt-1 bg-white/5 border-white/20 text-white"><SelectValue placeholder="Select service" /></SelectTrigger>
                      <SelectContent>
                        {[
                          "Booth Design",
                          "Full Build + Logistics",
                          "Equipment Rental",
                          "Hybrid Events",
                        ].map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={4} placeholder="Booth size, city, dates, and requirements" className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/50" />
                </div>
                <div className="flex items-center gap-3">
                  <Button disabled={saving} className="bg-[var(--brand)] hover:bg-[#e06f17] text-white rounded-md px-6">
                    {saving ? "Submitting..." : "Submit"}
                  </Button>
                  <span className="text-xs text-white/70">Form is frontend-only for now. We’ll wire it to Google Sheets + Email next.</span>
                </div>
              </form>
            ) : (
              <div className="mt-6 rounded-lg bg-white/10 border border-white/15 p-6">
                <h3 className="text-xl font-semibold">Thanks! We’ll get back within 24 hours.</h3>
                <p className="text-white/80 mt-2">Your details have been saved locally. We’ll integrate Google Sheets + Email after you confirm credentials.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => (
  <section id="why" className="py-20 bg-white">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#121212]">Why Choose Us</h2>
      <p className="text-neutral-600 mt-2">Premium exhibition booths with dependable execution.</p>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY.map((w, i) => (
          <Card key={i} className="hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-[#121212]">{w.title}</h3>
              <p className="text-neutral-600 mt-2">{w.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Portfolio = () => {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <section id="portfolio" className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#121212]">Portfolio</h2>
        <p className="text-neutral-600 mt-2">A snapshot of our recent work.</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((img) => (
            <button key={img.id} onClick={() => { setActive(img); setOpen(true); }} className="group relative overflow-hidden rounded-xl focus:outline-none">
              <img src={img.url} alt={img.alt} className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><span className="hidden" /></DialogTrigger>
          <DialogContent className="max-w-4xl p-0 bg-black/90 border-white/10">
            {active && (<img src={active.url} alt={active.alt} className="w-full h-auto object-contain" />)}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-[#0f0f10] text-white">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
      <p className="text-white/70 mt-2">Trust built through consistent delivery.</p>
      <div className="mt-8">
        <Carousel>
          <CarouselContent>
            {TESTIMONIALS.map((t, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <Quote className="h-6 w-6 text-[var(--brand)]" />
                    <p className="mt-3 text-white/90">“{t.quote}”</p>
                    <div className="mt-4 text-sm text-white/70">{t.name} — {t.company}</div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="contact" className="bg-white">
    <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-[var(--brand)]" />
          <span className="font-semibold">{BRAND.name}</span>
        </div>
        <p className="mt-3 text-neutral-600 text-sm">Exhibition stalls, branding & event support across India.</p>
      </div>
      <div>
        <h5 className="font-semibold">Quick Links</h5>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li><a className="hover:text-black" href="#why">Why Us</a></li>
          <li><a className="hover:text-black" href="#portfolio">Portfolio</a></li>
          <li><a className="hover:text-black" href="#testimonials">Testimonials</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold">Contact</h5>
        <ul className="mt-3 space-y-2 text-sm text-neutral-700">
          <li>Email: {CONTACT.email}</li>
          <li>Website: {CONTACT.website}</li>
          <li>Phone: {CONTACT.phones.join(" | ")}</li>
        </ul>
        <div className="flex items-center gap-3 mt-4 text-neutral-600">
          <a href="#" aria-label="LinkedIn" className="hover:text-black"><Linkedin className="h-5 w-5" /></a>
          <a href="#" aria-label="Facebook" className="hover:text-black"><Facebook className="h-5 w-5" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-black"><Instagram className="h-5 w-5" /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-neutral-200 py-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
  </footer>
);

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.style.setProperty("--brand", BRAND.colors.primary);
  }, []);
  return (
    <main className="bg-[#121212] text-white">
      <HeaderNav />
      <HeroTop />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <Footer />
    </main>
  );
}
