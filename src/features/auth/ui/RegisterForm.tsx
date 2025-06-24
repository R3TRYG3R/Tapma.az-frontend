// src/features/auth/ui/RegisterForm.tsx

import { useState } from 'react'
import { useRegister } from '@/features/auth/lib/useRegister'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './RegisterForm.scss'

export const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const { register, loading, error } = useRegister()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    register(email, password, nickname)
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>

      <h2>{t('auth.create_account')}</h2>

      <input
        type="text"
        placeholder={t('auth.nickname')}
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        required
      />

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
        {loading ? t('auth.loading') : t('auth.register')}
      </button>

      {error && <p className="error">{t(`auth.${error}`) || error}</p>}
    </form>
  )
}