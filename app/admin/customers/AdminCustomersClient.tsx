"use client";

import { useEffect, useState } from "react";
import { Lock, RefreshCw, Phone } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

// این آدرس رو با آدرس واقعی وبهوک ورک‌فلوی «IR-CLU — API پنل ادمین» عوض کن
// (بعد از فعال کردن اون ورک‌فلو در n8n، از خودِ نود «درخواست پنل ادمین» کپی کن)
const WEBHOOK_URL = "https://ircluweb.app.n8n.cloud/webhook/admin-panel";

const STORAGE_KEY = "irclu-admin-secret";

type ChatMessage = { role: "user" | "assistant"; content: string };

type Order = {
  order_id: string;
  product_slug: string;
  amount: string | number;
  status: string;
  requirements_summary?: string;
};

type License = {
  license_key: string;
  product_slug: string;
  expires_at?: string;
};

type Customer = {
  chatId: string;
  username: string;
  phone: string;
  pendingState: string;
  createdAt: string;
  chatHistory: ChatMessage[];
  orders: Order[];
  licenses: License[];
};

type ApiResponse = {
  customers: Customer[];
  stats: {
    pendingReview: number;
    awaitingPayment: number;
    deliveredThisMonth: number;
    expiringSoon: number;
  };
  error?: string;
};

const STATUS_LABELS: Record<string, string> = {
  awaiting_requirements: "در انتظار توضیح نیاز",
  awaiting_payment: "در انتظار پرداخت",
  pending_review: "در انتظار تایید",
  delivered: "تحویل‌شده",
  rejected: "رد شده",
};

export function AdminCustomersClient() {
  const [secret, setSecret] = useState(() =>
    typeof window === "undefined" ? "" : window.localStorage.getItem(STORAGE_KEY) || ""
  );
  const [secretInput, setSecretInput] = useState("");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openChatId, setOpenChatId] = useState<string | null>(null);

  useEffect(() => {
    if (secret) load(secret);
  }, [secret]);

  async function load(s: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${WEBHOOK_URL}?secret=${encodeURIComponent(s)}`);
      const json: ApiResponse = await res.json();
      if (json.error) {
        setError("رمز اشتباهه.");
        window.localStorage.removeItem(STORAGE_KEY);
        setSecret("");
        setData(null);
      } else {
        setData(json);
      }
    } catch {
      setError("اتصال به سرور برقرار نشد — آدرس webhook توی کد صفحه رو چک کن.");
    } finally {
      setLoading(false);
    }
  }

  function handleUnlock() {
    if (!secretInput.trim()) return;
    window.localStorage.setItem(STORAGE_KEY, secretInput.trim());
    setSecret(secretInput.trim());
  }

  if (!secret) {
    return (
      <div className="mt-16 max-w-sm">
        <div className="rounded-2xl border border-border bg-surface p-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-cyan">
            <Lock size={18} aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-base font-semibold text-foreground">ورود ادمین</h2>
          <p className="mt-2 text-sm leading-7 text-muted">رمز پنل ادمین رو وارد کن.</p>
          <input
            type="password"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            className="mt-4 w-full rounded-xl border border-border bg-ink px-4 py-2.5 text-sm text-foreground outline-none focus:border-cyan/60"
            placeholder="رمز"
          />
          <button
            onClick={handleUnlock}
            className="mt-4 w-full rounded-full py-2.5 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.02]"
            style={{ background: "var(--gradient-signal)" }}
          >
            ورود
          </button>
          {error && <p className="mt-3 text-xs text-ember">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <Eyebrow index="—">داده‌ی زنده از ربات فروش</Eyebrow>
        <button
          onClick={() => load(secret)}
          className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} aria-hidden="true" />
          به‌روزرسانی
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-ember">{error}</p>}

      {data && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="در انتظار تایید رسید" value={data.stats.pendingReview} />
            <StatCard label="منتظر پرداخت مشتری" value={data.stats.awaitingPayment} />
            <StatCard label="تحویل‌شده این ماه" value={data.stats.deliveredThisMonth} />
            <StatCard label="رو‌به‌انقضا (۳ روز آینده)" value={data.stats.expiringSoon} />
          </div>

          <div className="mt-10 flex flex-col gap-3">
            {data.customers.length === 0 && (
              <p className="text-sm text-muted">هنوز هیچ مشتری‌ای ثبت نشده.</p>
            )}
            {data.customers.map((c) => (
              <CustomerRow
                key={c.chatId}
                customer={c}
                open={openChatId === c.chatId}
                onToggle={() => setOpenChatId(openChatId === c.chatId ? null : c.chatId)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="font-tabular text-2xl font-bold text-foreground">{value}</div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}

function CustomerRow({
  customer,
  open,
  onToggle,
}: {
  customer: Customer;
  open: boolean;
  onToggle: () => void;
}) {
  const statusKey = customer.pendingState.split(":")[0];

  return (
    <div className="rounded-2xl border border-border bg-surface">
      <button
        onClick={onToggle}
        className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-right"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border text-cyan">
            <Phone size={16} aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {customer.username ? `@${customer.username}` : "بدون یوزرنیم"}
            </div>
            <div className="font-mono text-xs text-muted" dir="ltr">
              {customer.phone || "—"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {customer.pendingState && (
            <span className="rounded-full border border-cyan/40 px-3 py-1 font-mono text-[11px] text-cyan">
              {STATUS_LABELS[statusKey] || customer.pendingState}
            </span>
          )}
          <span className="text-xs text-muted">{customer.orders.length} سفارش</span>
        </div>
      </button>

      {open && (
        <div className="border-t border-border p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
            گفتگوی هوش مصنوعی فروش
          </h3>
          {customer.chatHistory.length > 0 ? (
            <div className="mt-3 flex flex-col gap-2">
              {customer.chatHistory.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-7 ${
                    m.role === "user" ? "self-start bg-ink text-foreground" : "self-end text-ink"
                  }`}
                  style={m.role === "assistant" ? { background: "var(--gradient-signal)" } : undefined}
                >
                  {m.content}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">هنوز گفتگوی آزادی با AI نداشته.</p>
          )}

          {customer.orders.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">سفارش‌ها</h3>
              <div className="mt-3 flex flex-col gap-2">
                {customer.orders.map((o) => (
                  <div
                    key={o.order_id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-2.5 text-sm"
                  >
                    <span className="font-mono text-xs text-muted" dir="ltr">
                      {o.order_id}
                    </span>
                    <span className="text-foreground">{o.product_slug}</span>
                    <span className="text-muted">
                      {Number(o.amount || 0).toLocaleString("fa-IR")} تومان
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted">
                      {STATUS_LABELS[o.status] || o.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customer.licenses.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">لایسنس‌ها</h3>
              <div className="mt-3 flex flex-col gap-2">
                {customer.licenses.map((l) => (
                  <div
                    key={l.license_key}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-2.5 text-sm"
                  >
                    <span className="font-mono text-xs text-cyan" dir="ltr">
                      {l.license_key}
                    </span>
                    <span className="text-muted" dir="ltr">
                      {l.expires_at ? new Date(l.expires_at).toLocaleDateString("fa-IR") : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
