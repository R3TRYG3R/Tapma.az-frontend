// src/pages/home/ui/HomePage.tsx

import './HomePage.scss'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  )
}

export default HomePage