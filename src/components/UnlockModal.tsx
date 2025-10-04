import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface UnlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requiredTokens: number;
  currentBalance: number;
  tokenSymbol: string;
  onBuyClick: () => void;
}

export const UnlockModal = ({
  open,
  onOpenChange,
  requiredTokens,
  currentBalance,
  tokenSymbol,
  onBuyClick,
}: UnlockModalProps) => {
  const tokensNeeded = Math.max(0, requiredTokens - currentBalance);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Unlock Content</DialogTitle>
          <DialogDescription className="text-center">
            You need at least <span className="font-semibold text-primary">{requiredTokens} ${tokenSymbol}</span> to view this post.
            <br />
            Your current balance is{" "}
            <span className="font-semibold">{currentBalance} ${tokenSymbol}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg bg-muted p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Required:</span>
            <span className="font-semibold">{requiredTokens} ${tokenSymbol}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">You have:</span>
            <span className="font-semibold">{currentBalance} ${tokenSymbol}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tokens needed:</span>
            <span className="font-semibold text-primary">{tokensNeeded} ${tokenSymbol}</span>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={() => {
              onBuyClick();
              onOpenChange(false);
            }}
            className="w-full"
          >
            Buy ${tokenSymbol}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
