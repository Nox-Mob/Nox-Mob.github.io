# Alex Weeks — portfolio and resume

Edit `src/data/resume.json` to update the website and downloadable resume. Run `bun run resume:pdf` to regenerate the PDF; production builds do this automatically.

## PDF-only content controls

The website always displays the full content. `resumeExport` controls the PDF:

```json
"resumeExport": {
  "maxPages": 2,
  "includeSkills": false,
  "includeRoleSummaries": false
}
```

- Add `"includeInResume": false` to any employment role, military role, education, certification, award, or skill group to omit it from the PDF only.
- Add `"resumeHighlights": ["Shorter achievement…"]` to a role for a curated PDF-only bullet list. An empty array omits its bullets.
- Add `"resumeSummary": "Shorter summary…"` to a role for PDF-only wording (an empty string omits it). The profile also supports `resumeSummary`.
- By default, roles with bullets omit their redundant introductory paragraph; summary-only roles retain their paragraph so they are not empty.
- Keep recent leadership and quantified achievements detailed; use shorter PDF-only summaries or fewer selected bullets for earlier roles. Group certifications compactly and avoid repeating the same responsibilities.

The generator tries compact spacing and then a modest font adjustment (10 to 9.5 points), never truncating content. If selected content cannot fit the configured limit (at most two pages), generation fails with guidance instead of publishing an oversized or clipped resume. Keep JSON valid: no trailing commas.
