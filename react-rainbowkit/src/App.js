
import { useAccount, useSigner } from 'wagmi';
import { useEffect } from 'react'

import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { updateAddressAndProvider, updateConnectWalletHandler, renderSwapWidget } from './initSwap'
function App() {
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { data: signer } = useSigner()

  useEffect(() => {
    if (openConnectModal) {
      updateConnectWalletHandler(openConnectModal)
    }
  }, [openConnectModal])

  useEffect(() => {
    if (address && document && signer?.provider?.provider) {
      updateAddressAndProvider(address, signer?.provider?.provider)
      renderSwapWidget() // TODO
    }
  }, [address, signer])


  useEffect(() => {
    if (document) {
      console.log('render--')
      renderSwapWidget()
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