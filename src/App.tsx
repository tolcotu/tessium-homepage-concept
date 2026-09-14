import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  GitBranch,
  Menu,
  Radio,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StreamExplorer from "./components/StreamExplorer";
import Quickstart from "./components/Quickstart";
import {
  OutcomeArt,
  Pipeline,
  RecoveryArt,
  SignalHorizon,
} from "./components/Diagrams";

gsap.registerPlugin(ScrollTrigger);
const base = "https://tessium.dev";
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "footer-brand" : ""}`}
      href="#"
      aria-label="Tessium home"
    >
      <img className="brand-mark" src={asset("mark.svg")} alt="" />
      <img
        className="brand-wordmark"
        src={asset("wordmark.svg")}
        alt="Tessium"
      />
    </a>
  );
}
function App() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menu, setMenu] = useState(false);
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const motion = !reduced;
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!motion) return;
    const context = gsap.context(() => {
      gsap.from(".hero-intro > *", {
        opacity: 0,
        y: 16,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
      gsap.from(".hero-artwork", {
        opacity: 0,
        scale: 0.97,
        duration: 1.5,
        delay: 0.25,
        ease: "power2.out",
        clearProps: "all",
      });
      gsap.utils.toArray<SVGPathElement>(".draw-path").forEach((path) => {
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: length, strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: ".pipeline",
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      });
      gsap.from(".chart-line", {
        strokeDasharray: 650,
        strokeDashoffset: 650,
        duration: 2.1,
        ease: "power1.inOut",
        scrollTrigger: { trigger: ".outcomes", start: "top 65%", once: true },
      });
      gsap.from(".signal-horizon", {
        y: 48,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".closing",
          start: "top bottom",
          end: "center center",
          scrub: 1,
        },
      });
    }, root);
    return () => context.revert();
  }, [motion]);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  return (
    <div ref={root} className="site" data-motion={motion ? "on" : "off"}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#streams">Data streams</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href={`${base}/docs/`} className="nav-docs">
              Docs <ArrowUpRight size={12} />
            </a>
          </nav>
          <div className="header-actions">
            <a className="login-link" href={`${base}/login`}>
              Log in
            </a>
            <a
              className="button button-small button-light"
              href={`${base}/login`}
            >
              Start building <ArrowUpRight size={14} />
            </a>
            <button
              className="menu-toggle icon-button"
              ref={menuButton}
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-controls="mobile-nav"
              aria-label={menu ? "Close navigation" : "Open navigation"}
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {menu && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["Data streams", "#streams"],
              ["How it works", "#how-it-works"],
              ["Pricing", "#pricing"],
              ["Documentation", `${base}/docs/`],
              ["Log in", `${base}/login`],
            ].map(([name, href]) => (
              <a key={name} href={href} onClick={() => setMenu(false)}>
                {name}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-intro">
            <a className="intro-link" href="#streams">
              <span className="signal-symbol">
                <i />
                <i />
                <i />
              </span>
              One connection to the pulse of Solana
              <ArrowRight size={13} />
            </a>
            <h1 id="hero-title">
              Real-time Solana data.
              <br />
              Ready to build on.
            </h1>
            <p>
              From on-chain activity to your next great product.
              <br className="desktop-break" /> Eight powerful data streams. One
              simple API.
            </p>
            <div className="hero-actions">
              <a className="button button-light" href={`${base}/login`}>
                Get your free API key <ArrowUpRight size={16} />
              </a>
              <a className="button button-quiet" href="#quickstart">
                <Code2 size={17} />
                See the code
              </a>
            </div>
            <span className="hero-footnote">
              Free to start. No credit card required.
            </span>
          </div>
          <div className="hero-artwork">
            <div className="hero-signal">
              <img
                className="hero-sculpture"
                src={asset("signal-sculpture.png")}
                alt="Three streams of silver filaments converge into the Tessium mark"
                fetchPriority="high"
                width="1984"
                height="793"
              />
              <svg
                className="hero-sculpture hero-traces"
                viewBox="0 0 1984 793"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <filter id="heroGlow">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                {[
                  "M455 89C690 240 930 323 1590 377",
                  "M365 378C715 357 1175 400 1590 377",
                  "M449 667C805 506 1090 404 1590 377",
                ].map((path, index) => (
                  <g key={path}>
                    <path
                      d={path}
                      className="hero-pulse"
                      style={{ animationDelay: `${index * -2.3}s` }}
                      stroke="#d8bfff"
                      strokeWidth="5"
                      strokeDasharray="60 1500"
                      filter="url(#heroGlow)"
                    />
                    <path
                      d={path}
                      className="hero-pulse"
                      style={{ animationDelay: `${index * -2.3}s` }}
                      stroke="#f0e6ff"
                      strokeWidth="1"
                      strokeDasharray="28 1532"
                    />
                  </g>
                ))}
              </svg>
              <span className="art-label label-launches">
                <i />
                New markets
              </span>
              <span className="art-label label-trades">
                <i />
                Token activity
              </span>
              <span className="art-label label-wallets">
                <i />
                Wallet movements
              </span>
              <span className="art-label label-output">
                <i />
                Your next big idea
              </span>
            </div>
            <div className="artwork-caption">
              <a href="#streams" aria-label="Explore Tessium’s data streams">
                <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div className="venue-strip wrap">
            <span>
              Connected to the <br />
              Solana ecosystem
            </span>
            <div className="venue-logos">
              {[
                ["pump-fun", "pump.fun"],
                ["raydium", "Raydium"],
                ["meteora", "Meteora"],
                ["orca", "Orca"],
                ["jupiter", "Jupiter"],
              ].map(([asset, name]) => (
                <div key={name}>
                  <img
                    src={`${import.meta.env.BASE_URL}assets/${asset}.webp`}
                    width="24"
                    height="24"
                    alt=""
                  />
                  <span>{name}</span>
                </div>
              ))}
            </div>
            <a href={`${base}/coverage`}>
              100+ programs
              <ArrowUpRight size={13} />
            </a>
          </div>
        </section>

        <section id="streams" className="section wrap streams-section">
          <div className="section-intro">
            <div>
              <span className="section-kicker">
                <Radio size={15} />
                The right signal
              </span>
              <h2>
                Everything happening.
                <br />
                Exactly what you need.
              </h2>
            </div>
            <p>
              Follow new markets, track a token, or watch a wallet. Subscribe to
              what matters. Tessium takes care of the rest.
            </p>
          </div>
          <StreamExplorer motion={motion} />
        </section>

        <section id="how-it-works" className="section pipeline-section">
          <div className="wrap">
            <div className="center-intro">
              <span className="section-kicker">
                From the chain to your code
              </span>
              <h2>
                Less infrastructure.
                <br />
                More imagination.
              </h2>
              <p>
                Decoding programs. Resolving routes. Filtering noise.
                <br className="desktop-break" /> We do the work underneath, so
                you can build what’s next.
              </p>
            </div>
            <Pipeline />
            <div className="pipeline-features">
              <div>
                <span className="feature-index">01</span>
                <h3>Connect once</h3>
                <p>
                  One WebSocket for all your subscriptions. No stack of
                  endpoints to maintain.
                </p>
              </div>
              <div>
                <span className="feature-index">02</span>
                <h3>Make it yours</h3>
                <p>
                  Filter by token, wallet, or supported venue. Unused events
                  never reach your app.
                </p>
              </div>
              <div>
                <span className="feature-index">03</span>
                <h3>Build on clarity</h3>
                <p>
                  Get structured events with decoded fields, ready for your
                  application logic.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="section wrap outcomes">
          <div className="section-intro">
            <div>
              <span className="section-kicker">Your idea. In motion.</span>
              <h2>
                The stream is the start.
                <br />
                What you build is up to you.
              </h2>
            </div>
            <a className="text-link" href={`${base}/solutions`}>
              Explore the possibilities
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="outcome-grid">
            <article className="outcome-card outcome-wide">
              <OutcomeArt type="chart" />
              <div>
                <h3>A better view of the market.</h3>
                <p>
                  Build terminals and charts with price, volume, and trade flow
                  that tell the same story.
                </p>
              </div>
            </article>
            <article className="outcome-card outcome-compact">
              <OutcomeArt type="alerts" />
              <div>
                <h3>Be there when it happens.</h3>
                <p>
                  Power bots and alerts that react to launches and market
                  activity without polling.
                </p>
              </div>
            </article>
            <article className="outcome-card outcome-compact">
              <OutcomeArt type="wallet" />
              <div>
                <h3>Follow more than a balance.</h3>
                <p>
                  See what wallets trade and where tokens move. Build monitoring
                  with context.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="section reliability-section">
          <div className="wrap reliability-layout">
            <div>
              <span className="section-kicker">Built to keep flowing</span>
              <h2>
                Real-time means
                <br />
                staying in the moment.
              </h2>
              <p className="section-copy">
                A fast stream is only useful if you can depend on it. Tessium
                makes interruptions visible and gives you a path back.
              </p>
              <div className="latency">
                <div>
                  <strong>
                    0.63<span>s</span>
                  </strong>
                  <span>Median delivery</span>
                </div>
                <div>
                  <strong>
                    0.90<span>s</span>
                  </strong>
                  <span>p99 delivery</span>
                </div>
              </div>
              <p className="metric-note">
                Published chain-to-socket measurements.
                <br />
                Observed performance, not a latency guarantee.
              </p>
            </div>
            <div className="reliability-details">
              <RecoveryArt />
              <div className="recovery-copy">
                <div>
                  <h3>Your place in the stream, saved.</h3>
                  <p>
                    Reconnect with your last cursor and catch up within your
                    plan’s replay window.
                  </p>
                </div>
                <div>
                  <h3>No silent gaps.</h3>
                  <p>
                    If a client falls behind, you get the subscription and
                    position of the missed event.
                  </p>
                </div>
                <a href={`${base}/docs/protocol/cursor`} className="text-link">
                  See how recovery works
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="quickstart" className="section wrap quickstart-section">
          <div className="quickstart-copy">
            <span className="section-kicker">
              A few lines. A new possibility.
            </span>
            <h2>
              Your first event
              <br />
              is minutes away.
            </h2>
            <p className="section-copy">
              Create an API key, open a connection, and subscribe. That’s your
              starting point.
            </p>
            <ol className="quickstart-steps">
              <li>
                <span>1</span>
                <div>
                  <strong>Create your API key</strong>
                  <p>Start on the free plan.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <strong>Open one connection</strong>
                  <p>Use the language you already know.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <strong>Follow your first stream</strong>
                  <p>Your events arrive as structured JSON.</p>
                </div>
              </li>
            </ol>
            <a className="text-link" href={`${base}/docs/quickstart`}>
              Read the quickstart
              <ArrowUpRight size={15} />
            </a>
          </div>
          <Quickstart />
        </section>

        <section
          id="pricing"
          className="section wrap pricing-section pricing-expanded"
        >
          <div className="pricing-intro">
            <span className="section-kicker">Room to build</span>
            <h2>
              Start with an idea.
              <br />
              Scale when you’re ready.
            </h2>
            <p>From your first prototype to a full production stack.</p>
          </div>
          <div className="plan-grid">
            {[
              {
                name: "Free",
                price: "0",
                description: "Find your first signal.",
                features: [
                  "5 subscriptions",
                  "1 connection",
                  "20 GB per month",
                  "pump.fun launches & migrations",
                ],
                action: "Get a free key",
              },
              {
                name: "Starter",
                price: "39",
                description: "Put your first bot to work.",
                features: [
                  "100 subscriptions",
                  "3 connections",
                  "Unlimited traffic",
                  "Transfers & every launch venue",
                ],
                action: "Start with Starter",
              },
              {
                name: "Pro",
                price: "79",
                description: "See more of the market.",
                features: [
                  "500 subscriptions",
                  "6 connections",
                  "Unlimited traffic",
                  "New pools & extended fields",
                  "60-second catch-up",
                ],
                action: "Build with Pro",
              },
              {
                name: "Scale",
                price: "239",
                description: "Grow your production stack.",
                features: [
                  "2,000 subscriptions",
                  "20 connections",
                  "Unlimited traffic",
                  "Everything in Pro",
                  "Full transaction ledger",
                ],
                action: "Move to Scale",
              },
            ].map((plan) => (
              <article className="plan-card" key={plan.name}>
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  ${plan.price}
                  <span>{plan.name === "Free" ? "/ forever" : "/ month"}</span>
                </div>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  className={`button ${plan.name === "Free" ? "button-light" : "button-outline"}`}
                  href={`${base}/${plan.name === "Free" ? "login" : "pricing"}`}
                >
                  {plan.action}
                  <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>
          <div className="custom-plan">
            <div>
              <h3>Built for something bigger?</h3>
              <p>Custom capacity and limits. Plans from $1,000.</p>
            </div>
            <a className="text-link" href={`${base}/contact`}>
              Talk to Tessium
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="pricing-details">
            <span>Monthly pricing. Annual billing also available.</span>
            <a className="text-link" href={`${base}/pricing`}>
              Compare every feature
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        <section className="closing">
          <SignalHorizon />
          <div className="closing-content">
            <img src={asset("mark.svg")} alt="" width="45" height="40" />
            <h2>
              Follow the signal.
              <br />
              Build something great.
            </h2>
            <a className="button button-light" href={`${base}/login`}>
              Start building for free
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <footer className="wrap site-footer">
        <div className="footer-top">
          <div>
            <Brand footer />
            <p>Solana, made usable.</p>
          </div>
          <div className="footer-links">
            <div>
              <h3>Product</h3>
              <a href="#streams">Data streams</a>
              <a href={`${base}/solutions`}>Solutions</a>
              <a href={`${base}/coverage`}>Coverage</a>
              <a href={`${base}/pricing`}>Pricing</a>
            </div>
            <div>
              <h3>Developers</h3>
              <a href={`${base}/docs/`}>Documentation</a>
              <a href={`${base}/docs/quickstart`}>Quickstart</a>
              <a href="https://status.tessium.dev">
                Service status <ExternalLink size={11} />
              </a>
              <a href="https://github.com/tessiumdev">
                GitHub <GitBranch size={12} />
              </a>
            </div>
            <div>
              <h3>Company</h3>
              <a href={`${base}/about`}>About</a>
              <a href={`${base}/blog`}>Blog</a>
              <a href={`${base}/contact`}>Contact</a>
              <a href="https://x.com/tessiumdev">
                X / Twitter <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tessium</span>
          <span className="concept-note">Homepage design concept</span>
          <div>
            <a href={`${base}/privacy`}>Privacy</a>
            <a href={`${base}/terms`}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
