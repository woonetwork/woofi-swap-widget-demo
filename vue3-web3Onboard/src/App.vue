<template>
  <div class="wrapper">
    <h5>address: {{ address }}</h5>
    <div id="swap"></div>
  </div>
</template>
<script setup>

import { init, useOnboard } from '@web3-onboard/vue'
import injectedModule from '@web3-onboard/injected-wallets'
import { computed, onMounted, watch } from 'vue';
import createSwap from 'woofi-swap-widget'
import 'woofi-swap-widget/style.css'
const injected = injectedModule()

init({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://eth.llamarpc.com'
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc'
    }
  ]
})


const { connectWallet, connectedWallet } = useOnboard()

const address = computed(() => {
  return connectedWallet.value?.accounts?.[0]?.address;
});

const provider = computed(() => {
  return connectedWallet.value?.provider
})
const { updateAddressAndProvider, render } = createSwap('#swap', {
  useUserWallet: true,
  isRenderByuser: true,
  connectWallet: () => connectWallet()
})

watch(address, (val) => {
  if (val) {
    updateAddressAndProvider(val, provider.value)
  }
})

onMounted(() => {
  render()
})
</script>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
