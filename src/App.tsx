import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useChainId, useSwitchChain, useWalletClient } from "wagmi";
import { WooFiSwapWidgetReact } from "woofi-swap-widget-kit/react";
import "woofi-swap-widget-kit/style.css";
import "./App.css";

function App() {
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain();
  const { data: evmProvider } = useWalletClient();
  const chainId = useChainId();

  return (
    <div> 
      <header className="header">
        <h1>WooFi Swap Widget Demo (React + wagmi + rainbowkit)</h1>
        <div className="wallet-controls">
          <ConnectButton />
        </div>
      </header>
      <main>
        <WooFiSwapWidgetReact
          evmProvider={evmProvider}
          currentChain={chainId}
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
