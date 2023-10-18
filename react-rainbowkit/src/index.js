import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './initSwap' // before App import
import App from './App';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, bsc, mainnet, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';


const { chains, provider } = configureChains(
  [mainnet, polygon, arbitrum, bsc],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: '1',
  projectId: '1',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
);

