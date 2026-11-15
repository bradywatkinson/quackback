/**
 * Shared email styles for Quackback emails
 *
 * Ensures consistent branding across all email templates.
 * Colors follow Story Keeper's existing email design.
 */

export const DEFAULT_LOGO_URL = 'https://www.storykeeper.cards/assets/icons/icon-256x256.png'

// Story Keeper's Hearth palette, from convex/emails/components.tsx in
// bradywatkinson/story-keeper. Hex colors work in clients without CSS variables.
export const colors = {
  primary: '#3C5641',
  primaryDark: '#2C4030',
  onPrimary: '#F6EFE2',

  // Text colors
  heading: '#322E27',
  text: '#5c564b',
  textMuted: '#686256',
  textLight: '#686256',

  // Background colors
  background: '#F6EFE2',
  surface: '#FCF8F0',
  surfaceMuted: '#EBE1CE',

  // Border
  border: '#EBE1CE',
}

const bodyFont = '"Hanken Grotesk", system-ui, -apple-system, Arial, sans-serif'
const displayFont = '"Fredoka", system-ui, Verdana, sans-serif'

// Common layout styles
export const layout = {
  main: {
    backgroundColor: colors.background,
    fontFamily: bodyFont,
    margin: '0',
    padding: '24px 0',
    color: colors.heading,
  },
  container: {
    backgroundColor: colors.surface,
    padding: '0',
    maxWidth: '600px',
    border: `1px solid ${colors.border}`,
    borderRadius: '14px',
    overflow: 'hidden' as const,
  },
  content: {
    padding: '32px 24px',
  },
  footer: {
    backgroundColor: colors.background,
    borderTop: `1px solid ${colors.border}`,
    padding: '20px 24px',
  },
}

// Typography styles
export const typography = {
  h1: {
    fontFamily: displayFont,
    color: colors.heading,
    fontSize: '24px',
    fontWeight: '700' as const,
    lineHeight: '32px',
    marginTop: '0',
    marginBottom: '8px',
  },
  h2: {
    fontFamily: displayFont,
    color: colors.heading,
    fontSize: '20px',
    fontWeight: '600' as const,
    lineHeight: '28px',
    marginTop: '0',
    marginBottom: '8px',
  },
  text: {
    color: colors.text,
    fontSize: '16px',
    lineHeight: '26px',
    marginTop: '0',
    marginBottom: '24px',
  },
  textSmall: {
    color: colors.textMuted,
    fontSize: '14px',
    lineHeight: '22px',
    marginTop: '0',
    marginBottom: '16px',
  },
  footer: {
    color: colors.textLight,
    fontSize: '13px',
    lineHeight: '20px',
    marginTop: '32px',
    marginBottom: '0',
    textAlign: 'center' as const,
  },
}

// Button styles
export const button = {
  primary: {
    backgroundColor: colors.primary,
    borderRadius: '30px',
    color: colors.onPrimary,
    fontSize: '16px',
    fontWeight: '600',
    padding: '16px 28px',
    textDecoration: 'none',
    display: 'inline-block',
  },
}

// Utility styles
export const utils = {
  divider: {
    borderTop: `1px solid ${colors.border}`,
    marginTop: '32px',
    marginBottom: '32px',
  },
  link: {
    color: colors.primary,
    textDecoration: 'underline',
  },
  codeBox: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    padding: '24px',
    textAlign: 'center' as const,
  },
  code: {
    color: colors.heading,
    fontSize: '32px',
    fontWeight: '700' as const,
    letterSpacing: '0.2em',
    fontFamily: 'monospace',
    marginTop: '0',
    marginBottom: '0',
  },
}

// Logo/branding
export const branding = {
  logoContainer: {
    textAlign: 'center' as const,
    padding: '22px 16px',
    backgroundColor: colors.primary,
  },
  logo: {
    width: 40,
    height: 40,
    display: 'block' as const,
    borderRadius: '11px',
  },
  appName: {
    color: colors.onPrimary,
    fontFamily: displayFont,
    fontSize: '21px',
    fontWeight: '500',
    margin: '0',
    lineHeight: '26px',
  },
}
