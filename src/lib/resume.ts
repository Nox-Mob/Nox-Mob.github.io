import resumeData from "@/data/resume.json";

type ResumeData = typeof resumeData;

export type Resume = Omit<ResumeData, "profile" | "education"> & {
  profile: ResumeData["profile"] & {
    availabilityText: string;
    unavailabilityText: string;
  };
  education: Array<ResumeData["education"][number] & { notes?: string }>;
};

const resume = {
  ...resumeData,
  education: resumeData.education as Resume["education"],
  profile: {
    ...resumeData.profile,
    email: resumeData.social.find((item) => item.label === "Email")?.handle ?? "",
  },
  service: {
    ...resumeData.service,
    roles: resumeData.service.roles.map((role) => ({ ...role, highlights: role.highlights ?? [] })),
  },
};

export const getResume = () => resume;
