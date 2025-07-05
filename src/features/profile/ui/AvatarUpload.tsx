// src/features/profile/ui/AvatarUpload.tsx

import { useState } from 'react'
import './AvatarUpload.scss'
import { useTranslation } from 'react-i18next'
import { useUploadAvatar } from '../lib/useUploadAvatar'

interface Props {
  userId: number
  onUploadSuccess?: () => void
}

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

export const AvatarUpload = ({ userId, onUploadSuccess }: Props) => {
  const { t } = useTranslation()
  const { uploadAvatar, loading, error } = useUploadAvatar()
  const [sizeError, setSizeError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''

    if (!file) return

    const maxSize = 5 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      showError(t('profile.error_invalid_type'))
      return
    }

    if (file.size > maxSize) {
      showError(t('profile.error_file_too_large'))
      return
    }

    await uploadAvatar(userId, file)

    if (!error) {
      onUploadSuccess?.()
    }
  }

  const showError = (message: string) => {
    setIsVisible(false)
    setSizeError(null)

    setTimeout(() => {
      setSizeError(message)
      setIsVisible(true)
    }, 10)

    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => setSizeError(null), 700)
    }, 2000)
  }

  return (
    <div className="avatar-upload">
      {sizeError && (
        <p className={`upload-status error ${isVisible ? 'visible' : ''}`}>
          {sizeError}
        </p>
      )}

      {loading && <p className="upload-status loading">{t('auth.loading')}</p>}
      {error && !sizeError && (
        <p className="upload-status error">
          {t(`auth.${error}`) || t('auth.unknown_error')}
        </p>
      )}

      <label className="button button--primary" style={{ width: '260px', height: '40px' }}>
        {t('profile.upload_avatar')}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,image/jpeg,image/png,image/gif"
          onChange={handleFileChange}
          disabled={loading}
          hidden
        />
      </label>
    </div>
  )
}