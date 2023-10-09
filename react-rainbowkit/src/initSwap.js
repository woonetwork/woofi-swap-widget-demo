import createSwap from 'woofi-swap-widget'
import 'woofi-swap-widget/style.css'

let connectWalletHandler = () => { }
let updateAddressAndProvider = () => { }
let renderSwapWidget = () => { }

function initSwap() {
    const { updateAddressAndProvider: update, render } = createSwap('#swap', {
        useUserWallet: true,
        isRenderByUser: false,
        connectWallet: () => connectWalletHandler()
    })
    updateAddressAndProvider = update
    renderSwapWidget = render
}

function updateConnectWalletHandler(handler) {
    connectWalletHandler = handler
}
export {
    initSwap,
    updateAddressAndProvider,
    renderSwapWidget,
    updateConnectWalletHandler
}