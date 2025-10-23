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
      <header className="app-header">
        <div className="header-left">
          <h1>WooFi Swap Widget Demo (React + wagmi + rainbowkit)</h1>
          <a
            href="https://github.com/woonetwork/woofi-swap-widget-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg
              height="24"
              width="24"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
        <div className="wallet-controls">
          <ConnectButton />
        </div>
      </header>
      <main>
        <WooFiSwapWidgetReact
          brokerAddress='0x47fc45CEBFc47Cef07a09A98405B6EBAeF00ef75'
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
