import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Target, Zap, TrendingUp, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

interface Intent {
  id: string;
  description: string;
  status: "pending" | "executing" | "completed" | "failed";
  estimatedGain: string;
  actualGain?: string;
  route: string;
  timestamp: Date;
}

export default function DeFiIntents() {
  const [intentText, setIntentText] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [amount, setAmount] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [intents, setIntents] = useState<Intent[]>([]);
  const { toast } = useToast();

  const handleSimulateIntent = async () => {
    if (!intentText || !amount) {
      toast({
        title: "Missing Information",
        description: "Please enter your intent and amount",
        variant: "destructive"
      });
      return;
    }

    setIsSimulating(true);
    
    // Simulate AI intent parsing and route optimization
    setTimeout(() => {
      const mockResult = {
        parsedIntent: intentText,
        optimalRoute: [
          "Swap ETH → USDC on Uniswap V3",
          "Deposit USDC to Aave",
          "Borrow against collateral",
          "Stake in Lido"
        ],
        estimatedAPY: "8.4%",
        gasCost: "0.012 ETH",
        slippage: "0.1%",
        timeToExecute: "~45 seconds"
      };
      
      setSimulationResult(mockResult);
      setIsSimulating(false);
      
      toast({
        title: "Intent Simulation Complete",
        description: "Optimal execution path found"
      });
    }, 2000);
  };

  const handleExecuteIntent = async () => {
    if (!simulationResult) return;

    const newIntent: Intent = {
      id: Date.now().toString(),
      description: intentText,
      status: "executing",
      estimatedGain: simulationResult.estimatedAPY,
      route: simulationResult.optimalRoute.join(" → "),
      timestamp: new Date()
    };

    setIntents(prev => [newIntent, ...prev]);
    
    toast({
      title: "Intent Execution Started",
      description: "Your intent is being processed by the solver network"
    });

    // Simulate execution completion
    setTimeout(() => {
      setIntents(prev => prev.map(intent => 
        intent.id === newIntent.id 
          ? { ...intent, status: "completed", actualGain: "8.2%" }
          : intent
      ));
      
      toast({
        title: "Intent Executed Successfully!",
        description: `Achieved ${simulationResult.estimatedAPY} yield as estimated`
      });
    }, 5000);

    setIntentText("");
    setAmount("");
    setSimulationResult(null);
  };

  const intentExamples = [
    "Get 5% yield on my ETH with low risk",
    "Swap 1000 USDC to DAI with minimal slippage",
    "Maximize yield on stablecoins for 30 days",
    "Provide liquidity with auto-compound rewards"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-secondary rounded-lg">
              <Brain className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Intent-Based DeFi Aggregator</h1>
              <p className="text-muted-foreground">Express your goals, let AI find the optimal execution path</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Intent Input */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Express Your Intent
                </CardTitle>
                <CardDescription>
                  Describe what you want to achieve in natural language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="intent">What do you want to do?</Label>
                  <Textarea
                    id="intent"
                    placeholder="e.g., I want to get the best yield on my 10 ETH with medium risk..."
                    value={intentText}
                    onChange={(e) => setIntentText(e.target.value)}
                    className="web3-input min-h-[100px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      placeholder="10.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="web3-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="strategy">Risk Level</Label>
                    <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                      <SelectTrigger className="web3-input">
                        <SelectValue placeholder="Select risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quick Examples</Label>
                  <div className="flex flex-wrap gap-2">
                    {intentExamples.map((example, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => setIntentText(example)}
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleSimulateIntent}
                  disabled={isSimulating || !intentText || !amount}
                  className="w-full btn-web3"
                >
                  {isSimulating ? "Simulating..." : "Simulate Intent"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Simulation Results */}
          <div className="space-y-6">
            {simulationResult && (
              <Card className="glass-card glow-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Optimal Execution Path
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {simulationResult.optimalRoute.map((step: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated APY</p>
                      <p className="font-bold text-success">{simulationResult.estimatedAPY}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gas Cost</p>
                      <p className="font-semibold">{simulationResult.gasCost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Slippage</p>
                      <p className="font-semibold">{simulationResult.slippage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Execution Time</p>
                      <p className="font-semibold">{simulationResult.timeToExecute}</p>
                    </div>
                  </div>

                  <Button onClick={handleExecuteIntent} className="w-full btn-web3">
                    Execute Intent
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Intent History */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Intent History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {intents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No intents executed yet</p>
                    <p className="text-sm">Start by expressing your first intent above</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {intents.map((intent) => (
                      <div key={intent.id} className="p-4 bg-muted/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge 
                            variant={
                              intent.status === "completed" ? "default" :
                              intent.status === "executing" ? "secondary" :
                              intent.status === "failed" ? "destructive" : "outline"
                            }
                          >
                            {intent.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {intent.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm mb-2">{intent.description}</p>
                        <div className="flex justify-between text-xs">
                          <span>Estimated: {intent.estimatedGain}</span>
                          {intent.actualGain && <span>Actual: {intent.actualGain}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}