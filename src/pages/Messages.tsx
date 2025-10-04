import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="h-full flex">
        {/* Chat List Column */}
        <div className="w-80 border-r border-border flex flex-col bg-card">
          <div className="p-4 border-b border-border space-y-4">
            <h2 className="text-xl font-bold">Messages</h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chats..." className="pl-9" />
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer">Unread</Badge>
              <Badge variant="secondary" className="cursor-pointer">Online</Badge>
              <Badge variant="secondary" className="cursor-pointer">Holders</Badge>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">IT'S TOO QUIET HERE...</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start connecting with creators
            </p>
            <Button onClick={() => navigate("/discover")}>
              Discover creators
            </Button>
          </div>
        </div>

        {/* Chat Content Column */}
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto">
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">You don't have a chat yet</h3>
              <p className="text-muted-foreground">
                Discover creators and start writing to them!
              </p>
            </div>
            <Button onClick={() => navigate("/discover")} variant="outline">
              Discover Creators
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
