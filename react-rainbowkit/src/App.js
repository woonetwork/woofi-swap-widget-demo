
import { useAccount, useDisconnect, useSigner } from 'wagmi';
import { useEffect } from 'react'

import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { render as renderSwapWidget, updateConnectWallet, updateAddressAndProvider, updateDisconnectWallet } from 'woofi-swap-widget'
function App() {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { disconnect } = useDisconnect()
  const { data: signer } = useSigner()

  useEffect(() => {
    if (openConnectModal) {
      updateConnectWallet(openConnectModal)
    }
  }, [openConnectModal])

  useEffect(() => {
    if (disconnect) {
      updateDisconnectWallet && updateDisconnectWallet(disconnect)
    }
  }, [disconnect])

  useEffect(() => {
    if (address && document && signer?.provider?.provider) {
      updateAddressAndProvider(address, signer?.provider?.provider)
    }
  }, [address, signer])


  useEffect(() => {
    if (document) {
      console.log('render--')
      renderSwapWidget('#swap')
    }
  }, [])

  return (
    <>
      <ConnectButton>Connect wallet</ConnectButton>
      <div id="swap"></div>

    </>

  )
}

export default App;