/** Generate a plain, ATS-friendly resume; only publish a candidate within the page limit. */
import PDFDocument from "pdfkit";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { exportSettings, includedInResume, roleContent } from "../src/lib/resume-export";

const root = resolve(import.meta.dirname ?? __dirname, "..");
const data = JSON.parse(readFileSync(resolve(root, "src/data/resume.json"), "utf8"));
const outPath = resolve(root, "public/resume.pdf");
const STYLE = {
  font: "Helvetica", bold: "Helvetica-Bold", italic: "Helvetica-Oblique",
  ink: "#111111", muted: "#555555", rule: "#999999", nameSize: 22, headingSize: 11,
};
type Layout = { margin: number; bodySize: number; lineGap: number; sectionGap: number };
type Role = { title: string; org?: string; location?: string; dates: string; summary?: string; highlights?: string[] };

export async function generateResumePdf(resume: typeof data) {
  const settings = exportSettings(resume.resumeExport);
  const layouts: Layout[] = [
    { margin: 44, bodySize: 10, lineGap: 1, sectionGap: 8 },
    { margin: 40, bodySize: 10, lineGap: 0.5, sectionGap: 6 },
    { margin: 40, bodySize: 9.5, lineGap: 0.5, sectionGap: 6 },
  ];
  for (const layout of layouts) {
    const result = await render(resume, layout, settings);
    if (result.pages <= settings.maxPages) return result;
  }
  throw new Error(`Resume exceeds ${settings.maxPages} pages. Use includeInResume: false, resumeHighlights, or resumeSummary to select shorter PDF-only content. No content was truncated and the previous PDF was not overwritten.`);
}

async function render(resume: typeof data, layout: Layout, settings: ReturnType<typeof exportSettings>) {
  const doc = new PDFDocument({
    size: "LETTER", bufferPages: true,
    margins: { top: layout.margin, bottom: layout.margin, left: layout.margin, right: layout.margin },
    info: { Title: `${resume.profile.name} — Resume`, Author: resume.profile.name },
  });
  const chunks: Buffer[] = [];
  const completed = new Promise<Buffer>((resolveBuffer, reject) => {
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolveBuffer(Buffer.concat(chunks)));
    doc.on("error", reject);
  });
  const left = layout.margin;
  const width = doc.page.width - left * 2;
  const clean = (s: unknown) => String(s ?? "").replace(/\s+/g, " ").trim();
  function font(name = STYLE.font, size = layout.bodySize) { doc.font(name).fontSize(size).fillColor(STYLE.ink); }
  function ensure(height: number) {
    if (doc.y + height > doc.page.height - layout.margin) doc.addPage();
  }
  function height(text: string, w = width, name = STYLE.font, size = layout.bodySize) {
    font(name, size);
    return doc.heightOfString(clean(text), { width: w, lineGap: layout.lineGap });
  }
  function heading(text: string) {
    ensure(50);
    doc.y += layout.sectionGap;
    font(STYLE.bold, STYLE.headingSize);
    doc.text(text.toUpperCase(), left, doc.y, { width });
    const y = doc.y + 2;
    doc.moveTo(left, y).lineTo(left + width, y).lineWidth(0.6).strokeColor(STYLE.rule).stroke();
    doc.y = y + 5;
  }
  function row(leftText: string, rightText: string, leftFont = STYLE.bold) {
    font();
    const rw = rightText ? doc.widthOfString(rightText) : 0;
    const lw = width - (rw ? rw + 12 : 0);
    const rh = Math.max(height(leftText, lw, leftFont), height(rightText));
    ensure(rh);
    const y = doc.y;
    if (rightText) {
      font(); doc.fillColor(STYLE.muted).text(rightText, left + width - rw, y, { lineBreak: false });
    }
    font(leftFont); doc.text(leftText, left, y, { width: lw, lineGap: layout.lineGap });
    doc.y = y + rh;
  }
  function body(text: string) {
    ensure(height(text)); font();
    doc.text(clean(text), left, doc.y, { width, lineGap: layout.lineGap });
  }
  function bullets(items: string[]) {
    for (const item of items) {
      const h = height(item, width - 12);
      ensure(h + 2);
      const y = doc.y + 2;
      font(); doc.text("•", left + 2, y, { lineBreak: false });
      doc.text(clean(item), left + 12, y, { width: width - 12, lineGap: layout.lineGap });
      // Restore the main column so automatic page breaks always use the same left edge.
      doc.x = left;
    }
  }
  function role(r: Role) {
    const org = [r.org, r.location].filter(Boolean).join(" | ");
    const firstContent = r.summary || r.highlights?.[0] || "";
    ensure(height(r.title, width - 105, STYLE.bold) + height(org, width, STYLE.italic) + height(firstContent, width - 12) + 8);
    doc.y += 4;
    row(r.title, clean(r.dates));
    if (org) { font(STYLE.italic); doc.fillColor(STYLE.muted).text(org, left, doc.y, { width, lineGap: layout.lineGap }); }
    if (r.summary) body(r.summary);
    bullets(r.highlights ?? []);
  }
  const p = resume.profile;
  font(STYLE.bold, STYLE.nameSize); doc.text(p.name, left, doc.y, { width, align: "center" });
  font(STYLE.font, 11); doc.fillColor(STYLE.muted).text(p.title, left, doc.y, { width, align: "center" });
  const linkedin = (resume.social ?? []).find((s: { label: string }) => s.label === "LinkedIn");
  const email = p.email ?? (resume.social ?? []).find((s: { label: string }) => s.label === "Email")?.handle;
  const contact = [p.location, p.phone, email, p.website, linkedin && `linkedin.com/${linkedin.handle}`].filter(Boolean).join("  |  ");
  font(STYLE.font, 9); doc.fillColor(STYLE.muted).text(contact, left, doc.y + 3, { width, align: "center" });
  heading("Professional Summary"); body(p.resumeSummary ?? p.summary);
  const experience = includedInResume<any>(resume.experience ?? []);
  if (experience.length) {
    heading("Professional Experience");
    for (const e of experience) role({ title: e.role, org: e.company, location: e.location, dates: `${e.start} – ${e.end}`, ...roleContent(e, settings.includeRoleSummaries) });
  }
  if (resume.service && resume.service.includeInResume !== false) {
    const s = resume.service;
    heading("Military Service"); row(s.organization, clean(s.dateRange));
    for (const r of includedInResume<any>(s.roles ?? [])) role({ title: r.role, dates: r.type, ...roleContent(r, settings.includeRoleSummaries) });
  }
  if (settings.includeSkills && resume.skills?.length) {
    heading("Skills");
    for (const g of includedInResume<any>(resume.skills)) body(`${g.category}: ${g.items.join(", ")}`);
  }
  const education = includedInResume<any>(resume.education ?? []);
  if (education.length) {
    heading("Education");
    for (const e of education) { row(`${e.degree}, ${e.school}`, `${e.start} – ${e.end}`, STYLE.font); if (e.notes) body(e.notes); }
  }
  const certifications = includedInResume<any>(resume.certifications ?? []);
  if (certifications.length) { heading("Certifications"); body(certifications.map((c: any) => `${c.name} (${c.issuer}, ${c.year})`).join("  •  ")); }
  const awards = includedInResume<any>(resume.awards ?? []);
  if (awards.length) { heading("Awards"); for (const a of awards) row(`${a.title}, ${a.issuer}`, String(a.year), STYLE.font); }
  const pages = doc.bufferedPageRange().count;
  doc.end();
  return { buffer: await completed, pages };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(root, "scripts/generate-resume-pdf.ts")) {
  const result = await generateResumePdf(data);
  mkdirSync(resolve(root, "public"), { recursive: true });
  writeFileSync(outPath, result.buffer);
  console.log(`resume.pdf written (${result.pages} pages) to ${outPath}`);
}
