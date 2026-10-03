import { useId } from "react";

/** One scalable composition for every screen. No raster textures or cropping. */
export default function SignalMark({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`signal-mark ${compact ? "signal-mark-compact" : ""}`}
      viewBox="0 0 1000 440"
      fill="none"
      role="img"
      aria-label="Three fine streams converge into the Tessium mark"
    >
      <defs>
        <linearGradient
          id={id}
          x1="130"
          y1="100"
          x2="900"
          y2="220"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" stopOpacity=".8" />
          <stop offset=".38" stopColor="#888888" stopOpacity=".38" />
          <stop offset=".8" stopColor="#cccccc" stopOpacity=".65" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      {[-1, 0, 1].map((branch) => (
        <g key={branch}>
          {Array.from({ length: 23 }, (_, i) => {
            const t = i / 22;
            const x = branch === 0 ? 130 : 190;
            const y = 220 + branch * 155;
            const spread = Math.sin(t * Math.PI) * 47;
            const bias = (t - 0.5) * 20;
            return (
              <path
                key={i}
                d={`M${x} ${y} C${x + 98} ${y - spread + bias} ${430 + t * 100} ${220 + branch * 50 - spread * 0.3} 890 220 C${540 - t * 75} ${220 + branch * 34 + spread * 0.25} ${x + 90} ${y + spread + bias} ${x} ${y}`}
                stroke={`url(#${id})`}
                strokeWidth={i % 5 === 0 ? 1.25 : 0.65}
                opacity={0.28 + t * 0.55}
              />
            );
          })}
          <path
            className="vector-signal-pulse"
            d={`M${branch === 0 ? 130 : 190} ${220 + branch * 155} C350 ${220 + branch * 145} 490 220 890 220`}
            stroke="#ffffff"
            strokeWidth="1.4"
            pathLength="100"
            style={{ animationDelay: `${branch * -2}s` }}
          />
        </g>
      ))}
      <path d="M890 220H945" stroke="#ffffff" strokeOpacity=".3" />
      <circle cx="890" cy="220" r="2" fill="#ffffff" />
    </svg>
  );
}
