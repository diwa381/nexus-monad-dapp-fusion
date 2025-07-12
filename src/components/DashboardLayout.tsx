import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Coins, 
  Brain, 
  Target, 
  Wallet,
  Menu,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Restaking Vaults", href: "/vaults", icon: Coins },
  { name: "DeFi Intents", href: "/intents", icon: Target },
  { name: "AI Predictions", href: "/predictions", icon: Brain },
  { name: "Smart Wallet", href: "/wallet", icon: Wallet },
];

const stats = [
  { label: "Total TVL", value: "$8.2M", change: "+12.3%", icon: TrendingUp },
  { label: "Active Intents", value: "247", change: "+5.2%", icon: Target },
  { label: "Predictions Made", value: "1,423", change: "+8.1%", icon: Brain },
  { label: "Gas Saved", value: "$12.4K", change: "+23.1%", icon: Zap },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="glass-card border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg glow-primary">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">DeFi Platform</h1>
                <p className="text-xs text-muted-foreground">Powered by Monad</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-primary/10 text-primary glow-hover"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Connect Button */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="hidden sm:flex bg-success/10 border-success text-success">
                <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                Monad Testnet
              </Badge>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar - Only show on dashboard */}
      {location.pathname === "/" && (
        <div className="glass-card border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xs text-success">{stat.change}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-border/50 z-50">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.name.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}