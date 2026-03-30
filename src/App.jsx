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

const Btn = ({ children, variant = "amber", outline, large, style }) => {
  const base = {
    display: "inline-block", padding: large ? "16px 36px" : "13px 28px",
    fontSize: large ? 16 : 14, fontWeight: 600, borderRadius: 6, cursor: "pointer",
    border: outline ? `2px solid ${variant === "amber" ? colors.amber : colors.white}` : "none",
    background: outline ? "transparent" : variant === "amber" ? colors.amber : colors.dark,
    color: outline ? (variant === "amber" ? colors.amber : colors.white) : colors.white,
    transition: "all 0.2s ease", ...style,
  };
  return <span style={base}>{children}</span>;
};

const useIsMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  return m;
};

// Fade-in on scroll
const FadeIn = ({ children, style }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.5s ease-out, transform 0.5s ease-out", ...style }}>
      {children}
    </div>
  );
};

/* ===== SECTIONS ===== */

const AnnouncementBar = () => (
  <div style={{ background: colors.dark, color: colors.white, textAlign: "center", padding: "10px 20px", fontSize: 13, fontWeight: 500 }}>
    <span style={{ color: colors.amber, marginRight: 8 }}>◿</span>
    Now accepting early sign-ups in Abuja — and nationwide interest registrations across Nigeria.
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
              {["How It Works", "Services", "For Providers"].map(l => <a key={l} style={{ color: colors.text, textDecoration: "none", fontSize: 15, fontWeight: 500 }}>{l}</a>)}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <Btn variant="amber">Book a Service</Btn>
                <Btn variant="amber" outline>Join as Provider</Btn>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["How It Works", "Services", "For Providers", "Get Access"].map(l => <a key={l} style={{ color: colors.textSecondary, textDecoration: "none", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>{l}</a>)}
          <div style={{ display: "flex", gap: 10, marginLeft: 16 }}>
            <Btn variant="amber">Book a Service</Btn>
            <Btn variant="amber" outline>Join as Provider</Btn>
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
            <Btn variant="amber" large>Book a Service</Btn>
            <Btn variant="dark" outline large style={{ borderColor: colors.dark, color: colors.dark }}>Join as a Provider</Btn>
          </div>
          <p style={{ fontSize: 13, color: colors.textSecondary, marginTop: 14 }}>No commitment required. Sign up to get early access or register your interest.</p>
        </FadeIn>
      </div>
      <FadeIn style={{ flex: 1, display: mobile ? "none" : "block" }}>
        <div style={{ position: "relative" }}>
          <img src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Professional plumber installing pipes" style={{ width: "100%", borderRadius: 16, objectFit: "cover", height: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }} />
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
            <img src="https://images.pexels.com/photos/7484798/pexels-photo-7484798.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Professional tools in workshop" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 380, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }} />
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
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
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
    { icon: "ð§", name: "Plumbing", desc: "Leaks, pipe installations, drainage repairs, water system work.", img: "https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?w=400&q=80&fit=crop" },
    { icon: "❄️", name: "AC Repair & Installation", desc: "Servicing, fault-finding, new installations, and routine maintenance.", img: "https://images.unsplash.com/photo-1550998251-1e18917c975c?w=400&q=80&fit=crop" },
    { icon: "⚙️", name: "Generator & Inverter Support", desc: "Repairs, maintenance, installation, and diagnostic support.", img: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ];
  return (
    <section style={{ background: colors.bg, padding: mobile ? "60px 20px" : "100px 60px" }}>
      <FadeIn>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
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
          <p style={{ fontSize: 14, color: colors.textSecondary, marginTop: 24 }}>More categories are in development. <span style={{ color: colors.amber, fontWeight: 500, cursor: "pointer" }}>Register your interest →</span></p>
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
                  <Btn variant="amber">Book {t.name} →</Btn>
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
        <div style={{ marginTop: 28 }}><Btn variant="dark" large>Sign Up for Early Access</Btn></div>
        <p style={{ fontSize: 13, color: colors.textSecondary, marginTop: 12 }}>Currently launching in Abuja. Register from anywhere in Nigeria.</p>
      </div>
      {!mobile && (
        <div style={{ flex: 1 }}>
          <img src="https://images.pexels.com/photos/7578967/pexels-photo-7578967.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Happy homeowners" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 440, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }} />
        </div>
      )}
      </div>
    </FadeIn>
  </section>
);

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
        <div style={{ marginTop: 28 }}><Btn variant="amber" large>Apply to Join the Network</Btn></div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>Currently recruiting providers in Abuja. Applications from other cities welcome — expansion is coming.</p>
      </div>
      {!mobile && (
        <div style={{ flex: 1 }}>
          <img src="https://images.unsplash.com/photo-1635842183772-52b2862a162b?w=600&q=80&fit=crop" alt="Professional service provider" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 480, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }} />
        </div>
      )}
      </div>
    </FadeIn>
  </section>
);

const AbujaSection = ({ mobile }) => {
  const cities = [
    { name: "Abuja", active: true }, { name: "Lagos", active: false }, { name: "Port Harcourt", active: false }, { name: "Enugu", active: false }, { name: "Kano", active: false },
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
          <span style={{ color: colors.amber, fontWeight: 500, fontSize: 14, cursor: "pointer" }}>Register Your City's Interest →</span>
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
          <Btn variant="amber" large>Get Early Access as a Customer</Btn>
          <Btn variant="white" outline large style={{ borderColor: "rgba(255,255,255,0.3)", color: colors.white }}>Apply to Join as a Provider</Btn>
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
        {["How It Works", "Services", "For Providers", "Join the Waitlist", "Contact"].map(l => (
          <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
    </div>
    <div style={{ maxWidth: 900, margin: "24px auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>© 2025 Fix Plug. A HorizonBond Venture. All rights reserved.</p>
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
      <ProviderSection mobile={mobile} />
      <AbujaSection mobile={mobile} />
      <TrustSection mobile={mobile} />
      <ClosingCTA mobile={mobile} />
      <Footer mobile={mobile} />
    </div>
  );
}
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

const Btn = ({ children, variant = "amber", outline, large, style }) => {
  const base = {
    display: "inline-block", padding: large ? "16px 36px" : "13px 28px",
    fontSize: large ? 16 : 14, fontWeight: 600, borderRadius: 6, cursor: "pointer",
    border: outline ? `2px solid ${variant === "amber" ? colors.amber : colors.white}` : "none",
    background: outline ? "transparent" : variant === "amber" ? colors.amber : colors.dark,
    color: outline ? (variant === "amber" ? colors.amber : colors.white) : colors.white,
    transition: "all 0.2s ease", ...style,
  };
  return <span style={base}>{children}</span>;
};

const useIsMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth < 768); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  return m;
};

// Fade-in on scroll
const FadeIn = ({ children, style }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.5s ease-out, transform 0.5s ease-out", ...style }}>
      {children}
    </div>
  );
};

/* ===== SECTIONS ===== */

const AnnouncementBar = () => (
  <div style={{ background: colors.dark, color: colors.white, textAlign: "center", padding: "10px 20px", fontSize: 13, fontWeight: 500 }}>
    <span style={{ color: colors.amber, marginRight: 8 }}>â¿</span>
    Now accepting early sign-ups in Abuja â and nationwide interest registrations across Nigeria.
  </div>
);

const Nav = ({ mobile, scrolled }) => {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: scrolled ? "rgba(249,247,244,0.97)" : "transparent", backdropFilter: scrolled ? "blur(10px)" : "none", boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none", transition: "all 0.3s ease", padding: mobile ? "14px 20px" : "16px 60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 22, fontWeight: 700, color: colors.text, fontFamily: "'Fraunces', 'Playfair Display', serif" }}>Fix Plug</span>
      {mobile ? (
        <>
          <span onClick={() => setOpen(!open)} style={{ fontSize: 24, cursor: "pointer", color: colors.text }}>{open ? "â" : "â°"}</span>
          {open && (
            <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: colors.bg, padding: "24px 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 16 }}>
              {["How It Works", "Services", "For Providers"].map(l => <a key={l} style={{ color: colors.text, textDecoration: "none", fontSize: 15, fontWeight: 500 }}>{l}</a>)}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <Btn variant="amber">Book a Service</Btn>
                <Btn variant="amber" outline>Join as Provider</Btn>
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["How It Works", "Services", "For Providers", "Get Access"].map(l => <a key={l} style={{ color: colors.textSecondary, textDecoration: "none", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>{l}</a>)}
          <div style={{ display: "flex", gap: 10, marginLeft: 16 }}>
            <Btn variant="amber">Book a Service</Btn>
            <Btn variant="amber" outline>Join as Provider</Btn>
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
            Fix Plug connects Nigerian homes and businesses to verified, professional service providers â starting in Abuja, built for the whole country.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <Btn variant="amber" large>Book a Service</Btn>
            <Btn variant="dark" outline large style={{ borderColor: colors.dark, color: colors.dark }}>Join as a Provider</Btn>
          </div>
          <p style={{ fontSize: 13, color: colors.textSecondary, marginTop: 14 }}>No commitment required. Sign up to get early access or register your interest.</p>
        </FadeIn>
      </div>
      <FadeIn style={{ flex: 1, display: mobile ? "none" : "block" }}>
        <div style={{ position: "relative" }}>
          <img src="https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Professional plumber installing pipes" style={{ width: "100%", borderRadius: 16, objectFit: "cover", height: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }} />
          <div style={{ position: "absolute", bottom: -16, left: -16, background: colors.amber, color: colors.white, padding: "14px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(200,133,58,0.3)" }}>
            <span style={{ fontSize: 20, marginRight: 8 }}>â</span>Verified & Professional
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
      {items.map(i => <span key={i} style={{ fontSize: 13, fontWeight: 500, color: colors.text, whiteSpace: "nowrap" }}><span style={{ color: colors.amber, marginRight: 6 }}>â¦</span>{i}</span>)}
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
          <p style={{ fontSize: 16, color: colors.text, lineHeight: 1.7, marginTop: 16, fontWeight: 500 }}>Fix Plug was built to change that â not by adding another listing, but by building a platform where trust is the product.</p>
        </div>
        {!mobile && (
          <div style={{ flex: 1 }}>
            <img src="https://images.pexels.com/photos/7484798/pexels-photo-7484798.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Professional tools in workshop" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 380, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }} />
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
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
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
    { icon: "â¡", name: "Electrical", desc: "Installations, fault diagnosis, wiring, safety checks, and more.", img: "https://images.pexels.com/photos/9679179/pexels-photo-9679179.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { icon: "ð§", name: "Plumbing", desc: "Leaks, pipe installations, drainage repairs, water system work.", img: "https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?w=400&q=80&fit=crop" },
    { icon: "âï¸", name: "AC Repair & Installation", desc: "Servicing, fault-finding, new installations, and routine maintenance.", img: "https://images.unsplash.com/photo-1550998251-1e18917c975c?w=400&q=80&fit=crop" },
    { icon: "âï¸", name: "Generator & Inverter Support", desc: "Repairs, maintenance, installation, and diagnostic support.", img: "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ];
  return (
    <section style={{ background: colors.bg, padding: mobile ? "60px 20px" : "100px 60px" }}>
      <FadeIn>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Label>What We Cover</Label>
          <h2 style={{ fontSize: mobile ? 28 : 38, fontWeight: 700, color: colors.text, margin: "0 0 12px" }}>Professional Help Across the Services That Matter Most.</h2>
          <p style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 36 }}>Fix Plug launches with four high-demand categories â with more on the way.</p>
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
          <p style={{ fontSize: 14, color: colors.textSecondary, marginTop: 24 }}>More categories are in development. <span style={{ color: colors.amber, fontWeight: 500, cursor: "pointer" }}>Register your interest â</span></p>
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
                    <span style={{ color: colors.amber, fontSize: 10 }}>â</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{f}</span>
                  </div>
                ))}
                <div style={{ marginTop: 24 }}>
                  <Btn variant="amber">Book {t.name} â</Btn>
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
            <span style={{ color: colors.amber, fontSize: 8 }}>â</span>
            <span style={{ fontSize: 14, color: colors.text }}>{f}</span>
          </div>
        ))}
        <div style={{ marginTop: 28 }}><Btn variant="dark" large>Sign Up for Early Access</Btn></div>
        <p style={{ fontSize: 13, color: colors.textSecondary, marginTop: 12 }}>Currently launching in Abuja. Register from anywhere in Nigeria.</p>
      </div>
      {!mobile && (
        <div style={{ flex: 1 }}>
          <img src="https://images.pexels.com/photos/7578967/pexels-photo-7578967.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Happy homeowners" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 440, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }} />
        </div>
      )}
      </div>
    </FadeIn>
  </section>
);

const ProviderSection = ({ mobile }) => (
  <section style={{ background: colors.forest, padding: mobile ? "60px 20px" : "100px 60px" }}>
    <FadeIn>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", gap: mobile ? 32 : 60, flexDirection: mobile ? "column" : "row-reverse", alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <Label light>For Providers</Label>
        <h2 style={{ fontSize: mobile ? 28 : 36, fontWeight: 700, color: colors.white, margin: "0 0 16px", lineHeight: 1.2 }}>A Better Way to Work. A Better Class of Customer.</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 24 }}>If you are skilled, professional, and tired of relying only on word of mouth â Fix Plug is built for you. Join early, meet our standards, and access a pipeline of customers who value quality work.</p>
        <p style={{ fontSize: 13, color: colors.amber, fontWeight: 600, marginBottom: 12, letterSpacing: "0.04em" }}>WHAT YOU GET</p>
        {["Visibility to customers who value professional service", "Clear job briefs before you arrive", "Transparent earnings with no hidden surprises", "A growing reputation on a platform that means something", "A path to Premier tier for top performers"].map(f => (
          <div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
            <span style={{ color: colors.amber, fontSize: 8 }}>â</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{f}</span>
          </div>
        ))}
        <p style={{ fontSize: 13, color: colors.amber, fontWeight: 600, margin: "24px 0 12px", letterSpacing: "0.04em" }}>WHAT WE ASK OF YOU</p>
        {["Pass our verification intake", "Commit to our conduct and quality standards", "Show up professionally and complete jobs as agreed", "Communicate clearly with customers throughout"].map(f => (
          <div key={f} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 8 }}>â</span>
            <span style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>{f}</span>
          </div>
        ))}
        <div style={{ marginTop: 28 }}><Btn variant="amber" large>Apply to Join the Network</Btn></div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 12 }}>Currently recruiting providers in Abuja. Applications from other cities welcome â expansion is coming.</p>
      </div>
      {!mobile && (
        <div style={{ flex: 1 }}>
          <img src="https://images.unsplash.com/photo-1635842183772-52b2862a162b?w=600&q=80&fit=crop" alt="Professional service provider" style={{ width: "100%", borderRadius: 14, objectFit: "cover", height: 480, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }} />
        </div>
      )}
      </div>
    </FadeIn>
  </section>
);

const AbujaSection = ({ mobile }) => {
  const cities = [
    { name: "Abuja", active: true }, { name: "Lagos", active: false }, { name: "Port Harcourt", active: false }, { name: "Enugu", active: false }, { name: "Kano", active: false },
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
          <p style={{ fontSize: 15, color: colors.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>Fix Plug is launching operations in Abuja â where demand for trusted skilled services is high and the gap in quality is clear. We expand based on demand. Your registration tells us where to build next.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            {cities.map(c => (
              <span key={c.name} style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, background: c.active ? colors.amber : colors.tierHighlight, color: c.active ? colors.white : colors.textSecondary, border: c.active ? "none" : `1px solid ${colors.border}` }}>
                {c.name}{c.active ? " â Active" : ""}
              </span>
            ))}
          </div>
          <span style={{ color: colors.amber, fontWeight: 500, fontSize: 14, cursor: "pointer" }}>Register Your City's Interest â</span>
        </div>
      </FadeIn>
    </section>
  );
};

const TrustSection = ({ mobile }) => {
  const pillars = [
    { icon: "â", title: "Verified Before Listed", desc: "Every provider goes through a structured intake and review process. They are not listed until they meet our standards." },
    { icon: "â¦", title: "Pricing You Know Upfront", desc: "No surprises on the bill. Pricing is confirmed with you before any work begins." },
    { icon: "â", title: "Accountability After Every Job", desc: "Every completed job is rated. Every pattern of poor performance is acted on. Your feedback shapes the network." },
    { icon: "â¨", title: "A Platform That Stands Behind the Work", desc: "If something is not right, Fix Plug has a resolution path. You are not on your own." },
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
        <h2 style={{ fontFamily: "'Fraunces', 'Playfair Display', serif", fontSize: mobile ? 32 : 44, fontWeight: 700, color: colors.white, margin: "0 0 16px", lineHeight: 1.15 }}>Skilled Services in Nigeria â Done Right.</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", marginBottom: 36 }}>Whether you need a trusted professional or you are ready to be one â Fix Plug is where quality skilled services begin.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn variant="amber" large>Get Early Access as a Customer</Btn>
          <Btn variant="white" outline large style={{ borderColor: "rgba(255,255,255,0.3)", color: colors.white }}>Apply to Join as a Provider</Btn>
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
        {["How It Works", "Services", "For Providers", "Join the Waitlist", "Contact"].map(l => (
          <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
    </div>
    <div style={{ maxWidth: 900, margin: "24px auto 0", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>Â© 2025 Fix Plug. A HorizonBond Venture. All rights reserved.</p>
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
      <ProviderSection mobile={mobile} />
      <AbujaSection mobile={mobile} />
      <TrustSection mobile={mobile} />
      <ClosingCTA mobile={mobile} />
      <Footer mobile={mobile} />
    </div>
  );
}
