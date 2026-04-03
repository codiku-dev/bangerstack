import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from '@/providers/intl-provider';
import { signIn, signOut, signUp, useSession } from '@/libs/auth-client';

const DEMO_PASSWORD = 'password123';

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type SigninFormValues = z.infer<typeof signinSchema>;

const inputClassName =
  'rounded-lg border border-app-border bg-app-input px-3 py-2.5 text-base text-app-fg';

function getGoogleCallbackUrl(): string | undefined {
  const u = process.env.EXPO_PUBLIC_GOOGLE_AUTH_CALLBACK_URL?.trim();
  return u && u.length > 0 ? u : undefined;
}

export function AuthDemo() {
  const t = useTranslations('Landing.step8');
  const tm = useTranslations('Landing.mobile');
  const { data: session, isPending: sessionLoading } = useSession();
  const googleCb = getGoogleCallbackUrl();

  const demoEmail = useMemo(() => `demo-${Date.now()}@example.com`, []);

  const [signupResult, setSignupResult] = useState<unknown>(null);
  const [signinResult, setSigninResult] = useState<unknown>(null);

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: 'Demo User',
      email: demoEmail,
      password: DEMO_PASSWORD,
    },
  });

  const signinForm = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: demoEmail,
      password: DEMO_PASSWORD,
    },
  });

  const onSignup = async (values: SignupFormValues) => {
    setSignupResult(null);
    const res = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL: googleCb,
    });
    setSignupResult(res ?? null);
  };

  const onSignin = async (values: SigninFormValues) => {
    setSigninResult(null);
    const res = await signIn.email({
      email: values.email,
      password: values.password,
    });
    setSigninResult(res ?? null);
  };

  const onGoogle = () => {
    if (!googleCb) return;
    void signIn.social({
      provider: 'google',
      callbackURL: googleCb,
    });
  };

  return (
    <View className="gap-8">
      <Text className="text-sm leading-5 text-app-muted">{tm('authIntro')}</Text>

      <View className="gap-3">
        <Text className="text-sm font-semibold text-app-fg">{t('signupTitle')}</Text>
        <Text className="text-xs font-semibold text-app-muted">{t('nameLabel')}</Text>
        <Controller
          control={signupForm.control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={inputClassName}
              placeholder={t('namePlaceholder')}
              placeholderTextColor="#71717a"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {signupForm.formState.errors.name != null ? (
          <Text className="text-xs text-app-destructive">
            {signupForm.formState.errors.name.message}
          </Text>
        ) : null}

        <Text className="text-xs font-semibold text-app-muted">{t('emailLabel')}</Text>
        <Controller
          control={signupForm.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${inputClassName} placeholder:text-app-muted`}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder={t('emailPlaceholder')}
              placeholderTextColor="#71717a"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {signupForm.formState.errors.email != null ? (
          <Text className="text-xs text-app-destructive">
            {signupForm.formState.errors.email.message}
          </Text>
        ) : null}

        <Text className="text-xs font-semibold text-app-muted">{t('passwordLabel')}</Text>
        <Controller
          control={signupForm.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={inputClassName}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {signupForm.formState.errors.password != null ? (
          <Text className="text-xs text-app-destructive">
            {signupForm.formState.errors.password.message}
          </Text>
        ) : null}

        <Pressable
          onPress={() => void signupForm.handleSubmit(onSignup)()}
          disabled={signupForm.formState.isSubmitting}
          className="mt-1 items-center rounded-lg bg-app-accent py-3.5 active:opacity-85 disabled:opacity-50"
        >
          {signupForm.formState.isSubmitting ? (
            <ActivityIndicator color="#0a0a0b" />
          ) : (
            <Text className="font-bold text-app-bg">{t('signUpButton')}</Text>
          )}
        </Pressable>
        <View className="rounded-lg border border-app-border bg-app-bg p-3">
          <Text className="text-[10px] font-semibold text-app-muted">
            {t('responseLabel')}
          </Text>
          <Text className="mt-1 font-mono text-[10px] text-app-fg" selectable>
            {signupResult != null ? JSON.stringify(signupResult, null, 2) : '—'}
          </Text>
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-sm font-semibold text-app-fg">{t('signinTitle')}</Text>
        <Text className="text-xs font-semibold text-app-muted">{t('emailLabel')}</Text>
        <Controller
          control={signinForm.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={`${inputClassName} placeholder:text-app-muted`}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder={t('emailPlaceholder')}
              placeholderTextColor="#71717a"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {signinForm.formState.errors.email != null ? (
          <Text className="text-xs text-app-destructive">
            {signinForm.formState.errors.email.message}
          </Text>
        ) : null}

        <Text className="text-xs font-semibold text-app-muted">{t('passwordLabel')}</Text>
        <Controller
          control={signinForm.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={inputClassName}
              secureTextEntry
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {signinForm.formState.errors.password != null ? (
          <Text className="text-xs text-app-destructive">
            {signinForm.formState.errors.password.message}
          </Text>
        ) : null}

        <Pressable
          onPress={() => void signinForm.handleSubmit(onSignin)()}
          disabled={signinForm.formState.isSubmitting}
          className="mt-1 items-center rounded-lg bg-app-accent py-3.5 active:opacity-85 disabled:opacity-50"
        >
          {signinForm.formState.isSubmitting ? (
            <ActivityIndicator color="#0a0a0b" />
          ) : (
            <Text className="font-bold text-app-bg">{t('signInButton')}</Text>
          )}
        </Pressable>
        <View className="rounded-lg border border-app-border bg-app-bg p-3">
          <Text className="text-[10px] font-semibold text-app-muted">
            {t('responseLabel')}
          </Text>
          <Text className="mt-1 font-mono text-[10px] text-app-fg" selectable>
            {signinResult != null ? JSON.stringify(signinResult, null, 2) : '—'}
          </Text>
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-sm font-semibold text-app-fg">{t('googleSigninTitle')}</Text>
        {googleCb != null ? (
          <Pressable
            onPress={onGoogle}
            className="items-center rounded-lg border border-app-border bg-app-card py-3.5 active:opacity-85"
          >
            <Text className="font-semibold text-app-fg">{t('googleBrand')}</Text>
          </Pressable>
        ) : (
          <Text className="text-xs leading-5 text-app-muted">{t('googleConfigHint')}</Text>
        )}
      </View>

      <View className="gap-3">
        <Text className="text-sm font-semibold text-app-fg">
          {t('accountTitle')}
          <Text className="text-app-muted"> · {tm('sessionHookLabel')}</Text>
        </Text>
        {sessionLoading ? (
          <ActivityIndicator color="#fafafa" />
        ) : session?.user != null ? (
          <View className="gap-3 rounded-xl border border-app-border bg-app-card p-3.5">
            <Text className="text-sm text-app-fg">
              {session.user.name ?? '—'} · {session.user.email ?? '—'}
            </Text>
            <Text className="font-mono text-[10px] text-app-fg" selectable>
              {JSON.stringify(session, null, 2)}
            </Text>
            <Pressable
              onPress={() => void signOut()}
              className="items-center rounded-lg border border-app-destructive py-3 active:opacity-85"
            >
              <Text className="font-semibold text-app-destructive">
                {t('signOutButton')}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Text className="text-sm text-app-muted">{t('accountNotSignedIn')}</Text>
        )}
      </View>
    </View>
  );
}
