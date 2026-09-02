import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { ritualChain } from './chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'Ritual Hunters',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'ritual-calls-demo',
  chains: [ritualChain],   // ONLY Ritual Chain — never add others
  ssr: true,
})
