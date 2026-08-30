"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import { getQuizQuestions, getQuizResults, scoreQuiz } from "@/lib/automation-quiz";
import { useLocale } from "@/lib/locale";
import { dictionaries } from "@/lib/dictionaries";

type Step = "quiz" | "result";
type SubmitState = "idle" | "sending" | "sent" | "error";

const TELEGRAM_HANDLE = "bardiaaSam";

export function AutomationQuiz() {
  const locale = useLocale();
  const t = dictionaries[locale].quiz;
  const QUIZ_QUESTIONS = getQuizQuestions(locale);
  const QUIZ_RESULTS = getQuizResults(locale);
  const BackIcon = locale === "en" ? ArrowLeft : ArrowRight;

  const [step, setStep] = useState<Step>("quiz");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const category = step === "result" ? scoreQuiz(answers, locale) : null;
  const result = category ? QUIZ_RESULTS[category] : null;

  function selectOption(optionIndex: number) {
    const next = [...answers, optionIndex];
    setAnswers(next);
    if (questionIndex + 1 < QUIZ_QUESTIONS.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep("result");
    }
  }

  function goBack() {
    if (questionIndex === 0) return;
    setAnswers(answers.slice(0, -1));
    setQuestionIndex(questionIndex - 1);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    const webhookUrl = process.env.NEXT_PUBLIC_QUIZ_WEBHOOK_URL;
    if (!webhookUrl || !category) {
      setSubmitState("error");
      return;
    }

    setSubmitState("sending");
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          category,
          locale,
          answers: answers.map((optionIndex, i) => ({
            question: QUIZ_QUESTIONS[i].question,
            answer: QUIZ_QUESTIONS[i].options[optionIndex]?.label,
          })),
        }),
      });
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  }

  if (step === "quiz") {
    const question = QUIZ_QUESTIONS[questionIndex];
    return (
      <div className="rounded-3xl border border-border bg-surface p-8 md:p-12">
        <div className="mb-8 flex items-center justify-between font-mono text-xs text-muted">
          <span dir="ltr">
            {questionIndex + 1} / {QUIZ_QUESTIONS.length}
          </span>
          <div className="flex h-1 w-40 overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((questionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                background: "var(--gradient-signal)",
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl font-bold leading-relaxed text-foreground md:text-2xl">
              {question.question}
            </h3>
            <div className="mt-8 flex flex-col gap-3">
              {question.options.map((option, i) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => selectOption(i)}
                  className="rounded-2xl border border-border bg-ink px-6 py-4 text-start text-foreground transition-colors hover:border-cyan hover:text-cyan"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {questionIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="mt-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <BackIcon size={15} aria-hidden="true" />
            {t.previousQuestion}
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-border bg-surface p-8 text-center md:p-12"
    >
      <p className="font-mono text-xs tracking-[0.2em] text-cyan uppercase">{t.resultLabel}</p>
      <h3 className="mx-auto mt-4 max-w-xl text-2xl font-bold leading-tight text-foreground md:text-3xl">
        {result?.title}
      </h3>
      <p className="mx-auto mt-4 max-w-xl leading-8 text-muted">{result?.description}</p>

      <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-3">
        {result?.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full border border-border px-5 py-2 text-sm text-foreground transition-colors hover:border-cyan hover:text-cyan"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-md border-t border-border pt-10">
        {submitState === "sent" ? (
          <p className="leading-8 text-muted">{t.sentMessage}</p>
        ) : (
          <>
            <p className="leading-8 text-muted">{t.followUpPrompt}</p>
            <form onSubmit={submitLead} className="mt-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-border bg-ink px-4 py-3 text-foreground placeholder:text-muted focus:border-cyan focus:outline-none"
              />
              <input
                type="text"
                placeholder={t.contactPlaceholder}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="rounded-xl border border-border bg-ink px-4 py-3 text-foreground placeholder:text-muted focus:border-cyan focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitState === "sending" || !contact}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-ink disabled:opacity-50"
                style={{ background: "var(--gradient-signal)" }}
              >
                <Send size={16} aria-hidden="true" />
                {submitState === "sending" ? t.sending : t.submit}
              </button>
              {submitState === "error" && (
                <p className="text-sm text-muted">
                  {t.errorPrefix}{" "}
                  <a
                    href={`https://t.me/${TELEGRAM_HANDLE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan"
                  >
                    @{TELEGRAM_HANDLE}
                  </a>
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}
