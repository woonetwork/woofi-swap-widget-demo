import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useChainId, useSwitchChain, useWalletClient } from "wagmi";
import { WooFiSwapReact } from "woofi-swap-widget-kit/react";
import "woofi-swap-widget-kit/style.css";
import "./App.css";

function App() {
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain();
  const { data: evmProvider } = useWalletClient();
  const chainId = useChainId();

  // Find the chain name from wagmi's chains config
  // This is a simplified example. In a real app, you'd get this from your wagmi config.
  const currentChainName = () => {
    switch (chainId) {
      case 1:
        return "Ethereum";
      case 137:
        return "Polygon";
      case 10:
        return "Optimism";
      case 42161:
        return "Arbitrum";
      case 8453:
        return "Base";
      default:
        return "unknown";
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Woofi Swap Widget Demo (wagmi + rainbowkit)</h1>
        <div className="wallet-controls">
          <ConnectButton />
        </div>
      </header>
      <main>
        <WooFiSwapReact
          evmProvider={evmProvider}
          currentChain={currentChainName()}
          onConnectWallet={openConnectModal}
          onChainSwitch={(targetChain) => {
            if (targetChain.chainId) {
              switchChain({ chainId: Number(targetChain.chainId) });
            }
          }}
        />
      </main>
    </div>
  );
}

export default App;
