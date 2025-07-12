# 🔗 MonadX — All-in-One Next-Gen dApp on Monad

**MonadX** is a powerful full-stack decentralized application (dApp) built on the **Monad testnet**, combining four cutting-edge blockchain features into a single unified platform:

> Restaking Vaults • Intent-Based DeFi Aggregator • zkML Prediction Oracle • Modular Smart Wallet (ERC-7579)

⚡ Built in 24 hours for the [Monad Blitz Hackathon – Hyderabad, 2025](https://monad.xyz)

---

## ✨ Features

| Module                | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| 🪙 Restaking Vaults   | Deposit LSTs like rsETH into vaults for parallel restaking across protocols |
| 💡 DeFi Intent Engine | Express a yield or swap goal; get optimized execution via intents          |
| 🔮 zkML Oracle        | AI model returns predictions with on-chain zk-proof verification            |
| 🔐 Smart Wallet (AA)  | Modular wallet with gasless TXs, social recovery, plugins & intents         |

---

## 🧠 Tech Stack

- **Blockchain**: [Monad Testnet](https://monad.xyz)
- **Smart Contracts**: Solidity (via Foundry or Hardhat)
- **Frontend**: React + Vite + Tailwind CSS
- **Wallet Integration**: wagmi + viem + Web3Modal
- **Account Abstraction**: ERC-7579 modules (gasless, social recovery, etc.)
- **zkML (Simulated)**: Python model with dummy zk-SNARK verification
- **Storage**: IPFS/web3.storage (for zkML data)
- **Deployment**: Vercel

---

## 🚀 Live Demo

> 🔗 https://nexus-monad-dapp-fusion.vercel.app/
> 🧪 Requires MetaMask + Monad Testnet tokens.

---

## 🖼️ Screenshots

![MonadX Dashboard](./screenshots/dashboard.png)
![Intent Aggregator](./screenshots/intent.png)
![zkML Prediction](./screenshots/zkml.png)

---

## 🔄 Modules Overview

### 🪙 Restaking Vaults
- Deposit rsETH
- Select vault strategy (auto/manual)
- Receive NFT receipt
- Claim staking rewards

### 💡 Intent-Based DeFi Aggregator
- Express intent (e.g., "5% APY")
- Backend simulates paths
- Executes optimal route via smart contract

### 🔮 zkML Prediction Oracle
- Upload input data (e.g., credit score)
- Model runs off-chain
- Returns result + zk-proof
- Contract verifies proof on-chain

### 🔐 Modular Smart Wallet (ERC-7579)
- Connects smart wallet
- Plugin system for:
  - Gasless transactions
  - Social recovery
  - Intent signing
- Real TXs on Monad

---
