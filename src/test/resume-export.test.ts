// @vitest-environment node
import { describe, expect, it } from "vitest";
import data from "../data/resume.json";
import { exportSettings, includedInResume, roleContent } from "../lib/resume-export";
import { generateResumePdf } from "../../scripts/generate-resume-pdf";

describe("resume export rules", () => {
  it("omits skills from the PDF without removing website skills", () => {
    expect(exportSettings(data.resumeExport).includeSkills).toBe(false);
    expect(data.skills.length).toBe(4);
  });
  it("keeps the uploaded resume within two pages", async () => {
    const result = await generateResumePdf(data);
    expect(result.pages).toBe(2);
    expect(result.buffer.subarray(0, 4).toString()).toBe("%PDF");
  });
  it("rejects oversized exports rather than truncating them", async () => {
    const oversized = structuredClone(data);
    oversized.experience = Array.from({ length: 20 }, () => data.experience[0]);
    await expect(generateResumePdf(oversized)).rejects.toThrow("Resume exceeds 2 pages");
  });
  it("supports PDF-only role exclusions without mutating source data", () => {
    const roles = [{ summary: "Keep" }, { summary: "Website only", includeInResume: false }];
    expect(includedInResume(roles)).toEqual([roles[0]]);
    expect(roles).toHaveLength(2);
  });
  it("uses PDF-only highlights in place of website highlights", () => {
    expect(roleContent({ highlights: ["Full detail"], resumeHighlights: ["Selected achievement"] }).highlights).toEqual(["Selected achievement"]);
  });
  it("retains a summary for a role without bullets", () => {
    expect(roleContent({ summary: "Earlier service" })).toEqual({ summary: "Earlier service", highlights: [] });
  });
  it("omits repeated role introductions when achievements exist", () => {
    expect(roleContent({ summary: "Introduction", highlights: ["Achievement"] }).summary).toBeUndefined();
  });
});