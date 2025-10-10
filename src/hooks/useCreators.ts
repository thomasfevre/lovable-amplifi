import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Creator {
  id: string;
  profile_id: string;
  token_symbol: string;
  token_name: string;
  banner_url: string | null;
  current_price: number;
  market_cap: number;
  holder_count: number;
  total_supply: number;
  profile?: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
    bio: string | null;
  };
}

export const useCreators = () => {
  return useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("creators")
        .select(`
          *,
          profile:profiles(username, display_name, avatar_url, bio)
        `)
        .order("market_cap", { ascending: false });

      if (error) throw error;
      return data as Creator[];
    },
  });
};

export const useCreator = (id: string) => {
  return useQuery({
    queryKey: ["creator", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("creators")
        .select(`
          *,
          profile:profiles(username, display_name, avatar_url, bio)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Creator;
    },
    enabled: !!id,
  });
};
