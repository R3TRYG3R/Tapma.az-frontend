// src/features/profile/ui/AvatarUpload.tsx

import { useState } from 'react'
import './AvatarUpload.scss'
import { useTranslation } from 'react-i18next'
import { useUploadAvatar } from '../lib/useUploadAvatar'

interface Props {
  userId: number
  onUploadSuccess?: () => void
}

export const AvatarUpload = ({ userId, onUploadSuccess }: Props) => {
  const { t } = useTranslation()
  const { uploadAvatar, loading, error } = useUploadAvatar()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    await uploadAvatar(userId, file)

    if (!error) {
      onUploadSuccess?.()
    }
  }

  return (
    <div className="avatar-upload">
      {loading && <p className="upload-status loading">{t('auth.loading')}</p>}
      {error && (
        <p className="upload-status error">
          {t(`auth.${error}`) || t('auth.unknown_error')}
        </p>
      )}

      <label className="button button--primary" style={{ width: '260px', height: '40px' }}>
        {t('profile.upload_avatar')}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          hidden
        />
      </label>
    </div>
  )
}