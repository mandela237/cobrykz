"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { contactPage } from "@/components/content/contact";
import type { ContactErrors } from "@/lib/contact/validation";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string; errors: ContactErrors }
  | { status: "success" };

const fieldClass =
  "contact-form-control mt-2 min-h-12 w-full rounded-lg border border-border bg-white px-4 py-3 text-base text-navy outline-none placeholder:text-slate-light focus:border-blue";

export default function ContactForm() {
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "error") {
      summaryRef.current?.focus();
    }
  }, [state.status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: startedAt.current }),
      });
      const result = (await response.json()) as {
        delivered?: boolean;
        message?: string;
        errors?: ContactErrors;
      };
      if (!response.ok || !result.delivered) {
        setState({
          status: "error",
          message: result.message ?? "Your inquiry was not delivered. Please try again.",
          errors: result.errors ?? {},
        });
        return;
      }
      form.reset();
      setState({ status: "success" });
    } catch {
      setState({
        status: "error",
        message:
          "Your inquiry was not delivered. Please try again or email info@cobrykz.com.",
        errors: {},
      });
    }
  }

  if (state.status === "success") {
    return (
      <div data-contact-success aria-live="polite" className="border-y border-border py-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-evergreen">
          Inquiry delivered
        </p>
        <h2 className="text-balance mt-4 text-3xl font-extrabold text-navy">
          Thank you. Cobrykz will review your challenge.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-slate">
          {contactPage.responseExpectation}
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  return (
    <form data-contact-form onSubmit={handleSubmit} noValidate>
      {state.status === "error" ? (
        <div
          ref={summaryRef}
          data-contact-error-summary
          role="alert"
          tabIndex={-1}
          className="mb-8 border-l-4 border-blue bg-blue-tint p-5 text-sm leading-6 text-navy"
        >
          <p className="font-bold">The inquiry needs attention.</p>
          <p className="mt-1">{state.message}</p>
        </div>
      ) : null}

      <div className="contact-form-fields grid gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} autoComplete="name" />
        <Field label="Work email" name="email" type="email" error={errors.email} autoComplete="email" />
        <Field label="Company" name="company" error={errors.company} autoComplete="organization" />
        <SelectField label="Relevant solution (optional)" name="solution">
          <option value="">Not sure yet</option>
          {contactPage.solutionOptions.map((option) => (
            <option key={option.href} value={option.name}>{option.name}</option>
          ))}
        </SelectField>
        <SelectField label="Timing (optional)" name="timing">
          <option value="">Select if useful</option>
          {contactPage.timingOptions.map((option) => <option key={option}>{option}</option>)}
        </SelectField>
        <SelectField label="Preferred contact method (optional)" name="contactMethod">
          <option value="">Select if useful</option>
          {contactPage.contactMethodOptions.map((option) => <option key={option}>{option}</option>)}
        </SelectField>
      </div>

      <label className="mt-6 block text-sm font-bold text-navy" htmlFor="challenge">
        Business challenge
        <textarea
          id="challenge"
          name="challenge"
          required
          rows={7}
          maxLength={4000}
          aria-invalid={Boolean(errors.challenge)}
          aria-describedby={errors.challenge ? "challenge-error" : "challenge-help"}
          className={fieldClass}
          placeholder="What is slowing the business down, limiting growth, or creating an opportunity?"
        />
      </label>
      <p id="challenge-help" className="mt-2 text-sm leading-6 text-slate">
        Describe the outcome you want; technical details are optional.
      </p>
      {errors.challenge ? <p id="challenge-error" className="mt-2 text-sm font-semibold text-blue">{errors.challenge}</p> : null}

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="action-transition mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-blue px-6 py-3 text-sm font-bold text-white hover:bg-blue-dark disabled:opacity-60"
      >
        {state.status === "submitting" ? "Sending inquiry…" : "Discuss a business challenge"}
      </button>
      <p aria-live="polite" className="mt-3 text-sm text-slate">
        {state.status === "submitting" ? "Submitting securely. Please wait." : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  name: "name" | "email" | "company";
  type?: string;
  error?: string;
  autoComplete: string;
}) {
  const errorId = `${name}-error`;
  return (
    <label className="block text-sm font-bold text-navy" htmlFor={name}>
      {label}
      <input
        id={name}
        name={name}
        type={type}
        required
        maxLength={160}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
      />
      {error ? <span id={errorId} className="mt-2 block text-sm font-semibold text-blue">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-navy" htmlFor={name}>
      {label}
      <select id={name} name={name} className={fieldClass}>{children}</select>
    </label>
  );
}
