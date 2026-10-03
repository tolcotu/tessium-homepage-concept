import {
  ArrowUpRight,
  Bell,
  ChartNoAxesCombined,
  Code2,
  Radio,
  Wallet,
} from "lucide-react";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export function Pipeline() {
  return (
    <div
      className="pipeline"
      aria-label="Solana programs flow through Tessium decoding and filtering into your application"
    >
      <div className="pipeline-top">
        <span>On-chain activity</span>
        <span>One structured stream</span>
      </div>
      <svg
        className="pipeline-lines"
        viewBox="0 0 1120 385"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pipeGradient">
            <stop stopColor="#444444" />
            <stop offset=".55" stopColor="#adadad" />
            <stop offset="1" stopColor="#797979" />
          </linearGradient>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {[72, 181, 290].map((y, i) => (
          <g key={y}>
            {[-4, 0, 4].map((offset) => (
              <path
                key={offset}
                className="draw-path pipeline-thread"
                d={`M168 ${y + offset}H230C340 ${y + offset} 382 ${181 + offset * 0.25} 511 ${181 + offset * 0.25}`}
                stroke="url(#pipeGradient)"
                strokeOpacity={offset === 0 ? ".74" : ".24"}
              />
            ))}
            <path
              className="moving-signal"
              style={{ animationDelay: `${i * -1.8}s` }}
              d={`M168 ${y}H230C340 ${y} 382 181 511 181`}
              stroke="#cbcbcb"
              strokeWidth="2"
              strokeDasharray="14 600"
            />
          </g>
        ))}
        {[-5, 0, 5].map((offset) => (
          <path
            key={offset}
            className="draw-path pipeline-thread"
            d={`M609 ${181 + offset}C710 ${181 + offset} 815 ${181 + offset * 0.35} 958 181`}
            stroke="url(#pipeGradient)"
            strokeOpacity={offset === 0 ? ".74" : ".24"}
          />
        ))}
        <path
          className="moving-signal output-signal"
          d="M609 181C710 181 815 181 958 181"
          stroke="#cbcbcb"
          strokeWidth="2"
          strokeDasharray="22 600"
        />
        {[72, 181, 290].map((y) => (
          <circle key={`source-${y}`} cx="168" cy={y} r="2.5" fill="#adadad" />
        ))}
        <circle cx="958" cy="181" r="2.5" fill="#adadad" />
        <path d="M790 171L800 181L790 191" stroke="#9d9d9d" />
      </svg>
      <div className="pipeline-sources">
        <div>
          <img src={asset("pump-fun.webp")} alt="" />
          Launchpads
        </div>
        <div>
          <img src={asset("raydium.webp")} alt="" />
          AMMs & pools
        </div>
        <div>
          <img src={asset("jupiter.webp")} alt="" />
          Routers
        </div>
      </div>
      <div className="pipeline-core">
        <div className="core-halo" />
        <img src={asset("mark.svg")} alt="Tessium" />
        <div className="core-label">Decode. Resolve. Filter.</div>
      </div>
      <div className="pipeline-output">
        <Code2 size={25} strokeWidth={1} />
        <span>Your application</span>
      </div>
    </div>
  );
}

export function OutcomeArt({ type }: { type: "chart" | "alerts" | "wallet" }) {
  if (type === "chart")
    return (
      <div className="outcome-art chart-art" aria-hidden="true">
        <div className="mini-heading">
          <ChartNoAxesCombined size={15} />
          <span>SOL / USD</span>
          <span className="mini-value">142.63</span>
        </div>
        <svg viewBox="0 0 460 160" fill="none">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#adadad" stopOpacity=".13" />
              <stop offset="1" stopColor="#adadad" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[35, 75, 115].map((y) => (
            <path
              key={y}
              d={`M0 ${y}H460`}
              stroke="#ffffff"
              strokeOpacity=".06"
            />
          ))}
          <path
            d="M0 127L18 125L30 137L48 115L66 122L78 102L98 113L115 93L138 103L152 82L166 96L180 64L198 75L212 68L228 89L246 78L260 56L274 67L292 43L308 53L326 31L339 47L354 35L370 45L390 21L408 30L424 17L442 27L460 8V160H0Z"
            fill="url(#chartFill)"
          />
          <path
            className="chart-line"
            d="M0 127L18 125L30 137L48 115L66 122L78 102L98 113L115 93L138 103L152 82L166 96L180 64L198 75L212 68L228 89L246 78L260 56L274 67L292 43L308 53L326 31L339 47L354 35L370 45L390 21L408 30L424 17L442 27L460 8"
            stroke="#adadad"
            strokeWidth="1.5"
          />
        </svg>
        <div className="chart-times">
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
        </div>
      </div>
    );
  if (type === "alerts")
    return (
      <div className="outcome-art alerts-art" aria-hidden="true">
        <div className="alert-orbit">
          <span />
          <span />
          <Bell size={28} strokeWidth={1} />
        </div>
        <div className="alert-notification">
          <div className="notification-icon">
            <Radio size={17} />
          </div>
          <div>
            <strong>New token detected</strong>
            <span>pump.fun · Matches your filters</span>
          </div>
          <span className="notification-now">now</span>
        </div>
      </div>
    );
  return (
    <div className="outcome-art wallet-art" aria-hidden="true">
      <div className="wallet-node">
        <Wallet size={24} strokeWidth={1} />
      </div>
      <svg viewBox="0 0 460 244" fill="none">
        <path
          d="M60 122H155Q190 122 205 86T280 50H420M60 122H420M60 122H155Q190 122 205 158T280 194H420"
          stroke="#5d5d5d"
        />
        {[50, 122, 194].map((y) => (
          <circle key={y} r="3" cx="350" cy={y} fill="#bcbcbc" />
        ))}
      </svg>
      <div className="wallet-events">
        <span>
          <ArrowUpRight size={12} /> Trade
        </span>
        <span>
          <ArrowUpRight size={12} /> Transfer
        </span>
        <span>
          <ArrowUpRight size={12} /> Route
        </span>
      </div>
    </div>
  );
}

export function RecoveryArt() {
  return (
    <div className="recovery-art">
      <div className="recovery-top">
        <span>
          <i className="connection-dot" />
          Connection recovered
        </span>
        <span className="mono">cursor → resume</span>
      </div>
      <svg
        viewBox="0 0 520 158"
        fill="none"
        role="img"
        aria-label="Events resume after a brief connection drop"
      >
        <path d="M20 70H190M300 70H500" stroke="#797979" />
        {[40, 70, 100, 130, 160, 320, 350, 380, 410, 440, 470].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="56"
              width="10"
              height="28"
              rx="2"
              stroke="#939393"
              fill="#131313"
            />
          </g>
        ))}
        <path
          d="M190 70C205 70 205 118 245 118S285 70 300 70"
          stroke="#adadad"
          strokeDasharray="3 5"
        />
        <path d="M190 70H300" stroke="#595959" strokeDasharray="2 5" />
        <text
          x="245"
          y="43"
          textAnchor="middle"
          fill="#959595"
          fontSize="11"
          fontFamily="Geist Mono"
        >
          disconnect
        </text>
        <text
          x="245"
          y="146"
          textAnchor="middle"
          fill="#b8b8b8"
          fontSize="11"
          fontFamily="Geist Mono"
        >
          replay missed events
        </text>
      </svg>
      <div className="recovery-bottom">
        <span>Last saved cursor</span>
        <span>Back in the stream</span>
      </div>
    </div>
  );
}
