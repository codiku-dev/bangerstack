'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@repo/ui/components/badge';
import { StyledTerminal } from '@web/app/examples/components/StyledTerminal';

export function SecretsStep() {
  const t = useTranslations('Landing.step10');

  return (
    <div className="space-y-8">
      <p className="text-zinc-300 text-sm leading-relaxed">
        {t('intro')}
      </p>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col min-h-0">
          <h3 className="text-lg font-semibold mb-4 text-zinc-200">
            {t('exampleTitle')}
          </h3>
          <StyledTerminal
            title=".env.production (safe to commit)"
            badge={<Badge size="sm">{t('encryptedBadge')}</Badge>}
            fill
            contentPadding="compact"
          >
            <span className="text-gray-500"># dotenvx – {t('encryptedComment')}</span>
            {'\n'}
            <span className="text-green-400">DATABASE_URL</span>
            <span className="text-gray-300">=</span>
            <span className="text-amber-400">encrypted:BK6Rja5JUUxXIIUcPtx...</span>
            {'\n'}
            <span className="text-green-400">BETTER_AUTH_SECRET</span>
            <span className="text-gray-300">=</span>
            <span className="text-amber-400">encrypted:BIEYdZGGtCxxmYXV8LT5r...</span>
            {'\n'}
            <span className="text-green-400">FRONTEND_URL</span>
            <span className="text-gray-300">=</span>
            <span className="text-amber-400">encrypted:BA0oNkh2YysZRvfIOK1j...</span>
          </StyledTerminal>
        </div>

        <div className="flex flex-col min-h-0">
          <h3 className="text-lg font-semibold mb-4 text-zinc-200">
            {t('ciTitle')}
          </h3>
          <StyledTerminal
            title=".env.keys (DO NOT commit)"
            badge={<Badge size="sm" className="border-red-500/40 bg-red-500/20 text-red-200">{t('privateBadge')}</Badge>}
            fill
            contentPadding="compact"
          >
            <span className="text-gray-500"># {t('keysComment')}</span>
            {'\n\n'}
            <span className="text-green-400">DOTENV_PRIVATE_KEY_PRODUCTION</span>
            <span className="text-gray-300">=</span>
            <span className="text-amber-400">47d9eecc1c4243351d1a5f81a5af624ce...</span>
          </StyledTerminal>
          <p className="text-zinc-400 text-xs mt-3">
            {t('ciHint')}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3">
        <p className="text-amber-200/90 text-sm font-medium">
          {t('ciOnlyKey')}
        </p>
      </div>
    </div>
  );
}
