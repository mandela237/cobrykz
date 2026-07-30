import type { Metadata } from "next";
import { contactPage } from "@/components/content/contact";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: contactPage.metadata.title,
  description: contactPage.metadata.description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: contactPage.metadata.title,
    description: contactPage.metadata.description,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-gray-light">
        <div className="section-shell grid gap-8 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-end lg:gap-16 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
              Contact
            </p>
            <h1 className="text-balance mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[1.04] text-navy sm:text-5xl lg:text-7xl">
              {contactPage.headline}
            </h1>
          </div>
          <p className="border-t border-border pt-6 text-base leading-7 text-slate sm:text-[17px] sm:leading-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {contactPage.support}
          </p>
        </div>
      </section>

      <section aria-labelledby="contact-form-heading" className="bg-white">
        <div className="section-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] lg:gap-16 lg:py-24">
          <div>
            <h2 id="contact-form-heading" className="text-2xl font-extrabold text-navy sm:text-3xl">
              Begin the conversation
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-slate">
              {contactPage.responseExpectation}
            </p>
            <p className="mt-6 text-[15px] leading-7 text-slate">
              Prefer email?{" "}
              <a
                href="mailto:info@cobrykz.com"
                className="action-transition inline-flex min-h-11 items-center font-semibold text-blue underline decoration-blue/30 underline-offset-4 hover:text-navy"
              >
                {contactPage.email}
              </a>
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
