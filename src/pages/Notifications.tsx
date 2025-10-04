import { Layout } from "@/components/Layout";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <Layout>
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto">
            <Bell className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">
              We'll notify you when something important happens
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
