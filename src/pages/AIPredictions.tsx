import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Brain, Shield, Target, CheckCircle, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

interface Prediction {
  id: string;
  modelType: string;
  input: any;
  prediction: any;
  confidence: number;
  zkProof: string;
  verified: boolean;
  timestamp: Date;
}

interface ModelConfig {
  name: string;
  description: string;
  inputFields: Array<{
    key: string;
    label: string;
    type: string;
    placeholder?: string;
  }>;
}

const availableModels: Record<string, ModelConfig> = {
  "credit-risk": {
    name: "Credit Risk Assessment",
    description: "Analyze credit risk based on financial metrics",
    inputFields: [
      { key: "income", label: "Annual Income ($)", type: "number", placeholder: "50000" },
      { key: "debt", label: "Total Debt ($)", type: "number", placeholder: "25000" },
      { key: "credit_history", label: "Credit History (years)", type: "number", placeholder: "5" },
      { key: "employment", label: "Employment Status", type: "text", placeholder: "Full-time" }
    ]
  },
  "price-prediction": {
    name: "Asset Price Prediction", 
    description: "Predict future asset prices using ML models",
    inputFields: [
      { key: "symbol", label: "Asset Symbol", type: "text", placeholder: "ETH" },
      { key: "timeframe", label: "Timeframe (hours)", type: "number", placeholder: "24" },
      { key: "current_price", label: "Current Price ($)", type: "number", placeholder: "2000" },
      { key: "volume", label: "24h Volume", type: "number", placeholder: "1000000" }
    ]
  },
  "defi-risk": {
    name: "DeFi Protocol Risk",
    description: "Assess risk levels of DeFi protocols",
    inputFields: [
      { key: "protocol", label: "Protocol Name", type: "text", placeholder: "Uniswap" },
      { key: "tvl", label: "TVL ($)", type: "number", placeholder: "5000000000" },
      { key: "age_days", label: "Protocol Age (days)", type: "number", placeholder: "365" },
      { key: "audit_score", label: "Audit Score (0-100)", type: "number", placeholder: "85" }
    ]
  }
};

export default function AIPredictions() {
  const [selectedModel, setSelectedModel] = useState("");
  const [inputData, setInputData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const { toast } = useToast();

  const handleInputChange = (key: string, value: string) => {
    setInputData(prev => ({ ...prev, [key]: value }));
  };

  const generatePrediction = async () => {
    if (!selectedModel) {
      toast({
        title: "No Model Selected",
        description: "Please select an AI model first",
        variant: "destructive"
      });
      return;
    }

    const modelConfig = availableModels[selectedModel];
    const missingFields = modelConfig.inputFields.filter(field => !inputData[field.key]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Input Data",
        description: `Please fill in: ${missingFields.map(f => f.label).join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI model execution and zkML proof generation
    setTimeout(() => {
      let prediction;
      let confidence = Math.random() * 30 + 70; // 70-100% confidence

      switch (selectedModel) {
        case "credit-risk":
          const riskScore = Math.random() * 100;
          prediction = {
            riskScore: riskScore.toFixed(1),
            riskLevel: riskScore > 70 ? "Low" : riskScore > 40 ? "Medium" : "High",
            recommendedAction: riskScore > 70 ? "Approve" : "Review Required"
          };
          break;
        
        case "price-prediction":
          const currentPrice = parseFloat(inputData.current_price);
          const change = (Math.random() - 0.5) * 0.2; // ±10% change
          const predictedPrice = currentPrice * (1 + change);
          prediction = {
            predictedPrice: predictedPrice.toFixed(2),
            priceChange: (change * 100).toFixed(2),
            direction: change > 0 ? "Bullish" : "Bearish"
          };
          break;
        
        case "defi-risk":
          const riskLevel = Math.random();
          prediction = {
            riskScore: (riskLevel * 100).toFixed(1),
            riskCategory: riskLevel > 0.7 ? "Low Risk" : riskLevel > 0.4 ? "Medium Risk" : "High Risk",
            recommendation: riskLevel > 0.7 ? "Safe to interact" : "Exercise caution"
          };
          break;
        
        default:
          prediction = { result: "Unknown model" };
      }

      // Generate mock zkSNARK proof
      const zkProof = `0x${Math.random().toString(16).substr(2, 64)}`;

      const newPrediction: Prediction = {
        id: Date.now().toString(),
        modelType: selectedModel,
        input: { ...inputData },
        prediction,
        confidence,
        zkProof,
        verified: false,
        timestamp: new Date()
      };

      setPredictions(prev => [newPrediction, ...prev]);
      setIsGenerating(false);

      toast({
        title: "Prediction Generated",
        description: "AI model has generated prediction with zkML proof"
      });

      // Simulate on-chain verification after 3 seconds
      setTimeout(() => {
        setPredictions(prev => prev.map(p => 
          p.id === newPrediction.id ? { ...p, verified: true } : p
        ));
        
        toast({
          title: "Prediction Verified!",
          description: "zkML proof has been verified on-chain"
        });
      }, 3000);

    }, 2000);
  };

  const currentModelConfig = selectedModel ? availableModels[selectedModel] : null;

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
              <h1 className="text-3xl font-bold gradient-text">zkML Prediction Oracle</h1>
              <p className="text-muted-foreground">AI-powered predictions with zero-knowledge proofs</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Model Selection & Input */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Select AI Model
                </CardTitle>
                <CardDescription>
                  Choose an AI model for prediction generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Available Models</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="web3-input">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(availableModels).map(([key, model]) => (
                        <SelectItem key={key} value={key}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {currentModelConfig && (
                  <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {currentModelConfig.description}
                    </p>
                    
                    <div className="space-y-3">
                      {currentModelConfig.inputFields.map((field) => (
                        <div key={field.key} className="space-y-1">
                          <Label htmlFor={field.key}>{field.label}</Label>
                          <Input
                            id={field.key}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={inputData[field.key] || ""}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                            className="web3-input"
                          />
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={generatePrediction}
                      disabled={isGenerating}
                      className="w-full btn-web3"
                    >
                      {isGenerating ? "Generating Prediction..." : "Generate Prediction"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Predictions History */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Prediction Results
                </CardTitle>
                <CardDescription>
                  AI predictions with zkML verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                {predictions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No predictions generated yet</p>
                    <p className="text-sm">Select a model and input data to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {predictions.map((prediction) => (
                      <div key={prediction.id} className="p-4 bg-muted/20 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            {availableModels[prediction.modelType]?.name}
                          </Badge>
                          <div className="flex items-center gap-2">
                            {prediction.verified ? (
                              <Badge variant="default" className="bg-success">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Verifying...
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Confidence</span>
                            <span className="font-semibold">{prediction.confidence.toFixed(1)}%</span>
                          </div>
                          <Progress value={prediction.confidence} className="h-2" />
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Prediction Result:</p>
                          <div className="text-sm bg-background/50 p-3 rounded">
                            {Object.entries(prediction.prediction).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="font-medium">{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <p>zkProof: {prediction.zkProof.slice(0, 20)}...</p>
                          <p>Generated: {prediction.timestamp.toLocaleString()}</p>
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