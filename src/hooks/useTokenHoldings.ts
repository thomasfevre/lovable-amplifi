import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePrivy } from "@privy-io/react-auth";

export interface TokenHolding {
  id: string;
  amount: number;
  purchase_price: number;
  creator: {
    id: string;
    token_symbol: string;
    token_name: string;
    current_price: number;
    banner_url: string | null;
    profile: {
      username: string | null;
      display_name: string | null;
      avatar_url: string | null;
    };
  };
}

export const useTokenHoldings = () => {
  const { user } = usePrivy();

  return useQuery({
    queryKey: ["token-holdings", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("token_holdings")
        .select(`
          *,
          creator:creators(
            id,
            token_symbol,
            token_name,
            current_price,
            banner_url,
            profile:profiles(username, display_name, avatar_url)
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      return data as TokenHolding[];
    },
    enabled: !!user?.id,
  });
};
