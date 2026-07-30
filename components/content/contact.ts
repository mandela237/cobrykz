import { solutions } from "./solutions";

export const contactPage = {
  metadata: {
    title: "Discuss a Business Challenge | Cobrykz",
    description:
      "Tell Cobrykz what your business needs to improve. Start a practical conversation about AI, automation, software, websites, or connected digital systems.",
  },
  headline: "Tell us what you want the business to do better.",
  support:
    "Start with a challenge, bottleneck, or opportunity. You do not need to choose a technology or prepare a technical brief.",
  responseExpectation:
    "Cobrykz reviews every genuine inquiry directly and normally responds within two business days.",
  email: "info@cobrykz.com",
  solutionOptions: solutions.map(({ name, href }) => ({ name, href })),
  timingOptions: ["As soon as practical", "Within 1–3 months", "Within 3–6 months", "Exploring for later"],
  contactMethodOptions: ["Email", "Phone or video call", "No preference"],
} as const;
