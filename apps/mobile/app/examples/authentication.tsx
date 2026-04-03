import { ScrollView } from 'react-native';
import { AuthDemo } from '@/components/landing/auth-demo';
import { SafeAreaView } from '@/components/ui/safe-area-view';

export default function AuthenticationScreen() {
  return (
    <SafeAreaView className="flex-1 bg-app-bg">
      <ScrollView
        className="flex-1 bg-app-bg"
        contentContainerClassName="gap-8 p-5 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <AuthDemo />
      </ScrollView>
    </SafeAreaView>
  );
}
