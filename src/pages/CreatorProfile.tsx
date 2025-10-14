import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { TokenTradingPanel } from "@/components/TokenTradingPanel";
import { UnlockModal } from "@/components/UnlockModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreator } from "@/hooks/useCreators";
import { usePosts } from "@/hooks/usePosts";
import { CheckCircle2, Users, DollarSign, FileText, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const CreatorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: creator, isLoading: creatorLoading } = useCreator(id || "");
  const { data: allPosts = [] } = usePosts();
  const creatorPosts = allPosts.filter((p) => p.creator.id === id);

  const [userBalance] = useState(0); // TODO: Implement user balance tracking
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof allPosts[0] | null>(null);
  const [highlightTrading, setHighlightTrading] = useState(false);

  if (creatorLoading) {
    return (
      <Layout>
        <div className="h-full overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-32 rounded-full" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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

  const handleTradeComplete = () => {
    // TODO: Implement balance update after trade
    setHighlightTrading(false);
  };

  const handleUnlockClick = (post: typeof allPosts[0]) => {
    if (userBalance >= Number(post.unlock_token_amount)) {
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Banner & Profile Header */}
              <Card className="overflow-hidden border-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={creator.banner_url || "/placeholder.svg"}
                    alt={creator.profile?.display_name || creator.token_name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                <div className="px-4 md:px-6 pb-4 md:pb-6 -mt-12 md:-mt-16 relative">
                  <Avatar className="h-20 w-20 md:h-32 md:w-32 border-4 border-card mb-3 md:mb-4">
                    <AvatarImage src={creator.profile?.avatar_url || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl md:text-3xl">
                      {(creator.profile?.display_name || creator.token_name).charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-start justify-between">
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-xl md:text-3xl font-bold">{creator.profile?.display_name || creator.token_name}</h1>
                          <CheckCircle2 className="h-6 w-6 text-primary fill-primary" />
                        </div>
                        <p className="text-muted-foreground">
                          @{creator.profile?.username || creator.token_symbol.toLowerCase()}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm">
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <Users className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                          <span className="font-semibold">{creator.holder_count}</span>
                          <span className="text-muted-foreground hidden sm:inline">Holders</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                          <span className="font-semibold">
                            ${(Number(creator.market_cap) / 1000).toFixed(0)}K
                          </span>
                          <span className="text-muted-foreground hidden sm:inline">Market Cap</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <FileText className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                          <span className="font-semibold">{creatorPosts.length}</span>
                          <span className="text-muted-foreground hidden sm:inline">Posts</span>
                        </div>
                      </div>

                      <p className="text-sm md:text-base text-muted-foreground max-w-xl">{creator.profile?.bio || "No bio available"}</p>
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
                    const canView = userBalance >= Number(post.unlock_token_amount);

                    return (
                      <Card key={post.id} className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                          </p>
                        </div>
                        <p className="mb-4">{post.content}</p>

                        {post.is_locked && !canView ? (
                          <div className="relative rounded-lg overflow-hidden">
                            {post.image_url && (
                              <img
                                src={post.image_url}
                                alt="Locked content"
                                className="w-full h-64 object-cover blur-2xl"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/60 flex flex-col items-center justify-center text-white">
                              <Lock className="h-16 w-16 mb-4" />
                              <h4 className="text-xl font-semibold mb-2">
                                Unlock to view
                              </h4>
                              <p className="text-sm mb-4">
                                Requires: {Number(post.unlock_token_amount)} ${creator.token_symbol}
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
                        ) : post.image_url ? (
                          <img
                            src={post.image_url}
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {creatorPosts
                      .filter((p) => p.image_url)
                      .map((post) => {
                        const canView = userBalance >= Number(post.unlock_token_amount);

                        return (
                          <div
                            key={post.id}
                            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => !canView && handleUnlockClick(post)}
                          >
                            <img
                              src={post.image_url}
                              alt="Media"
                              className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${
                                !canView ? "blur-lg" : ""
                              }`}
                            />
                            {!canView && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                                <Lock className="h-8 w-8 mb-2" />
                                <p className="text-xs">
                                  {Number(post.unlock_token_amount)} ${creator.token_symbol}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                  {creatorPosts.filter((p) => p.image_url).length === 0 && (
                    <Card className="p-12 text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No media yet</h3>
                      <p className="text-muted-foreground">
                        This creator hasn't posted any media content yet
                      </p>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Token Trading Panel */}
            <div id="trading-panel" className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
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
          requiredTokens={Number(selectedPost.unlock_token_amount)}
          currentBalance={userBalance}
          tokenSymbol={creator.token_symbol}
          onBuyClick={handleBuyFromModal}
        />
      )}
    </Layout>
  );
};

export default CreatorProfile;
