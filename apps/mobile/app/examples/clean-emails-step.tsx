"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@repo/ui/components/badge";
import { SimpleCodeCard } from "@/app/examples/components/simple-code-card";

export function CleanEmailsStep() {
  const t = useTranslations("Landing.step11");

  return (
    <div className="space-y-4">
      <SimpleCodeCard
        title="packages/emails/src/YourEmail.tsx"
        badge={<Badge size="sm">{t("reactEmailBadge")}</Badge>}
      >
        <span className="text-violet-400">export default function</span> Email(p: {"{"}{" "}
        locale: string {"}"}) {"{"}
        {"\n  "}
        return &lt;Tailwind&gt;...&lt;/Tailwind&gt;;
        {"\n"}
        {"}"}
      </SimpleCodeCard>
      <p className="text-sm text-zinc-400 leading-relaxed">{t("explanation")}</p>
      <p className="text-xs text-zinc-500">{t("tailwindIntlHint")}</p>
      <div className="rounded-lg border border-zinc-700 bg-zinc-900/40 p-4 text-sm text-zinc-500">
        Screenshot preview omitted here — same react-email setup as{" "}
        <code className="text-zinc-400">apps/web</code>.
      </div>
    </div>
  );
}
