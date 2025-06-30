// src/features/profile/ui/AvatarRemove.tsx

import './AvatarRemove.scss'
import { useTranslation } from 'react-i18next'
import { useRemoveAvatar } from '../lib/useRemoveAvatar'

interface Props {
  userId: number
  onRemoveSuccess?: () => void
}

export const AvatarRemove = ({ userId, onRemoveSuccess }: Props) => {
  const { t } = useTranslation()
  const { removeAvatar, loading, error } = useRemoveAvatar()

  const handleRemove = async () => {
    await removeAvatar(userId)
    if (!error) {
      onRemoveSuccess?.()
    }
  }

  return (
    <div className="avatar-remove">
      <button onClick={handleRemove} disabled={loading}>
        {loading ? t('auth.loading') : t('profile.remove_avatar')}
      </button>
      {error && <p className="remove-error">{t(`auth.${error}`) || t('auth.unknown_error')}</p>}
    </div>
  )
}