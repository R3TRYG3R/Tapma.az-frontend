// src/features/auth/ui/LoginForm.tsx

import { useState } from 'react'
import { useLogin } from '@/features/auth/lib/useLogin'
import { useTranslation } from 'react-i18next'
import './LoginForm.scss'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useLogin()
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>{t('login.account')}</h2>

      <input
        type="email"
        placeholder={t('auth.email')}
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder={t('auth.password')}
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? t('auth.loading') : t('auth.login')}
      </button>

      {error && (
        <p className="error">{t(`auth.${error}`) || t('auth.unknown_error')}</p>
      )}
    </form>
  )
}