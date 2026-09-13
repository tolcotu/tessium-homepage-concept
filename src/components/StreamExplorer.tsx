import { useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  Copy,
  Radio,
  Wallet,
} from "lucide-react";
import { amounts as values, exampleEvent } from "./example-events";

const groups = [
  {
    name: "Tokens",
    icon: Activity,
    description: "Every trade. Every transfer. The whole picture.",
    streams: ["token_trades", "token_transfers", "candles"],
  },
  {
    name: "New markets",
    icon: Radio,
    description: "Catch the beginning of what happens next.",
    streams: ["launches", "migrations", "pool_creations"],
  },
  {
    name: "Wallets",
    icon: Wallet,
    description: "Follow the wallets that matter to you.",
    streams: ["wallet_trades", "wallet_transfers"],
  },
];
const descriptions: Record<string, string> = {
  token_trades:
    "Decoded swaps across a token’s pools, delivered as they happen.",
  token_transfers:
    "Incoming and outgoing transfers, mints, and burns for a token.",
  candles: "Live OHLCV in USD or SOL, built from the same trade data.",
  launches: "New tokens appearing on supported launchpads.",
  migrations: "Tokens graduating from a bonding curve to an AMM.",
  pool_creations: "New liquidity pools on supported automated market makers.",
  wallet_trades:
    "A wallet’s trades, resolved into the route they actually took.",
  wallet_transfers: "Incoming and outgoing token movements for a wallet.",
};

export default function StreamExplorer({ motion }: { motion: boolean }) {
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const [group, setGroup] = useState(0);
  const [stream, setStream] = useState("token_trades");
  const [tick, setTick] = useState(0);
  const [format, setFormat] = useState<"activity" | "json">("activity");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (!motion || !visible || format === "json") return;
    const interval = window.setInterval(() => setTick((t) => t + 1), 2300);
    return () => window.clearInterval(interval);
  }, [motion, visible, format]);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  const market = group === 1;
  const transfers = stream.includes("transfers");
  const json = JSON.stringify(exampleEvent(stream, tick), null, 2);
  const selectGroup = (index: number) => {
    setGroup(index);
    setStream(groups[index].streams[0]);
    setTick(0);
  };
  async function copy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <div className="explorer" id="stream-explorer" ref={container}>
      <div className="scope-tabs" role="tablist" aria-label="Stream scope">
        {groups.map((item, index) => (
          <button
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={group === index}
            tabIndex={group === index ? 0 : -1}
            key={item.name}
            onClick={() => selectGroup(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight")
                next = (index + 1) % groups.length;
              else if (event.key === "ArrowLeft")
                next = (index + groups.length - 1) % groups.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = groups.length - 1;
              else return;
              event.preventDefault();
              selectGroup(next);
              document.getElementById(`${id}-tab-${next}`)?.focus();
            }}
          >
            <item.icon size={17} />
            {item.name}
            <span>{item.streams.length}</span>
          </button>
        ))}
      </div>
      <div
        className="explorer-body"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${group}`}
      >
        <aside className="stream-sidebar">
          <div className="stream-options">
            {groups[group].streams.map((name) => (
              <button
                key={name}
                aria-pressed={name === stream}
                onClick={() => {
                  setStream(name);
                  setTick(0);
                }}
              >
                <CircleDot size={14} />
                <span>{name}</span>
                <ChevronRight size={14} />
              </button>
            ))}
          </div>
          <div className="scope-note">
            <a className="text-link" href="https://tessium.dev/docs/streams/">
              Explore the docs <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
        <div className="stream-display">
          <div className="display-header">
            <div>
              <span className="mono stream-name">{stream}</span>
              <p>{descriptions[stream]}</p>
            </div>
            <div className="demo-badge">
              <i />
              Example data
            </div>
          </div>
          <div className="stream-toolbar">
            <div className="view-switch" aria-label="Preview format">
              <button
                aria-pressed={format === "activity"}
                onClick={() => setFormat("activity")}
              >
                <Activity size={13} />
                Activity
              </button>
              <button
                aria-pressed={format === "json"}
                onClick={() => setFormat("json")}
              >
                <Braces size={13} />
                JSON
              </button>
            </div>
          </div>
          {format === "json" ? (
            <div className="json-preview">
              <pre tabIndex={0} aria-label="Example event JSON">
                {json}
              </pre>
              <button
                className="icon-button copy-json"
                onClick={copy}
                aria-label={copied ? "Copied JSON" : "Copy example JSON"}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
              <span className="sr-only" role="status">
                {copied
                  ? "JSON copied"
                  : copyError
                    ? "Copy unavailable. Select the JSON to copy it manually."
                    : ""}
              </span>
            </div>
          ) : stream === "candles" ? (
            <div className="candle-preview">
              <div>
                <span className="small-muted">SOL / USD · illustrative</span>
                <strong>
                  $142.63 <small>+2.41%</small>
                </strong>
              </div>
              <svg
                viewBox="0 0 600 160"
                aria-label="Illustrative candlestick chart"
                role="img"
              >
                {Array.from({ length: 36 }, (_, i) => {
                  const y = 95 - i * 1.6 + Math.sin(i * 1.6) * 19;
                  return (
                    <g
                      key={i}
                      className={i % 3 === 0 ? "down-candle" : "up-candle"}
                    >
                      <path d={`M${i * 16 + 12} ${y - 15}v47`} />
                      <rect
                        x={i * 16 + 8}
                        y={y}
                        width="8"
                        height={i % 3 === 0 ? 21 : 12}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          ) : (
            <div
              className="event-table"
              aria-label={`Illustrative ${stream} events`}
            >
              <div className="event-table-head">
                <span>{market ? "Event" : "Direction"}</span>
                <span>{market ? "Token" : "Amount"}</span>
                <span>
                  {market || stream === "wallet_trades"
                    ? "Protocol"
                    : stream === "token_transfers"
                      ? "To wallet"
                      : stream === "wallet_transfers"
                        ? "Counterparty"
                        : "Wallet"}
                </span>
                <span>Slot</span>
              </div>
              {Array.from({ length: 5 }, (_, i) => {
                const n = (tick + i) % values.length;
                const buy = n % 3 !== 1;
                return (
                  <div className="event-row" key={`${stream}-${tick + i}`}>
                    <span
                      className={
                        market ? "event-new" : buy ? "event-buy" : "event-sell"
                      }
                    >
                      {market ? (
                        <Radio size={12} />
                      ) : buy ? (
                        <ArrowDownLeft size={12} />
                      ) : (
                        <ArrowUpRight size={12} />
                      )}{" "}
                      {market
                        ? stream === "launches"
                          ? "Launch"
                          : stream === "migrations"
                            ? "Migration"
                            : "New pool"
                        : transfers
                          ? stream === "token_transfers"
                            ? "Transfer"
                            : buy
                              ? "Received"
                              : "Sent"
                          : buy
                            ? "Buy"
                            : "Sell"}
                    </span>
                    <span>
                      {market
                        ? ["EXMP", "DEMO", "TEST", "SAMPLE", "TOKEN"][i]
                        : `${values[n].toFixed(2)} SOL`}
                    </span>
                    <span>
                      {market
                        ? stream === "pool_creations"
                          ? [
                              "Raydium",
                              "Meteora",
                              "Orca",
                              "Raydium",
                              "Meteora",
                            ][i]
                          : "pump.fun"
                        : stream === "wallet_trades"
                          ? "Jupiter"
                          : transfers
                            ? "2ypW…7eZB"
                            : "9GXm…q8zP"}
                    </span>
                    <span>{436312304 + tick - i}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
