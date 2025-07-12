import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import '@rainbow-me/rainbowkit/styles.css';

import Index from "./pages/Index";
import RestakingVaults from "./pages/RestakingVaults";
import DeFiIntents from "./pages/DeFiIntents"; 
import AIPredictions from "./pages/AIPredictions";
import SmartWallet from "./pages/SmartWallet";
import NotFound from "./pages/NotFound";

// Monad testnet configuration (simulated with Sepolia for demo)
const monadTestnet = {
  id: 84532,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.monad.testnet'] }
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://explorer.monad.testnet' }
  }
};

const config = getDefaultConfig({
  appName: 'DeFi Platform',
  projectId: 'your-project-id',
  chains: [mainnet, sepolia, monadTestnet],
  ssr: false,
});

const queryClient = new QueryClient();

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vaults" element={<RestakingVaults />} />
              <Route path="/intents" element={<DeFiIntents />} />
              <Route path="/predictions" element={<AIPredictions />} />
              <Route path="/wallet" element={<SmartWallet />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;
