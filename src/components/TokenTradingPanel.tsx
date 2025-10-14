import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, TrendingUp } from "lucide-react";
import type { Creator } from "@/hooks/useCreators";

interface TokenTradingPanelProps {
  creator: Creator;
  userBalance: number;
  onTradeComplete: (amount: number) => void;
  highlightBuy?: boolean;
}

export const TokenTradingPanel = ({
  creator,
  userBalance,
  onTradeComplete,
  highlightBuy = false,
}: TokenTradingPanelProps) => {
  const [ethAmount, setEthAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");

  const handleEthChange = (value: string) => {
    setEthAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const tokens = (parseFloat(value) / Number(creator.current_price)).toFixed(2);
      setTokenAmount(tokens);
    } else {
      setTokenAmount("");
    }
  };

  const handleTokenChange = (value: string) => {
    setTokenAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const eth = (parseFloat(value) * Number(creator.current_price)).toFixed(4);
      setEthAmount(eth);
    } else {
      setEthAmount("");
    }
  };

  const handleBuy = async () => {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const amount = parseFloat(tokenAmount);
    onTradeComplete(amount);
    
    toast.success(
      `Transaction successful! ${amount} $${creator.token_symbol} added to your wallet.`
    );
    
    setEthAmount("");
    setTokenAmount("");
    setIsLoading(false);
  };

  const handleSell = async () => {
    if (!tokenAmount || parseFloat(tokenAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const amount = parseFloat(tokenAmount);
    if (amount > userBalance) {
      toast.error("Insufficient balance");
      return;
    }

    setIsLoading(true);
    
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    onTradeComplete(-amount);
    
    toast.success(
      `Transaction successful! Sold ${amount} $${creator.token_symbol}.`
    );
    
    setEthAmount("");
    setTokenAmount("");
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* CTA Card */}
      <Card className={`bg-gradient-to-br from-primary to-primary/80 border-primary/50 ${highlightBuy ? 'ring-2 ring-primary animate-pulse' : ''}`}>
        <CardContent className="p-6 text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-2">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Become a Backer</h3>
          <p className="text-sm text-white/90">
            Current Price: ${Number(creator.current_price).toFixed(2)} / ${creator.token_symbol}
          </p>
          <p className="text-xs text-white/70">
            Hold tokens to unlock exclusive content and invest in {creator.profile?.display_name || creator.token_name}'s growth
          </p>
        </CardContent>
      </Card>

      {/* Trading Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trade ${creator.token_symbol}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="eth-buy">Pay with ETH</Label>
                <Input
                  id="eth-buy"
                  type="number"
                  placeholder="0.0"
                  value={ethAmount}
                  onChange={(e) => handleEthChange(e.target.value)}
                  step="0.0001"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token-buy">Receive ${creator.token_symbol}</Label>
                <Input
                  id="token-buy"
                  type="number"
                  placeholder="0.0"
                  value={tokenAmount}
                  onChange={(e) => handleTokenChange(e.target.value)}
                  step="0.01"
                />
              </div>

              <div className="text-xs text-muted-foreground">
                Your Balance: {userBalance} ${creator.token_symbol}
              </div>

              <Button
                onClick={handleBuy}
                disabled={isLoading || !tokenAmount}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Buy $${creator.token_symbol}`
                )}
              </Button>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="token-sell">Sell ${creator.token_symbol}</Label>
                <Input
                  id="token-sell"
                  type="number"
                  placeholder="0.0"
                  value={tokenAmount}
                  onChange={(e) => handleTokenChange(e.target.value)}
                  step="0.01"
                  max={userBalance}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eth-sell">Receive ETH</Label>
                <Input
                  id="eth-sell"
                  type="number"
                  placeholder="0.0"
                  value={ethAmount}
                  onChange={(e) => handleEthChange(e.target.value)}
                  step="0.0001"
                  disabled
                />
              </div>

              <div className="text-xs text-muted-foreground">
                Your Balance: {userBalance} ${creator.token_symbol}
              </div>

              <Button
                onClick={handleSell}
                disabled={isLoading || !tokenAmount}
                variant="outline"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Sell $${creator.token_symbol}`
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Price Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 rounded-lg bg-muted/30 flex items-center justify-center">
            <p className="text-xs text-muted-foreground">Chart coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
