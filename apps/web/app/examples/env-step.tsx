'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@repo/ui/components/badge';
import { StyledTerminal } from '@web/app/examples/components/StyledTerminal';

export function EnvStep() {
  const t4 = useTranslations('Landing.step4');

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col min-h-0">
          <h3 className="text-lg font-semibold mb-4 text-zinc-200">
            {t4('stronglyTypeEnv')}
          </h3>
          <StyledTerminal
            title="apps/api/env-type.ts"
            badge={<Badge size="sm">{t4('zodSchemaBadge')}</Badge>}
            fill
          >
            <span className="text-purple-400">import</span>
            <span className="text-gray-300">{' { z } '}</span>
            <span className="text-purple-400">from</span>
            <span className="text-yellow-400"> {"'zod'"}</span>
            <span className="text-gray-300">;</span>
            {'\n\n'}
            <span className="text-purple-400">export const</span>
            <span className="text-gray-300"> envSchema = z.</span>
            <span className="text-blue-400">object</span>
            <span className="text-gray-300">(</span>
            {'{'}
            {'\n  '}
            <span className="text-green-400">DATABASE_URL</span>
            <span className="text-gray-300">: z.</span>
            <span className="text-blue-400">string</span>
            <span className="text-gray-300">(),</span>
            {'\n  '}
            <span className="text-green-400">AUTH_SECRET</span>
            <span className="text-gray-300">: z.</span>
            <span className="text-blue-400">string</span>
            <span className="text-gray-300">(),</span>
            {'\n'}
            {'}'}
            <span className="text-gray-300">);</span>
          </StyledTerminal>
        </div>

        <div className="flex flex-col min-h-0">
          <h3 className="text-lg font-semibold mb-4 text-zinc-200">
            {t4('typedEnv')}
          </h3>
          <StyledTerminal
            title="apps/api/src/main.ts"
            badge={<Badge size="sm">{t4('typedEnvBadge')}</Badge>}
            fill
          >
            <span className="text-gray-500">// ✨ {t4('typedVarLabel')}</span>
            {'\n'}
            <span className="text-purple-400">const</span>{' '}
            <span className="text-blue-400">dbUrl</span>{' '}
            <span className="text-purple-400">=</span>{' '}
            <span className="text-blue-400">process</span>
            <span className="text-gray-300">.</span>
            <span className="text-blue-400">env</span>
            <span className="text-gray-300">.</span>
            <span className="text-yellow-400 underline decoration-red-500 decoration-wavy decoration-2">
              PATABASE_URL
            </span>
            <span className="text-gray-300">;</span>
          </StyledTerminal>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-zinc-200">
          {t4('validationTitle')}
        </h3>
        <div className="grid gap-8 lg:grid-cols-2">
          <StyledTerminal
            title=".env"
            badge={<Badge size="sm">{t4('envFile')}</Badge>}
            size="sm"
            contentPadding="compact"
          >
            <span className="text-green-400">PATABASE_URL</span>
            <span className="text-gray-500">=</span>
            <span className="text-yellow-400">postgresql://...</span>
            {'\n'}
            <span className="text-green-400">PORT</span>
            <span className="text-gray-500">=</span>
            <span className="text-yellow-400">3090</span>
            {'\n'}
            <span className="text-green-400 border-2 p-1 border-green-400">
              {' '}
              {'// AUTH_SECRET is missing'}
            </span>
          </StyledTerminal>

          <StyledTerminal
            title={t4('terminal')}
            badge={<Badge size="sm">{t4('result')}</Badge>}
            size="sm"
            contentPadding="compact"
          >
            <span className="text-red-400">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </span>
            {'\n'}
            <span className="text-white">
              🔍 Validating environment variables
            </span>
            {'\n'}
            <span className="text-red-400">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </span>
            {'\n\n'}
            <span className="text-red-400">
              {' '}
              ❌ apps/api: Missing env variable : AUTH_SECRET
            </span>
          </StyledTerminal>
        </div>
      </div>
    </div>
  );
}
