import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  Brain, 
  Target, 
  Wallet,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Activity,
  DollarSign
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAccount, useBalance } from "wagmi";

const modules = [
  {
    id: "vaults",
    name: "Parallel Restaking Vaults",
    description: "Stake LST tokens across multiple protocols simultaneously",
    icon: <Coins className="w-6 h-6" />,
    href: "/vaults",
    gradient: "from-blue-500 to-purple-600",
    features: ["Multi-protocol staking", "NFT receipts", "Auto-compounding"],
    apy: "12.4%"
  },
  {
    id: "intents",
    name: "Intent-Based DeFi",
    description: "Express your goals, let AI find optimal execution paths",
    icon: <Target className="w-6 h-6" />,
    href: "/intents",
    gradient: "from-purple-500 to-pink-600",
    features: ["Natural language", "AI optimization", "Multi-step execution"],
    success: "94.2%"
  },
  {
    id: "predictions",
    name: "zkML Prediction Oracle",
    description: "AI-powered predictions with zero-knowledge proofs",
    icon: <Brain className="w-6 h-6" />,
    href: "/predictions",
    gradient: "from-pink-500 to-red-600",
    features: ["Multiple AI models", "zkSNARK proofs", "On-chain verification"],
    accuracy: "87.3%"
  },
  {
    id: "wallet",
    name: "Smart Wallet (ERC-7579)",
    description: "Modular account abstraction with advanced features",
    icon: <Wallet className="w-6 h-6" />,
    href: "/wallet",
    gradient: "from-green-500 to-blue-600",
    features: ["Gasless transactions", "Social recovery", "Plugin system"],
    gasSaved: "$12.4K"
  }
];

const recentActivity = [
  { action: "Deposited to stETH Vault", amount: "2.5 ETH", time: "2 hours ago", type: "vault" },
  { action: "Intent: Maximize yield", amount: "1000 USDC", time: "4 hours ago", type: "intent" },
  { action: "Price prediction verified", amount: "ETH/USD", time: "6 hours ago", type: "prediction" },
  { action: "Gasless transaction", amount: "0.1 ETH", time: "1 day ago", type: "wallet" }
];

const Index = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="gradient-text">DeFi Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              The most advanced Web3 platform combining restaking, AI intents, 
              zkML predictions, and smart wallets on Monad
            </p>
          </div>
          
          {!isConnected && (
            <div className="flex justify-center">
              <Button size="lg" className="btn-web3 text-lg px-8 py-4">
                Connect Wallet to Get Started
              </Button>
            </div>
          )}
        </div>

        {/* User Portfolio - Show if connected */}
        {isConnected && (
          <Card className="glass-card glow-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Your Portfolio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">
                    {balance ? `${parseFloat(balance.formatted).toFixed(3)} ${balance.symbol}` : "0.000 ETH"}
                  </p>
                  <p className="text-sm text-muted-foreground">Wallet Balance</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
                  <p className="text-2xl font-bold text-success">+18.4%</p>
                  <p className="text-sm text-muted-foreground">Total Yield</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <p className="text-2xl font-bold">$4.2K</p>
                  <p className="text-sm text-muted-foreground">Staked Value</p>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-warning" />
                  <p className="text-2xl font-bold">$127</p>
                  <p className="text-sm text-muted-foreground">Gas Saved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feature Modules */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Platform Modules</h2>
            <p className="text-muted-foreground">Four cutting-edge Web3 modules in one platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => (
              <Card key={module.id} className="glass-card group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-elevated">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${module.gradient} text-white`}>
                        {module.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{module.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {module.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {module.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="space-y-1">
                      {module.apy && (
                        <>
                          <p className="text-xs text-muted-foreground">APY</p>
                          <p className="font-bold text-success">{module.apy}</p>
                        </>
                      )}
                      {module.success && (
                        <>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                          <p className="font-bold text-primary">{module.success}</p>
                        </>
                      )}
                      {module.accuracy && (
                        <>
                          <p className="text-xs text-muted-foreground">Accuracy</p>
                          <p className="font-bold text-accent">{module.accuracy}</p>
                        </>
                      )}
                      {module.gasSaved && (
                        <>
                          <p className="text-xs text-muted-foreground">Gas Saved</p>
                          <p className="font-bold text-warning">{module.gasSaved}</p>
                        </>
                      )}
                    </div>
                    <Link to={module.href}>
                      <Button className="btn-ghost-web3">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {isConnected && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest platform interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === "vault" ? "bg-blue-500/20" :
                        activity.type === "intent" ? "bg-purple-500/20" :
                        activity.type === "prediction" ? "bg-pink-500/20" :
                        "bg-green-500/20"
                      }`}>
                        {activity.type === "vault" && <Coins className="w-4 h-4" />}
                        {activity.type === "intent" && <Target className="w-4 h-4" />}
                        {activity.type === "prediction" && <Brain className="w-4 h-4" />}
                        {activity.type === "wallet" && <Wallet className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.amount}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        {!isConnected && (
          <Card className="glass-card text-center">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect your wallet to access all four advanced Web3 modules and start 
                maximizing your DeFi potential on Monad testnet.
              </p>
              <Button size="lg" className="btn-web3 text-lg px-8 py-4">
                Connect Wallet Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;
