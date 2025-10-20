import './globals.css'

import CustomHead from './head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <CustomHead title="Hypefy Agência" />
      <body>{children}</body>
    </html>
  )
}