// src/app/router.tsx

import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/widgets/layout/ui/Layout'
import HomePage from '@/pages/home/ui/HomePage'
import RegisterPage from '@/pages/auth/register/RegisterPage'
import LoginPage from '@/pages/auth/login/LoginPage'
import ProfilePage from '@/pages/profile/ui/ProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <Layout>
        <RegisterPage />
      </Layout>
    ),
  },
  {
    path: '/auth/login',
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
])