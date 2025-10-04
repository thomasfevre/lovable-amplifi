import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { TokenTradingPanel } from "@/components/TokenTradingPanel";
import { UnlockModal } from "@/components/UnlockModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  mockCreators,
  mockPosts,
  getUserBalance,
  updateUserBalance,
} from "@/lib/mockData";
import { CheckCircle2, Users, DollarSign, FileText, Lock } from "lucide-react";

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = mockCreators.find((c) => c.id === id);
  const creatorPosts = mockPosts.filter((p) => p.creatorId === id);

  const [userBalance, setUserBalance] = useState(0);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);
  const [highlightTrading, setHighlightTrading] = useState(false);

  useEffect(() => {
    if (creator) {
      setUserBalance(getUserBalance(creator.id));
    }
  }, [creator]);

  if (!creator) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Creator not found</h2>
            <Button onClick={() => navigate("/discover")}>Back to Discover</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleTradeComplete = (amount: number) => {
    updateUserBalance(creator.id, amount);
    setUserBalance(getUserBalance(creator.id));
    setHighlightTrading(false);
  };

  const handleUnlockClick = (post: typeof mockPosts[0]) => {
    if (userBalance >= post.requiredTokens) {
      return;
    }

    setSelectedPost(post);
    setUnlockModalOpen(true);
  };

  const handleBuyFromModal = () => {
    setHighlightTrading(true);
    // Scroll to trading panel
    document.getElementById("trading-panel")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Banner & Profile Header */}
              <Card className="overflow-hidden border-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={creator.banner}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                <div className="px-6 pb-6 -mt-16 relative">
                  <Avatar className="h-32 w-32 border-4 border-card mb-4">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      {creator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-3xl font-bold">{creator.name}</h1>
                          {creator.verified && (
                            <CheckCircle2 className="h-6 w-6 text-primary fill-primary" />
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          @{creator.handle}
                          {creator.location && ` • ${creator.location}`}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{creator.holders}</span>
                          <span className="text-muted-foreground">Holders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span className="font-semibold">
                            ${(creator.marketCap / 1000).toFixed(0)}K
                          </span>
                          <span className="text-muted-foreground">Market Cap</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{creator.posts}</span>
                          <span className="text-muted-foreground">Posts</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground max-w-xl">{creator.bio}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Content Tabs */}
              <Tabs defaultValue="feed">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="feed" className="flex-1">
                    Feed
                  </TabsTrigger>
                  <TabsTrigger value="media" className="flex-1">
                    Media
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="feed" className="space-y-4 mt-6">
                  {creatorPosts.map((post) => {
                    const canView = userBalance >= post.requiredTokens;

                    return (
                      <Card key={post.id} className="p-6">
                        <p className="mb-4">{post.content}</p>

                        {post.locked && !canView ? (
                          <div className="relative rounded-lg overflow-hidden">
                            {post.image && (
                              <img
                                src={post.image}
                                alt="Locked content"
                                className="w-full h-64 object-cover blur-2xl"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/60 flex flex-col items-center justify-center text-white">
                              <Lock className="h-16 w-16 mb-4" />
                              <h4 className="text-xl font-semibold mb-2">
                                Déverrouiller pour voir
                              </h4>
                              <p className="text-sm mb-4">
                                Requires: {post.requiredTokens} ${creator.tokenSymbol}
                              </p>
                              <Button
                                onClick={() => handleUnlockClick(post)}
                                variant="secondary"
                                className="bg-white text-black hover:bg-white/90"
                              >
                                View Post
                              </Button>
                            </div>
                          </div>
                        ) : post.image ? (
                          <img
                            src={post.image}
                            alt="Post content"
                            className="w-full rounded-lg"
                          />
                        ) : null}
                      </Card>
                    );
                  })}

                  {creatorPosts.length === 0 && (
                    <Card className="p-12 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                      <p className="text-muted-foreground">
                        This creator hasn't posted anything yet
                      </p>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="media" className="mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    {creatorPosts
                      .filter((p) => p.image)
                      .map((post) => {
                        const canView = userBalance >= post.requiredTokens;

                        return (
                          <div
                            key={post.id}
                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => !canView && handleUnlockClick(post)}
                          >
                            <img
                              src={post.image}
                              alt="Media"
                              className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${
                                !canView ? "blur-lg" : ""
                              }`}
                            />
                            {!canView && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                                <Lock className="h-8 w-8 mb-2" />
                                <p className="text-xs">
                                  {post.requiredTokens} ${creator.tokenSymbol}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Token Trading Panel */}
            <div id="trading-panel" className="lg:col-span-1">
              <div className="sticky top-8">
                <TokenTradingPanel
                  creator={creator}
                  userBalance={userBalance}
                  onTradeComplete={handleTradeComplete}
                  highlightBuy={highlightTrading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unlock Modal */}
      {selectedPost && (
        <UnlockModal
          open={unlockModalOpen}
          onOpenChange={setUnlockModalOpen}
          requiredTokens={selectedPost.requiredTokens}
          currentBalance={userBalance}
          tokenSymbol={creator.tokenSymbol}
          onBuyClick={handleBuyFromModal}
        />
      )}
    </Layout>
  );
};

export default CreatorProfile;
