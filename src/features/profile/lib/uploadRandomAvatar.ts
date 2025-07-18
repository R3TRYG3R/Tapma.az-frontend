// src/features/profile/lib/uploadRandomAvatar.ts

export const uploadRandomAvatar = async (userId: number, token: string) => {
  const url = `https://ui-avatars.com/api/?name=Tapma.az&background=random&color=fff&size=256`

  try {
    const res = await fetch(url)
    const blob = await res.blob()

    const formData = new FormData()
    formData.append('file', new File([blob], 'avatar.png', { type: 'image/png' }))

    await fetch(`https://dependable-vitality-production.up.railway.app/users/${userId}/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
  } catch (err) {
    console.warn('❌ Failed to set random avatar:', (err as Error).message)
  }
}