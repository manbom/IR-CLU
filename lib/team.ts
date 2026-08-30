import type { Locale } from "./locale";

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

const teamFa: TeamMember[] = [
  {
    name: "بردیا سام",
    role: "مدیر پروژه‌ها و سازنده‌ی ایجنت‌ها و فلوهای مارکتینگ",
    bio: "۶ سال سابقه‌ی فعالیت در حوزه‌ی برنامه‌نویسی؛ طراحی و ساخت ربات‌ها، ایجنت‌های هوش مصنوعی و ورک‌فلوهای اتوماسیون IR-CLU را از ابتدا تا اجرا بر عهده دارد.",
    initials: "ب.س",
  },
];

const teamEn: TeamMember[] = [
  {
    name: "Bardia Sam",
    role: "Project lead and builder of IR-CLU's agents and marketing flows",
    bio: "6 years of programming experience; owns the design and build of IR-CLU's bots, AI agents, and automation workflows end to end.",
    initials: "BS",
  },
];

export function getTeamMembers(locale: Locale): TeamMember[] {
  return locale === "en" ? teamEn : teamFa;
}
