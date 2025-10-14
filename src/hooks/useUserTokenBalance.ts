import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useUserTokenBalance = (creatorId: string) => {
  return useQuery({
    queryKey: ["user-token-balance", creatorId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return 0;
      }

      const { data, error } = await supabase
        .from("token_holdings")
        .select("amount")
        .eq("user_id", user.id)
        .eq("creator_id", creatorId)
        .maybeSingle();

      if (error) throw error;
      return data ? Number(data.amount) : 0;
    },
    enabled: !!creatorId,
  });
};
