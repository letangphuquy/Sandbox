import '@/styles/globals.css'

export const metadata = {
  title: "Promptopia",
  description: "AI-powered Chat Prompts everywhere"
}

import Provider from '@/components/Provider'

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout