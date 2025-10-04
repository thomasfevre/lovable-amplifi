import { Layout } from "@/components/Layout";
import { CreatorCard } from "@/components/CreatorCard";
import { mockCreators } from "@/lib/mockData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";

const Discover = () => {
  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8 space-y-12">
          {/* Featured Creators Carousel */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Featured Creators</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {mockCreators.map((creator) => (
                  <CarouselItem key={creator.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden border-primary/20">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={creator.banner}
                            alt={creator.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-xl mb-1">
                              {creator.name}
                            </h3>
                            <p className="text-white/80 text-sm line-clamp-2">
                              {creator.bio}
                            </p>
                          </div>
                        </div>
                        <div className="p-4 bg-card">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">Token Price</p>
                              <p className="text-lg font-bold text-primary">
                                ${creator.tokenPrice.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">24h Change</p>
                              <p
                                className={`text-lg font-bold ${
                                  creator.priceChange24h >= 0
                                    ? "text-primary"
                                    : "text-destructive"
                                }`}
                              >
                                {creator.priceChange24h >= 0 ? "+" : ""}
                                {creator.priceChange24h.toFixed(1)}%
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
                {mockCreators.length} creators
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </section>

          {/* New on AmpliFi */}
          <section>
            <h2 className="text-2xl font-bold mb-6">New on AmpliFi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...mockCreators].reverse().map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Discover;
