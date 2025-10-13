import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, ArrowLeft, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

const Messages = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  return (
    <Layout>
      <div className="h-full flex">
        {/* Chat List Column - Full width on mobile when no chat selected, hidden when chat selected */}
        <div className={`${
          selectedChat ? 'hidden md:flex' : 'flex'
        } w-full md:w-80 border-r border-border flex-col bg-card`}>
          <div className="p-4 border-b border-border space-y-4">
            <h2 className="text-xl font-bold">Messages</h2>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search chats..." className="pl-9" />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="cursor-pointer">Unread</Badge>
              <Badge variant="secondary" className="cursor-pointer">Online</Badge>
              <Badge variant="secondary" className="cursor-pointer">Holders</Badge>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">IT'S TOO QUIET HERE...</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start connecting with creators
            </p>
            <Button onClick={() => navigate("/discover")} className="w-full md:w-auto">
              Discover creators
            </Button>
          </div>
        </div>

        {/* Chat Content Column - Hidden on mobile when no chat selected, full width when selected */}
        <div className={`${
          selectedChat ? 'flex' : 'hidden md:flex'
        } flex-1 flex-col bg-background`}>
          {selectedChat ? (
            // Active Chat View
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center gap-3 bg-card">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleBackToList}
                  className="md:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Creator Name</h3>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Sample messages */}
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Hey! Welcome to my community!</p>
                      <span className="text-xs text-muted-foreground">10:30 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Thanks! Excited to be here.</p>
                      <span className="text-xs opacity-70">10:32 AM</span>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex gap-2">
                  <Textarea 
                    placeholder="Type a message..." 
                    className="resize-none min-h-[44px] max-h-[120px]"
                    rows={1}
                  />
                  <Button size="icon" className="shrink-0">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Empty State (Desktop only)
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 p-6">
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
