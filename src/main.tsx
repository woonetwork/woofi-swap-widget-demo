import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Woofi Swap Widget Demo",
  projectId: "YOUR_PROJECT_ID", // You need to get your own project id from walletconnect.com
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </WagmiProvider>
  </React.StrictMode>
);
