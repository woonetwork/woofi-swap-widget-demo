import { useEffect } from 'react'
import './App.css'
import createSwap from 'woofi-swap-widget'
import 'woofi-swap-widget/style.css'
import { useEthers } from '@usedapp/core'

const { updateAddressAndProvider, render: renderSwapWidget } = createSwap('#swap', {
  useUserWallet: true,
  isRenderByUser: false,
  connectWallet: () => connectWalletHandler()
})
const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
  // 'account' being undefined means that we are not connected.
  if (account) return <button onClick={() => deactivate()}>Disconnect</button>
  else return <button onClick={() => activateBrowserWallet()}>Connect</button>
}
let connectWalletHandler = () => {}


function App() {
  const { account: address, library: currentProvider, activateBrowserWallet: connectWallet } = useEthers();
  
  useEffect(() => {
    if (connectWallet) {
      connectWalletHandler = connectWallet
    }
  }, [connectWallet])

  useEffect(() => {
    if (address && document && currentProvider) {
      console.log('update address', address, currentProvider)
      updateAddressAndProvider(address, currentProvider.provider)
    }
  }, [address, currentProvider])


  useEffect(() => {
    if (document) {
      renderSwapWidget()
    }
  }, [])


  return (
    <>
      <ConnectButton />
      {address && (
        <div className="balance">
          <br />
          Address:
          <p className="bold">{address}</p>
          <br />
        </div>
      )}
      <div id="swap">
      </div>
    </>
  )
}

export default App
