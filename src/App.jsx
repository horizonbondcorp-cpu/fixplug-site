import { useState, useEffect, useRef } from "react";

const colors = {
  bg: "#F9F7F4",
  dark: "#1A1A1A",
  amber: "#C8853A",
  text: "#1C1C1C",
  textSecondary: "#6B6B6B",
  tierHighlight: "#F3EDE3",
  border: "#E5E0D8",
  forest: "#1E2A25",
  white: "#FFFFFF",
};

const Label = ({ children, light }) => (
  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.5)" : colors.textSecondary, marginBottom: 12 }}>{children}</p>
);

const Btn = ({ children, variant = "amber", outline, large, style, onClick }) => {
  const base = {
    display: "inline-block",
    padding: large ? "16px 36px" : "13px 28px",
    fontSize: large ? 16 : 14,
    fontWeight: 600,
    borderRadius: 6,
    cursor: "pointer",
    border: outline ? `2px solid ${variant === "amber" ? colors.amber : variant === "white" ? "rgba(255,255,255,0.3)" : colors.dark}` : "none",
    background: outline ? "transparent" : variant === "amber" ? colors.amber : colors.dark,
    color: outline ? (variant === "amber" ? colors.amber : variant === "white" ? colors.white : colors.dark) : colors.white,
    transition: "all 0.2s ease",
    ...style,
  };
  return <span style={base} onClick={onClick}>{children}</span>;
};

const useIsMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const c = () => setM(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);
  return m;
};

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

// Fade-in on scroll
const FadeIn = ({ children, style }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.5s ease-out, transform 0.5s ease-out", ...style }}>
      {children}
    </div>
  );
};

/* ===== FORM COMPONENTS ===== */

const FormInput = ({ label, type = "text", placeholder, value, onChange, required, options, mobile }) => {
  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: 15,
    border: `1px solid ${colors.border}`,
    borderRadius: 8,
    background: colors.white,
    color: colors.text,
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: colors.text, marginBottom: 6 }}>
        {label}{required && <span style={{ color: colors.amber, marginLeft: 2 }}>*</span>}
      </label>
      {type === "select" ? (
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
        >
          <option value="">{placeholder || "Select..."}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = colors.amber}
          onBlur={e => e.target.style.borderColor = colors.border}
        />
      )}
    </div>
  );
};

const CheckboxGroup = ({ label, options, selected, onChange, required }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: colors.text, marginBottom: 8 }}>
      {label}{required && <span style={{ color: colors.amber, marginLeft: 2 }}>*</span>}
    </label>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(o => {
        const isSelected = selected.includes(o);
        return (
          <span
            key={o}
            onClick={() => {
              if (isSelected) onChange(selected.filter(s => s !== o));
              else onChange([...selected, o]);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              background: isSelected ? colors.amber : colors.tierHighlight,
              color: isSelected ? colors.white : colors.text,
              border: isSelected ? `1px solid ${colors.amber}` : `1px solid ${colors.border}`,
              transition: "all 0.2s ease",
            }}
          >
            {o}
          </span>
        );
      })}
    </div>
  </div>
);

/* ===== SECTIONS ===== */

const AnnouncementBar = () => (
  <div style={{ background: colors.dark, color: colors.white, textAlign: "center", padding: "10px 20px", fontSize: 13, fontWeight: 500 }}>
    <span style={{ color: colors.amber, marginRight: 8 }}>◿</span> Now accepting early sign-ups in Abuja — and nationwide interest registrations across Nigeria.
  </div>
);

const Nav = ({ mobile, scrolled }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: scrolled ? "rgba(249,247,244,0.97)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none", transition: "all 0.3s ease", padding: mobile ? "14px 20px" : "16px 60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: colors.text, fontFamily: "'Fraunces', 'Playfair Display', serif" }}>Fix Plug</span>
      {mobile ? (
        <>
          <span onClick={() => setOpen(!open)} style={{ fontSize: 24, cursor: "pointer", color: colors.text }}>{open ? "✕" : "☰"}</span>
          {open && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: colors.bg, padding: "24px 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 16 }}>
              {[{label:"How It Works",id:"how-it-works"},{label:"Services",id:"services"},{label:"For Providers",id:"provider-survey"}].map(l => <a key={l.label} onClick={() => {scrollTo(l.id);setOpen(false);}} style={{ color: colors.text, textDecoration: "none", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>{l.label}</a>)}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <Btn variant="amber" onClick={() => { setOpen(false); scrollTo("customer-survey"); }}>Book a Service</Btn>
                <Btn variant="amber" outline onClick={() => { setOpen(false); scrollTo("provider-survey"); }}>Join as Provider</Btn>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[{label:"How It Works",id:"how-it-works"},{label:"Services",id:"services"},{label:"For Providers",id:"provider-survey"},{label:"Get Access",id:"customer-survey"}].map(l => <a key={l.label} onClick={() => scrollTo(l.id)} style={{ color: colors.textSecondary, textDecoration: "none", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>{l.label}</a>)}
          <div style={{ display: "flex", gap: 10, marginLeft: 16 }}>
            <Btn variant="amber" onClick={() => scrollTo("customer-survey")}>Book a Service</Btn>
            <Btn variant="amber" outline onClick={() => scrollTo("provider-survey")}>Join as Provider</Btn>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ mobile }) => (
  <section style={{ background: colors.bg, minHeight: mobile ? "auto" : "90vh", display: "flex", alignItems: "center", padding: mobile ? "60px 20px" : "80px 60px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: mobile ? 32 : 60, flexDirection: mobile ? "column" : "row", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <div style={{ flex: 1, maxWidth: 600 }}>
        <FadeIn>
          <h1 style={{ fontFamily: "'Fraunces', 'Playfair Display', serif", fontSize: mobile ? 38 : 56, fontWeight: 700, lineHeight: 1.1, color: colors.text, margin: 0 }}>
            Skilled Services You Can Actually Trust.
          </h1>
          <p style={{ fontSize: mobile ? 16 : 18, color: colors.textSecondary, lineHeight: 1.7, marginTop: 20, maxWidth: 520 }}>
            Fix Plug connects Nigerian homes and businesses to verified, professional service providers — starting in Abuja, built for the whole country.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <Btn variant="amber" large onClick={() => scrollTo("customer-survey")}>Book a Service</Btn>
            <Btn variant="dark" outline large style={{ borderColor: colors.dark, color: colors.dark }} onClick={() => scrollTo("provider-survey")}>Join as a Provider</Btn>
          </div>
          <p style={{ fontSize: 13, color: colors.textSecondary, marginTop: 14 }}>No commitment required. Sign up to get early access or register your interest.</p>
        </FadeIn>
      </div>
      <FadeIn style={{ flex: 1, display: mobile ? "none" : "block" }}>
        <div style={{ position: "relative" }}>
          <img src="https://images.pexels.com/photos/8486932/pexels-photo-8486932.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Professional tradeswoman in safety gear" style={{ width: "100%", borderRadius: 16, objectFit: "cover", height: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }} />
          <div style={{ position: "absolute", bottom: -16, left: -16, background: colors.amber, color: colors.white, padding: "14px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(200,133,58,0.3)" }}>
            <span style={{ fontSize: 20, marginRight: 8 }}>✓</span>Verified & Professional
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

const TrustStrip = ({ mobile }) => {
  const items = ["Verified Providers Only", "Transparent Pricing", "Professional Standards", "Rated After Every Job", "Real Accountability"];
  return (
    <div style={{ background: colors.tierHighlight, padding: "18px 20px", display: "flex", justifyContent: "center", gap: mobile ? 20 : 40, flexWrap: "wrap" }}>
      {items.map(i => <span key={i} style={{ fontSize: 13, fontWeight: 500, color: colors.text, whiteSpace: "nowrap" }}><span style={{ color: colors.amber, marginRight: 6 }}>✦</span>{i}</span>)}
    </div>
  );
};

const ProblemSection = ({ mobile }) => (
  <section style={{ background: colors.bg, padding: mobile ? "60px 20px" : "100px 60px" }}>
    <FadeIn>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: mobile ? 32 : 60, flexDirection: mobile ? "column" : "row", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Label>Why Fix Plug Exists</Label>
          <h2 style={{ fontSize: mobile ? 28 : 38, fontWeight: 700, color: colors.text, lineHeight: 1.2, margin: "0 0 20px" }}>Finding a Skilled Worker Should Not Feel Like a Risk.</h2>
          <p style={{ fontSize: 16, color: colors.textSecondary, lineHeight: 1.7 }}>Most Nigerians have been there. You need an electrician. A plumber. Someone for your AC. You ask around, get a number from a neighbour, and hope for the best.</p>
          <p style={{ fontSize: 16, color: colors.textSecondary, lineHeight: 1.7, marginTop: 16 }}>Unverified workers. Unclear pricing. Jobs left incomplete. No one to call when something goes wrong.</p>
          <p style={{ fontSize: 16, color: colors.text, lineHeight: 1.7, marginTop: 16, fontWeight: 500 }}>Fix Plug was built to change that — not by adding another listing, but by building a platform where trust is the product.</p>
        </div>
        {!mobile && (
          <div style={{ flex: 1 }}>
            <img src="https://images.pexels.com/photos/7937712/pexels-photo-7937712.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Professional tradesman at work" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 380, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }} />
          </div>
        )}
      </div>
    </FadeIn>
  </section>
);

const HowItWorks = ({ mobile }) => {
  const steps = [
    { n: "01", title: "Tell Us What You Need", desc: "Describe your job, choose your service category, and select the experience level you want." },
    { n: "02", title: "Get Matched to a Verified Provider", desc: "We connect you with a Fix Plug-approved professional who meets your need, your location, and your timeline." },
    { n: "03", title: "Get the Job Done Right", desc: "Your provider arrives with your job details confirmed. Pricing is agreed before work begins. You rate the experience when it is done." },
  ];
  return (
    <section style={{ background: colors.white, borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, padding: mobile ? "60px 20px" : "100px 60px" }}>
      <FadeIn>
        <div id="how-it-works" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Label>How Fix Plug Works</Label>
          <h2 style={{ fontSize: mobile ? 28 : 38, fontWeight: 700, color: colors.text, margin: "0 0 48px" }}>Simple for You. Professional from End to End.</h2>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: mobile ? 32 : 48 }}>
            {steps.map(s => (
              <div key={s.n} style={{ flex: 1, textAlign: "center" }}>
                <span style={{ fontSize: 40, fontWeight: 200, color: colors.amber, fontFamily: "'Fraunces', serif" }}>{s.n}</span>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.text, margin: "12px 0 8px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const ServiceCategories = ({ mobile }) => {
  const cats = [
    { icon: "⚡", name: "Electrical", desc: "Installations, fault diagnosis, wiring, safety checks, and more.", img: "https://images.pexels.com/photos/9679179/pexels-photo-9679179.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { icon: "🔧", name: "Plumbing", desc: "Leaks, pipe installations, drainage repairs, water system work.", img: "https://images.pexels.com/photos/8961699/pexels-photo-8961699.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { icon: "❄️", name: "AC Repair & Installation", desc: "Servicing, fault-finding, new installations, and routine maintenance.", img: "https://images.pexels.com/photos/442160/pexels-photo-442160.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { icon: "⚙️", name: "Generator & Inverter Support", desc: "Repairs, maintenance, installation, and diagnostic support.", img: "https://images.pexels.com/photos/9242173/pexels-photo-9242173.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ];
  return (
    <section style={{ background: colors.bg, padding: mobile ? "60px 20px" : "100px 60px" }}>
      <FadeIn>
        <div id="services" style={{ maxWidth: 900, margin: "0 auto" }}>
          <Label>What We Cover</Label>
          <h2 style={{ fontSize: mobile ? 28 : 38, fontWeight: 700, color: colors.text, margin: "0 0 12px" }}>Professional Help Across the Services That Matter Most.</h2>
          <p style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 36 }}>Fix Plug launches with four high-demand categories — with more on the way.</p>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 16 }}>
            {cats.map(c => (
              <div key={c.name} style={{ background: colors.tierHighlight, borderRadius: 10, overflow: "hidden", transition: "all 0.2s ease", cursor: "pointer", borderLeft: `3px solid transparent` }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; e.currentTarget.style.borderLeftColor = colors.amber; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderLeftColor = "transparent"; }}>
                <img src={c.img} alt={c.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                <div style={{ padding: "20px 24px 24px" }}>
                  <span style={{ fontSize: 24 }}>{c.icon}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: colors.text, margin: "8px 0 6px" }}>{c.name}</h3>
                  <p style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: colors.textSecondary, marginTop: 24 }}>More categories are in development. <span style={{ color: colors.amber, fontWeight: 500, cursor: "pointer" }} onClick={() => scrollTo("customer-survey")}>Register your interest →</span></p>
        </div>
      </FadeIn>
    </section>
  );
};

const TierSection = ({ mobile }) => {
  const tiers = [
    { name: "Standard", tag: "Reliable service, scheduled ahead", desc: "For non-urgent jobs where you want a verified professional at a straightforward price.", features: ["Verified provider", "Scheduled booking", "Transparent pricing", "Post-job rating"], featured: false },
    { name: "Priority", tag: "Faster response. More experienced providers.", desc: "For jobs that need quicker turnaround or a higher level of technical skill.", features: ["Everything in Standard", "Faster response window", "More experienced provider match", "Suited to complex or time-sensitive jobs"], featured: true },
    { name: "Premier", tag: "Our highest standard. When it has to be right.", desc: "For customers who want the best available provider, the fastest response, and a fully managed experience.", features: ["Everything in Priority", "Top-rated providers only", "Fastest available response", "Dedicated job coordination"], featured: false },
  ];
  return (
    <section style={{ background: colors.dark, padding: mobile ? "60px 20px" : "100px 60px" }}>
      <FadeIn>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <Label light>Choose Your Service Level</Label>
          <h2 style={{ fontSize: mobile ? 28 : 38, fontWeight: 700, color: colors.white, margin: "0 0 12px" }}>The Same High Standards. Different Levels of Speed and Experience.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 48 }}>Every Fix Plug provider is verified. Your tier choice reflects how fast you need it, and how experienced you want your provider to be.</p>
          <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: 20, alignItems: mobile ? "stretch" : "stretch" }}>
            {tiers.map(t => (
              <div key={t.name} style={{ flex: 1, background: t.featured ? "rgba(200,133,58,0.08)" : "rgba(255,255,255,0.04)", border: t.featured ? `2px solid ${colors.amber}` : "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 32, textAlign: "left", transform: !mobile && t.featured ? "scale(1.04)" : "none", transition: "all 0.2s ease" }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: colors.white, margin: "0 0 4px" }}>{t.name}</h3>
                <p style={{ fontSize: 13, color: colors.amber, fontWeight: 500, margin: "0 0 12px" }}>{t.tag}</p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 20 }}>{t.desc}</p>
                {t.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ color: colors.amber, fontSize: 10 }}>●</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{f}</span>
                  </div>
                ))}
                <div style={{ marginTop: 24 }}>
                  <Btn variant="amber" onClick={() => scrollTo("customer-survey")}>Book {t.name} →</Btn>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 32 }}>Not sure which tier fits? Register your interest and we will help you choose when we go live in your area.</p>
        </div>
      </FadeIn>
    </section>
  );
};

const CustomerSection = ({ mobile }) => (
  <section style={{ background: colors.bg, padding: mobile ? "60px 20px" : "100px 60px" }}>
    <FadeIn>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: mobile ? 32 : 60, flexDirection: mobile ? "column" : "row", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Label>For Customers</Label>
          <h2 style={{ fontSize: mobile ? 28 : 36, fontWeight: 700, color: colors.text, margin: "0 0 16px", lineHeight: 1.2 }}>Finally. A Service Platform Built Around Your Peace of Mind.</h2>
          <p style={{ fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>You should not have to chase a worker to finish a job. You should not have to guess what something will cost. Fix Plug gives you verified providers, confirmed pricing, and a clear path to resolution if anything goes wrong.</p>
          {["Access to screened, approved professionals", "Pricing confirmed before work begins", "A provider who knows what is expected", "A rating system that holds everyone accountable", "Support if something does not go as planned"].map(f => (
            <div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
              <span style={{ color: colors.amber, fontSize: 8 }}>●</span>
              <span style={{ fontSize: 14, color: colors.text }}>{f}</span>
            </div>
          ))}
          <div style={{ marginTop: 28 }}><Btn variant="dark" large onClick={() => scrollTo("customer-survey")}>Sign Up for Early Access</Btn></div>
          <p style={{ fontSize: 13, color: colors.textSecondary, marginTop: 12 }}>Currently launching in Abuja. Register from anywhere in Nigeria.</p>
        </div>
        {!mobile && (
          <div style={{ flex: 1 }}>
            <img src="https://images.pexels.com/photos/7114420/pexels-photo-7114420.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Happy Nigerian family relaxing at home" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 440, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }} />
          </div>
        )}
      </div>
    </FadeIn>
  </section>
);

/* ===== CUSTOMER SURVEY ===== */
const CustomerSurvey = ({ mobile }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", location: "", services: [], findMethod: "", priorities: [], comments: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.location || form.services.length === 0) return;
    setSubmitting(true);
    // Submit to Formspree or your backend - replace YOUR_FORM_ID with actual endpoint
    fetch("https://formspree.io/f/xpwdejrq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: "customer_survey", services: form.services.join(", "), priorities: form.priorities.join(", "), _subject: "Fix Plug - New Customer Interest" }),
    })
      .then(() => { setSubmitted(true); setSubmitting(false); })
      .catch(() => { setSubmitted(true); setSubmitting(false); });
  };

  if (submitted) {
    return (
      <section id="customer-survey" style={{ background: colors.white, borderTop: `1px solid ${colors.border}`, padding: mobile ? "60px 20px" : "80px 60px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>✓</span>
          <h2 style={{ fontSize: mobile ? 28 : 36, fontWeight: 700, color: colors.text, margin: "0 0 12px", fontFamily: "'Fraunces', serif" }}>Thank You!</h2>
          <p style={{ fontSize: 16, color: colors.textSecondary, lineHeight: 1.7 }}>Your response has been recorded. We will be in touch as Fix Plug rolls out in your area. You are now on our early access list.</p>
          <div style={{ marginTop: 24 }}><Btn variant="amber" onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", location: "", services: [], findMethod: "", priorities: [], comments: "" }); }}>Submit Another Response</Btn></div>
        </div>
      </section>
    );
  }

  return (
    <section id="customer-survey" style={{ background: colors.white, borderTop: `1px solid ${colors.border}`, padding: mobile ? "60px 20px" : "80px 60px" }}>
      <FadeIn>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Label>Customer Interest Survey</Label>
            <h2 style={{ fontSize: mobile ? 28 : 36, fontWeight: 700, color: colors.text, margin: "0 0 12px", fontFamily: "'Fraunces', serif" }}>Help Us Build What You Actually Need.</h2>
            <p style={{ fontSize: 15, color: colors.textSecondary, lineHeight: 1.7 }}>Tell us about your experience finding skilled services. Your answers shape how Fix Plug launches in your area.</p>
          </div>

          <div style={{ background: colors.bg, borderRadius: 14, padding: mobile ? "28px 20px" : "36px 32px", border: `1px solid ${colors.border}` }}>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 0 : 16 }}>
              <FormInput label="Full Name" placeholder="Your full name" value={form.name} onChange={v => update("name", v)} required />
              <FormInput label="Phone / WhatsApp" placeholder="e.g. 0801 234 5678" value={form.phone} onChange={v => update("phone", v)} required />
            </div>
            <FormInput label="Email Address" type="email" placeholder="your@email.com (optional)" value={form.email} onChange={v => update("email", v)} />
            <FormInput label="Your Location" type="select" placeholder="Select your city..." value={form.location} onChange={v => update("location", v)} required options={["Abuja", "Lagos", "Port Harcourt", "Enugu", "Kano", "Ibadan", "Kaduna", "Benin City", "Other"]} />

            <CheckboxGroup
              label="What services do you need most?"
              options={["Electrician", "Plumber", "AC Technician", "Generator / Inverter", "Handyman / General Repairs", "Painter", "Carpenter", "Other"]}
              selected={form.services}
              onChange={v => update("services", v)}
              required
            />

            <FormInput label="How do you currently find service providers?" type="select" placeholder="Select..." value={form.findMethod} onChange={v => update("findMethod", v)} options={["Word of mouth / friends", "Social media (WhatsApp, Instagram, etc.)", "Google search", "Estate / community recommendations", "I struggle to find anyone reliable", "Other"]} />

            <CheckboxGroup
              label="What matters most to you when hiring a service provider?"
              options={["Trust & Verification", "Fair & Transparent Pricing", "Speed / Availability", "Quality of Work", "Professionalism", "Warranty / Guarantee", "Easy Booking Process"]}
              selected={form.priorities}
              onChange={v => update("priorities", v)}
            />

            <FormInput label="Anything else you'd like us to know?" type="textarea" placeholder="Any specific frustrations, needs, or suggestions..." value={form.comments} onChange={v => update("comments", v)} />

            <div style={{ marginTop: 8 }}>
              <Btn variant="amber" large style={{ width: "100%", textAlign: "center", display: "block", opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit}>
                {submitting ? "Submitting..." : "Submit & Join Early Access"}
              </Btn>
              <p style={{ fontSize: 12, color: colors.textSecondary, textAlign: "center", marginTop: 10 }}>Your information is kept private. We only use it to improve Fix Plug and notify you when we launch in your area.</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const ProviderSection = ({ mobile }) => (
  <section style={{ background: colors.forest, padding: mobile ? "60px 20px" : "100px 60px" }}>
    <FadeIn>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: mobile ? 32 : 60, flexDirection: mobile ? "column" : "row-reverse", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <Label light>For Providers</Label>
          <h2 style={{ fontSize: mobile ? 28 : 36, fontWeight: 700, color: colors.white, margin: "0 0 16px", lineHeight: 1.2 }}>A Better Way to Work. A Better Class of Customer.</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 24 }}>If you are skilled, professional, and tired of relying only on word of mouth — Fix Plug is built for you. Join early, meet our standards, and access a pipeline of customers who value quality work.</p>
          <p style={{ fontSize: 13, color: colors.amber, fontWeight: 600, marginBottom: 12, letterSpacing: "0.04em" }}>WHAT YOU GET</p>
          {["Visibility to customers who value professional service", "Clear job briefs before you arrive", "Transparent earnings with no hidden surprises", "A growing reputation on a platform that means something", "A path to Premier tier for top performers"].map(f => (
            <div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
              <span style={{ color: colors.amber, fontSize: 8 }}>●</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{f}</span>
            </div>
          ))}
          <p style={{ fontSize: 13, color: colors.amber, fontWeight: 600, margin: "24px 0 12px", letterSpacing: "0.04em" }}>WHAT WE ASK OF YOU</p>
          {["Pass our verification intake", "Commit to our conduct and quality standards", "Show up professionally and complete jobs as agreed", "Communicate clearly with customers throughout"].map(f => (
            <div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8 }}>●</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{f}</span>
            </div>
          ))}
          <div style={{ marginTop: 28 }}><Btn variant="amber" large onClick={() => scrollTo("provider-survey")}>Apply to Join the Network</Btn></div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>Currently recruiting providers in Abuja. Applications from other cities welcome — expansion is coming.</p>
        </div>
        {!mobile && (
          <div style={{ flex: 1 }}>
            <img src="https://images.pexels.com/photos/8487400/pexels-photo-8487400.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Professional service provider ready to work" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 480, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }} />
          </div>
        )}
      </div>
    </FadeIn>
  </section>
);

/* ===== PROVIDER SURVEY ===== */
const ProviderSurvey = ({ mobile }) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", location: "", trade: "", experience: "", certified: "", findCustomers: "", whyJoin: [], comments: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.location || !form.trade) return;
    setSubmitting(true);
    fetch("https://formspree.io/f/xpwdejrq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: "provider_survey", whyJoin: form.whyJoin.join(", "), _subject: "Fix Plug - New Provider Application" }),
    })
      .then(() => { setSubmitted(true); setSubmitting(false); })
      .catch(() => { setSubmitted(true); setSubmitting(false); });
  };

  if (submitted) {
    return (
      <section id="provider-survey" style={{ background: colors.forest, padding: mobile ? "60px 20px" : "80px 60px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 48, display: "block", marginBottom: 16, color: colors.amber }}>✓</span>
          <h2 style={{ fontSize: mobile ? 28 : 36, fontWeight: 700, color: colors.white, margin: "0 0 12px", fontFamily: "'Fraunces', serif" }}>Application Received!</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>Thank you for your interest in joining the Fix Plug provider network. We will review your information and reach out as we onboard providers in your area.</p>
          <div style={{ marginTop: 24 }}><Btn variant="amber" onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", location: "", trade: "", experience: "", certified: "", findCustomers: "", whyJoin: [], comments: "" }); }}>Submit Another Application</Btn></div>
        </div>
      </section>
    );
  }

  return (
    <section id="provider-survey" style={{ background: colors.forest, padding: mobile ? "60px 20px" : "80px 60px" }}>
      <FadeIn>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Label light>Provider Application Survey</Label>
            <h2 style={{ fontSize: mobile ? 28 : 36, fontWeight: 700, color: colors.white, margin: "0 0 12px", fontFamily: "'Fraunces', serif" }}>Join the Fix Plug Provider Network.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>We are building a network of Nigeria's most professional service providers. Tell us about yourself and your trade.</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: mobile ? "28px 20px" : "36px 32px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: mobile ? 0 : 16 }}>
              <FormInput label="Full Name" placeholder="Your full name" value={form.name} onChange={v => update("name", v)} required />
              <FormInput label="Phone / WhatsApp" placeholder="e.g. 0801 234 5678" value={form.phone} onChange={v => update("phone", v)} required />
            </div>
            <FormInput label="Email Address" type="email" placeholder="your@email.com (optional)" value={form.email} onChange={v => update("email", v)} />
            <FormInput label="Your Location" type="select" placeholder="Select your city..." value={form.location} onChange={v => update("location", v)} required options={["Abuja", "Lagos", "Port Harcourt", "Enugu", "Kano", "Ibadan", "Kaduna", "Benin City", "Other"]} />

            <FormInput label="Primary Trade / Skill" type="select" placeholder="Select your trade..." value={form.trade} onChange={v => update("trade", v)} required options={["Electrician", "Plumber", "AC Technician", "Generator / Inverter Technician", "Handyman / General Repairs", "Painter", "Carpenter", "Tiler", "Other"]} />

            <FormInput label="Years of Experience" type="select" placeholder="Select..." value={form.experience} onChange={v => update("experience", v)} options={["Less than 1 year", "1 - 3 years", "3 - 5 years", "5 - 10 years", "10+ years"]} />

            <FormInput label="Do you have any trade certifications?" type="select" placeholder="Select..." value={form.certified} onChange={v => update("certified", v)} options={["Yes, formally certified", "I have some training certificates", "No formal certification, but experienced", "Currently in training"]} />

            <FormInput label="How do you currently find customers?" type="select" placeholder="Select..." value={form.findCustomers} onChange={v => update("findCustomers", v)} options={["Word of mouth only", "Social media (WhatsApp, Instagram, etc.)", "Through a company or contractor", "Walk-in / roadside presence", "I struggle to find steady work", "Other"]} />

            <CheckboxGroup
              label="What would make you join a platform like Fix Plug?"
              options={["Steady flow of customers", "Better pay / transparent earnings", "Professional recognition", "Training & skill development", "Tools or equipment support", "Insurance / safety coverage"]}
              selected={form.whyJoin}
              onChange={v => update("whyJoin", v)}
            />

            <FormInput label="Anything else you'd like us to know?" type="textarea" placeholder="Tell us about your experience, tools you have, areas you cover..." value={form.comments} onChange={v => update("comments", v)} />

            <div style={{ marginTop: 8 }}>
              <Btn variant="amber" large style={{ width: "100%", textAlign: "center", display: "block", opacity: submitting ? 0.7 : 1 }} onClick={handleSubmit}>
                {submitting ? "Submitting..." : "Apply to Join Fix Plug"}
              </Btn>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: 10 }}>Your information is kept private. We only use it to evaluate your fit for the Fix Plug network and notify you about next steps.</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const AbujaSection = ({ mobile }) => {
  const cities = [
    { name: "Abuja", active: true },
    { name: "Lagos", active: false },
    { name: "Port Harcourt", active: false },
    { name: "Enugu", active: false },
    { name: "Kano", active: false },
  ];
  return (
    <section style={{ position: "relative", padding: mobile ? "60px 20px" : "100px 60px", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src="https://images.pexels.com/photos/31187374/pexels-photo-31187374.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Aerial view of Abuja" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(249,247,244,0.92), rgba(249,247,244,0.96))" }} />
      </div>
      <FadeIn>
        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Label>Where We Are Building</Label>
          <h2 style={{ fontSize: mobile ? 28 : 38, fontWeight: 700, color: colors.text, margin: "0 0 16px" }}>Starting in Abuja. Open to Nigeria.</h2>
          <p style={{ fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>Fix Plug is launching operations in Abuja — where demand for trusted skilled services is high and the gap in quality is clear. We expand based on demand. Your registration tells us where to build next.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            {cities.map(c => (
              <span key={c.name} style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, background: c.active ? colors.amber : colors.tierHighlight, color: c.active ? colors.white : colors.textSecondary, border: c.active ? "none" : `1px solid ${colors.border}` }}>
                {c.name}{c.active ? " — Active" : ""}
              </span>
            ))}
          </div>
          <span style={{ color: colors.amber, fontWeight: 500, fontSize: 14, cursor: "pointer" }} onClick={() => scrollTo("customer-survey")}>Register Your City's Interest →</span>
        </div>
      </FadeIn>
    </section>
  );
};

const TrustSection = ({ mobile }) => {
  const pillars = [
    { icon: "✓", title: "Verified Before Listed", desc: "Every provider goes through a structured intake and review process. They are not listed until they meet our standards." },
    { icon: "₦", title: "Pricing You Know Upfront", desc: "No surprises on the bill. Pricing is confirmed with you before any work begins." },
    { icon: "★", title: "Accountability After Every Job", desc: "Every completed job is rated. Every pattern of poor performance is acted on. Your feedback shapes the network." },
    { icon: "⛨", title: "A Platform That Stands Behind the Work", desc: "If something is not right, Fix Plug has a resolution path. You are not on your own." },
  ];
  return (
    <section style={{ background: colors.white, borderTop: `1px solid ${colors.border}`, padding: mobile ? "60px 20px" : "100px 60px" }}>
      <FadeIn>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Label>How We Earn Your Trust</Label>
          <h2 style={{ fontSize: mobile ? 28 : 38, fontWeight: 700, color: colors.text, margin: "0 0 40px" }}>Trust Is Not a Tagline. It Is the System.</h2>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 20 }}>
            {pillars.map(p => (
              <div key={p.title} style={{ border: `1px solid ${colors.border}`, borderRadius: 10, padding: 28, textAlign: "left" }}>
                <span style={{ fontSize: 22, color: colors.amber, fontWeight: 700 }}>{p.icon}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: colors.text, margin: "12px 0 8px" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const ClosingCTA = ({ mobile }) => (
  <section style={{ background: colors.dark, padding: mobile ? "60px 20px" : "100px 60px", textAlign: "center" }}>
    <FadeIn>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'Fraunces', 'Playfair Display', serif", fontSize: mobile ? 32 : 44, fontWeight: 700, color: colors.white, margin: "0 0 16px", lineHeight: 1.15 }}>Skilled Services in Nigeria — Done Right.</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginBottom: 36 }}>Whether you need a trusted professional or you are ready to be one — Fix Plug is where quality skilled services begin.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn variant="amber" large onClick={() => scrollTo("customer-survey")}>Get Early Access as a Customer</Btn>
          <Btn variant="white" outline large style={{ borderColor: "rgba(255,255,255,0.3)", color: colors.white }} onClick={() => scrollTo("provider-survey")}>Apply to Join as a Provider</Btn>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 20 }}>Launching in Abuja. Registrations open nationwide.</p>
      </div>
    </FadeIn>
  </section>
);

const Footer = ({ mobile }) => (
  <footer style={{ background: "#141414", padding: mobile ? "40px 20px" : "48px 60px" }}>
    <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "center", gap: 20 }}>
      <div>
        <span style={{ fontSize: 18, fontWeight: 700, color: colors.white, fontFamily: "'Fraunces', serif" }}>Fix Plug</span>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>Trusted Skilled Services. Built for Nigeria.</p>
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {[{ l: "How It Works" }, { l: "Services" }, { l: "For Providers" }, { l: "Customer Survey", id: "customer-survey" }, { l: "Provider Survey", id: "provider-survey" }, { l: "HorizonBond", href: "https://horizonbond.org" }].map(item => (
          item.href ? <a key={item.l} href={item.href} target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,0.5)",textDecoration:"none",fontSize:13,cursor:"pointer"}}>{item.l}</a> : <span key={item.l} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "pointer" }} onClick={item.id ? () => scrollTo(item.id) : undefined}>{item.l}</span>
        ))}
      </div>
    </div>
    <div style={{ maxWidth: 900, margin: "24px auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>© 2026 Fix Plug. <a href="https://horizonbond.org" target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,0.5)",textDecoration:"none"}}>A HorizonBond Venture</a>. All rights reserved.</p>
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", marginTop: 8 }}>Your information is collected solely to match you with services or opportunities relevant to your sign-up. We do not share your data with third parties without your consent.</p>
    </div>
  </footer>
);

/* ===== MAIN APP ===== */
export default function FixPlugLanding() {
  const mobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'DM Sans', -apple-system, sans-serif", color: colors.text, margin: 0, padding: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@200;400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <AnnouncementBar />
      <Nav mobile={mobile} scrolled={scrolled} />
      <Hero mobile={mobile} />
      <TrustStrip mobile={mobile} />
      <ProblemSection mobile={mobile} />
      <HowItWorks mobile={mobile} />
      <ServiceCategories mobile={mobile} />
      <TierSection mobile={mobile} />
      <CustomerSection mobile={mobile} />
      <CustomerSurvey mobile={mobile} />
      <ProviderSection mobile={mobile} />
      <ProviderSurvey mobile={mobile} />
      <AbujaSection mobile={mobile} />
      <TrustSection mobile={mobile} />
      <ClosingCTA mobile={mobile} />
      <Footer mobile={mobile} />
    </div>
  );
}
