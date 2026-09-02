export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Rajdhani, Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { DemoBanner } from '@/components/layout/DemoBanner'
import { ExecutionWarningBanner } from '@/components/layout/ExecutionWarningBanner'
import { ChainGuard } from '@/components/wallet/ChainGuard'
import { Footer } from '@/components/layout/Footer'
import { ToastContainer } from '@/components/ui/Toast'
import './globals.css'

const rajdhani = Rajdhani({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '500', '600', '700'] })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500', '600'] })

export const metadata: Metadata = {
  title: 'Ritual Hunters — Precision Prediction Markets',
  description: "Set your hunt. Claim your kill. Self-resolving prediction markets on Ritual Chain.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${plusJakarta.variable} ${ibmPlexMono.variable}`}>
      <body>
        <Providers>
          <div className="ambient-glow" aria-hidden />
          <Navbar />
          <DemoBanner />
          <ExecutionWarningBanner />
          <ChainGuard>
            <main className="page-content">{children}</main>
          </ChainGuard>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
