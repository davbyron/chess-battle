'use client'

import { Provider } from 'react-redux'
import { trpc } from 'src/utils/trpc'

import store from '../store'
import './global.css'

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Provider>
  )
}

export default trpc.withTRPC(RootLayout);
