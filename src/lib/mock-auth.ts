import type { Session, User } from '@supabase/supabase-js'

import mockDatabaseJson from '../data/mock-database.json'
import type { MockTestAccount } from '../types/mock-database'
import type { Profile } from '../types/database'
import { writeStoredCargo } from './career-storage'
import { writeQuestionAttempts } from './question-attempts-storage'
import { writeStudentProfile } from './student-profile-storage'

const SESSION_STORAGE_KEY = 'mock-auth-session'
const MOCK_AUTH_EVENT = 'mock-auth'

const testAccount = (mockDatabaseJson as { testAccount: MockTestAccount }).testAccount

export function isMockAuthEnabled(): boolean {
  return import.meta.env.VITE_MOCK_AUTH === 'true'
}

export function getMockTestAccount(): MockTestAccount {
  return testAccount
}

export function isMockUserId(userId: string | undefined): boolean {
  return Boolean(userId && userId === testAccount.id)
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function buildMockUser(account: MockTestAccount): User {
  const now = new Date().toISOString()
  return {
    id: account.id,
    aud: 'authenticated',
    role: 'authenticated',
    email: account.email,
    email_confirmed_at: now,
    phone: '',
    confirmed_at: now,
    last_sign_in_at: now,
    app_metadata: { provider: 'mock', providers: ['mock'] },
    user_metadata: { full_name: account.profile.full_name },
    identities: [],
    created_at: now,
    updated_at: now,
    is_anonymous: false,
  } as User
}

function buildMockSession(user: User): Session {
  const now = Math.floor(Date.now() / 1000)
  return {
    access_token: 'mock-access-token',
    token_type: 'bearer',
    expires_in: 60 * 60 * 24 * 7,
    expires_at: now + 60 * 60 * 24 * 7,
    refresh_token: 'mock-refresh-token',
    user,
  } as Session
}

export function buildMockProfile(account: MockTestAccount): Profile {
  const now = new Date().toISOString()
  return {
    id: account.id,
    full_name: account.profile.full_name,
    cpf: account.profile.cpf,
    role: account.profile.role,
    created_at: now,
    updated_at: now,
  }
}

function editalProgressKey(cargo: MockTestAccount['career']) {
  return `edital-${cargo}-topicos-estudados`
}

export function seedMockUserLocalState(account: MockTestAccount) {
  writeStoredCargo(account.career)
  writeQuestionAttempts(account.id, account.questionAttempts)

  writeStudentProfile(account.id, {
    nomeGuerra: account.nomeGuerra,
    avatarDataUrl: null,
    customApprovals: [
      {
        id: 'mock-approval-1',
        title: 'Aprovado na Prova Objetiva Soldado PMESP 2024',
        createdAt: '2025-01-15T12:00:00.000Z',
      },
    ],
    stats: {
      questionsToday: 0,
      dailyAverage: 0,
      correctRate: 0,
      errorRate: 0,
      last7Days: [],
    },
  })

  const progressKey =
    account.career === 'soldado'
      ? account.editalProgressSoldado
      : account.editalProgressSoldado
  localStorage.setItem(editalProgressKey(account.career), JSON.stringify(progressKey))
  window.dispatchEvent(new Event('edital-progress'))
}

function persistMockSession(session: Session) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId: session.user.id }))
  window.dispatchEvent(new Event(MOCK_AUTH_EVENT))
}

export function readMockSession(): Session | null {
  if (!isMockAuthEnabled()) {
    return null
  }
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw) as { userId?: string }
    if (parsed.userId !== testAccount.id) {
      return null
    }
    const user = buildMockUser(testAccount)
    return buildMockSession(user)
  } catch {
    return null
  }
}

export function mockSignIn(email: string, password: string): Session | null {
  if (!isMockAuthEnabled()) {
    return null
  }

  const account = testAccount
  if (
    normalizeEmail(email) !== normalizeEmail(account.email) ||
    password !== account.password
  ) {
    return null
  }

  seedMockUserLocalState(account)
  const session = buildMockSession(buildMockUser(account))
  persistMockSession(session)
  return session
}

export function mockSignOut() {
  localStorage.removeItem(SESSION_STORAGE_KEY)
  window.dispatchEvent(new Event(MOCK_AUTH_EVENT))
}

export function subscribeMockAuth(onChange: () => void) {
  window.addEventListener(MOCK_AUTH_EVENT, onChange)
  return () => window.removeEventListener(MOCK_AUTH_EVENT, onChange)
}

export function getMockAuthSnapshot() {
  return localStorage.getItem(SESSION_STORAGE_KEY) ?? ''
}
