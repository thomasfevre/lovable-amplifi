import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { usePrivy } from "@privy-io/react-auth";
import {
  Home,
  Compass,
  Bell,
  MessageCircle,
  Wallet,
  User,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { BecomeCreatorDialog } from "@/components/BecomeCreatorDialog";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Compass, label: "Discover", path: "/discover" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: Wallet, label: "My Holdings", path: "/holdings" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const Layout = ({ children }: LayoutProps) => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const navigate = useNavigate();
  const [creatorDialogOpen, setCreatorDialogOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        {/* Logo & User Profile */}
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="AmpliFi" className="w-8 h-8" />
            <span className="text-xl font-bold">AmpliFi</span>
          </div>

          {authenticated && user ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.wallet?.address} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user.wallet?.address?.slice(2, 4).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {user.wallet?.address?.slice(0, 6)}...
                  {user.wallet?.address?.slice(-4)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  @{user.wallet?.address?.slice(2, 10)}
                </p>
              </div>
            </div>
          ) : (
            <Button
              onClick={login}
              disabled={!ready}
              variant="outline"
              className="w-full"
            >
              Connect Wallet
            </Button>
          )}
        </div>

        <Separator className="my-2" />

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Become a Creator CTA */}
        <div className="p-4 space-y-2">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            onClick={() => setCreatorDialogOpen(true)}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Become a Creator
          </Button>
          <Separator className="my-2" />
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          {authenticated && (
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">{children}</main>
      
      <BecomeCreatorDialog open={creatorDialogOpen} onOpenChange={setCreatorDialogOpen} />
    </div>
  );
};
