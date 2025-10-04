import creator1 from "@/assets/creator-1.jpg";
import creator2 from "@/assets/creator-2.jpg";
import creator3 from "@/assets/creator-3.jpg";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  bio: string;
  location?: string;
  verified: boolean;
  tokenSymbol: string;
  tokenPrice: number;
  priceChange24h: number;
  marketCap: number;
  holders: number;
  posts: number;
}

export interface Post {
  id: string;
  creatorId: string;
  content: string;
  image?: string;
  locked: boolean;
  requiredTokens: number;
  timestamp: Date;
}

export interface TokenHolding {
  creatorId: string;
  amount: number;
  totalValue: number;
}

export const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Darren Till",
    handle: "darrentill",
    avatar: creator3,
    banner: banner1,
    bio: "Professional MMA fighter and crypto enthusiast. Join my journey to financial freedom.",
    location: "Liverpool, UK",
    verified: true,
    tokenSymbol: "TILL",
    tokenPrice: 0.34,
    priceChange24h: 15.2,
    marketCap: 450000,
    holders: 1245,
    posts: 16,
  },
  {
    id: "2",
    name: "Sarah Chen",
    handle: "cryptosarah",
    avatar: creator2,
    banner: banner2,
    bio: "Crypto analyst & DeFi educator. Teaching you how to navigate Web3.",
    location: "Singapore",
    verified: true,
    tokenSymbol: "CHEN",
    tokenPrice: 1.24,
    priceChange24h: -3.8,
    marketCap: 890000,
    holders: 2103,
    posts: 42,
  },
  {
    id: "3",
    name: "Alex Morgan",
    handle: "alexcrypto",
    avatar: creator1,
    banner: banner3,
    bio: "Day trader & blockchain developer. Sharing alpha and exclusive trading strategies.",
    location: "Los Angeles, CA",
    verified: true,
    tokenSymbol: "ALEX",
    tokenPrice: 0.89,
    priceChange24h: 24.5,
    marketCap: 670000,
    holders: 1876,
    posts: 28,
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    creatorId: "1",
    content: "Just wrapped up training! Big announcement coming next week 👀",
    locked: false,
    requiredTokens: 0,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    creatorId: "1",
    content: "Exclusive: My complete training routine and diet plan 🥊",
    image: banner1,
    locked: true,
    requiredTokens: 15,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    creatorId: "2",
    content: "Market analysis: Why I'm bullish on this altcoin 📈",
    locked: true,
    requiredTokens: 10,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: "4",
    creatorId: "3",
    content: "Green day! Up 40% on my trades. Full breakdown for holders.",
    locked: true,
    requiredTokens: 20,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
];

// User's mock holdings
export const mockHoldings: TokenHolding[] = [
  {
    creatorId: "2",
    amount: 25,
    totalValue: 31.0,
  },
];

export const getUserBalance = (creatorId: string): number => {
  const holding = mockHoldings.find((h) => h.creatorId === creatorId);
  return holding?.amount || 0;
};

export const updateUserBalance = (creatorId: string, amount: number) => {
  const index = mockHoldings.findIndex((h) => h.creatorId === creatorId);
  const creator = mockCreators.find((c) => c.id === creatorId);
  
  if (index >= 0) {
    mockHoldings[index].amount += amount;
    mockHoldings[index].totalValue = mockHoldings[index].amount * (creator?.tokenPrice || 0);
  } else if (creator) {
    mockHoldings.push({
      creatorId,
      amount,
      totalValue: amount * creator.tokenPrice,
    });
  }
};
