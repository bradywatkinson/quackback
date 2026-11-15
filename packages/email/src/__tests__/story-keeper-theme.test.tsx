import { describe, expect, it } from 'vitest'
import { render } from '@react-email/components'
import { Window } from 'happy-dom'
import { PasswordResetEmail } from '../templates/password-reset'
import { MagicLinkEmail } from '../templates/magic-link'
import { StatusChangeEmail } from '../templates/status-change'

const BASE = 'https://community.storykeeper.cards'
const LOGO = `${BASE}/api/storage/logos/test.png?email=1`

function documentFor(html: string) {
  const window = new Window()
  window.document.write(html)
  return window.document
}

describe('Story Keeper email compatibility', () => {
  it('keeps the exact recovery capability in both actions without printing the token as copy', async () => {
    const resetLink = `${BASE}/api/auth/reset-password/synthetic-token?callbackURL=${encodeURIComponent(`${BASE}/auth/reset-password`)}`
    const html = await render(<PasswordResetEmail resetLink={resetLink} logoUrl={LOGO} />)
    const doc = documentFor(html)
    const actions = [...doc.querySelectorAll('a')].filter((a) => a.href === resetLink)

    expect(actions.map((a) => a.textContent)).toEqual([
      'Reset Password',
      'open the password reset page',
    ])
    expect(doc.body.textContent).not.toContain('synthetic-token')
    expect(doc.body.textContent).toContain('24 hours')
    expect(doc.querySelector(`img[src="${LOGO}"]`)).not.toBeNull()
    // Some clients use the text alternative instead of HTML: it must still
    // carry the full URL even though the visual email uses a compact label.
    const text = await render(<PasswordResetEmail resetLink={resetLink} />, { plainText: true })
    expect(text).toContain(resetLink)
  })

  it('retains sign-in link, one-time code and expiry inside the shared shell', async () => {
    const signInUrl = `${BASE}/api/auth/magic-link/verify?token=synthetic-sign-in&callbackURL=%2F`
    const html = await render(
      <MagicLinkEmail
        signInUrl={signInUrl}
        code="135790"
        workspaceName="Story Keeper"
        logoUrl={LOGO}
      />
    )
    const doc = documentFor(html)

    expect([...doc.querySelectorAll('a')].some((a) => a.href === signInUrl)).toBe(true)
    expect(doc.body.textContent).toContain('135790')
    expect(doc.body.textContent).toContain('10 minutes')
    expect(doc.querySelector('h1')?.textContent).toBe('Sign in to Story Keeper')
    expect(doc.querySelector('a[href="https://quackback.io"]')?.textContent).toBe(
      'Powered by Quackback'
    )
  })

  it('retains notification destinations and unsubscribe controls', async () => {
    const postUrl = `${BASE}/b/ideas/posts/synthetic-example`
    const unsubscribeUrl = `${BASE}/unsubscribe?token=synthetic-unsubscribe&postId=example`
    const preferencesUrl = `${BASE}/settings/notifications`
    const html = await render(
      <StatusChangeEmail
        postTitle="An example idea"
        postUrl={postUrl}
        previousStatus="open"
        newStatus="planned"
        organizationName="Story Keeper"
        unsubscribeUrl={unsubscribeUrl}
        preferencesUrl={preferencesUrl}
        logoUrl={LOGO}
      />
    )
    const doc = documentFor(html)
    const destinations = [...doc.querySelectorAll('a')].map((a) => a.href)

    expect(destinations).toContain(postUrl)
    expect(destinations).toContain(unsubscribeUrl)
    expect(destinations).toContain(preferencesUrl)
    expect(doc.body.textContent).toContain('Open')
    expect(doc.body.textContent).toContain('Planned')
    expect(doc.body.textContent).toContain('Unsubscribe from this post')
  })
})
