/**
 * Generates public/resume.pdf from src/data/resume.json.
 * Runs automatically before every build (see "prebuild" in package.json),
 * so the downloadable resume always matches the website data.
 *
 * The layout is a classic, ATS-friendly single-column resume — intentionally
 * NOT styled like the website. Tweak the STYLE block to restyle it.
 */
import PDFDocument from "pdfkit";
import { createWriteStream, readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname ?? __dirname, "..");
const data = JSON.parse(readFileSync(resolve(root, "src/data/resume.json"), "utf8"));
const outPath = resolve(root, "public/resume.pdf");

const STYLE = {
  margin: 54,
  font: "Helvetica",
  bold: "Helvetica-Bold",
  italic: "Helvetica-Oblique",
  ink: "#111111",
  muted: "#555555",
  rule: "#999999",
  nameSize: 22,
  headingSize: 11,
  bodySize: 10,
};

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: STYLE.margin, bottom: STYLE.margin, left: STYLE.margin, right: STYLE.margin },
  info: { Title: `${data.profile.name} — Resume`, Author: data.profile.name },
});
mkdirSync(resolve(root, "public"), { recursive: true });
doc.pipe(createWriteStream(outPath));

const left = STYLE.margin;
const width = doc.page.width - STYLE.margin * 2;
const clean = (s: string) => String(s ?? "").replace(/\s+/g, " ").trim();

function heading(text: string) {
  doc.moveDown(0.8);
  doc.font(STYLE.bold).fontSize(STYLE.headingSize).fillColor(STYLE.ink)
    .text(text.toUpperCase(), left, doc.y, { characterSpacing: 1 });
  const y = doc.y + 2;
  doc.moveTo(left, y).lineTo(left + width, y).lineWidth(0.6).strokeColor(STYLE.rule).stroke();
  doc.y = y + 6;
}

/** Bold left text with right-aligned muted text on the same line. */
function row(leftText: string, rightText: string, leftFont = STYLE.bold) {
  const y = doc.y;
  doc.font(STYLE.font).fontSize(STYLE.bodySize);
  const rw = doc.widthOfString(rightText);
  doc.fillColor(STYLE.muted).text(rightText, left + width - rw, y, { lineBreak: false });
  doc.font(leftFont).fillColor(STYLE.ink).text(leftText, left, y, { width: width - rw - 12 });
}

function body(text: string, opts: PDFKit.Mixins.TextOptions = {}) {
  doc.font(STYLE.font).fontSize(STYLE.bodySize).fillColor(STYLE.ink)
    .text(clean(text), left, doc.y, { width, lineGap: 1.5, ...opts });
}

function bullets(items: string[]) {
  for (const item of items ?? []) {
    const y = doc.y + 2;
    doc.font(STYLE.font).fontSize(STYLE.bodySize).fillColor(STYLE.ink).text("•", left + 6, y);
    doc.text(clean(item), left + 18, y, { width: width - 18, lineGap: 1.5 });
  }
}

function role(r: { title: string; org: string; location?: string; dates: string; summary?: string; highlights?: string[] }) {
  if (doc.y > doc.page.height - STYLE.margin - 80) doc.addPage();
  doc.moveDown(0.4);
  row(r.title, clean(r.dates));
  doc.font(STYLE.italic).fontSize(STYLE.bodySize).fillColor(STYLE.muted)
    .text([r.org, r.location].filter(Boolean).join(" | "), left, doc.y, { width });
  if (r.summary) { doc.moveDown(0.2); body(r.summary); }
  bullets(r.highlights ?? []);
}

// ---- Header ----
const p = data.profile;
doc.font(STYLE.bold).fontSize(STYLE.nameSize).fillColor(STYLE.ink).text(p.name, { align: "center" });
doc.font(STYLE.font).fontSize(11).fillColor(STYLE.muted).text(p.title, { align: "center" });
doc.moveDown(0.2);
const linkedin = (data.social ?? []).find((s: any) => s.label === "LinkedIn");
const contact = [p.location, p.phone, p.email, p.website, linkedin && `linkedin.com/${linkedin.handle}`]
  .filter(Boolean).join("  |  ");
doc.fontSize(9).text(contact, { align: "center" });

// ---- Summary ----
heading("Professional Summary");
body(p.summary);

// ---- Experience ----
heading("Professional Experience");
for (const e of data.experience ?? []) {
  role({ title: e.role, org: e.company, location: e.location, dates: `${e.start} – ${e.end}`, summary: e.summary, highlights: e.highlights });
}

// ---- Military service (kept separate from civilian employment) ----
if (data.service) {
  const s = data.service;
  heading("Military Service");
  role({ title: s.role, org: s.organization, dates: s.status, summary: s.summary, highlights: s.highlights });
}

// ---- Skills ----
if (data.skills?.length) {
  heading("Skills");
  for (const g of data.skills) {
    doc.font(STYLE.bold).fontSize(STYLE.bodySize).fillColor(STYLE.ink)
      .text(`${g.category}: `, left, doc.y + 1, { continued: true, width })
      .font(STYLE.font).text(g.items.join(", "));
  }
}

// ---- Education ----
if (data.education?.length) {
  heading("Education");
  for (const e of data.education) {
    row(`${e.degree}, ${e.school}`, `${e.start} – ${e.end}`, STYLE.font);
    if (e.notes) body(e.notes);
  }
}

// ---- Certifications ----
if (data.certifications?.length) {
  heading("Certifications");
  body(data.certifications.map((c: any) => `${c.name} (${c.issuer}, ${c.year})`).join("  •  "));
}

// ---- Awards ----
if (data.awards?.length) {
  heading("Awards");
  for (const a of data.awards) row(`${a.title}, ${a.issuer}`, String(a.year), STYLE.font);
}

doc.end();
console.log(`resume.pdf written to ${outPath}`);
