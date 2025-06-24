// src/widgets/header/ui/Header.tsx

import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { ThemeToggle } from '@/widgets/theme-toggle/ui/ThemeToggle'
import './Header.scss'

export const Header = () => {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleLang = () => {
    setIsAnimating(true)
    const nextLang = i18n.language === 'ru' ? 'en' : 'ru'

    setTimeout(() => {
      i18n.changeLanguage(nextLang)
      setIsAnimating(false)
    }, 250)
  }

  const getFlag = () => {
    return i18n.language === 'ru' ? '🇬🇧' : '🇷🇺'
  }

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">Tapma.az</Link>
      </div>

      <div className="header__right">
        <ThemeToggle />

        <button
          onClick={toggleLang}
          className={`header__lang-btn ${isAnimating ? 'animating' : ''}`}
        >
          {getFlag()}
        </button>

        <Link to="/auth/login" className="header__button">{t('auth.login')}</Link>
        <Link to="/auth/register" className="header__button header__button--primary">{t('auth.register')}</Link>
      </div>
    </header>
  )
}