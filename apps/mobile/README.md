# BangerStack Mobile (Expo)

Même stack **data** que `apps/web` : **tRPC** (`@repo/trpc`), **Better Auth** (`better-auth/react`), et les mêmes fichiers **i18n** (`i18n/en.json`, `i18n/fr.json`) via un `IntlProvider` compatible React Native.

## Config

1. Depuis la racine du monorepo : `bun install` (dépendances isolées par workspace ; pas d’étape de sync manuelle).
2. Copier `apps/mobile/.env.example` → `apps/mobile/.env` et définir **`EXPO_PUBLIC_API_BASE_URL`** (voir commentaires dans l’example). Démarre **`apps/api`** pour les exemples tRPC / auth.
3. `bun run dev:mobile+api` à la racine, ou dans ce dossier : `bun run dev`
4. Ajouter un paquet npm : dans `apps/mobile`, exécuter `bun add <paquet>` (mise à jour du lockfile à la racine).

## Écrans d’exemple

| Route | Contenu |
|-------|---------|
| `/` | Liens vers les démos |
| `/examples/type-safety` | `trpc.app.hello` |
| `/examples/api-protection` | hello / protected / role (comme le web) |
| `/examples/authentication` | `signIn.email` + `useSession` |
| `/examples/internationalisation` | FR / EN, messages partagés avec le web |

## Détails techniques

- **`libs/trpc-client.ts`** / **`libs/auth-client.ts`** : URLs dérivées de `getApiBaseUrl()` (`EXPO_PUBLIC_API_BASE_URL` ou `http://127.0.0.1:3090`).
- **`metro.config.js`** : `watchFolders` + `nodeModulesPaths` (app + racine) pour le monorepo et les paquets `workspace:*`.
- **`env-type.ts`** : schéma Zod pour `check-env` (même script que les autres apps).

---

## Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies (from monorepo root)

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bun run dev
   # or: npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
