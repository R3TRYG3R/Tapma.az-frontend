// src/pages/profile/ui/ProfilePage.tsx

import './ProfilePage.scss'
import { useTranslation } from 'react-i18next'
import { useCurrentUser } from '@/features/auth/lib/useCurrentUser'
import { AvatarUpload } from '@/features/profile/ui/AvatarUpload'
import { AvatarRemove } from '@/features/profile/ui/AvatarRemove'

const ProfilePage = () => {
  const { t } = useTranslation()
  const { user, loading, error } = useCurrentUser()

  const isCustomAvatar = user?.avatarUrl && !user.avatarUrl.includes('ui-avatars.com')

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>{t('profile.title')}</h1>
        <p className="profile-subtitle">{t('profile.subtitle')}</p>

        {loading && <p className="profile-loading">{t('auth.loading')}</p>}
        {error && <p className="profile-error">{t(error)}</p>}

        {user && (
          <div className="profile-details">
            <img
              src={user.avatarUrl || '/default-avatar.png'}
              alt="avatar"
              className="profile-avatar"
            />

            <div className="profile-info">
              <p><span>{t('auth.nickname')}:</span> {user.nickname}</p>
            </div>

            <AvatarUpload userId={user.id} onUploadSuccess={() => window.location.reload()} />
            
            {isCustomAvatar && (
              <AvatarRemove userId={user.id} onRemoveSuccess={() => window.location.reload()} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage