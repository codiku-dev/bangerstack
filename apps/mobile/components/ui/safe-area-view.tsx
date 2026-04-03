import { styled } from 'nativewind';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

/** Interop NativeWind : `className` ne s’applique pas au `SafeAreaView` importé tel quel (composant tiers). */
export const SafeAreaView = styled(RNSafeAreaView);
