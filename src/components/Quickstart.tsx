import { useEffect, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

const snippets = {
  TypeScript: `const ws = new WebSocket(\n  'wss://api.tessium.dev/stream?key=YOUR_API_KEY'\n);\n\nws.onopen = () => ws.send(JSON.stringify({\n  op: 'subscribe',\n  stream: 'launches',\n  params: { platforms: ['pumpfun'] },\n  id: 1\n}));\n\nws.onmessage = ({ data }) => {\n  const event = JSON.parse(data);\n  if (event.op === 'event') console.log(event.data);\n};`,
  Python: `import asyncio, json, websockets\n\nasync def main():\n  endpoint = 'wss://api.tessium.dev/stream?key=YOUR_API_KEY'\n  async with websockets.connect(endpoint) as ws:\n    await ws.send(json.dumps({\n      'op': 'subscribe',\n      'stream': 'launches',\n      'params': { 'platforms': ['pumpfun'] },\n      'id': 1\n    }))\n    async for data in ws:\n      event = json.loads(data)\n      if event['op'] == 'event': print(event['data'])\n\nasyncio.run(main())`,
};
function Highlight({ code }: { code: string }) {
  return (
    <>
      {code.split("\n").map((line, i) => (
        <span className="code-line" key={i}>
          <span className="line-number" aria-hidden="true">
            {i + 1}
          </span>
          <span>
            {line
              .split(
                /('[^']*'|\b(?:const|new|async|await|import|from|def|with|as|for|in|if)\b)/g,
              )
              .map((part, j) => (
                <span
                  className={
                    part.startsWith("'")
                      ? "syntax-string"
                      : /^(const|new|async|await|import|from|def|with|as|for|in|if)$/.test(
                            part,
                          )
                        ? "syntax-keyword"
                        : undefined
                  }
                  key={j}
                >
                  {part}
                </span>
              )) || "\u00a0"}
          </span>
        </span>
      ))}
    </>
  );
}
export default function Quickstart() {
  const [language, setLanguage] = useState<keyof typeof snippets>("TypeScript");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(snippets[language]);
      setCopied(true);
      setError(false);
    } catch {
      setError(true);
    }
  }
  return (
    <div className="code-window">
      <div className="code-window-header">
        <span>
          <Terminal size={16} />
          Your first connection
        </span>
        <div className="code-languages">
          {(["TypeScript", "Python"] as const).map((lang) => (
            <button
              key={lang}
              aria-pressed={language === lang}
              onClick={() => {
                setLanguage(lang);
                setCopied(false);
                setError(false);
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
      <pre tabIndex={0} aria-label={`${language} connection example`}>
        <code>
          <Highlight code={snippets[language]} />
        </code>
      </pre>
      <div className="code-footer">
        <span role="status">
          {error
            ? "Select the code to copy it manually."
            : copied
              ? "Copied to clipboard"
              : language === "Python"
                ? "Requires Python 3.10+ and websockets"
                : "Use a server runtime with WebSocket support"}
        </span>
        <button onClick={copy} className="copy-button">
          {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
    </div>
  );
}
