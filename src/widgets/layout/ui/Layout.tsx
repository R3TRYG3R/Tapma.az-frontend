// src/widgets/layout/ui/Layout.tsx

import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@/widgets/header/ui/Header'
import { Footer } from '@/widgets/footer/ui/Footer'
import { Container } from '@/shared/ui/container/Container'

interface LayoutProps {
  children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation()
  const isAuthPage = pathname.startsWith('/auth/')

  return (
    <div className={`layout ${isAuthPage ? 'auth-page' : ''}`}>
      {!isAuthPage && <Header />}
      <main className="layout-main">
        {isAuthPage ? (
          <div className="auth-layout-wrapper">
            {children}
          </div>
        ) : (
          <Container>{children}</Container>
        )}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}