import { useEffect } from "react";
import {
  render as renderSwapWidget,
  updateConnectWallet,
  updateAddressAndProvider,
  updateDisconnectWallet,
} from "woofi-swap-widget";
import {
  useAccount,
  useDisconnect,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { init as initSwapWidget } from "woofi-swap-widget";
import "woofi-swap-widget/style.css";

if (typeof window !== "undefined") {
  console.log("window", window.navigator.userAgent.toLowerCase);
  initSwapWidget({
    useUserWallet: true,
  });
}

export function Swap() {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { data: provider } = useWalletClient();
  // const provider = usePublicClient();
  console.log("provider", provider);
  useEffect(() => {
    if (openConnectModal) {
      updateConnectWallet(openConnectModal);
    }
  }, [openConnectModal]);

  useEffect(() => {
    if (disconnect) {
      updateDisconnectWallet && updateDisconnectWallet(disconnect);
    }
  }, [disconnect]);

  useEffect(() => {
    if (address && document && provider) {
      updateAddressAndProvider(address, provider as any);
    }
  }, [address, provider]);

  useEffect(() => {
    // if (document) {
    renderSwapWidget("#swap");
    // }
  }, []);
  return <div id="swap"></div>;
}
