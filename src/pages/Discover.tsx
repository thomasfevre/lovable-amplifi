import { useState } from "react";
import { Layout } from "@/components/Layout";
import { CreatorCard } from "@/components/CreatorCard";
import { useCreators } from "@/hooks/useCreators";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const Discover = () => {
  const { data: creators = [], isLoading } = useCreators();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCreators = creators.filter((creator) =>
    creator.token_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.token_symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.profile?.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Loading creators...
          </div>
        </div>
      </Layout>
    );
  }

  if (creators.length === 0) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <h3 className="text-2xl font-semibold">No Creators Yet</h3>
            <p className="text-muted-foreground">
              Be the first to become a creator and launch your token on AmpliFi!
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-12">
          {/* Featured Creators Carousel */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {creators.slice(0, 6).map((creator) => (
                  <CarouselItem key={creator.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden border-primary/20">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={creator.banner_url || "/placeholder.svg"}
                            alt={creator.token_name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-xl mb-1">
                              {creator.profile?.display_name || creator.token_name}
                            </h3>
                            <p className="text-white/80 text-sm line-clamp-2">
                              {creator.profile?.bio || ""}
                            </p>
                          </div>
                        </div>
                        <div className="p-4 bg-card">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">Token Price</p>
                              <p className="text-lg font-bold text-primary">
                                ${Number(creator.current_price).toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Market Cap</p>
                              <p className="text-lg font-bold">
                                ${Number(creator.market_cap).toFixed(0)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Trending Creators Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Trending Creators</h2>
              <p className="text-sm text-muted-foreground">
                {filteredCreators.length} creators
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCreators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={{
                    id: creator.id,
                    name: creator.profile?.display_name || creator.token_name,
                    handle: creator.profile?.username || creator.token_symbol.toLowerCase(),
                    avatar: creator.profile?.avatar_url || "/placeholder.svg",
                    banner: creator.banner_url || "/placeholder.svg",
                    tokenSymbol: creator.token_symbol,
                    tokenPrice: Number(creator.current_price),
                    priceChange24h: 0,
                    marketCap: Number(creator.market_cap),
                    holders: creator.holder_count,
                    bio: creator.profile?.bio || "",
                    posts: 0,
                    verified: false,
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
