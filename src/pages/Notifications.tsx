import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const { data: notifications = [], isLoading } = useNotifications();

  if (isLoading) {
    return (
      <Layout>
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Loading notifications...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with the latest from your creators
            </p>
          </div>

          {notifications.length === 0 ? (
            <div className="h-[calc(100vh-200px)] flex items-center justify-center">
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
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 ${!notification.is_read ? "bg-primary/5 border-primary/20" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.is_read ? "bg-muted" : "bg-primary/20"
                    }`}>
                      {notification.is_read ? (
                        <Check className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Bell className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        {!notification.is_read && (
                          <Button size="sm" variant="ghost">
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
