import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import type { Creator } from "@/lib/mockData";

interface CreatorCardProps {
  creator: Creator;
}

export const CreatorCard = ({ creator }: CreatorCardProps) => {
  const isPositiveChange = creator.priceChange24h >= 0;

  return (
    <Link
      to={`/creator/${creator.id}`}
      className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Banner */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={creator.banner}
          alt={creator.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 -mt-8 relative">
        {/* Avatar */}
        <Avatar className="h-16 w-16 border-4 border-card ring-2 ring-primary/20">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-lg">
            {creator.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        {/* Name & Handle */}
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-bold text-lg leading-none">{creator.name}</h3>
            {creator.verified && (
              <CheckCircle2 className="h-4 w-4 text-primary fill-primary" />
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">@{creator.handle}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">{creator.bio}</p>

        {/* Metrics */}
        <div className="pt-2 space-y-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Token Price</span>
            <div className="text-right">
              <p className="text-sm font-bold">${creator.tokenPrice.toFixed(2)}</p>
              <div
                className={`flex items-center gap-1 text-xs ${
                  isPositiveChange ? "text-primary" : "text-destructive"
                }`}
              >
                {isPositiveChange ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {isPositiveChange ? "+" : ""}
                {creator.priceChange24h.toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Market Cap</span>
            <span className="text-sm font-semibold">
              ${(creator.marketCap / 1000).toFixed(0)}K
            </span>
          </div>

          <div className="flex gap-2 pt-1">
            <Badge variant="secondary" className="text-xs">
              {creator.holders} holders
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {creator.posts} posts
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
};
