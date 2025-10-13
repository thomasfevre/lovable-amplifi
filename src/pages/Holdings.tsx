import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTokenHoldings } from "@/hooks/useTokenHoldings";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Holdings = () => {
  const navigate = useNavigate();
  const { data: holdings = [], isLoading } = useTokenHoldings();

  // Calculate total portfolio value
  const totalValue = holdings.reduce((sum, holding) => {
    return sum + (Number(holding.amount) * Number(holding.creator.current_price));
  }, 0);

  // Calculate 24h change (mock calculation for now)
  const total24hChange = 7.4;
  const total24hValue = totalValue * (total24hChange / 100);

  if (isLoading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Loading holdings...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Holdings</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Your creator token portfolio and performance
            </p>
          </div>

          {/* Portfolio Overview */}
          <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20">
            <CardContent className="p-4 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2">
                    Total Portfolio Value
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
                    ${totalValue.toFixed(2)}
                  </h2>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center gap-1 ${
                        total24hChange >= 0 ? "text-primary" : "text-destructive"
                      }`}
                    >
                      {total24hChange >= 0 ? (
                        <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
                      ) : (
                        <TrendingDown className="h-3 w-3 md:h-4 md:w-4" />
                      )}
                      <span className="font-semibold text-sm md:text-base">
                        ${Math.abs(total24hValue).toFixed(2)} (
                        {total24hChange >= 0 ? "+" : ""}
                        {total24hChange}%)
                      </span>
                    </div>
                    <span className="text-muted-foreground text-xs md:text-sm">24h</span>
                  </div>
                </div>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Wallet className="h-6 w-6 md:h-8 md:w-8 text-primary" />
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
              {holdings.length === 0 ? (
                <div className="text-center py-12">
                  <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No holdings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start investing in creators to see your portfolio here
                  </p>
                  <Button onClick={() => navigate("/discover")}>
                    Discover Creators
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {holdings.map((holding) => {
                    const totalValue = Number(holding.amount) * Number(holding.creator.current_price);
                    const mockChange = Math.random() * 30 - 10; // Mock 24h change

                    return (
                      <div
                        key={holding.id}
                        onClick={() => navigate(`/creator/${holding.creator.id}`)}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-colors gap-4"
                      >
                        {/* Creator Info */}
                        <div className="flex items-center gap-3 md:gap-4">
                          <Avatar className="h-10 w-10 md:h-12 md:w-12">
                            <AvatarImage src={holding.creator.profile?.avatar_url || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {(holding.creator.profile?.display_name || holding.creator.token_name).charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-sm md:text-base">
                                {holding.creator.profile?.display_name || holding.creator.token_name}
                              </h3>
                              <Badge variant="secondary" className="text-xs">
                                ${holding.creator.token_symbol}
                              </Badge>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              @{holding.creator.profile?.username || holding.creator.token_symbol.toLowerCase()}
                            </p>
                          </div>
                        </div>

                        {/* Holdings Data */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 md:text-right">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Amount Held
                            </p>
                            <p className="font-semibold text-sm">
                              {Number(holding.amount).toFixed(2)} ${holding.creator.token_symbol}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Current Price
                            </p>
                            <p className="font-semibold text-sm">
                              ${Number(holding.creator.current_price).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Total Value
                            </p>
                            <p className="font-semibold text-sm">
                              ${totalValue.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">
                              24h Change
                            </p>
                            <div
                              className={`flex items-center gap-1 ${
                                mockChange >= 0 ? "text-primary" : "text-destructive"
                              }`}
                            >
                              {mockChange >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              <span className="font-semibold text-xs md:text-sm">
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
