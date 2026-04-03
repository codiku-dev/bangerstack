import { Pressable, ScrollView, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslations, useAppIntl } from '@/providers/intl-provider';
import { SafeAreaView } from '@/components/ui/safe-area-view';

export default function InternationalisationScreen() {
  const t = useTranslations('Landing.step5');
  const tI18n = useTranslations('I18nExample');
  const tm = useTranslations('Landing.mobile');
  const { locale, setLocale } = useAppIntl();

  return (
    <SafeAreaView className="flex-1 bg-app-bg">
      <ScrollView
        className="flex-1 bg-app-bg"
        contentContainerClassName="gap-5 p-5"
      >
        <Text className="text-app-muted text-sm leading-5">
          {tm('intlIntro')}
        </Text>

        <View className="flex-row gap-2.5">
          <Pressable
            onPress={() => setLocale('en')}
            className={`flex-1 items-center rounded-lg border border-app-border py-3 active:opacity-85 ${
              locale === 'en' ? 'bg-app-accent' : 'bg-app-card'
            }`}
          >
            <Text
              className={`font-bold ${locale === 'en' ? 'text-app-bg' : 'text-app-fg'}`}
            >
              {tm('toggleEn')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setLocale('fr')}
            className={`flex-1 items-center rounded-lg border border-app-border py-3 active:opacity-85 ${
              locale === 'fr' ? 'bg-app-accent' : 'bg-app-card'
            }`}
          >
            <Text
              className={`font-bold ${locale === 'fr' ? 'text-app-bg' : 'text-app-fg'}`}
            >
              {tm('toggleFr')}
            </Text>
          </Pressable>
        </View>

        <View className="gap-2.5 rounded-xl border border-app-border bg-app-card p-4">
          <Text className="text-xl font-bold text-app-fg">
            {tI18n('title')}
          </Text>
          <Text className="text-[15px] leading-[22px] text-app-muted">
            {tI18n('description')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
