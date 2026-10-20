/** PDF-only choices never alter the website's full content. */
export type Exportable = {
  includeInResume?: boolean;
  summary?: string;
  highlights?: string[];
  resumeSummary?: string;
  resumeHighlights?: string[];
};

export function includedInResume<T extends Exportable>(items: T[]): T[] {
  return items.filter((item) => item.includeInResume !== false);
}

export function roleContent(item: Exportable, includeRoleSummaries = false) {
  const highlights = item.resumeHighlights ?? item.highlights ?? [];
  const summary = item.resumeSummary ?? (includeRoleSummaries || !highlights.length ? item.summary : undefined);
  return { summary, highlights };
}

export function exportSettings(settings?: { maxPages?: number; includeSkills?: boolean; includeRoleSummaries?: boolean }) {
  return {
    maxPages: Math.min(2, Math.max(1, settings?.maxPages ?? 2)),
    includeSkills: settings?.includeSkills ?? false,
    includeRoleSummaries: settings?.includeRoleSummaries ?? false,
  };
}