import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <SettingsIcon className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="new-content">New content from creators</Label>
                <Switch id="new-content" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="token-alerts">Token price alerts</Label>
                <Switch id="token-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="messages">Direct messages</Label>
                <Switch id="messages" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
              <CardDescription>Control your privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="profile-public">Public profile</Label>
                <Switch id="profile-public" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-holdings">Show token holdings</Label>
                <Switch id="show-holdings" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
