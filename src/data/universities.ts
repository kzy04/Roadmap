export const universities = [
  "North South University",
  "BRAC University",
  "Independent University Bangladesh",
  "All Universities"
] as const;

export type University = (typeof universities)[number];