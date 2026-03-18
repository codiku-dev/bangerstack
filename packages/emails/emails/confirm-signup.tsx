import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import type { ReactElement } from 'react';
import { t } from '../i18n/t';
import { type EmailLocale } from '../i18n/messages';

export type ConfirmSignupProps = {
  name: string | null;
  url: string;
  locale: EmailLocale;
};

export default function ConfirmSignup(p: ConfirmSignupProps): ReactElement {
  const displayName = p.name ?? 'there';

  return (
    <Html>
      <Head />
      <Preview>
        {t({
          locale: p.locale,
          key: 'auth.signup.preview',
        })}
      </Preview>
      <Body
        style={{
          backgroundColor: '#f3f4f6',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          padding: '24px 0',
        }}
      >
        <Container
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow:
              '0 18px 45px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.04)',
            overflow: 'hidden',
          }}
        >
          <Section style={{ padding: '28px 28px 8px 28px' }}>
            <Heading
              as="h1"
              style={{
                fontSize: '22px',
                margin: '0 0 8px 0',
                color: '#020617',
                letterSpacing: '-0.03em',
              }}
            >
              {t({
                locale: p.locale,
                key: 'auth.signup.heading',
              })}
            </Heading>
            <Text
              style={{
                margin: '0 0 18px 0',
                fontSize: '14px',
                lineHeight: '22px',
                color: '#4b5563',
              }}
            >
              {t({
                locale: p.locale,
                key: 'auth.signup.body.greeting',
                values: { name: displayName },
              })}
              <br />
              <br />
              {t({
                locale: p.locale,
                key: 'auth.signup.body.text',
              })}
            </Text>
            <Section style={{ textAlign: 'center', marginBottom: '18px' }}>
              <Button
                href={p.url}
                style={{
                  display: 'inline-block',
                  background: '#111827',
                  color: '#f9fafb',
                  padding: '12px 26px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                }}
              >
                {t({
                  locale: p.locale,
                  key: 'auth.signup.cta',
                })}
              </Button>
            </Section>
            <Text
              style={{
                margin: '0 0 0 0',
                fontSize: '12px',
                lineHeight: '20px',
                color: '#6b7280',
              }}
            >
              {t({
                locale: p.locale,
                key: 'auth.signup.copy.label',
              })}
              <br />
              <a
                href={p.url}
                style={{ color: '#111827', wordBreak: 'break-all' }}
              >
                {p.url}
              </a>
            </Text>
          </Section>

          <Hr style={{ borderColor: '#e5e7eb', margin: '16px 0 0 0' }} />

          <Section style={{ padding: '14px 28px 20px 28px' }}>
            <Text
              style={{
                margin: 0,
                fontSize: '11px',
                lineHeight: '18px',
                color: '#9ca3af',
              }}
            >
              {t({
                locale: p.locale,
                key: 'auth.signup.footer',
              })}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
