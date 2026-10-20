# Architecture
- Keep resume content in the shared JSON data source so updates do not require layout changes.
- Render military service in its own section outside the civilian employment timeline to distinguish concurrent service from employment.- public/resume.pdf is generated from resume.json by scripts/generate-resume-pdf.ts (prebuild); edit the script, never the PDF, so the download stays in sync with the site.
