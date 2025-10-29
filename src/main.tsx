import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bsc,
  avalanche,
  fantom,
  mantle,
  zksync,
  linea,
  sonic,
  berachain,
  merlin,
  hychain
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "WooFi Swap Widget Demo",
  projectId: "e7b04c22de006e0fc7cef5a00cb7fac9",
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    bsc,
    avalanche,
    fantom,
    mantle,
    zksync,
    linea,
    sonic,
    berachain,
    merlin,
    hychain
  ],
  ssr: true,
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
