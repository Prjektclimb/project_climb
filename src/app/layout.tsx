
import { LayoutProvider } from "~/useContext/layoutContext";



export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" data-theme="lemonade">
      <body>
      <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  )
}
