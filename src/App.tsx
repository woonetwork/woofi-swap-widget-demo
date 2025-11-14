import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useChainId,
  useDisconnect,
  useSwitchChain,
  useWalletClient,
} from "wagmi";
import { useEffect, useRef, useState } from "react";
import { WooFiSwapWidgetReact } from "woofi-swap-widget-kit/react";
import "woofi-swap-widget-kit/style.css";
import "./App.css";

const SUPPORTED_CHAINS = [
  { id: 1, name: "Ethereum" },
  { id: 137, name: "Polygon" },
  { id: 42161, name: "Arbitrum" },
  { id: 10, name: "Optimism" },
  { id: 43114, name: "Avalanche" },
  { id: 8453, name: "Base" },
  { id: 5000, name: "Mantle" },
  // { id: 324, name: "ZkSync" },
  { id: 56, name: "BNB Chain" },
  // { id: 59144, name: "Linea" },
  { id: 146, name: "Sonic" },
  { id: 80094, name: "Berachain" },
  // { id: 4200, name: "Merlin" },
  // { id: 999, name: "HyperEVM" },
  { id: 100000000, name: "Solana", key: 'solana' } // fake chain id for Solana selection
];

function App() {
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const { data: evmProvider } = useWalletClient();
  const { address, isConnected } = useAccount();
  const [currentChain, setCurrentChain] = useState<number | string | null>(null);
  const chainId = useChainId();

  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);
  const [solanaConnected, setSolanaConnected] = useState(false);

  // Cache refs for both EVM and Solana providers
  const cachedProviderRef = useRef(evmProvider);
  const cachedSolanaProviderRef = useRef<any>(null);

  useEffect(() => {
    if (evmProvider && evmProvider !== cachedProviderRef.current) {
      cachedProviderRef.current = evmProvider;
    } else if (!isConnected && cachedProviderRef.current !== undefined) {
      cachedProviderRef.current = undefined;
    }
  }, [evmProvider, isConnected]);

  // Auto-connect Solana wallet on component mount
  useEffect(() => {
    const tryAutoConnectSolana = async () => {
      try {
        const solana = (window as any).solana;
        if (!solana?.isPhantom) {
          return;
        }
        const response = await solana.connect({ onlyIfTrusted: true });
        const publicKey = response.publicKey.toString();
        setSolanaAddress(publicKey);
        setSolanaConnected(true);
        // Cache the Solana provider
        cachedSolanaProviderRef.current = solana;
        console.log("Auto-connected Solana wallet:", publicKey);
      } catch (err) {
        console.error("Failed to auto-connect Solana wallet:", err);
      }
    };
    tryAutoConnectSolana();
  }, []);

  // Handle Solana wallet connection
  const handleSolanaConnect = async () => {
    try {
      const solana = (window as any).solana;
      if (!solana?.isPhantom) {
        alert("Please install Phantom wallet");
        return;
      }
      const response = await solana.connect();
      const publicKey = response.publicKey.toString();
      setSolanaAddress(publicKey);
      setSolanaConnected(true);
      // Cache the Solana provider
      cachedSolanaProviderRef.current = solana;
      console.log("Connected Solana wallet:", publicKey);
    } catch (err) {
      console.error("Failed to connect Solana wallet:", err);
    }
  };

  // Handle Solana wallet disconnection
  const handleSolanaDisconnect = async () => {
    try {
      const solana = (window as any).solana;
      if (solana?.isPhantom) {
        await solana.disconnect();
      }
      setSolanaAddress(null);
      setSolanaConnected(false);
      // Clear the cached Solana provider
      cachedSolanaProviderRef.current = null;
      console.log("Disconnected Solana wallet");
    } catch (err) {
      console.error("Failed to disconnect Solana wallet:", err);
    }
  };

  const onSwitchChain = (targetChain: any) => {
    if (targetChain.key === 'solana') {
      setCurrentChain(targetChain.key);
      return;
    } else {
      setCurrentChain(null); // use null to indicate EVM chain
    }
    if (targetChain.chainId) {
      switchChain({ chainId: Number(targetChain.chainId) });
    }
  }

  const stableEvmProvider = evmProvider || cachedProviderRef.current;
  const stableSolanaProvider = cachedSolanaProviderRef.current;
  const stableCurrentChain = currentChain || chainId;
  const selectorCurrentChain = (() => {
    if (typeof stableCurrentChain === 'string') {
      return SUPPORTED_CHAINS.find(chain => chain.key === stableCurrentChain)?.id;
    }
    return stableCurrentChain
  })()

  const brokerAddress = "0xfBe3AeDa720f923726b1108A0bB82140f6BaBd1A";
  console.log('brokerAddress: ', brokerAddress);

  return (
    <div>
      <header className="app-header">
        <div className="header-left">
          <h1>WooFi Swap Widget Demo (React.js)</h1>
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
          <select
            className="chain-selector"
            value={selectorCurrentChain}
            onChange={(e) => {
              const chainId = Number(e.target.value);
              const selectedChain = SUPPORTED_CHAINS.find(
                (chain) => chain.id === chainId
              );
              if (selectedChain) {
                onSwitchChain(selectedChain);
              }
            }}
            title="Select blockchain network"
          >
            {SUPPORTED_CHAINS.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>

          {/* EVM Wallet Button */}
          <div className="wallet-button-group">
            {!isConnected ? (
              <button
                className="connect-button evm-button"
                onClick={openConnectModal}
                title="Connect EVM wallet"
              >
                EVM Wallet
              </button>
            ) : (
              <button
                className="address-button evm-button"
                onClick={() => disconnect()}
                title="Click to disconnect EVM wallet"
              >
                <span className="address-text">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <span className="disconnect-hint">(disconnect)</span>
              </button>
            )}
          </div>

          {/* Solana Wallet Button */}
          <div className="wallet-button-group">
            {!solanaConnected ? (
              <button
                className="connect-button solana-button"
                onClick={handleSolanaConnect}
                title="Connect Solana wallet"
              >
                Solana Wallet
              </button>
            ) : (
              <button
                className="address-button solana-button"
                onClick={handleSolanaDisconnect}
                title="Click to disconnect Solana wallet"
              >
                <span className="address-text">
                  {solanaAddress?.slice(0, 6)}...{solanaAddress?.slice(-4)}
                </span>
                <span className="disconnect-hint">(disconnect)</span>
              </button>
            )}
          </div>
        </div>
      </header>
      <main>
        <WooFiSwapWidgetReact
          brokerAddress={brokerAddress}
          evmProvider={stableEvmProvider}
          solanaProvider={stableSolanaProvider}
          currentChain={stableCurrentChain}
          onConnectWallet={openConnectModal}
          onChainSwitch={(targetChain) => {
            onSwitchChain(targetChain);
          }}
          config={{
            enableSolana: true,
            enableLinea: false,
            enableMerlin: false,
            enableHyperevm: false,
            enableZksync: false,
          }}
        />
      </main>
    </div>
  );
}

export default App;
