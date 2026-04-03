import { SafeAreaView } from '@/components/ui/safe-area-view';
import {
  LandingFeaturePanel,
  type LandingTabId,
} from '@/components/landing/feature-panels';
import { getApiBaseUrl } from '@/libs/get-api-base-url';
import { useTranslations } from '@/providers/intl-provider';
import { Ionicons } from '@expo/vector-icons';
import { setStringAsync } from 'expo-clipboard';
import Constants from 'expo-constants';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const CREATE_CMD = 'npx create-bangerstack@latest';

const TABS: ReadonlyArray<{
  id: LandingTabId;
  emoji: string;
  labelKey: keyof MessagesLandingSteps;
}> = [
  { id: 'typeSafety', emoji: '🛡️', labelKey: 'fullstackTypeSafety' },
  { id: 'typedEnv', emoji: '🔐', labelKey: 'typedEnv' },
  { id: 'internationalisation', emoji: '🌍', labelKey: 'internationalisation' },
  { id: 'autoDoc', emoji: '📄', labelKey: 'autoDoc' },
  { id: 'authentication', emoji: '🔑', labelKey: 'authentication' },
  { id: 'logging', emoji: '📋', labelKey: 'logging' },
  { id: 'cleanEmails', emoji: '📧', labelKey: 'cleanEmails' },
  { id: 'encryptedSecrets', emoji: '🔒', labelKey: 'encryptedSecrets' },
];

/** Clés sous Landing.steps (typage minimal pour labelKey). */
type MessagesLandingSteps = Record<
  | 'fullstackTypeSafety'
  | 'typedEnv'
  | 'internationalisation'
  | 'autoDoc'
  | 'authentication'
  | 'logging'
  | 'cleanEmails'
  | 'encryptedSecrets',
  string
>;

function BangerStackLogoMark() {
  return (
    <View className="h-9 w-9 items-center justify-center rounded-lg bg-violet-600 shadow-lg shadow-violet-500/25">
      <View className="gap-0.5">
        <View className="h-0.5 w-5 rounded-full bg-white opacity-95" />
        <View className="h-0.5 w-4 rounded-full bg-white opacity-95" />
        <View className="h-0.5 w-3 rounded-full bg-white opacity-95" />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const t = useTranslations('Landing');
  const tv = useTranslations('Landing.versions');
  const tm = useTranslations('Landing.mobile');
  const [active, setActive] = useState<LandingTabId>('typeSafety');
  const [copied, setCopied] = useState(false);

  const appVersion = Constants.expoConfig?.version ?? '—';
  const sdkVersion = Constants.expoConfig?.sdkVersion ?? '—';

  const copyCreateCmd = useCallback(async () => {
    try {
      await setStringAsync(CREATE_CMD);
    } catch {
      /* presse-papiers indisponible */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const stepTitle = useMemo(() => {
    const map: Record<LandingTabId, string> = {
      typeSafety: t('step1.title'),
      typedEnv: t('step4.title'),
      internationalisation: t('step5.title'),
      autoDoc: t('step7.title'),
      authentication: t('step8.title'),
      logging: t('step9.title'),
      cleanEmails: t('step11.title'),
      encryptedSecrets: t('step10.title'),
    };
    return map[active];
  }, [active, t]);

  const stepDescription = useMemo(() => {
    const map: Record<LandingTabId, string> = {
      typeSafety: t('descriptions.fullstackTypeSafety'),
      typedEnv: t('descriptions.typedEnv'),
      internationalisation: t('descriptions.internationalisation'),
      autoDoc: t('descriptions.autoDoc'),
      authentication: t('descriptions.authentication'),
      logging: t('descriptions.logging'),
      cleanEmails: t('descriptions.cleanEmails'),
      encryptedSecrets: t('descriptions.encryptedSecrets'),
    };
    return map[active];
  }, [active, t]);

  const activeEmoji = TABS.find((x) => x.id === active)?.emoji ?? '';
  const stackItems = t('header.stack').split(' · ');

  return (
    <SafeAreaView className="flex-1 bg-app-bg">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-16"
        keyboardShouldPersistTaps="handled"
      >
        <View className="border-b border-white/10 bg-zinc-950 px-4 pb-10 pt-6">
          <View className="mb-6 flex-row items-start justify-between gap-3">
            <View className="min-w-0 flex-1 flex-row flex-wrap items-center gap-3">
              <BangerStackLogoMark />
              <Text className="text-xl font-bold tracking-tight text-white">
                BangerStack
              </Text>
              <View className="rounded-full border border-violet-500/30 px-2 py-0.5">
                <Text className="text-xs font-medium text-violet-300/90">
                  {tm('expoBadge')}
                </Text>
              </View>
            </View>
            <View className="items-end gap-1">
              <Text className="text-right font-mono text-[10px] text-zinc-400">
                <Text className="text-zinc-500">{tv('app')}</Text>
                <Text className="text-zinc-600"> · </Text>
                <Text className="text-zinc-200">{appVersion}</Text>
              </Text>
              <Text className="text-right font-mono text-[10px] text-zinc-400">
                <Text className="text-zinc-500">{tv('expoSdk')}</Text>
                <Text className="text-zinc-600"> · </Text>
                <Text className="text-zinc-200">{sdkVersion}</Text>
              </Text>
            </View>
          </View>

          <View className="mb-6 self-start rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5">
            <Text className="text-xs font-medium text-violet-300">
              {t('header.badge')}
            </Text>
          </View>

          <Text className="mb-3 max-w-2xl text-3xl font-bold tracking-tight text-white">
            {t('header.headline')}
          </Text>
          <Text className="mb-6 max-w-xl text-base leading-relaxed text-zinc-400">
            {t('header.tagline')}
          </Text>

          <Pressable
            onPress={() => void copyCreateCmd()}
            accessibilityLabel={tm('copyHint')}
            className="max-w-md flex-row items-center gap-2 self-start rounded-lg border border-zinc-700 bg-zinc-800/95 px-3 py-2.5 active:opacity-90"
          >
            <Text
              className="flex-1 font-mono text-sm text-zinc-300"
              numberOfLines={1}
            >
              {CREATE_CMD}
            </Text>
            {copied ? (
              <Ionicons name="checkmark-circle" size={22} color="#34d399" />
            ) : (
              <Ionicons name="copy-outline" size={22} color="#a1a1aa" />
            )}
          </Pressable>

          <View className="mt-6 flex-row flex-wrap gap-2">
            {stackItems.map((tech) => (
              <View
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
              >
                <Text className="text-xs font-medium text-zinc-300">{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="px-4 py-8">
          <Text className="mb-4 text-base font-semibold text-white">
            {tm('categoriesTitle')}
          </Text>

          <View className="mb-8 flex-row flex-wrap justify-between gap-y-2">
            {TABS.map((tab) => {
              const isOn = active === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => setActive(tab.id)}
                  className={`mb-1 w-[48%] flex-row items-center gap-2 rounded-xl border px-3 py-3 ${
                    isOn
                      ? 'border-violet-500/40 bg-violet-500/15'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <Text className="text-lg">{tab.emoji}</Text>
                  <Text
                    className={`min-w-0 flex-1 text-xs font-medium leading-tight ${
                      isOn ? 'text-white' : 'text-zinc-400'
                    }`}
                    numberOfLines={2}
                  >
                    {t(`steps.${tab.labelKey}` as 'steps.fullstackTypeSafety')}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View className="mb-4 gap-1">
            <Text className="text-xl font-bold text-white">
              {activeEmoji} {stepTitle}
            </Text>
            <Text className="text-sm leading-5 text-zinc-400">
              {stepDescription}
            </Text>
          </View>

          <View className="rounded-xl border border-white/10 bg-white/5 p-4">
            <LandingFeaturePanel tab={active} />
            <Text className="mt-6 font-mono text-[10px] text-zinc-500">
              {tm('apiUrl', { url: getApiBaseUrl() })}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
