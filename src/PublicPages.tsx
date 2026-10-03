import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Search,
  Mail,
  Code2,
  Radio,
  Layers,
  Activity,
} from "lucide-react";
import { pageHref } from "./routing";
import SignalMark from "./components/SignalMark";
import StreamExplorer from "./components/StreamExplorer";
import { OutcomeArt, Pipeline } from "./components/Diagrams";

const official = "https://tessium.dev";
function Intro({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="page-intro">
      <span className="section-kicker">{label}</span>
      <h1>{title}</h1>
      <p>{children}</p>
    </header>
  );
}
function NextStep({
  title = "Your next idea starts here.",
}: {
  title?: string;
}) {
  return (
    <section className="page-next">
      <div>
        <span className="section-kicker">
          One connection. Your possibilities.
        </span>
        <h2>{title}</h2>
      </div>
      <a className="button button-light" href={`${official}/login`}>
        Start building for free <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
const plans = [
  {
    name: "Free",
    price: 0,
    description: "Explore an idea.",
    features: [
      "5 subscriptions",
      "1 connection",
      "20 GB / month",
      "Trades and candles",
      "pump.fun launches",
    ],
  },
  {
    name: "Starter",
    price: 39,
    description: "Ship your first product.",
    features: [
      "100 subscriptions",
      "3 connections",
      "Unlimited traffic",
      "Transfers and all launch venues",
      "20-second catch-up",
    ],
  },
  {
    name: "Pro",
    price: 79,
    description: "See the wider market.",
    features: [
      "500 subscriptions",
      "6 connections",
      "Unlimited traffic",
      "New pools and extended fields",
      "60-second catch-up",
    ],
  },
  {
    name: "Scale",
    price: 239,
    description: "Run at production scale.",
    features: [
      "2,000 subscriptions",
      "20 connections",
      "Unlimited traffic",
      "All Pro features",
      "Full transaction ledger",
    ],
  },
];
function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <>
      <Intro label="Pricing" title="Room for your next move.">
        Start with a free connection. Choose more capacity as your product
        grows.
      </Intro>
      <div className="billing-row">
        <div className="segmented" aria-label="Billing period">
          <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button aria-pressed={annual} onClick={() => setAnnual(true)}>
            Yearly
          </button>
        </div>
        <span>Two months free with yearly billing</span>
      </div>
      <div className="plan-grid">
        {plans.map((p) => (
          <article className="plan-card" key={p.name}>
            <h2>{p.name}</h2>
            <p className="plan-description">{p.description}</p>
            <div className="plan-price">
              ${annual ? p.price * 10 : p.price}
              <span>
                {p.price === 0 ? "/ forever" : annual ? "/ year" : "/ month"}
              </span>
            </div>
            <ul>
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={14} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              className={`button ${p.name === "Free" ? "button-light" : "button-outline"}`}
              href={`${official}/login`}
            >
              {p.price === 0 ? "Start for free" : `Choose ${p.name}`}
              <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>
      <div className="custom-plan">
        <div>
          <h3>Need a different scale?</h3>
          <p>Custom capacity and terms. From $1,000.</p>
        </div>
        <a className="text-link" href={pageHref("contact")}>
          Let’s talk <ArrowRight size={16} />
        </a>
      </div>
      <section className="page-section">
        <div className="page-section-heading">
          <h2>The details, side by side.</h2>
          <p>Find the right amount of room.</p>
        </div>
        <div
          className="comparison-scroll"
          tabIndex={0}
          aria-label="Plan comparison, scroll horizontally on small screens"
        >
          <table className="comparison">
            <caption className="sr-only">Tessium plan features</caption>
            <thead>
              <tr>
                <th scope="col">Included</th>
                {plans.map((p) => (
                  <th scope="col" key={p.name}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Subscriptions", "5", "100", "500", "2,000"],
                ["Connections", "1", "3", "6", "20"],
                [
                  "Traffic",
                  "20 GB / month",
                  "Unlimited",
                  "Unlimited",
                  "Unlimited",
                ],
                [
                  "Launch venues",
                  "pump.fun",
                  "All supported",
                  "All supported",
                  "All supported",
                ],
                ["Transfers", "—", "Included", "Included", "Included"],
                ["New pools", "—", "—", "Included", "Included"],
                [
                  "Catch-up window",
                  "—",
                  "20 seconds",
                  "60 seconds",
                  "60 seconds",
                ],
                ["Transaction ledger", "—", "—", "—", "Included"],
              ].map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  {row.slice(1).map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="faq-layout">
        <h2>A few good questions.</h2>
        <div>
          {[
            [
              "Do I need a card?",
              "No card is needed to start. Paid plans use crypto payments.",
            ],
            [
              "Is Free slower?",
              "Published delivery speed is the same across plans. Capacity and available features vary.",
            ],
            [
              "How does yearly billing work?",
              "Pay for ten months to receive twelve months of access. The yearly totals above reflect that discount.",
            ],
            [
              "Where can I review billing terms?",
              "The current pricing and terms on tessium.dev govern purchases. This page is a design preview.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <NextStep title="Start small. Build something big." />
    </>
  );
}
const useCases = [
  {
    title: "Trading tools that keep up.",
    tag: "Trading bots",
    copy: "Turn launches and migrations into signals your application can act on. Keep decoding outside your strategy code.",
    streams: ["launches", "migrations", "token_trades"],
    art: "alerts" as const,
  },
  {
    title: "A market view with context.",
    tag: "Terminals & analytics",
    copy: "Bring trades, volume, and candles together in a live market interface. One event source keeps the picture coherent.",
    streams: ["token_trades", "candles", "pool_creations"],
    art: "chart" as const,
  },
  {
    title: "Follow every wallet move.",
    tag: "Wallet monitoring",
    copy: "Build watchlists, portfolio alerts, and trading activity views using wallet-scoped events.",
    streams: ["wallet_trades", "wallet_transfers"],
    art: "wallet" as const,
  },
];
function Solutions() {
  return (
    <>
      <Intro label="Solutions" title="The data is the beginning.">
        Build the tools, interfaces, and ideas that come next.
      </Intro>
      <div className="solution-list">
        {useCases.map((c, i) => (
          <section className="solution-feature" key={c.title}>
            <div>
              <span className="section-kicker">{c.tag}</span>
              <h2>{c.title}</h2>
              <p>{c.copy}</p>
              <div className="stream-chips">
                {c.streams.map((s) => (
                  <code key={s}>{s}</code>
                ))}
              </div>
              <a className="text-link" href={pageHref("streams")}>
                Explore the streams <ArrowRight size={16} />
              </a>
            </div>
            <div className={`solution-canvas solution-canvas-${i}`}>
              <OutcomeArt type={c.art} />
            </div>
          </section>
        ))}
      </div>
      <NextStep />
    </>
  );
}

const venueGroups = [
  {
    name: "Launchpads",
    streams: "launches · migrations",
    venues: [
      ["pump.fun", "pumpfun"],
      ["Raydium LaunchLab", "raydium_launchlab"],
      ["Meteora DBC", "meteora_dbc"],
      ["Moonit", "moonit"],
      ["Boop.fun", "boopfun"],
      ["Heaven", "heaven"],
      ["Sugar", "sugar"],
    ],
  },
  {
    name: "AMMs & pools",
    streams: "pool_creations · token_trades · candles",
    venues: [
      ["Raydium AMM", "raydium_v4"],
      ["Raydium CLMM", "raydium_clmm"],
      ["Raydium CPMM", "raydium_cpmm"],
      ["Orca Whirlpool", "orca_whirlpool"],
      ["Meteora DLMM", "meteora_dlmm"],
      ["Meteora DAMM v2", "meteora_damm_v2"],
      ["PumpSwap", "pumpfun_amm"],
      ["Phoenix", "phoenix"],
      ["Lifinity v2", "lifinity_v2"],
      ["SolFi", "solfi"],
      ["Stabble", "stabble"],
      ["Invariant", "invariant"],
    ],
  },
  {
    name: "Routers",
    streams: "wallet_trades",
    venues: [
      ["Jupiter", "jupiter"],
      ["OKX DEX", "okx_dex_router"],
      ["Titan", "titan"],
      ["DFlow", "dflow"],
      ["Photon", "photon"],
      ["Sanctum", "sanctum_router"],
      ["Raydium Route", "raydium_route"],
    ],
  },
];
function Coverage() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All venues");
  const filtered = venueGroups
    .filter((g) => group === "All venues" || g.name === group)
    .map((g) => ({
      ...g,
      venues: g.venues.filter((v) =>
        v.join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((g) => g.venues.length);
  return (
    <>
      <Intro label="Coverage" title="Connected to the ecosystem.">
        Discover the venues behind Tessium’s streams. More than 100 on-chain
        programs, decoded into one connection.
      </Intro>
      <div className="directory-toolbar">
        <div className="segmented">
          {["All venues", ...venueGroups.map((g) => g.name)].map((g) => (
            <button
              key={g}
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search size={16} />
          <input
            aria-label="Search venues"
            placeholder="Find a venue or slug"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div aria-live="polite">
        {filtered.map((g) => (
          <section className="venue-group" key={g.name}>
            <div>
              <h2>{g.name}</h2>
              <p>{g.streams}</p>
            </div>
            <div className="venue-directory">
              {g.venues.map(([name, slug]) => (
                <div className="venue-entry" key={slug}>
                  <span>{name}</span>
                  <code>{slug}</code>
                </div>
              ))}
            </div>
          </section>
        ))}
        {!filtered.length && (
          <div className="empty-state">
            <h2>No matching venues.</h2>
            <p>Try a different name or category.</p>
            <button
              className="button button-outline"
              onClick={() => {
                setQuery("");
                setGroup("All venues");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      <aside className="editorial-note">
        <h3>Know the boundaries.</h3>
        <p>
          Dollar values may be unavailable for trades without a priceable asset.
          Candles begin when you subscribe; they do not include historical
          backfill.
        </p>
        <a className="text-link" href={`${official}/docs/`}>
          Read coverage documentation <ArrowUpRight size={16} />
        </a>
      </aside>
      <div className="custom-plan">
        <div>
          <h3>Looking for another venue?</h3>
          <p>Tell us what your product needs.</p>
        </div>
        <a className="text-link" href={pageHref("contact")}>
          Request coverage <ArrowRight size={16} />
        </a>
      </div>
    </>
  );
}
function About() {
  return (
    <>
      <Intro
        label="About Tessium"
        title="Less work beneath. More possibility above."
      >
        A shared data layer for people building on Solana.
      </Intro>
      <div className="about-art">
        <SignalMark compact />
      </div>
      <div className="editorial-rows">
        {[
          [
            "Why we exist",
            "Every product should not have to decode the same chain.",
            "Building with on-chain events often means maintaining program decoders before working on your own product. Tessium takes on that shared infrastructure so developers can focus on what they want to create.",
          ],
          [
            "Where we started",
            "Infrastructure shaped by real applications.",
            "Tessium grew from decoding tools used privately for Solana trading applications. That foundation now supports a public data service.",
          ],
          [
            "Where we’re going",
            "One consistent way to work with Solana data.",
            "Real-time streams are the starting point. Historical data is a future direction, not a feature offered by the current streams.",
          ],
        ].map(([label, title, copy]) => (
          <section key={label}>
            <span className="section-kicker">{label}</span>
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="page-next">
        <div>
          <span className="section-kicker">Build together</span>
          <h2>Have something in mind?</h2>
        </div>
        <a className="button button-light" href={pageHref("contact")}>
          Start a conversation <ArrowRight size={16} />
        </a>
      </div>
    </>
  );
}

const articles = [
  {
    id: "parsed-streams",
    category: "Research",
    title: "Why parsed Solana streams beat raw RPC for trading bots",
    date: "August 18, 2026",
    slug: "why-parsed-solana-streams-beat-raw-rpc",
    summary:
      "The engineering cost of a feed extends beyond receiving bytes. Venue decoders, account layouts, and program updates all need an owner.",
    heading: "What belongs in your application?",
    body: "Structured streams move decoding into a shared service. Your application receives fields it can work with and retains responsibility for its own decisions, execution, and failure handling. Raw RPC remains useful for investigating programs and asking historical questions. The right boundary depends on what you are building.",
  },
  {
    id: "websocket-polling",
    category: "Development",
    title: "Solana WebSocket vs polling for token launches",
    date: "August 12, 2026",
    slug: "solana-websocket-vs-polling-for-token-launches",
    summary:
      "A timer can only discover a launch after it checks. A subscription delivers the event as it becomes available.",
    heading: "Follow events as they arrive.",
    body: "Moving the live launch path to a push stream can reduce repeated queries. Keep historical retrieval separate, confirm that your venues are covered, and compare the behavior of both paths before replacing a working integration.",
  },
  {
    id: "eight-streams",
    category: "Fundamentals",
    title: "One WebSocket, eight Solana data streams",
    date: "August 5, 2026",
    slug: "one-websocket-eight-solana-data-streams",
    summary:
      "A product can grow from one subscription to several without adding another connection pattern.",
    heading: "Choose the events your product needs.",
    body: "Market discovery, token activity, and wallet activity have different scopes, but share the same connection. Maintain a clear subscription list and plan for reconnection as part of normal operation.",
  },
  {
    id: "server-filters",
    category: "Development",
    title: "Filtering Solana trades server-side before they hit your bot",
    date: "July 2026",
    slug: "filtering-solana-trades-server-side",
    summary:
      "Narrow the feed before it reaches your application. Spend less work sorting events that do not matter.",
    heading: "Make the subscription specific.",
    body: "Define the token, wallet, or supported venue your application follows. Review the documented filters for each stream and check that your subscription matches the events your product actually needs.",
  },
  {
    id: "live-dashboards",
    category: "Fundamentals",
    title: "Solana data streams for live dashboards",
    date: "July 2026",
    slug: "solana-data-streams-for-dashboards",
    summary:
      "A live interface needs a coherent event model behind its charts, balances, and activity views.",
    heading: "From an event to an interface.",
    body: "Keep the incoming stream separate from rendering. Use structured events to update the relevant view, and make connection state visible when delivery is interrupted.",
  },
  {
    id: "flat-pricing",
    category: "Updates",
    title: "Why flat stream pricing matters under Solana load",
    date: "July 2026",
    slug: "tessium-flat-pricing-for-stream-workloads",
    summary:
      "When activity changes quickly, understanding the shape of a data bill matters as much as its starting price.",
    heading: "Plan around capacity.",
    body: "Tessium’s paid plans specify subscription and connection limits while including unmetered traffic. The Free plan has a monthly traffic allowance. Compare both capacity and available features when choosing a plan.",
  },
];
function Blog() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = articles.filter(
    (a) =>
      (category === "All" || a.category === category) &&
      a.title.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <Intro label="The Tessium journal" title="Notes from the stream.">
        Ideas and practical perspectives on building with real-time Solana data.
      </Intro>
      <a className="featured-story" href={pageHref("article/parsed-streams")}>
        <div>
          <span className="section-kicker">Research · August 18, 2026</span>
          <h2>{articles[0].title}</h2>
          <p>{articles[0].summary}</p>
          <span className="text-link">
            Read the overview <ArrowRight size={16} />
          </span>
        </div>
        <div className="story-art">
          <SignalMark compact />
        </div>
      </a>
      <div className="directory-toolbar">
        <div className="segmented">
          {["All", "Development", "Research", "Fundamentals", "Updates"].map(
            (c) => (
              <button
                key={c}
                aria-pressed={c === category}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ),
          )}
        </div>
        <label className="search-field">
          <Search size={16} />
          <input
            aria-label="Search articles"
            placeholder="Search the journal"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
      </div>
      <div className="article-grid" aria-live="polite">
        {filtered.map((a, i) => (
          <a
            className="article-card"
            key={a.id}
            href={pageHref(`article/${a.id}`)}
          >
            <div className={`article-art art-${i % 3}`} aria-hidden="true">
              {i % 3 === 0 ? <Radio /> : i % 3 === 1 ? <Code2 /> : <Layers />}
              <span />
              <span />
              <span />
            </div>
            <span className="section-kicker">
              {a.category} · {a.date}
            </span>
            <h2>{a.title}</h2>
            <span className="text-link">
              Read overview <ArrowRight size={14} />
            </span>
          </a>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>No matching articles.</h2>
          <button
            className="button button-outline"
            onClick={() => {
              setQ("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
function Article({ id }: { id: string }) {
  const a = articles.find((a) => a.id === id);
  if (!a) return <NotFound />;
  return (
    <>
      <a className="text-link back-link" href={pageHref("blog")}>
        ← Back to the journal
      </a>
      <Intro label={`${a.category} · ${a.date}`} title={a.title}>
        {a.summary}
      </Intro>
      <div className="article-cover">
        <SignalMark compact />
      </div>
      <div className="reading-layout">
        <aside>
          <span className="section-kicker">In this overview</span>
          <a href="#perspective">The perspective</a>
          <a href="#continue">Read the full article</a>
        </aside>
        <article className="prose">
          <span className="preview-label">
            Article overview · design preview
          </span>
          <h2 id="perspective">{a.heading}</h2>
          <p>{a.body}</p>
          <blockquote>Build around the event your product needs.</blockquote>
          <h2 id="continue">Continue reading</h2>
          <p>
            This short overview accompanies the editorial design. The complete
            article is available on Tessium’s website.
          </p>
          <a className="text-link" href={`${official}/blog/${a.slug}`}>
            Read the original article <ArrowUpRight size={16} />
          </a>
        </article>
      </div>
      <NextStep />
    </>
  );
}
function Contact() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General question");
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  return (
    <>
      <Intro label="Contact" title="Let’s build a connection.">
        Tell us what you are making, what you need, or what could work better.
      </Intro>
      <div className="contact-layout">
        <aside>
          <Mail size={28} strokeWidth={1} />
          <h2>A conversation starts here.</h2>
          <p>
            Questions about a stream, a custom integration, or your next
            product?
          </p>
          <a className="text-link" href="mailto:contact@tessium.dev">
            contact@tessium.dev <ArrowUpRight size={16} />
          </a>
          <div className="contact-resources">
            <a href={`${official}/docs/`}>
              Technical documentation <ArrowUpRight size={16} />
            </a>
            <a href={pageHref("pricing")}>
              Plans and capacity <ArrowRight size={16} />
            </a>
            <a href="https://status.tessium.dev">
              Service status <ArrowUpRight size={16} />
            </a>
          </div>
        </aside>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setReady(true);
          }}
        >
          <label>
            Your email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              placeholder="you@company.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setReady(false);
              }}
            />
          </label>
          <label>
            What’s on your mind?
            <select
              value={topic}
              onChange={(e) => {
                setTopic(e.target.value);
                setReady(false);
              }}
            >
              {[
                "General question",
                "Custom data & coverage",
                "Partnership",
                "Technical support",
                "Billing",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Your message
            <textarea
              required
              minLength={10}
              rows={6}
              value={message}
              placeholder="A little context goes a long way…"
              onChange={(e) => {
                setMessage(e.target.value);
                setReady(false);
              }}
            />
          </label>
          <p className="form-note">
            This preview prepares an email draft. Nothing is submitted here.
          </p>
          <button className="button button-light" type="submit">
            Prepare message <ArrowRight size={16} />
          </button>
          {ready && (
            <div className="contact-confirmation" role="status">
              <h3>Your draft is ready.</h3>
              <p>
                Open it in your email app, review it, and send when you’re
                ready.
              </p>
              <a
                className="text-link"
                href={`mailto:contact@tessium.dev?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(`Reply to: ${email}\n\n${message}`)}`}
              >
                Open email draft <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

const legalCopy = {
  terms: {
    title: "Terms of Service",
    intro: "The framework for using Tessium’s data service.",
    sections: [
      [
        "Service & access",
        "Tessium delivers structured Solana events. Access depends on your plan and the published documentation. The service is intended for professional users aged 18 or older.",
      ],
      [
        "Accounts & API keys",
        "Keep account access and keys secure. Plan limits apply across the account, not separately to each key.",
      ],
      [
        "Plans & payments",
        "Paid access uses crypto payments for a selected period. Consult the full terms for renewals, refunds, taxes, and changes to limits.",
      ],
      [
        "Data & permitted use",
        "Use of delivered data is subject to licensing and acceptable-use restrictions. Events may change before finalization, and delivery or coverage may be incomplete.",
      ],
      [
        "Questions & disputes",
        "The complete terms contain the applicable liability provisions, termination rules, and dispute process. Direct questions to contact@tessium.dev.",
      ],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "Understand how Tessium handles information about you.",
    sections: [
      [
        "Information collected",
        "The policy describes account details, API key records, technical logs, usage records, payments, subscription parameters, and correspondence.",
      ],
      [
        "Purpose & providers",
        "These records support authentication, delivery, billing, security, and support. The full policy identifies providers, processing grounds, and transfer safeguards.",
      ],
      [
        "Cookies & tracking",
        "Tessium states that it uses necessary functionality and does not run advertising, analytics, or marketing tracking on its website.",
      ],
      [
        "Retention & security",
        "Retention varies by record type. Account deletion does not immediately remove every security or billing record. Refer to the published retention schedule.",
      ],
      [
        "Your rights",
        "Requests for access, correction, deletion, restriction, portability, or objections can be sent to contact@tessium.dev. The full policy explains the conditions and process.",
      ],
    ],
  },
};
function Legal({ kind }: { kind: "terms" | "privacy" }) {
  const data = legalCopy[kind];
  return (
    <>
      <Intro label="Legal" title={data.title}>
        {data.intro}
      </Intro>
      <div className="legal-meta">
        <span>Published policy: version 1.0 · August 5, 2026</span>
        <a className="text-link" href={`${official}/${kind}`}>
          Read the complete policy <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="reading-layout">
        <aside>
          <span className="section-kicker">On this page</span>
          {data.sections.map(([title], i) => (
            <a href={`#legal-${i}`} key={title}>
              {title}
            </a>
          ))}
          <a
            className="text-link"
            href={pageHref(kind === "terms" ? "privacy" : "terms")}
          >
            {kind === "terms" ? "Privacy Policy" : "Terms of Service"}{" "}
            <ArrowRight size={14} />
          </a>
        </aside>
        <article className="prose">
          <p className="legal-preview-note">
            Design preview with a short policy overview. The full, current
            policy on tessium.dev is authoritative.
          </p>
          {data.sections.map(([title, copy], i) => (
            <section id={`legal-${i}`} key={title}>
              <h2>{title}</h2>
              <p>{copy}</p>
            </section>
          ))}
          <a className="button button-outline" href={`${official}/${kind}`}>
            View full {kind === "terms" ? "terms" : "privacy policy"}{" "}
            <ArrowUpRight size={16} />
          </a>
        </article>
      </div>
    </>
  );
}
function Streams() {
  return (
    <>
      <Intro label="Data streams" title="One connection. Every perspective.">
        Follow tokens, discover new markets, or watch a wallet. Choose the
        events your application needs.
      </Intro>
      <StreamExplorer
        motion={!window.matchMedia("(prefers-reduced-motion: reduce)").matches}
      />
      <div className="stream-overview">
        {[
          [
            "Tokens",
            "Trades, transfers, and candles for the tokens you follow.",
            Activity,
          ],
          [
            "New markets",
            "Launches, migrations, and new pools across supported venues.",
            Radio,
          ],
          [
            "Wallets",
            "Trading and transfer activity, scoped to a wallet.",
            Layers,
          ],
        ].map(([name, copy, Icon]) => {
          const I = Icon as typeof Activity;
          return (
            <article key={String(name)}>
              <I size={24} strokeWidth={1} />
              <h2>{String(name)}</h2>
              <p>{String(copy)}</p>
            </article>
          );
        })}
      </div>
      <section className="page-section">
        <div className="page-section-heading">
          <h2>Structured before it reaches you.</h2>
          <a className="text-link" href={`${official}/docs/streams/`}>
            Stream reference <ArrowUpRight size={16} />
          </a>
        </div>
        <Pipeline />
      </section>
      <NextStep />
    </>
  );
}
function NotFound() {
  return (
    <div className="empty-state">
      <h1>That page isn’t here.</h1>
      <p>Find your way back to the stream.</p>
      <a className="button button-light" href={pageHref()}>
        Back to homepage
      </a>
    </div>
  );
}
export default function PublicPage({ page }: { page: string }) {
  useEffect(() => {
    document.title = `${page.startsWith("article/") ? "Journal" : page.charAt(0).toUpperCase() + page.slice(1)} — Tessium`;
  }, [page]);
  let content;
  switch (page) {
    case "pricing":
      content = <Pricing />;
      break;
    case "solutions":
      content = <Solutions />;
      break;
    case "coverage":
      content = <Coverage />;
      break;
    case "about":
      content = <About />;
      break;
    case "blog":
      content = <Blog />;
      break;
    case "contact":
      content = <Contact />;
      break;
    case "terms":
    case "privacy":
      content = <Legal kind={page} />;
      break;
    case "streams":
      content = <Streams />;
      break;
    default:
      content = page.startsWith("article/") ? (
        <Article id={page.slice(8)} />
      ) : (
        <NotFound />
      );
  }
  return (
    <div className={`wrap public-page page-${page.split("/")[0]}`}>
      {content}
    </div>
  );
}
