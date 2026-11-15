# Story Keeper email image

This fork adds Story Keeper's Hearth email theme to Quackback **0.15.0**.
Its release base is `fe575ec7e4fdbdc506c37581f63f6f6fe0fa8d70` (upstream tag
`v0.15.0`). The `story-keeper/0.15.0` branch preserves that base for comparison.

The customization is confined to the shared email palette/layout and the
password-reset subject and fallback-link copy. It retains Quackback attribution,
the workspace's uploaded logo, action URLs, one-time codes, expirations and
notification unsubscribe controls. It does not change database migrations or
authentication configuration. The fallback logo is Story Keeper's hosted PNG.

The layout uses tables and inline styles, with system-font fallbacks for clients
that do not have Fredoka or Hanken Grotesk. The compact recovery link still points
to the complete recovery URL; the generated text alternative includes that URL.

## Validate and build

Use Bun 1.4.0 and the committed lockfile:

```sh
bun install --frozen-lockfile
bun run test --run packages/email/src
bunx --no-install oxlint packages/email/src
docker build -f apps/web/Dockerfile -t quackback:0.15.0-storykeeper.1 .
```

The existing Docker workflow builds the source with `apps/web/Dockerfile` and
publishes to `ghcr.io/bradywatkinson/quackback`. A custom release tag such as
`v0.15.0-storykeeper.1` produces the matching image tag. Fork workflows must be
enabled, and the container package must be publicly pullable for Railway's public
image source. Do not put production credentials into the image build or workflow.

Record the resulting image digest and source commit in the private operations
handoff. Set Railway's source to the digest-qualified custom image after the
build and rendered-email checks pass. Keep the previous digest for rollback.
Resend keys and the sender remain runtime variables in Railway.

## Upgrade

Compare this branch with `story-keeper/0.15.0` to recover the email patch. For a
future Quackback release, select its immutable release commit, reapply the patch,
inspect changes to the email templates and their callers, and rerun validation.
Build a new versioned image and record its digest. Review upstream schema changes
and the database recovery plan before an upgrade; a theme patch does not make an
arbitrary application downgrade safe.

Tracking: [Story Keeper #4220](https://github.com/bradywatkinson/story-keeper/issues/4220).
