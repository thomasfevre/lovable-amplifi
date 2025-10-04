import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockCreators, mockHoldings } from "@/lib/mockData";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Holdings = () => {
  const navigate = useNavigate();

  // Calculate total portfolio value
  const totalValue = mockHoldings.reduce((sum, holding) => {
    const creator = mockCreators.find((c) => c.id === holding.creatorId);
    return sum + (creator ? holding.amount * creator.tokenPrice : 0);
  }, 0);

  // Calculate 24h change (mock calculation)
  const total24hChange = 7.4;
  const total24hValue = totalValue * (total24hChange / 100);

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">My Holdings</h1>
            <p className="text-muted-foreground">
              Your creator token portfolio and performance
            </p>
          </div>

          {/* Portfolio Overview */}
          <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20">
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Portfolio Value
                  </p>
                  <h2 className="text-5xl font-bold mb-4">
                    ${totalValue.toFixed(2)}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 ${
                        total24hChange >= 0 ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {total24hChange >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-semibold">
                        ${Math.abs(total24hValue).toFixed(2)} (
                        {total24hChange >= 0 ? "+" : ""}
                        {total24hChange}%)
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm">24h</span>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Holdings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Assets</CardTitle>
            </CardHeader>
            <CardContent>
              {mockHoldings.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No holdings yet</h3>
                  <p className="text-muted-foreground">
                    Start investing in creators to see your portfolio here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockHoldings.map((holding) => {
                    const creator = mockCreators.find(
                      (c) => c.id === holding.creatorId
                    );
                    if (!creator) return null;

                    const totalValue = holding.amount * creator.tokenPrice;
                    const mockChange = Math.random() * 30 - 10; // Mock 24h change

                    return (
                      <div
                        key={holding.creatorId}
                        onClick={() => navigate(`/creator/${creator.id}`)}
                        className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-colors"
                      >
                        {/* Creator Info */}
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={creator.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {creator.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{creator.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                ${creator.tokenSymbol}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              @{creator.handle}
                            </p>
                          </div>
                        </div>

                        {/* Holdings Data */}
                        <div className="grid grid-cols-4 gap-8 text-right">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Amount Held
                            </p>
                            <p className="font-semibold">
                              {holding.amount} ${creator.tokenSymbol}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Current Price
                            </p>
                            <p className="font-semibold">
                              ${creator.tokenPrice.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Total Value
                            </p>
                            <p className="font-semibold">
                              ${totalValue.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              24h Change
                            </p>
                            <div
                              className={`flex items-center gap-1 justify-end ${
                                mockChange >= 0 ? "text-primary" : "text-destructive"
                              }`}
                            >
                              {mockChange >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              <span className="font-semibold text-sm">
                                {mockChange >= 0 ? "+" : ""}
                                {mockChange.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Holdings;
