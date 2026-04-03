import { useCallback } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import * as Linking from 'expo-linking';
import { Image } from 'expo-image';
import { useTranslations, useAppIntl } from '@/providers/intl-provider';
import { getApiBaseUrl } from '@/libs/get-api-base-url';
import { trpc } from '@/libs/trpc-client';
import { AuthDemo } from '@/components/landing/auth-demo';

export type LandingTabId =
  | 'typeSafety'
  | 'typedEnv'
  | 'internationalisation'
  | 'autoDoc'
  | 'authentication'
  | 'logging'
  | 'cleanEmails'
  | 'encryptedSecrets';

export function TypeSafetyPanel() {
  const t = useTranslations('Landing.step1');
  const { data, isLoading, isFetching, refetch } = trpc.app.hello.useQuery(
    undefined,
    { enabled: false },
  );
  const run = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <View className="gap-4">
      <Text className="text-sm leading-5 text-app-muted">{t('intro')}</Text>
      <View className="gap-2 rounded-xl border border-app-border bg-app-card p-3.5">
        <Text className="text-[10px] font-semibold text-violet-400">
          {t('backendSide')}
        </Text>
        <Text className="font-mono text-[10px] leading-relaxed text-app-fg">
          {t('codeHintBackend')}
        </Text>
      </View>
      <View className="gap-2 rounded-xl border border-app-border bg-app-card p-3.5">
        <Text className="text-[10px] font-semibold text-violet-400">
          {t('frontendSide')}
        </Text>
        <Text className="font-mono text-[10px] leading-relaxed text-app-fg" selectable>
          {t('codeExample')}
        </Text>
        <Text className="text-[10px] text-app-muted">{t('codeHintClient')}</Text>
      </View>
      <View className="gap-3 rounded-xl border border-app-border bg-app-card p-4">
        <Text className="text-xs font-semibold text-app-muted">{t('result')}</Text>
        <Pressable
          onPress={run}
          disabled={isFetching}
          className="self-start rounded-lg bg-violet-600 px-5 py-3 active:opacity-85 disabled:opacity-50"
        >
          {isFetching ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="font-bold text-white">{t('fetchCta')}</Text>
          )}
        </Pressable>
        {isLoading && !data ? (
          <Text className="text-sm text-app-muted">{t('result')}…</Text>
        ) : data != null ? (
          <Text
            className="rounded-lg bg-zinc-950 p-3 font-mono text-[10px] text-app-fg"
            selectable
          >
            {JSON.stringify(data, null, 2)}
          </Text>
        ) : (
          <Text className="text-sm text-app-muted">{t('clickToFetch')}</Text>
        )}
      </View>
    </View>
  );
}

export function TypedEnvPanel() {
  const t4 = useTranslations('Landing.step4');
  const td = useTranslations('Landing.descriptions');

  return (
    <View className="gap-4">
      <Text className="text-sm leading-6 text-app-muted">{td('typedEnv')}</Text>
      <View className="gap-2 rounded-xl border border-app-border bg-app-card p-4">
        <Text className="text-xs font-semibold text-violet-400">
          {t4('typedEnvBadge')}
        </Text>
        <Text className="text-sm leading-5 text-app-fg">{t4('validationTitle')}</Text>
        <Text className="text-xs leading-5 text-app-muted">{t4('stronglyTypeEnv')}</Text>
      </View>
      <View className="gap-2 rounded-xl border border-app-border bg-app-card p-4">
        <Text className="text-xs font-semibold text-violet-400">
          {t4('encryptedEnvTitle')}
        </Text>
        <Text className="text-xs leading-5 text-app-muted">{td('encryptedSecrets')}</Text>
      </View>
    </View>
  );
}

export function InternationalisationPanel() {
  const t = useTranslations('Landing.step5');
  const tI18n = useTranslations('I18nExample');
  const tm = useTranslations('Landing.mobile');
  const { locale, setLocale } = useAppIntl();

  return (
    <View className="gap-4">
      <Text className="text-sm leading-5 text-app-muted">{tm('intlIntro')}</Text>
      <Text className="text-[10px] font-semibold text-app-muted">{t('code')}</Text>
      <View className="flex-row gap-2.5">
        <Pressable
          onPress={() => setLocale('en')}
          className={`flex-1 items-center rounded-lg border border-app-border py-3 active:opacity-85 ${
            locale === 'en' ? 'bg-violet-600' : 'bg-app-card'
          }`}
        >
          <Text
            className={`font-bold ${locale === 'en' ? 'text-white' : 'text-app-fg'}`}
          >
            {tm('toggleEn')}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setLocale('fr')}
          className={`flex-1 items-center rounded-lg border border-app-border py-3 active:opacity-85 ${
            locale === 'fr' ? 'bg-violet-600' : 'bg-app-card'
          }`}
        >
          <Text
            className={`font-bold ${locale === 'fr' ? 'text-white' : 'text-app-fg'}`}
          >
            {tm('toggleFr')}
          </Text>
        </Pressable>
      </View>
      <View className="gap-2.5 rounded-xl border border-app-border bg-app-card p-4">
        <Text className="text-xl font-bold text-app-fg">{tI18n('title')}</Text>
        <Text className="text-[15px] leading-[22px] text-app-muted">
          {tI18n('description')}
        </Text>
      </View>
    </View>
  );
}

export function AutoDocPanel() {
  const t = useTranslations('Landing.step7');

  const openDocs = () => {
    void Linking.openURL(`${getApiBaseUrl()}/docs`);
  };

  return (
    <View className="gap-4">
      <Text className="text-sm leading-6 text-app-muted">{t('intro')}</Text>
      <Pressable
        onPress={openDocs}
        className="flex-row items-center justify-center gap-2 self-start rounded-lg bg-indigo-600 px-4 py-3 active:opacity-90"
      >
        <Text className="text-sm font-semibold text-white">{t('openDocs')}</Text>
        <Text className="text-white">↗</Text>
      </Pressable>
    </View>
  );
}

export function LoggingPanel() {
  const t = useTranslations('Landing.step9');
  const td = useTranslations('Landing.descriptions');
  const tm = useTranslations('Landing.mobile');

  return (
    <View className="gap-4">
      <Text className="text-sm leading-6 text-app-muted">{td('logging')}</Text>
      <View className="rounded-xl border border-app-border bg-app-card p-4">
        <Text className="text-xs font-semibold text-violet-400">{t('codeLabel')}</Text>
        <Text className="mt-2 font-mono text-[10px] text-app-muted">
          {tm('loggingCodeSample')}
        </Text>
        <Text className="mt-3 text-xs text-app-muted">{tm('loggingHint')}</Text>
      </View>
      <View className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <Text className="text-xs font-semibold text-zinc-500">{t('terminalLabel')}</Text>
        <Text className="mt-2 font-mono text-[10px] text-zinc-400">
          {tm('loggingTerminalSample')}
        </Text>
      </View>
    </View>
  );
}

export function CleanEmailsPanel() {
  const t = useTranslations('Landing.step11');

  return (
    <View className="gap-4">
      <Text className="text-sm leading-6 text-app-muted">{t('explanation')}</Text>
      <Text className="text-xs leading-5 text-app-muted">{t('tailwindIntlHint')}</Text>
      <View className="overflow-hidden rounded-xl border border-white/10 bg-white">
        <Image
          source={require('@/assets/react-email-example.png')}
          style={{ width: '100%', aspectRatio: 1.5 }}
          contentFit="contain"
          accessibilityLabel={t('screenshotAlt')}
        />
      </View>
    </View>
  );
}

export function EncryptedSecretsPanel() {
  const t = useTranslations('Landing.step10');

  return (
    <View className="gap-4">
      <Text className="text-sm leading-6 text-app-muted">{t('intro')}</Text>
      <View className="gap-2 rounded-xl border border-app-border bg-app-card p-4">
        <Text className="text-xs font-semibold text-violet-400">{t('exampleTitle')}</Text>
        <Text className="font-mono text-[10px] text-emerald-400">{t('encryptedBadge')}</Text>
        <Text className="text-xs text-app-muted">{t('encryptedComment')}</Text>
      </View>
      <View className="gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
        <Text className="text-xs font-semibold text-amber-200/90">{t('ciTitle')}</Text>
        <Text className="text-xs leading-5 text-app-muted">{t('ciOnlyKey')}</Text>
      </View>
    </View>
  );
}

export function LandingFeaturePanel(p: { tab: LandingTabId }) {
  switch (p.tab) {
    case 'typeSafety':
      return <TypeSafetyPanel />;
    case 'typedEnv':
      return <TypedEnvPanel />;
    case 'internationalisation':
      return <InternationalisationPanel />;
    case 'autoDoc':
      return <AutoDocPanel />;
    case 'authentication':
      return <AuthDemo />;
    case 'logging':
      return <LoggingPanel />;
    case 'cleanEmails':
      return <CleanEmailsPanel />;
    case 'encryptedSecrets':
      return <EncryptedSecretsPanel />;
    default:
      return null;
  }
}
