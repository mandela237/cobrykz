export type SolutionSlug =
  | "ai"
  | "business-automation"
  | "custom-software-development"
  | "digital-business-systems"
  | "websites-web-applications"
  | "technology-consulting";

export type SolutionDefinition = {
  slug: SolutionSlug;
  name: string;
  navOutcome: string;
  problem: string;
  outcome: string;
  href: `/solutions/${SolutionSlug}`;
};

export type SolutionFaq = {
  question: string;
  answer: string;
};

export type SolutionPageDefinition = SolutionDefinition & {
  heroSupport: string;
  recognition: readonly string[];
  businessOutcomes: readonly string[];
  deliverables: readonly string[];
  applications: readonly string[];
  approach: readonly { title: string; description: string }[];
  relatedSlugs: readonly SolutionSlug[];
  faqs: readonly SolutionFaq[];
  cta: { title: string; label: string };
  metadata: { title: string; description: string };
  guidance?: { title: string; description: string };
};

const aiSolution = {
  slug: "ai",
  name: "AI Solutions",
  navOutcome: "Apply AI where it improves real work.",
  problem: "A meaningful business problem may benefit from practical AI.",
  outcome: "Put AI to work on meaningful business problems.",
  href: "/solutions/ai",
  heroSupport:
    "Cobrykz identifies practical AI opportunities, tests them against real operating needs, and builds controlled capabilities that fit the way people work.",
  recognition: [
    "Your team sees potential in AI but does not yet have a focused, valuable starting point.",
    "People spend too much time finding, reviewing, or reorganizing knowledge and documents.",
    "An AI experiment exists, but it is disconnected from operations, controls, or a dependable path to adoption.",
  ],
  businessOutcomes: [
    "Give teams faster access to useful, relevant information.",
    "Expand capacity in research, document, and knowledge-intensive work.",
    "Evaluate value and risk through a controlled pilot before committing to a wider implementation.",
  ],
  deliverables: [
    "AI opportunity assessment",
    "Custom assistants",
    "Knowledge and document systems",
    "AI-enabled workflows",
    "Intelligent retrieval",
    "Operational integrations",
    "Controlled pilots",
  ],
  applications: [
    "An internal assistant that retrieves approved information with source context",
    "A document workflow that extracts, organizes, and routes information for review",
    "A focused service assistant that supports people while preserving human escalation",
    "An AI-enabled research workflow with validation before results enter operations",
  ],
  approach: [
    {
      title: "Define the business problem",
      description:
        "Clarify the work, desired outcome, users, and evidence that would make an AI capability worthwhile.",
    },
    {
      title: "Assess readiness and risk",
      description:
        "Evaluate information quality, data sensitivity, access, accuracy needs, cost, latency, and operational constraints.",
    },
    {
      title: "Design a controlled pilot",
      description:
        "Set boundaries, human approvals, validation, monitoring, and failure handling before testing the capability in real work.",
    },
    {
      title: "Integrate and improve",
      description:
        "Connect a proven capability to the relevant systems, support adoption, and improve it using observed performance.",
    },
  ],
  relatedSlugs: [
    "technology-consulting",
    "business-automation",
    "digital-business-systems",
  ],
  faqs: [
    {
      question: "Where should a business start with AI?",
      answer:
        "Start with a defined business problem, the people and information involved, and a measurable sign of improvement. Cobrykz uses that context to determine whether AI deserves a controlled pilot.",
    },
    {
      question: "Can AI connect with existing business systems?",
      answer:
        "Yes, when the systems provide dependable access and the integration has clear controls. Cobrykz evaluates permissions, data flow, human review, and failure handling before connecting AI to operational work.",
    },
    {
      question: "How does Cobrykz manage AI risk?",
      answer:
        "The approach sets appropriate access controls, validation, human approvals, monitoring, and fallback behavior around the specific use case rather than treating every AI application the same.",
    },
  ],
  cta: {
    title: "Where could AI create meaningful value in your business?",
    label: "Discuss a business challenge",
  },
  metadata: {
    title: "AI Solutions for Practical Business Problems | Cobrykz",
    description:
      "Assess, pilot, and integrate practical AI capabilities around meaningful business problems, responsible controls, and real operating needs.",
  },
  guidance: {
    title: "Where AI may not be the right answer",
    description:
      "AI is not a requirement. Process redesign, conventional automation, better information architecture, or conventional software may be more reliable. Cobrykz evaluates data sensitivity, access, accuracy, human approvals, cost, latency, monitoring, and failure handling before recommending AI.",
  },
} satisfies SolutionPageDefinition;

const businessAutomationSolution = {
  slug: "business-automation",
  name: "Business Automation",
  navOutcome: "Reduce repetitive work with reliable workflows.",
  problem: "Routine work depends on constant manual effort.",
  outcome: "Make routine work move without constant manual effort.",
  href: "/solutions/business-automation",
  heroSupport:
    "Cobrykz examines how work moves today, improves the process, and connects the right systems so routine steps happen reliably with people involved where judgment matters.",
  recognition: [
    "Requests, approvals, and handoffs depend on reminders or repeated follow-up.",
    "Teams re-enter the same information across forms, documents, spreadsheets, or business tools.",
    "Routine reporting and document work consume attention that should go toward customers, decisions, or growth.",
  ],
  businessOutcomes: [
    "Reduce repetitive effort and avoid preventable handoff delays.",
    "Create a more consistent flow of information across people and systems.",
    "Increase operating capacity while preserving review for exceptions and important decisions.",
  ],
  deliverables: [
    "Workflow assessment",
    "Before-and-after workflow model",
    "Intake and routing automation",
    "Approval and exception workflows",
    "Document processing",
    "Operational reporting",
    "AI-assisted workflows where appropriate",
  ],
  applications: [
    "A request moves from structured intake to the right reviewer instead of being copied between inboxes",
    "Approved information updates connected records and generates the required document without duplicate entry",
    "A recurring report gathers trusted data automatically and flags missing inputs for a person",
    "An AI-assisted document step prepares information while a responsible team member validates the result",
  ],
  approach: [
    {
      title: "Understand the current workflow",
      description:
        "Map triggers, decisions, handoffs, systems, delays, and the manual work required to move from request to completion.",
    },
    {
      title: "Improve before automating",
      description:
        "Remove unnecessary steps and define ownership, rules, required information, and the outcome the workflow must support.",
    },
    {
      title: "Design the reliable path",
      description:
        "Specify the normal flow alongside exceptions, missing data, system failures, human review, and recovery.",
    },
    {
      title: "Deploy and observe",
      description:
        "Introduce the workflow into real operations, support adoption, monitor performance, and improve it as conditions change.",
    },
  ],
  relatedSlugs: ["digital-business-systems", "ai", "custom-software-development"],
  faqs: [
    {
      question: "What business processes are good candidates for automation?",
      answer:
        "Strong candidates are frequent, repeatable workflows with clear triggers and decisions, such as intake, approvals, routing, document preparation, data updates, and reporting.",
    },
    {
      question: "Does automation remove people from the process?",
      answer:
        "Not where context, accountability, or judgment matters. Cobrykz designs human review and exception handling into the workflow so automation supports responsible work.",
    },
    {
      question: "Can Cobrykz automate work across tools we already use?",
      answer:
        "Often, yes. The assessment identifies available integrations, information quality, access constraints, and whether an existing tool should be connected, configured, or replaced.",
    },
  ],
  cta: {
    title: "What routine work should move more reliably?",
    label: "Discuss a business challenge",
  },
  metadata: {
    title: "Business Process and Workflow Automation | Cobrykz",
    description:
      "Improve and automate intake, approvals, routing, documents, reporting, and connected workflows without losing human oversight.",
  },
} satisfies SolutionPageDefinition;

const customSoftwareSolution = {
  slug: "custom-software-development",
  name: "Custom Software Development",
  navOutcome: "Build software around a unique operation.",
  problem: "Generic software does not fit how the business works.",
  outcome: "Software designed around how your business actually works.",
  href: "/solutions/custom-software-development",
  heroSupport:
    "Cobrykz designs focused applications, portals, and operational platforms when a tailored capability creates an advantage that generic software cannot provide.",
  recognition: [
    "Important work is forced through generic software that does not reflect the real process.",
    "Teams rely on fragile spreadsheets, workarounds, or duplicate entry to bridge capability gaps.",
    "An existing application is difficult to maintain, extend, integrate, or use with confidence.",
  ],
  businessOutcomes: [
    "Fit critical software to the operation instead of reshaping valuable work around a generic tool.",
    "Create a maintainable foundation for a differentiated service, process, or customer experience.",
    "Modernize a limiting application through focused releases that reduce delivery and adoption risk.",
  ],
  deliverables: [
    "Internal applications",
    "Customer and partner portals",
    "Operational platforms",
    "Focused first releases",
    "Application modernization",
    "APIs and system integrations",
    "Deployment and improvement planning",
  ],
  applications: [
    "An internal application shaped around a specialized operating process",
    "A customer or partner portal that makes service information and actions available in one place",
    "A focused platform that replaces a fragile spreadsheet-based workflow",
    "A staged modernization that preserves essential operations while replacing a limiting application",
  ],
  approach: [
    {
      title: "Establish the advantage",
      description:
        "Define the capability the business cannot achieve adequately through an existing product, configuration, or integration.",
    },
    {
      title: "Shape a focused first release",
      description:
        "Prioritize the smallest coherent application that solves meaningful work and creates a foundation for learning.",
    },
    {
      title: "Build for real operations",
      description:
        "Design the experience, data, integrations, permissions, deployment, and support model as one maintainable system.",
    },
    {
      title: "Deploy and evolve",
      description:
        "Introduce the software with adoption support, observe how it performs, and sequence improvements around business value.",
    },
  ],
  relatedSlugs: [
    "digital-business-systems",
    "business-automation",
    "websites-web-applications",
  ],
  faqs: [
    {
      question: "When is custom software worth the investment?",
      answer:
        "Custom development is justified when ownership supports a meaningful business advantage, a critical process, or a capability that configuration and integration cannot provide adequately.",
    },
    {
      question: "Does a first release need every planned feature?",
      answer:
        "No. A focused first release should solve a complete, valuable problem for real users while creating dependable evidence for the next investment decision.",
    },
    {
      question: "Can Cobrykz modernize existing software?",
      answer:
        "Yes. Modernization may improve, replace, or progressively separate parts of an existing application while protecting essential operations and integrations.",
    },
  ],
  cta: {
    title: "Where is generic software limiting the way your business works?",
    label: "Discuss a business challenge",
  },
  metadata: {
    title: "Custom Software Development for Business Operations | Cobrykz",
    description:
      "Design and build tailored applications, portals, platforms, APIs, and modernized software around the way your business creates value.",
  },
  guidance: {
    title: "Choose the right level of ownership",
    description:
      "The build decision compares configuration of an existing product, integration between capable tools, focused custom development, and modernization of a limiting system. Custom ownership is recommended only when it creates a business advantage that justifies the investment.",
  },
} satisfies SolutionPageDefinition;

const digitalBusinessSystemsSolution = {
  slug: "digital-business-systems",
  name: "Digital Business Systems",
  navOutcome: "Connect the systems that support operations.",
  problem: "Tools and information are disconnected across the business.",
  outcome:
    "Connect the information, workflows, and tools that keep your business moving.",
  href: "/solutions/digital-business-systems",
  heroSupport:
    "Connected platforms for operations, information, and teams. Cobrykz brings the parts of an operation into a clearer environment that supports dependable work and better decisions.",
  recognition: [
    "People cannot see the information they need without searching across disconnected tools.",
    "Teams maintain conflicting records because ownership and information flow are unclear.",
    "Important workflows depend on manual bridges between systems, people, and operational data.",
  ],
  businessOutcomes: [
    "Custom Software creates a tailored application.",
    "Digital Business Systems creates a connected operating environment.",
    "Business Automation moves work through that environment with less manual effort.",
    "Give teams a clearer shared view of operations, information, ownership, and next actions.",
  ],
  deliverables: [
    "Current-state system assessment",
    "People, tools, workflows, and information map",
    "Target operating-system design",
    "Connected data and integration plan",
    "Operational interfaces and views",
    "Ownership and governance model",
    "Sequenced implementation roadmap",
  ],
  applications: [
    "A connected operating environment that gives teams one dependable view across key tools",
    "An operations hub that brings responsibilities, records, workflows, and exceptions together",
    "A service system that connects customer activity with the internal work required to deliver it",
    "A management view that turns information from multiple systems into clear operational decisions",
  ],
  approach: [
    {
      title: "Map the operating environment",
      description:
        "Show how people, tools, workflows, and information interact today, including gaps, duplication, and unclear ownership.",
    },
    {
      title: "Define the connected system",
      description:
        "Decide which tools remain, how information should move, where teams work, and how the environment will be governed.",
    },
    {
      title: "Connect in useful stages",
      description:
        "Sequence interfaces, integrations, data changes, and workflow improvements around coherent operational outcomes.",
    },
    {
      title: "Establish ownership and improvement",
      description:
        "Support adoption, clarify responsibility, monitor the environment, and evolve it as the business changes.",
    },
  ],
  relatedSlugs: ["business-automation", "custom-software-development", "technology-consulting"],
  faqs: [
    {
      question: "Is a digital business system one new software product?",
      answer:
        "Not necessarily. It is the connected operating environment formed by the right tools, tailored interfaces, integrations, information, workflows, and ownership.",
    },
    {
      question: "Does every existing tool need to be replaced?",
      answer:
        "No. Cobrykz assesses which tools remain useful, which gaps require a new capability, and where connection or clearer ownership can improve the environment.",
    },
    {
      question: "How is this different from business automation?",
      answer:
        "A digital business system connects the operating environment. Business automation moves specific work through that environment with less manual effort.",
    },
  ],
  cta: {
    title: "What needs to connect for your business to operate more clearly?",
    label: "Discuss a business challenge",
  },
  metadata: {
    title: "Connected Digital Business Systems | Cobrykz",
    description:
      "Connect operational tools, information, workflows, and teams in a clearer digital environment designed around how the business moves.",
  },
} satisfies SolutionPageDefinition;

const websitesWebApplicationsSolution = {
  slug: "websites-web-applications",
  name: "Websites & Web Applications",
  navOutcome: "Create digital experiences that support business goals.",
  problem:
    "Customer-facing digital experiences are not helping the business move forward.",
  outcome: "Digital experiences that strengthen the business behind them.",
  href: "/solutions/websites-web-applications",
  heroSupport:
    "Cobrykz creates browser-based experiences that establish trust, enable customer action, and deliver digital services while connecting cleanly to the business behind them.",
  recognition: [
    "The current experience does not communicate the company's value or earn confidence quickly enough.",
    "Customers struggle to find information, complete an important action, or move into the right service path.",
    "A service needs a secure, usable digital interface rather than another static marketing page.",
  ],
  businessOutcomes: [
    "Establish trust — present the company, its value, and its evidence with clarity.",
    "Enable customer action — help people evaluate, inquire, apply, book, buy, or take the next useful step.",
    "Deliver digital service — give customers or users a web application for meaningful ongoing interaction.",
  ],
  deliverables: [
    "Digital experience strategy",
    "Information architecture and content structure",
    "Responsive website design and development",
    "Customer and user web applications",
    "Content and operational integrations",
    "Accessibility and performance validation",
    "Deployment and optimization plan",
  ],
  applications: [
    "A company website that establishes trust and routes qualified interest",
    "A service website that helps customers understand options and complete the right action",
    "A secure web application that delivers an ongoing customer or partner service",
    "A connected experience that combines a website, digital service, automation, and business systems",
  ],
  approach: [
    {
      title: "Define the business role",
      description:
        "Decide how the experience must establish trust, enable customer action, deliver digital service, or connect those roles.",
    },
    {
      title: "Structure the experience",
      description:
        "Organize content, journeys, actions, system connections, and measurement around what users and the business need.",
    },
    {
      title: "Design and build to a high standard",
      description:
        "Treat clear aesthetics, responsive behavior, accessibility, performance, and maintainability as delivery standards.",
    },
    {
      title: "Launch and improve",
      description:
        "Deploy responsibly, validate the experience in use, and prioritize improvements using observed customer and business needs.",
    },
  ],
  relatedSlugs: [
    "custom-software-development",
    "digital-business-systems",
    "business-automation",
  ],
  faqs: [
    {
      question: "What is the difference between a website and a web application?",
      answer:
        "A website commonly establishes trust and enables customer action. A web application often delivers an ongoing digital service through richer user interaction, accounts, data, or workflows.",
    },
    {
      question: "Can one experience serve all three business roles?",
      answer:
        "Yes. A connected experience can establish trust, enable action, and deliver service, sometimes with automation or digital business systems supporting the work behind it.",
    },
    {
      question: "Are accessibility and performance included?",
      answer:
        "They are standards for the experience, alongside responsive behavior, clear design, maintainability, and reliable deployment—not optional marketing features.",
    },
  ],
  cta: {
    title: "What should your digital experience help the business achieve?",
    label: "Discuss a business challenge",
  },
  metadata: {
    title: "Business Websites and Web Applications | Cobrykz",
    description:
      "Create accessible, high-performing websites and web applications that establish trust, enable action, and deliver digital service.",
  },
} satisfies SolutionPageDefinition;

const technologyConsultingSolution = {
  slug: "technology-consulting",
  name: "Technology Consulting",
  navOutcome: "Make technology decisions with greater clarity.",
  problem: "Technology priorities and the right next step are unclear.",
  outcome: "Make technology decisions with greater clarity.",
  href: "/solutions/technology-consulting",
  heroSupport:
    "Cobrykz turns unclear opportunities, system constraints, and competing priorities into practical decisions, explicit risks, and an achievable path forward.",
  recognition: [
    "Several technology opportunities compete for attention without a clear basis for prioritization.",
    "Leaders need to understand current systems, risks, dependencies, and realistic investment choices.",
    "A team needs an accountable recommendation before selecting a product, building software, or pursuing AI.",
  ],
  businessOutcomes: [
    "Align technology priorities with the business outcomes that matter most.",
    "Make investment decisions with clearer tradeoffs, dependencies, risks, and next steps.",
    "Create a sequenced path that teams can execute internally, with Cobrykz, or with another appropriate partner.",
  ],
  deliverables: [
    "Current-state assessment",
    "Opportunity map",
    "Prioritized recommendations",
    "Risk register",
    "Target-system view",
    "Sequenced roadmap",
    "Decision brief",
  ],
  applications: [
    "An AI opportunity assessment that identifies valuable use cases and responsible constraints",
    "A systems review that reveals duplication, operational risk, and connection priorities",
    "A build-versus-buy decision with explicit business and technical tradeoffs",
    "A sequenced modernization roadmap tied to capacity, dependencies, and business value",
  ],
  approach: [
    {
      title: "Discover the business context",
      description:
        "Understand goals, constraints, operations, stakeholders, current technology, and the decisions leaders need to make.",
    },
    {
      title: "Assess opportunities and risks",
      description:
        "Evaluate value, feasibility, dependencies, adoption needs, security, maintainability, and the cost of action or delay.",
    },
    {
      title: "Design the decision",
      description:
        "Compare realistic options, define the target view, and explain recommendations, tradeoffs, ownership, and success criteria.",
    },
    {
      title: "Sequence the path forward",
      description:
        "Turn the decision into an achievable roadmap with priorities, decision gates, responsibilities, and clear next steps.",
    },
  ],
  relatedSlugs: ["ai", "digital-business-systems", "custom-software-development"],
  faqs: [
    {
      question: "Does consulting always lead to a build engagement?",
      answer:
        "No. Consulting can end with a decision brief or roadmap that gives the business a useful path forward, whether execution continues with Cobrykz, internally, or elsewhere.",
    },
    {
      question: "What decisions can Cobrykz help evaluate?",
      answer:
        "Examples include AI readiness, automation priorities, system connection, product selection, custom-versus-existing software, modernization, and the sequence of technology investments.",
    },
    {
      question: "What makes a recommendation actionable?",
      answer:
        "The recommendation connects business value to feasibility, risks, dependencies, ownership, adoption, success criteria, and a realistic sequence of next steps.",
    },
  ],
  cta: {
    title: "Which technology decision needs greater clarity?",
    label: "Discuss a business challenge",
  },
  metadata: {
    title: "Technology Consulting and Decision Roadmaps | Cobrykz",
    description:
      "Clarify technology priorities with assessments, opportunity maps, risk analysis, target-system views, recommendations, and sequenced roadmaps.",
  },
} satisfies SolutionPageDefinition;

export const solutions = [
  aiSolution,
  businessAutomationSolution,
  customSoftwareSolution,
  digitalBusinessSystemsSolution,
  websitesWebApplicationsSolution,
  technologyConsultingSolution,
] as const satisfies readonly SolutionPageDefinition[];

export const solutionBySlug = {
  ai: aiSolution,
  "business-automation": businessAutomationSolution,
  "custom-software-development": customSoftwareSolution,
  "digital-business-systems": digitalBusinessSystemsSolution,
  "websites-web-applications": websitesWebApplicationsSolution,
  "technology-consulting": technologyConsultingSolution,
} satisfies Record<SolutionSlug, SolutionPageDefinition>;
