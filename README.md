# nextjs-preview-poc

Next.js with Fly.io PR previews and Neon branching.

**Secrets:** `FLY_API_TOKEN`, `NEON_API_KEY` | **Variable:** `NEON_PROJECT_ID`

```bash
npm run dev
fly deploy --local-only
```

Production: Neon IP Allow + `fly machine egress-ip allocate`; Redis cache for multi-instance.

**Bitbucket:** On PR close, run the custom `cleanup` pipeline with `PR_ID` = PR number to destroy the Fly app and delete the Neon branch.
