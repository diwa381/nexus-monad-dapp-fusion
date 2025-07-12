import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, TrendingUp, Shield, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

interface Vault {
  id: string;
  name: string;
  apy: number;
  tvl: string;
  risk: "Low" | "Medium" | "High";
  strategy: string;
  icon: React.ReactNode;
}

const vaults: Vault[] = [
  {
    id: "1",
    name: "stETH Parallel Vault",
    apy: 12.4,
    tvl: "$2.3M",
    risk: "Low",
    strategy: "Multi-protocol staking",
    icon: <Coins className="w-5 h-5" />
  },
  {
    id: "2", 
    name: "rsETH Boost Vault",
    apy: 18.7,
    tvl: "$1.8M",
    risk: "Medium",
    strategy: "Leveraged restaking",
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: "3",
    name: "cbETH Safe Vault", 
    apy: 9.2,
    tvl: "$4.1M",
    risk: "Low",
    strategy: "Conservative staking",
    icon: <Shield className="w-5 h-5" />
  }
];

export default function RestakingVaults() {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedVault, setSelectedVault] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDeposit = async () => {
    if (!selectedVault || !depositAmount) {
      toast({
        title: "Missing Information",
        description: "Please select a vault and enter deposit amount",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deposit Initiated",
      description: `Depositing ${depositAmount} ETH to ${vaults.find(v => v.id === selectedVault)?.name}`,
    });

    // Simulate transaction
    setTimeout(() => {
      toast({
        title: "Deposit Successful!",
        description: "Your NFT receipt has been minted to your wallet",
      });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Coins className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Parallel Restaking Vaults</h1>
              <p className="text-muted-foreground">Maximize your LST yields across multiple protocols</p>
            </div>
          </div>
        </div>

        {/* Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vaults.map((vault) => (
            <Card 
              key={vault.id}
              className={`glass-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedVault === vault.id ? 'ring-2 ring-primary glow-primary' : ''
              }`}
              onClick={() => setSelectedVault(vault.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {vault.icon}
                    <CardTitle className="text-lg">{vault.name}</CardTitle>
                  </div>
                  <Badge variant={vault.risk === 'Low' ? 'default' : vault.risk === 'Medium' ? 'secondary' : 'destructive'}>
                    {vault.risk}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">APY</span>
                    <span className="font-bold text-success">{vault.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">TVL</span>
                    <span className="font-semibold">{vault.tvl}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Strategy</p>
                  <p className="text-sm">{vault.strategy}</p>
                </div>
                <Progress value={Math.random() * 100} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Deposit Interface */}
        <Tabs defaultValue="deposit" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="positions">My Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Quick Deposit
                </CardTitle>
                <CardDescription>
                  Deposit your LST tokens and receive a composable NFT receipt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Deposit Amount (ETH)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="web3-input"
                  />
                </div>
                <Button 
                  onClick={handleDeposit}
                  className="w-full btn-web3"
                  disabled={!selectedVault || !depositAmount}
                >
                  Deposit & Mint NFT Receipt
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Active Positions</CardTitle>
                <CardDescription>Your staked positions and NFT receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active positions</p>
                  <p className="text-sm">Deposit into a vault to start earning yields</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}