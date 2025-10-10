import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BecomeCreatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BecomeCreatorDialog = ({ open, onOpenChange }: BecomeCreatorDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    twitter: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application submitted!",
      description: "We'll review your creator application and get back to you soon.",
    });
    onOpenChange(false);
    setFormData({ name: "", bio: "", twitter: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Become a Creator
          </DialogTitle>
          <DialogDescription>
            Apply to become a creator and launch your own token on AmpliFi
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Creator Name</Label>
            <Input
              id="name"
              placeholder="Your creator name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your content"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter Handle (Optional)</Label>
            <Input
              id="twitter"
              placeholder="@yourusername"
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
