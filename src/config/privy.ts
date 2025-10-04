import { PrivyClientConfig } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
  appearance: {
    theme: "dark",
    accentColor: "#10B981",
    logo: undefined,
  },
  loginMethods: ["wallet", "email"],
};
