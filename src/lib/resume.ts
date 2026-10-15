import resumeData from "@/data/resume.json";

type ResumeData = typeof resumeData;

export type Resume = Omit<ResumeData, "profile" | "education"> & {
  profile: ResumeData["profile"] & {
    availabilityText: string;
    unavailabilityText: string;
  };
  education: Array<ResumeData["education"][number] & { notes?: string }>;
};

const resume = resumeData as Resume;

export const getResume = (): Resume => resume;
