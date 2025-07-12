import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Shield, Zap, Users, Settings, CheckCircle, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { useAccount } from "wagmi";

interface WalletModule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
  benefits: string[];
}

interface Transaction {
  id: string;
  type: string;
  amount: string;
  status: "pending" | "completed" | "failed";
  gasless: boolean;
  timestamp: Date;
}

export default function SmartWallet() {
  const { address, isConnected } = useAccount();
  const [modules, setModules] = useState<WalletModule[]>([
    {
      id: "gasless",
      name: "Gasless Transactions",
      description: "Execute transactions without paying gas fees",
      enabled: false,
      icon: <Zap className="w-5 h-5" />,
      benefits: ["Zero gas fees", "Improved UX", "Sponsored transactions"]
    },
    {
      id: "social",
      name: "Social Recovery",
      description: "Recover your wallet using trusted guardians",
      enabled: false,
      icon: <Users className="w-5 h-5" />,
      benefits: ["No seed phrase needed", "Guardian-based recovery", "Enhanced security"]
    },
    {
      id: "automation",
      name: "Intent Automation",
      description: "Automatically execute intents and strategies",
      enabled: false,
      icon: <Settings className="w-5 h-5" />,
      benefits: ["Auto-execution", "Smart scheduling", "Condition-based triggers"]
    },
    {
      id: "session",
      name: "Session Keys",
      description: "Temporary keys for specific applications",
      enabled: false,
      icon: <Shield className="w-5 h-5" />,
      benefits: ["Time-limited access", "App-specific permissions", "Enhanced security"]
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "Vault Deposit",
      amount: "2.5 ETH",
      status: "completed",
      gasless: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: "2", 
      type: "Intent Execution",
      amount: "1000 USDC",
      status: "completed",
      gasless: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    }
  ]);

  const { toast } = useToast();

  const toggleModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, enabled: !module.enabled }
        : module
    ));

    const module = modules.find(m => m.id === moduleId);
    if (module) {
      toast({
        title: `${module.name} ${!module.enabled ? 'Enabled' : 'Disabled'}`,
        description: !module.enabled ? 
          `${module.name} is now active on your smart wallet` :
          `${module.name} has been disabled`
      });
    }
  };

  const executeGaslessTransaction = () => {
    const gaslessEnabled = modules.find(m => m.id === "gasless")?.enabled;
    
    if (!gaslessEnabled) {
      toast({
        title: "Gasless Transactions Disabled",
        description: "Please enable gasless transactions first",
        variant: "destructive"
      });
      return;
    }

    const newTx: Transaction = {
      id: Date.now().toString(),
      type: "Test Transaction",
      amount: "0.1 ETH",
      status: "pending",
      gasless: true,
      timestamp: new Date()
    };

    setTransactions(prev => [newTx, ...prev]);

    toast({
      title: "Gasless Transaction Initiated",
      description: "Transaction is being processed with no gas fees"
    });

    // Simulate transaction completion
    setTimeout(() => {
      setTransactions(prev => prev.map(tx =>
        tx.id === newTx.id ? { ...tx, status: "completed" } : tx
      ));
      
      toast({
        title: "Transaction Completed!",
        description: "Gasless transaction executed successfully"
      });
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Smart Wallet (ERC-7579)</h1>
              <p className="text-muted-foreground">Modular account abstraction with advanced features</p>
            </div>
          </div>
          
          {isConnected && (
            <div className="flex items-center gap-2 mt-4">
              <Badge variant="outline" className="bg-success/10 border-success">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <span className="text-sm text-muted-foreground font-mono">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          )}
        </div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="modules">Wallet Modules</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <Card key={module.id} className="glass-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {module.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{module.name}</CardTitle>
                          <CardDescription>{module.description}</CardDescription>
                        </div>
                      </div>
                      <Switch
                        checked={module.enabled}
                        onCheckedChange={() => toggleModule(module.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Benefits:</Label>
                      <ul className="space-y-1">
                        {module.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-success" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Test Gasless Transaction */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Test Smart Wallet Features
                </CardTitle>
                <CardDescription>
                  Try out your smart wallet's advanced capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={executeGaslessTransaction}
                  className="btn-web3"
                  disabled={!modules.find(m => m.id === "gasless")?.enabled}
                >
                  Execute Gasless Transaction
                </Button>
                
                {!modules.find(m => m.id === "gasless")?.enabled && (
                  <p className="text-sm text-muted-foreground">
                    Enable gasless transactions to test this feature
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your smart wallet transaction activity</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No transactions yet</p>
                    <p className="text-sm">Your smart wallet transactions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{tx.type}</span>
                            {tx.gasless && (
                              <Badge variant="secondary" className="text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Gasless
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{tx.amount}</p>
                          <p className="text-xs text-muted-foreground">
                            {tx.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <Badge 
                          variant={
                            tx.status === "completed" ? "default" :
                            tx.status === "pending" ? "secondary" : "destructive"
                          }
                        >
                          {tx.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {tx.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {tx.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Wallet Configuration</CardTitle>
                <CardDescription>Advanced smart wallet settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Multi-signature</Label>
                      <p className="text-sm text-muted-foreground">Require multiple signatures for transactions</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Spending Limits</Label>
                      <p className="text-sm text-muted-foreground">Set daily/monthly spending limits</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Auto-approve Small Amounts</Label>
                      <p className="text-sm text-muted-foreground">Skip confirmation for transactions under $10</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-medium mb-4">Recovery Options</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Setup Guardian Recovery
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Export Recovery Phrase
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}