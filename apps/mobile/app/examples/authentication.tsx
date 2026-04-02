import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Stack } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "@/providers/intl-provider";
import { signIn, useSession } from "@/libs/auth-client";

const DEMO_PASSWORD = "password123";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SigninFormValues = z.infer<typeof signinSchema>;

const inputClassName =
  "rounded-lg border border-app-border bg-app-input px-3 py-2.5 text-base text-app-fg";

export default function AuthenticationScreen() {
  const t = useTranslations("Landing.step8");
  const { data: session, isPending: sessionLoading } = useSession();
  const [authResult, setAuthResult] = useState<unknown>(null);

  const demoEmail = useMemo(
    () => `demo-${Date.now()}@example.com`,
    [],
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: demoEmail,
      password: DEMO_PASSWORD,
    },
  });

  const onSubmit = async (values: SigninFormValues) => {
    setAuthResult(null);
    const res = await signIn.email({
      email: values.email,
      password: values.password,
    });
    setAuthResult(res ?? null);
  };

  return (
    <>
      <Stack.Screen options={{ title: t("title") }} />
      <ScrollView
        className="flex-1 bg-app-bg"
        contentContainerClassName="gap-5 p-5"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-app-muted text-sm leading-5">
          better-auth/react — signIn.email same as web.
        </Text>

        <View className="gap-2">
          <Text className="mb-1.5 text-xs font-semibold text-app-muted">
            {t("signinTitle")}
          </Text>
          <Text className="mb-1.5 text-xs font-semibold text-app-muted">
            {t("emailLabel")}
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`${inputClassName} placeholder:text-app-muted`}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="you@example.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.email != null ? (
            <Text className="text-xs text-app-destructive">
              {errors.email.message}
            </Text>
          ) : null}

          <Text className="mb-1.5 mt-2 text-xs font-semibold text-app-muted">
            {t("passwordLabel")}
          </Text>
          <Controller
            control={control}
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
          {errors.password != null ? (
            <Text className="text-xs text-app-destructive">
              {errors.password.message}
            </Text>
          ) : null}

          <Pressable
            onPress={() => void handleSubmit(onSubmit)()}
            disabled={isSubmitting}
            className="mt-2 items-center rounded-lg bg-app-accent py-3.5 active:opacity-85 disabled:opacity-50"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#0a0a0b" />
            ) : (
              <Text className="font-bold text-app-bg">{t("signInButton")}</Text>
            )}
          </Pressable>
        </View>

        <View className="gap-2 rounded-xl border border-app-border bg-app-card p-3.5">
          <Text className="text-[11px] font-semibold text-app-muted">
            {t("responseLabel")}
          </Text>
          <Text className="font-mono text-[11px] text-app-fg" selectable>
            {authResult != null
              ? JSON.stringify(authResult, null, 2)
              : "// Submit to see response"}
          </Text>
        </View>

        <View className="gap-2 rounded-xl border border-app-border bg-app-card p-3.5">
          <Text className="text-[11px] font-semibold text-app-muted">
            {t("accountTitle")} (useSession)
          </Text>
          {sessionLoading ? (
            <ActivityIndicator color="#fafafa" />
          ) : (
            <Text className="font-mono text-[11px] text-app-fg" selectable>
              {session != null
                ? JSON.stringify(session, null, 2)
                : t("accountNotSignedIn")}
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}
