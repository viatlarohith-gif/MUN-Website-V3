import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Clock3, Mail, MapPin, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { committees } from "@/lib/committees";
import { CountdownTimer } from "@/components/countdown-timer";

const CONFERENCE_DATE = new Date("2025-09-12T09:00:00+05:30");

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  school: "",
  city: "",
  committee: "",
  experience: "",
};

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCommittee, setActiveCommittee] = useState<string | null>(null);
  const [form, setForm] = useState(initialForm);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const scrollToRegistration = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    const { error } = await supabase.from("mun_registrations").insert(form);
    if (error) {
      console.error("Registration submission failed", error);
      setFormStatus("error");
      return;
    }
    setFormStatus("success");
    setForm(initialForm);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AWS MUN Edition 4 home">
          <img src="/image.png" alt="AWS MUN logo" />
          <span>
            AWS MUN <b>04</b>
          </span>
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#committees" onClick={() => setMenuOpen(false)}>
            Committees
          </a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>
            The experience
          </a>
          <button className="nav-cta" onClick={scrollToRegistration}>
            Register <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="hero-inner section-wrap">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="pulse-dot" /> Ambitus World School presents
              </p>
              <h1>
                Be the voice.
                <br />
                <em>Shape the world.</em>
              </h1>
              <p className="hero-text">
                A two-day simulation of the world's most important rooms. Come ready to question,
                negotiate and leave your mark.
              </p>
              <div className="hero-timer">
                <span className="hero-timer-label">Conference begins in</span>
                <CountdownTimer target={CONFERENCE_DATE} />
              </div>
              <button className="primary-button" onClick={scrollToRegistration}>
                Secure your seat <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-mark">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <img src="/image.png" alt="AWS MUN Edition 4 emblem" />
              <span className="hero-year">
                2025
                <br />
                <small>VIJAYAWADA</small>
              </span>
            </div>
          </div>
          <div className="hero-details section-wrap">
            <div>
              <span>01</span>
              <strong>12—13</strong>
              <small>SEPTEMBER</small>
            </div>
            <div>
              <span>02</span>
              <strong>
                AMB<sup>ITUS</sup>
              </strong>
              <small>WORLD SCHOOL</small>
            </div>
            <div>
              <span>03</span>
              <strong>VIJAYAWADA</strong>
              <small>ANDHRA PRADESH</small>
            </div>
          </div>
        </section>

        <section className="intro section-wrap" id="experience">
          <div className="section-kicker">01 / The invitation</div>
          <div className="intro-content">
            <h2>
              Not just a conference.
              <br />
              <span>A room where ideas move.</span>
            </h2>
            <div>
              <p>
                At AWS MUN Edition 4, you are not watching history happen. You are in the room,
                making the case, building the coalition and deciding what comes next.
              </p>
              <p className="muted">Bring your perspective. Leave with the confidence to use it.</p>
            </div>
          </div>
        </section>

        <section className="committees section-wrap" id="committees">
          <div className="section-heading">
            <div>
              <div className="section-kicker">02 / Choose your room</div>
              <h2>
                Five rooms.
                <br />
                <span>Infinite possibilities.</span>
              </h2>
            </div>
            <p>Every committee is a different kind of challenge. Find the one that makes you curious.</p>
          </div>
          <div className="committee-grid">
            {committees.map((committee, index) => (
              <article
                className={`committee-card ${committee.accent} ${
                  activeCommittee === committee.code ? "expanded" : ""
                }`}
                key={committee.code}
              >
                <div className="card-top">
                  <span>0{index + 1}</span>
                  <span>{committee.type}</span>
                </div>
                <h3>{committee.code}</h3>
                <p className="committee-name">{committee.name}</p>
                <div className="card-reveal">
                  <p>{committee.description}</p>
                  <strong>
                    AGENDA
                    <br />
                    <span>{committee.topic}</span>
                  </strong>
                </div>
                <button
                  className="card-action"
                  onClick={() =>
                    setActiveCommittee(activeCommittee === committee.code ? null : committee.code)
                  }
                  aria-label={`Learn more about ${committee.code}`}
                >
                  {activeCommittee === committee.code ? <X size={18} /> : <ArrowRight size={18} />}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="register section-wrap" id="register">
          <div className="register-aside">
            <div className="section-kicker">03 / Your seat awaits</div>
            <h2>
              Make your
              <br />
              <em>move.</em>
            </h2>
            <p>Registration is open to students ready to step into the conversation.</p>
            <div className="contact-note">
              <Mail size={18} />
              <span>
                Questions?
                <br />
                <a href="mailto:mun.vja@ambitusworldschool.com">mun.vja@ambitusworldschool.com</a>
              </span>
            </div>
          </div>
          <div className="form-panel">
            {formStatus === "success" ? (
              <div className="success-state">
                <div className="success-icon">
                  <Check size={28} />
                </div>
                <h3>You're on the list.</h3>
                <p>
                  Your registration has been received. We'll be in touch with the next steps at your
                  email address.
                </p>
                <button className="text-button" onClick={() => setFormStatus("idle")}>
                  Register another delegate <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={submitRegistration}>
                <div className="form-header">
                  <span>DELEGATE REGISTRATION</span>
                  <span>01—06</span>
                </div>
                <div className="form-grid">
                  <label>
                    <span>Full name</span>
                    <input
                      required
                      value={form.full_name}
                      onChange={(event) => updateField("full_name", event.target.value)}
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    <span>Email address</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="you@email.com"
                    />
                  </label>
                  <label>
                    <span>Phone number</span>
                    <input
                      required
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="+91 00000 00000"
                    />
                  </label>
                  <label>
                    <span>School / institution</span>
                    <input
                      required
                      value={form.school}
                      onChange={(event) => updateField("school", event.target.value)}
                      placeholder="Your school"
                    />
                  </label>
                  <label>
                    <span>City</span>
                    <input
                      required
                      value={form.city}
                      onChange={(event) => updateField("city", event.target.value)}
                      placeholder="Vijayawada"
                    />
                  </label>
                  <label className="select-label">
                    <span>Preferred committee</span>
                    <select
                      required
                      value={form.committee}
                      onChange={(event) => updateField("committee", event.target.value)}
                    >
                      <option value="">Select a committee</option>
                      {committees.map((committee) => (
                        <option key={committee.code} value={committee.code}>
                          {committee.code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} />
                  </label>
                  <label className="select-label full-width">
                    <span>MUN experience</span>
                    <select
                      required
                      value={form.experience}
                      onChange={(event) => updateField("experience", event.target.value)}
                    >
                      <option value="">Select your experience</option>
                      <option>First conference</option>
                      <option>1–2 conferences</option>
                      <option>3+ conferences</option>
                    </select>
                    <ChevronDown size={16} />
                  </label>
                </div>
                {formStatus === "error" && (
                  <p className="form-error">
                    We couldn't submit your registration right now. Please try again.
                  </p>
                )}
                <button
                  className="submit-button"
                  disabled={formStatus === "submitting"}
                >
                  {formStatus === "submitting" ? "Submitting…" : "Submit registration"}{" "}
                  <ArrowRight size={17} />
                </button>
                <p className="form-footnote">
                  By submitting, you confirm that the details above are accurate.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="footer section-wrap">
        <div className="footer-brand">
          <img src="/image.png" alt="AWS MUN" />
          <span>AWS MUN Edition 4</span>
        </div>
        <div className="footer-meta">
          <span>
            <MapPin size={14} /> Ambitus World School, Vijayawada
          </span>
          <span>
            <Clock3 size={14} /> 12—13 September
          </span>
        </div>
        <span className="footer-copy">© 2025 AWS MUN</span>
      </footer>
    </div>
  );
}
