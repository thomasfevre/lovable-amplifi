import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  content: string;
  image_url: string | null;
  is_locked: boolean;
  unlock_token_amount: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  creator: {
    id: string;
    token_symbol: string;
    token_name: string;
    profile: {
      username: string | null;
      display_name: string | null;
      avatar_url: string | null;
    };
  };
}

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          creator:creators(
            id,
            token_symbol,
            token_name,
            profile:profiles(username, display_name, avatar_url)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
};

export const useCreatorPosts = (creatorId: string) => {
  return useQuery({
    queryKey: ["creator-posts", creatorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          creator:creators(
            id,
            token_symbol,
            token_name,
            profile:profiles(username, display_name, avatar_url)
          )
        `)
        .eq("creator_id", creatorId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
    enabled: !!creatorId,
  });
};
