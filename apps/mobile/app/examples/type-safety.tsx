import { useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Stack } from 'expo-router';
import { useTranslations } from '@/providers/intl-provider';
import { trpc } from '@/libs/trpc-client';
import { SafeAreaView } from '@/components/ui/safe-area-view';
export default function TypeSafetyScreen() {
  const t = useTranslations('Landing.step1');
  const { data, isLoading, isFetching, refetch } = trpc.app.hello.useQuery(
    undefined,
    { enabled: false },
  );

  const run = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <>
      <SafeAreaView className="flex-1 bg-app-bg">
        <Text className="text-app-muted text-sm leading-5">{t('intro')}</Text>

        <View className="gap-2 rounded-xl border border-app-border bg-app-card p-3.5">
          <Text className="text-[10px] font-semibold text-app-accent">
            {t('backendSide')}
          </Text>
          <Text className="font-mono text-[10px] leading-relaxed text-app-fg">
            {t('codeHintBackend')}
          </Text>
        </View>

        <View className="gap-2 rounded-xl border border-app-border bg-app-card p-3.5">
          <Text className="text-[10px] font-semibold text-app-accent">
            {t('frontendSide')}
          </Text>
          <Text className="font-mono text-[10px] leading-relaxed text-app-fg">
            {t('codeExample')}
          </Text>
          <Text className="text-[10px] text-app-muted">
            {t('codeHintClient')}
          </Text>
        </View>

        <View className="gap-3 rounded-xl border border-app-border bg-app-card p-4">
          <Text className="text-xs font-semibold text-app-muted">
            {t('result')}
          </Text>
          <Pressable
            onPress={run}
            disabled={isFetching}
            className="self-start rounded-lg bg-app-accent px-5 py-3 active:opacity-80 disabled:opacity-50"
          >
            {isFetching ? (
              <ActivityIndicator color="#0a0a0b" />
            ) : (
              <Text className="font-bold text-app-bg">{t('fetchCta')}</Text>
            )}
          </Pressable>
          {isLoading && !data ? (
            <Text className="text-app-muted text-sm">{t('result')}…</Text>
          ) : data != null ? (
            <Text
              className="rounded-lg bg-app-bg p-3 font-mono text-[10px] text-app-fg"
              selectable
            >
              {JSON.stringify(data, null, 2)}
            </Text>
          ) : (
            <Text className="text-app-muted text-sm">{t('clickToFetch')}</Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}
