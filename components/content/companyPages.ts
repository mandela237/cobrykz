export type CompanyPageMetadata = {
  title: string;
  description: string;
  alternates: {
    canonical: `/${string}`;
  };
  openGraph: {
    title: string;
    description: string;
    url: `/${string}`;
    type: "website";
  };
};

export type CompanyPageCta = {
  title: string;
  description: string;
  label: "Discuss a business challenge";
  href: "/contact";
};

export type ProcessStageName =
  | "Discover"
  | "Assess"
  | "Design"
  | "Build"
  | "Deploy"
  | "Optimize";

export type ProcessStageDefinition = {
  name: ProcessStageName;
  summary: string;
  description: string;
  decisions: readonly string[];
  outputs: readonly string[];
};

export type ProcessDecisionGate = {
  after: ProcessStageName;
  before: ProcessStageName;
  title: string;
  question: string;
  criteria: readonly string[];
};

export type ProcessPageDefinition = {
  eyebrow: string;
  headline: string;
  introduction: readonly string[];
  stages: readonly ProcessStageDefinition[];
  decisionGates: readonly ProcessDecisionGate[];
  scaling: {
    title: string;
    description: string;
    paths: readonly {
      title: string;
      description: string;
    }[];
  };
  operatingModel: readonly {
    title: string;
    description: string;
  }[];
  postLaunch: {
    title: string;
    description: string;
    options: readonly string[];
  };
  cta: CompanyPageCta;
  metadata: CompanyPageMetadata;
};

export type AboutPageDefinition = {
  eyebrow: string;
  headline: string;
  introduction: readonly string[];
  foundingTension: string;
  purpose: {
    title: string;
    description: string;
  };
  principles: readonly {
    title: string;
    description: string;
  }[];
  partnership: {
    title: string;
    description: string;
  };
  leadership: {
    name: string;
    role: string;
    title: string;
    description: string;
  };
  standards: readonly {
    title: string;
    description: string;
  }[];
  cta: CompanyPageCta;
  metadata: CompanyPageMetadata;
};

export const processPage = {
  eyebrow: "How Cobrykz works",
  headline: "A clear path from business challenge to lasting improvement.",
  introduction: [
    "Cobrykz begins with the situation the business needs to improve, then keeps strategy, experience, engineering, integration, and adoption connected through delivery.",
    "The process makes important decisions visible, gives each stage a useful outcome, and creates clear points to confirm whether the work should continue, change direction, or stop.",
  ],
  stages: [
    {
      name: "Discover",
      summary: "Understand the situation.",
      description:
        "Clarify the business challenge, desired outcome, people involved, current workflow, systems, constraints, and evidence that would make an improvement valuable.",
      decisions: [
        "What needs to become better?",
        "Who is affected by the current situation?",
        "What constraints or dependencies shape the work?",
      ],
      outputs: [
        "Shared problem definition",
        "Desired outcomes",
        "Current-state context",
      ],
    },
    {
      name: "Assess",
      summary: "Identify the best opportunity.",
      description:
        "Evaluate the current state, available information, risks, readiness, and possible responses before recommending a technology or delivery path.",
      decisions: [
        "Which opportunity can create meaningful value?",
        "Is technology the right response?",
        "What should be prioritized, deferred, or ruled out?",
      ],
      outputs: [
        "Opportunity assessment",
        "Recommended direction",
        "Risks and decision criteria",
      ],
    },
    {
      name: "Design",
      summary: "Make the important decisions.",
      description:
        "Define how the solution should work, how people will use it, how information will move, and which technical and operational choices must be settled before delivery.",
      decisions: [
        "What is the focused scope?",
        "How will the experience, workflow, and system fit together?",
        "What controls, ownership, and measures are required?",
      ],
      outputs: [
        "Solution design",
        "Experience and workflow model",
        "Delivery plan",
      ],
    },
    {
      name: "Build",
      summary: "Turn decisions into a working system.",
      description:
        "Implement the approved solution in focused increments, validate important behavior, and keep progress, tradeoffs, risks, and changes visible.",
      decisions: [
        "Does the working system match the approved direction?",
        "Are quality, security, accessibility, and integration needs being met?",
        "What has changed and how does it affect scope or risk?",
      ],
      outputs: [
        "Working solution",
        "Validation evidence",
        "Operational and technical documentation",
      ],
    },
    {
      name: "Deploy",
      summary: "Integrate it into real operations.",
      description:
        "Prepare the people, information, connected systems, support paths, and release controls required to introduce the solution responsibly.",
      decisions: [
        "Are users and owners prepared?",
        "Are migration, monitoring, recovery, and support ready?",
        "Can the solution enter real work without unmanaged risk?",
      ],
      outputs: [
        "Production release",
        "Adoption and ownership plan",
        "Monitoring and support baseline",
      ],
    },
    {
      name: "Optimize",
      summary: "Improve value over time.",
      description:
        "Observe how the solution performs in real use, resolve friction, strengthen maintainability, and prioritize improvements as the business and its systems evolve.",
      decisions: [
        "What is working and where is value being limited?",
        "Which improvements deserve attention next?",
        "How should ownership, support, and the roadmap evolve?",
      ],
      outputs: [
        "Performance review",
        "Prioritized improvements",
        "Updated optimization roadmap",
      ],
    },
  ],
  decisionGates: [
    {
      after: "Assess",
      before: "Design",
      title: "Choose the responsible direction",
      question:
        "Is the recommended opportunity valuable, achievable, and responsible enough to design?",
      criteria: [
        "Expected business value",
        "Readiness and feasibility",
        "Material risks and safeguards",
        "Clear scope, ownership, and next decision",
      ],
    },
    {
      after: "Build",
      before: "Deploy",
      title: "Confirm operational readiness",
      question:
        "Is the working solution ready to become part of real operations?",
      criteria: [
        "Validated behavior and quality",
        "Security, access, integration, and recovery readiness",
        "Named operational ownership",
        "Adoption, support, and change readiness",
      ],
    },
  ],
  scaling: {
    title: "A process that fits the decision and the work",
    description:
      "Not every engagement needs every stage at the same depth. A consulting engagement may conclude after assessment with a decision brief and sequenced roadmap. Delivery work continues through design, build, deployment, and optimization when implementation is justified.",
    paths: [
      {
        title: "Decision and roadmap",
        description:
          "Discover and Assess create enough clarity to choose a direction, sequence investment, or decide not to proceed.",
      },
      {
        title: "Focused delivery",
        description:
          "A defined first release moves through Design, Build, and Deploy with scope matched to the value being tested.",
      },
      {
        title: "Connected improvement",
        description:
          "Broader systems work carries coordinated decisions through deployment and ongoing optimization without separating strategy from execution.",
      },
    ],
  },
  operatingModel: [
    {
      title: "Governance and ownership",
      description:
        "Cobrykz names decision owners, responsibilities, dependencies, risks, and approval points so accountability remains clear.",
    },
    {
      title: "Communication",
      description:
        "Progress, important decisions, open questions, and next steps are explained in business and technical terms appropriate to the people involved.",
    },
    {
      title: "Change handling",
      description:
        "New information and requested changes are assessed against outcomes, scope, timing, cost, and risk before the plan is adjusted.",
    },
    {
      title: "Adoption",
      description:
        "Workflows, documentation, training, operational ownership, and support are prepared alongside the technology rather than left until launch.",
    },
  ],
  postLaunch: {
    title: "Partnership after deployment",
    description:
      "Post-launch work is based on what the business and system require, with clear ownership and an agreed operating model rather than an unsupported promise of ongoing support.",
    options: [
      "Stabilization and measured follow-through",
      "Maintenance, monitoring, and support",
      "Adoption and workflow improvement",
      "Prioritized optimization and new capability planning",
    ],
  },
  cta: {
    title: "Start with the challenge, not a technical brief.",
    description:
      "Explain what the business needs to do better. Cobrykz will help clarify the most useful next decision.",
    label: "Discuss a business challenge",
    href: "/contact",
  },
  metadata: {
    title: "Technology Engagement and Delivery Process | Cobrykz",
    description:
      "See how Cobrykz discovers, assesses, designs, builds, deploys, and optimizes practical technology around clear business decisions.",
    alternates: {
      canonical: "/process",
    },
    openGraph: {
      title: "A Clear Technology Delivery Process | Cobrykz",
      description:
        "A disciplined path from business challenge through assessment, delivery, adoption, and ongoing improvement.",
      url: "/process",
      type: "website",
    },
  },
} as const satisfies ProcessPageDefinition;

export const aboutPage = {
  eyebrow: "About Cobrykz",
  headline: "Technology should make businesses stronger—not more complicated.",
  introduction: [
    "Cobrykz is a technology company and long-term partner helping businesses grow, modernize, and operate more effectively.",
    "We bring business understanding, technology judgment, design, and implementation together so useful ideas can become practical, maintainable systems.",
  ],
  foundingTension:
    "Businesses should not need to choose between strategic advice that never becomes real and technical delivery that ignores the business.",
  purpose: {
    title: "Turn meaningful challenges into practical progress",
    description:
      "Cobrykz helps organizations apply AI, automate operations, build tailored software, improve digital experiences, and connect the systems behind their work. Every recommendation begins with the desired business outcome rather than a predetermined technology.",
  },
  principles: [
    {
      title: "Start with the business",
      description:
        "Understand the challenge, people, operating context, and desired outcome before recommending a capability.",
    },
    {
      title: "Explain the decisions",
      description:
        "Make priorities, tradeoffs, ownership, risks, and next steps clear enough for responsible decisions.",
    },
    {
      title: "Build responsibly",
      description:
        "Design for real use with appropriate quality, accessibility, security, maintainability, human oversight, and failure handling.",
    },
    {
      title: "Create value that lasts",
      description:
        "Support adoption, operational ownership, and continued improvement so the work remains useful beyond launch.",
    },
  ],
  partnership: {
    title: "One connected, accountable partnership",
    description:
      "Strategy, experience, engineering, integration, deployment, and improvement stay connected in one accountable partnership. That continuity helps decisions survive delivery and keeps the resulting technology aligned with how the business works.",
  },
  leadership: {
    name: "Mandela Atud",
    role: "Founder",
    title: "Founder-led accountability",
    description:
      "Mandela Atud founded and leads Cobrykz, providing a clear accountability anchor for the company’s judgment and standards. Cobrykz remains the primary brand: its purpose, process, and operating standards carry the work and support responsible collaboration.",
  },
  standards: [
    {
      title: "Practical recommendations",
      description:
        "Use AI, automation, custom software, websites, or connected systems only when the capability fits the problem.",
    },
    {
      title: "Connected execution",
      description:
        "Keep business intent, user needs, engineering choices, integration, and operational use aligned.",
    },
    {
      title: "Maintainable systems",
      description:
        "Build with clear ownership, useful documentation, appropriate controls, and room for responsible change.",
    },
    {
      title: "Honest evidence",
      description:
        "Separate representative possibilities from completed work and publish outcomes, perspectives, or claims only when they are verified and authorized.",
    },
    {
      title: "Useful after launch",
      description:
        "Plan for adoption, monitoring, support, and improvement before deployment so long-term partnership is demonstrated in the work.",
    },
  ],
  cta: {
    title: "What could technology improve in your business?",
    description:
      "Begin with a challenge, bottleneck, or opportunity. You do not need to choose a solution before the conversation.",
    label: "Discuss a business challenge",
    href: "/contact",
  },
  metadata: {
    title: "About Cobrykz | Technology Company and Partner",
    description:
      "Learn how Cobrykz connects business understanding, technology judgment, design, and delivery through founder-led accountability and clear standards.",
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: "About Cobrykz | Better Systems for Stronger Businesses",
      description:
        "Cobrykz is a technology company built to connect clear business decisions with responsible delivery and lasting improvement.",
      url: "/about",
      type: "website",
    },
  },
} as const satisfies AboutPageDefinition;
