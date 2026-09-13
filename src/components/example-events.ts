// Illustrative values using the public basic event schemas reviewed 2026-09-13.
// Abbreviated addresses are presentation data, not valid subscription addresses.
export const amounts = [
  3.15, 1.28, 8.42, 0.94, 5.61, 2.07, 12.48, 4.33, 0.68, 6.91,
];
export function exampleEvent(stream: string, tick: number) {
  const amount = amounts[tick % amounts.length].toFixed(2);
  const slot = 436312304 + tick;
  const common = {
    slot,
    signature: "2ypW…7eZB",
    blockTime: 1785482177 + tick,
    protocol: "pumpfun_amm",
  };
  const token = {
    mint: "So111…11112",
    amountRaw: String(Math.round(Number(amount) * 1e9)),
    amount,
    decimals: 9,
  };
  const quote = {
    mint: "EPj…Dt1v",
    amountRaw: String(Math.round(Number(amount) * 142.63 * 1e6)),
    amount: (Number(amount) * 142.63).toFixed(2),
    decimals: 6,
  };
  const buy = (tick % amounts.length) % 3 !== 1;
  const trades = {
    ...common,
    tradeType: buy ? "buy" : "sell",
    user: "9GXm…q8zP",
    input: buy ? quote : token,
    output: buy ? token : quote,
    valueUsd: quote.amount,
  };
  const payloads: Record<string, object> = {
    token_trades: trades,
    wallet_trades: { ...trades, protocol: "jupiter" },
    token_transfers: {
      ...common,
      protocol: "unknown",
      from: "9GXm…q8zP",
      to: "2ypW…7eZB",
      ...token,
    },
    wallet_transfers: {
      ...common,
      protocol: "unknown",
      direction: buy ? "in" : "out",
      counterparty: "2ypW…7eZB",
      ...token,
      valueUsd: quote.amount,
    },
    launches: {
      ...common,
      protocol: "pumpfun",
      mint: "3hz7…pump",
      creator: "9GXm…q8zP",
      bondingCurve: "79Pe…h3Qx",
      name: "Example Token",
      symbol: "EXMP",
    },
    migrations: {
      ...common,
      protocol: "pumpfun",
      mint: "3hz7…pump",
      from: { type: "bonding_curve", account: "79Pe…h3Qx" },
      to: { type: "amm_pool", account: "Pl7…3xQd" },
    },
    pool_creations: {
      ...common,
      protocol: "raydium_cpmm",
      pool: "Pl7…3xQd",
      tokens: ["3hz7…pump", "So111…11112"],
    },
    candles: {
      interval: "1m",
      priceCurrency: "usd",
      openTime: 1785482160,
      open: "142.18",
      high: "142.86",
      low: "141.94",
      close: "142.63",
      volumeToken: "129.17",
      closed: false,
    },
  };
  const prefix: Record<string, string> = {
    token_trades: "tt",
    token_transfers: "tx",
    wallet_trades: "wt",
    wallet_transfers: "wx",
    launches: "ln",
    migrations: "mg",
    pool_creations: "pc",
    candles: "cd",
  };
  return {
    op: "event",
    sub: `${prefix[stream]}_1`,
    stream,
    cursor: `${String(slot).padStart(12, "0")}:000015:0000`,
    data: payloads[stream],
  };
}
