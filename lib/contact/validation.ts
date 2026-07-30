export const MAX_CHALLENGE_LENGTH = 4000;
const MAX_SHORT_LENGTH = 160;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactInquiry = {
  name: string;
  email: string;
  company: string;
  challenge: string;
  solution?: string;
  timing?: string;
  contactMethod?: string;
};

export type ContactField = keyof ContactInquiry;
export type ContactErrors = Partial<Record<ContactField, string>>;

type ValidationResult =
  | { success: true; data: ContactInquiry }
  | { success: false; errors: ContactErrors };

const text = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

export function validateContactInquiry(input: unknown): ValidationResult {
  const body =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};
  const data: ContactInquiry = {
    name: text(body.name, MAX_SHORT_LENGTH),
    email: text(body.email, MAX_SHORT_LENGTH).toLowerCase(),
    company: text(body.company, MAX_SHORT_LENGTH),
    challenge: text(body.challenge, MAX_CHALLENGE_LENGTH),
    solution: text(body.solution, MAX_SHORT_LENGTH) || undefined,
    timing: text(body.timing, MAX_SHORT_LENGTH) || undefined,
    contactMethod: text(body.contactMethod, MAX_SHORT_LENGTH) || undefined,
  };
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Enter your name.";
  if (!data.email) {
    errors.email = "Enter your work email.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.company) errors.company = "Enter your company or organization.";
  if (!data.challenge) {
    errors.challenge = "Tell us what you want the business to do better.";
  }

  return Object.keys(errors).length
    ? { success: false, errors }
    : { success: true, data };
}
