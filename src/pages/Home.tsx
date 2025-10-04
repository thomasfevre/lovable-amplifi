import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UnlockModal } from "@/components/UnlockModal";
import { mockCreators, mockPosts, getUserBalance, updateUserBalance } from "@/lib/mockData";
import { Lock, Heart, MessageCircle, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof mockPosts[0] | null>(null);
  const [userBalances, setUserBalances] = useState<Record<string, number>>({});

  const getUserBalanceForCreator = (creatorId: string) => {
    return userBalances[creatorId] ?? getUserBalance(creatorId);
  };

  const handleUnlockClick = (post: typeof mockPosts[0]) => {
    const creator = mockCreators.find((c) => c.id === post.creatorId);
    if (!creator) return;

    const balance = getUserBalanceForCreator(post.creatorId);
    
    if (balance >= post.requiredTokens) {
      // User has enough tokens, unlock the post
      return;
    }

    setSelectedPost(post);
    setUnlockModalOpen(true);
  };

  const handleBuyTokens = () => {
    if (!selectedPost) return;
    navigate(`/creator/${selectedPost.creatorId}`);
  };

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Home Feed</h1>
            <p className="text-muted-foreground">
              Updates from creators you're invested in
            </p>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {mockPosts.map((post) => {
              const creator = mockCreators.find((c) => c.id === post.creatorId);
              if (!creator) return null;

              const userBalance = getUserBalanceForCreator(post.creatorId);
              const canView = userBalance >= post.requiredTokens;

              return (
                <Card key={post.id} className="overflow-hidden">
                  {/* Post Header */}
                  <div className="p-4 flex items-center gap-3">
                    <Avatar
                      className="h-10 w-10 cursor-pointer"
                      onClick={() => navigate(`/creator/${creator.id}`)}
                    >
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {creator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className="font-semibold cursor-pointer hover:underline"
                          onClick={() => navigate(`/creator/${creator.id}`)}
                        >
                          {creator.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          ${creator.tokenSymbol}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(post.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-4">
                    <p className="text-sm mb-4">{post.content}</p>

                    {/* Locked/Unlocked Content */}
                    {post.locked && !canView ? (
                      <div className="relative rounded-lg overflow-hidden">
                        {post.image && (
                          <img
                            src={post.image}
                            alt="Locked content"
                            className="w-full h-64 object-cover blur-lg"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 flex flex-col items-center justify-center text-white">
                          <Lock className="h-12 w-12 mb-4" />
                          <h4 className="text-lg font-semibold mb-2">
                            Unlock to view
                          </h4>
                          <p className="text-sm mb-4">
                            Requires: {post.requiredTokens} ${creator.tokenSymbol}
                          </p>
                          <Button
                            onClick={() => handleUnlockClick(post)}
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
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : null}
                  </div>

                  {/* Post Actions */}
                  <div className="px-4 pb-4 flex items-center gap-4 text-muted-foreground">
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs">Like</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-xs">Share</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {mockPosts.length === 0 && (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Start following creators to see their updates
              </p>
              <Button onClick={() => navigate("/discover")}>
                Discover Creators
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Unlock Modal */}
      {selectedPost && (
        <UnlockModal
          open={unlockModalOpen}
          onOpenChange={setUnlockModalOpen}
          requiredTokens={selectedPost.requiredTokens}
          currentBalance={getUserBalanceForCreator(selectedPost.creatorId)}
          tokenSymbol={
            mockCreators.find((c) => c.id === selectedPost.creatorId)
              ?.tokenSymbol || ""
          }
          onBuyClick={handleBuyTokens}
        />
      )}
    </Layout>
  );
};

export default Home;
