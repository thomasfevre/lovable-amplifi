import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UnlockModal } from "@/components/UnlockModal";
import { usePosts } from "@/hooks/usePosts";
import { useUserTokenBalance } from "@/hooks/useUserTokenBalance";
import { Lock, Heart, MessageCircle, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

// Wrapper component for UnlockModal that fetches user balance
const UnlockModalWrapper = ({ 
  post, 
  open, 
  onOpenChange, 
  onBuyClick 
}: { 
  post: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBuyClick: () => void;
}) => {
  const { data: userBalance = 0 } = useUserTokenBalance(post.creator.id);
  
  return (
    <UnlockModal
      open={open}
      onOpenChange={onOpenChange}
      requiredTokens={Number(post.unlock_token_amount)}
      currentBalance={userBalance}
      tokenSymbol={post.creator.token_symbol}
      onBuyClick={onBuyClick}
    />
  );
};

// Component to render individual post with token balance checking
const PostCard = ({ 
  post, 
  onUnlockClick, 
  onCreatorClick 
}: { 
  post: any;
  onUnlockClick: (post: any) => void;
  onCreatorClick: (creatorId: string) => void;
}) => {
  const { data: userBalance = 0 } = useUserTokenBalance(post.creator.id);
  const canViewLockedContent = userBalance >= Number(post.unlock_token_amount);

  return (
    <Card className="overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        <Avatar
          className="h-10 w-10 cursor-pointer"
          onClick={() => onCreatorClick(post.creator.id)}
        >
          <AvatarImage src={post.creator.profile.avatar_url || "/placeholder.svg"} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {(post.creator.profile.display_name || post.creator.token_name).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold cursor-pointer hover:underline"
              onClick={() => onCreatorClick(post.creator.id)}
            >
              {post.creator.profile.display_name || post.creator.token_name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              ${post.creator.token_symbol}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-sm mb-4 whitespace-pre-wrap">{post.content}</p>

        {/* Locked/Unlocked Content */}
        {post.is_locked && !canViewLockedContent ? (
          <div className="relative rounded-lg overflow-hidden">
            {post.image_url && (
              <img
                src={post.image_url}
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
                Requires: {Number(post.unlock_token_amount)} ${post.creator.token_symbol}
              </p>
              {userBalance > 0 && (
                <p className="text-xs mb-2 text-white/70">
                  You have: {userBalance} ${post.creator.token_symbol}
                </p>
              )}
              <Button
                onClick={() => onUnlockClick(post)}
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
            className="w-full h-64 object-cover rounded-lg"
          />
        ) : null}
      </div>

      {/* Post Actions */}
      <div className="px-4 pb-4 flex items-center gap-4 text-muted-foreground">
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <Heart className="h-4 w-4" />
          <span className="text-xs">{post.likes_count || 0}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">{post.comments_count || 0}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-primary transition-colors">
          <Share2 className="h-4 w-4" />
          <span className="text-xs">Share</span>
        </button>
      </div>
    </Card>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = usePosts();
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);

  const handleUnlockClick = (post: typeof posts[0]) => {
    setSelectedPost(post);
    setUnlockModalOpen(true);
  };

  const handleBuyTokens = () => {
    if (!selectedPost) return;
    navigate(`/creator/${selectedPost.creator.id}`);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Loading posts...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Home Feed</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Updates from creators you're invested in
            </p>
          </div>

          {/* Posts Feed */}
          {posts.length === 0 ? (
            <Card className="p-12 text-center">
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Start following creators to see their updates
              </p>
              <Button onClick={() => navigate("/discover")}>
                Discover Creators
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => {
                return (
                  <PostCard
                    key={post.id}
                    post={post}
                    onUnlockClick={handleUnlockClick}
                    onCreatorClick={(creatorId) => navigate(`/creator/${creatorId}`)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Unlock Modal */}
      {selectedPost && <UnlockModalWrapper post={selectedPost} open={unlockModalOpen} onOpenChange={setUnlockModalOpen} onBuyClick={handleBuyTokens} />}
    </Layout>
  );
};

export default Home;
