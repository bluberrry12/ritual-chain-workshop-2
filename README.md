# Ritual Hunters

Precision prediction markets powered by **Ritual Chain**'s on-chain AI scheduler (Chain ID: 1979).

Set a hunt like _"Will BTC/USD stay above $115,000 at resolution?"_, stake native RITUAL on YES or NO, and watch it settle autonomously — zero backend cron, zero manual resolver. The Ritual Scheduler wakes the contract at a target block, fetches the oracle via TEE, and finalizes. Winners claim their share of the pool.

---

## ✨ Features

### Dual Mode — SCOUT & HUNT
| | SCOUT (Demo) | HUNT (Live) |
|---|---|---|
| Wallet required | ❌ | ✅ |
| Transactions | Simulated (2s delay + fake tx hash) | Real on-chain |
| Hunts | Pre-seeded demo hunts | Live from RitualPredict contract |
| State | Zustand + localStorage | wagmi + viem |

Switch freely between modes using the **SCOUT / HUNT** toggle in the navbar.

### Pages
| Route | Description |
|---|---|
| `/` | Hero, live stats strip, How It Works, active hunts preview |
| `/markets` | Hunt Board with state filters (Live / Locked / Tracking / Claimed / Void) |
| `/markets/[id]` | Hunt detail — staking panel, odds bar, resolution countdown, activity feed |
| `/create` | Set a Trap — 4-step wizard: question, oracle config, timing, review & deploy |
| `/positions` | My Kills — active stakes, claim winnings or refunds |
| `/admin` | Command Post — execution balance monitor, fund execution wallet, system addresses |

### Smart Contract Integration
- Full ABI integration with `RitualPredict.sol` on Ritual Chain (1979)
- On-chain reads via `useReadContract` with 5s polling
- Writes via `writeContractAsync` + `waitForTransactionReceipt`
- `MarketCreated` event parsing for new market ID extraction
- Named output decoding for `stakesOf()` return struct

---

## 🏗 Architecture

```
                 createMarket()                    ┌──────────────────────────┐
   user  ────────────────────────────────────────▶│  RitualPredict.sol       │
   user  ─────────── bet(id, YES|NO) ────────────▶│                          │
                                                   │  markets, pools, stakes  │
                                     schedule() ◀──┤                          │
                                                   └──────────────────────────┘
    ┌─────────────────────────────┐                     ▲              │
    │ Scheduler  0x56e7…D58B      │  onScheduledResolve │              │ deposit()
    │ system contract             │─────────────────────┘              ▼
    │ fires at resolveBlock,      │                        ┌────────────────────────┐
    │ 3 attempts, 200 blocks apart│                        │ RitualWallet 0x532F…   │
    └─────────────────────────────┘                        │ prepaid execution fees │
                                                           └────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Vanilla CSS + Tailwind utilities |
| Animations | Framer Motion |
| Wallet | RainbowKit v2 + wagmi v2 + viem v2 |
| State | Zustand (demo store) + TanStack Query (live) |
| Icons | Lucide React |
| Chain | Ritual Chain — Chain ID 1979, ~350ms block time |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A WalletConnect Cloud project ID → [cloud.walletconnect.com](https://cloud.walletconnect.com)
- (Optional) A deployed `RitualPredict` contract address for Live mode

### Installation

```bash
# Clone and install
git clone https://github.com/your-username/ritual-hunters.git
cd ritual-hunters
npm install

# Configure environment
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# Required — get from https://cloud.walletconnect.com
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional — for Live mode with a deployed contract
NEXT_PUBLIC_PREDICT_ADDRESS=0xYourContractAddress
```

### Run

```bash
# Development
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ✅ | WalletConnect v2 project ID |
| `NEXT_PUBLIC_PREDICT_ADDRESS` | ❌ | RitualPredict contract address (Live mode) |
| `NEXT_PUBLIC_DEMO_ORACLE_URL` | ❌ | Demo oracle endpoint override |

> **Security:** `.env.local` is listed in `.gitignore` and will never be committed.

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Home — hero, stats, active hunts
│   ├── markets/page.tsx      # Hunt Board with filters
│   ├── markets/[id]/page.tsx # Hunt detail + staking panel
│   ├── create/page.tsx       # Set a Trap wizard
│   ├── positions/page.tsx    # My Kills + claim
│   ├── admin/page.tsx        # Command Post dashboard
│   ├── api/oracle/           # Price oracle routes (ETH, BTC, SOL)
│   ├── layout.tsx
│   └── globals.css           # Crosshair grid bg, CSS vars, keyframes
├── components/
│   ├── layout/               # Navbar, Footer, DemoBanner
│   ├── markets/              # MarketCard, BettingPanel, OddsBar, etc.
│   ├── create/               # CreateMarketWizard, ComparatorSelect
│   ├── positions/            # PositionCard, ClaimButton
│   ├── ui/                   # GlowCard, GlowButton, Toast, Confetti
│   └── wallet/               # ConnectButton, ChainGuard
├── hooks/                    # 11 custom hooks (useMarket, useBet, etc.)
├── contexts/                 # AppModeContext (SCOUT/HUNT)
├── lib/
│   ├── abi.ts                # RitualPredict ABI
│   ├── chains.ts             # Ritual Chain config
│   ├── constants.ts          # Contract addresses, thresholds
│   ├── demo-data.ts          # Seeded demo hunts
│   ├── demo-store.ts         # Zustand store for demo mode
│   ├── types.ts              # TypeScript interfaces
│   ├── utils.ts              # Formatting, payout math, helpers
│   └── wagmi.ts              # wagmi + RainbowKit config
└── public/
    └── ritual-logo.png       # Ritual Foundation logo
```

---

## 🎨 Design System

- **Palette:** Cosmic void (`#07060f`), Hunter violet (`#a855f7`), Hunter cyan (`#22d3ee`), Rose (`#f43f5e`), Warning orange (`#fb923c`)
- **Typography:** Rajdhani (headings) · Plus Jakarta Sans (body) · IBM Plex Mono (code/numbers)
- **Texture:** 40px crosshair target grid with ambient violet glow
- **Animations:** Page enter, skeleton shimmer, confetti on wins, toast notifications
- **Cards:** Glassmorphism with `backdrop-filter: blur`

---

## 🔗 Ritual Chain Resources

- Docs — <https://docs.ritualfoundation.org>
- Explorer — <https://explorer.ritualfoundation.org>
- Faucet — <https://faucet.ritualfoundation.org>
- dApp Skills — <https://github.com/ritual-foundation/ritual-dapp-skills>

---

## 📋 Contract Architecture Notes

**Deadlines are block numbers, not timestamps.** The Scheduler fires at a block, so betting closes at a block — `createMarket` takes human durations in seconds and converts them via `blockTimeMs`.

**A failed oracle read is never a NO.** HTTP precompile failure, non-200 response, or undecodable output all become `Invalid` (full refund to all), never a forced NO.

**Retries are built-in.** `createMarket` books `numCalls = 3` executions `200` blocks apart. On success the contract cancels remaining calls. If all 3 fail → `Invalid`.

**Payouts are pull-based.** `claimWinnings` computes `stake × totalPool ÷ winningPool` for caller only. No loops, no re-entrancy risk.

---

*Assignment completed by **Blueberry***

