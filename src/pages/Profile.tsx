import { Layout } from "@/components/Layout";
import { usePrivy } from "@privy-io/react-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Wallet, Settings } from "lucide-react";

const Profile = () => {
  const { user, authenticated } = usePrivy();

  if (!authenticated || !user) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Connect your wallet</h3>
              <p className="text-muted-foreground">
                Connect your wallet to view your profile
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-4 md:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                <Avatar className="h-16 w-16 md:h-24 md:w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl md:text-3xl">
                    {user.wallet?.address?.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-xl md:text-3xl font-bold mb-2">
                    {user.wallet?.address?.slice(0, 6)}...
                    {user.wallet?.address?.slice(-4)}
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">
                    @{user.wallet?.address?.slice(2, 12)}
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="md:size-default">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Wallet className="h-4 w-4 md:h-5 md:w-5" />
                Wallet Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Wallet Address</p>
                <code className="text-xs md:text-sm bg-muted px-2 md:px-3 py-1 rounded break-all">
                  {user.wallet?.address}
                </code>
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Wallet Type</p>
                <code className="text-xs md:text-sm bg-muted px-2 md:px-3 py-1 rounded">
                  {user.wallet?.walletClientType || "Connected"}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
