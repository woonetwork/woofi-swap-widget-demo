import { useEffect } from 'react'
import './App.css'
import { init as initSwapWidget, render as renderSwapWidget, updateConnectWallet, updateAddressAndProvider, updateDisconnectWallet } from 'woofi-swap-widget'
import 'woofi-swap-widget/style.css'
import { useEthers } from '@usedapp/core'
// init option first
const options = {
  useUserWallet: true,
}
initSwapWidget(options)

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()
  // 'account' being undefined means that we are not connected.
  if (account) return <button onClick={() => deactivate()}>Disconnect</button>
  else return <button onClick={() => activateBrowserWallet()}>Connect</button>
}


function App() {
  const { account: address, library: currentProvider, activateBrowserWallet: connectWallet, deactivate: disconnectWallet } = useEthers();
  
  useEffect(() => {
    if (connectWallet) {
      updateConnectWallet(connectWallet)
    }
  }, [connectWallet])

  useEffect(() => {
    if (disconnectWallet) {
      updateDisconnectWallet(disconnectWallet)
    }
  }, [disconnectWallet])

  useEffect(() => {
    if (address && document && currentProvider) {
      // console.log('update address', address, currentProvider)
      updateAddressAndProvider(address, currentProvider.provider)
    }
  }, [address, currentProvider])


  useEffect(() => {
    if (document) {
      console.log('render--')
      renderSwapWidget('#swap')
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
