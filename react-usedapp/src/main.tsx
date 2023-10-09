
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Mainnet, DAppProvider, Config, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
)
