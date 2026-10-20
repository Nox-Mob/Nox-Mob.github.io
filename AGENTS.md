# Architecture
- Keep resume content in the shared JSON data source so updates do not require layout changes.
- Render military service in its own section outside the civilian employment timeline to distinguish concurrent service from employment.
- public/resume.pdf is generated from resume.json by scripts/generate-resume-pdf.ts (prebuild); edit the script, never the PDF, so the download stays in sync with the site.
- Keep PDF-only selection logic in src/lib/resume-export.ts and export overrides in the shared JSON so website content remains complete.
- Render PDF candidates in memory and only write one within the configured page limit; fail rather than silently truncate content.
- Normalize missing contact data from social links and missing military highlights in getResume so partial resume uploads render safely.
