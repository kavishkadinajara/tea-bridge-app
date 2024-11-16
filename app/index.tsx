import { Icon } from '@roninoss/icons';
import { Link } from 'expo-router';
import { Platform, View, Image, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/nativewindui/Button';
import { Text } from '../components/nativewindui/Text';
import { useColorScheme } from '../lib/useColorScheme';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsentScreen() {
  const { colors } = useColorScheme();

  return (
    <SafeAreaView style={ROOT_STYLE}>
      <View className="mx-auto max-w-sm flex-1 justify-between gap-6 px-8 py-4">
        {/* Welcome Header */}
        <View className="ios:pt-8 pt-12">
          <Text
            variant="largeTitle"
            className="ios:text-left ios:font-black text-center font-bold text-emerald-900"
          >
            Welcome to
          </Text>
          <Text
            variant="largeTitle"
            className="ios:text-left ios:font-black text-[#22bf0a] text-center font-bold"
          >
            TeaBridge
          </Text>
          {/* Logo */}
          <View className="flex justify-center items-center">
          <Image
            source={require('../assets/images/icon.png')} // Replace with your TeaBridge logo
            style={{
              height: 200,
              width: 200,
              resizeMode: 'contain',
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
            }}
            
          />
          </View>
        </View>

        {/* Features Section */}
        <View className="gap-8">
          {FEATURES.map((feature) => (
            <View key={feature.title} className="flex-row gap-4">
              <View className="pt-px">
                <Icon
                  name={feature.icon}
                  size={38}
                  color={colors.primary}
                  ios={{ renderingMode: 'hierarchical' }}
                />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-[#22d607]">{feature.title}</Text>
                <Text variant="footnote" className="text-gray-700">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer Section */}
        <View className="gap-4">
          {/* Terms and Privacy */}
          <View className="items-center">
            <Icon
              name="play-outline"
              size={24}
              color={colors.primary}
              ios={{ renderingMode: 'hierarchical' }}
            />
            <Text variant="caption2" className="pt-1 text-center text-gray-600">
              By pressing continue, you agree to our{' '}
              <Link href="/">
                <Text variant="caption2" className="text-[#22d607] underline">
                  Terms of Service
                </Text>
              </Link>{' '}
              and that you have read our{' '}
              <Link href="/">
                <Text variant="caption2" className="text-[#22d607] underline">
                  Privacy Policy
                </Text>
              </Link>
            </Text>
          </View>

          {/* Continue Button */}
          <Link href="../login" replace asChild>
            <Button
              size={Platform.select({ ios: 'lg', default: 'md' })}
              className="bg-[#22d607] rounded-lg shadow-lg hover:bg-[#1cb906]"
            >
              <Text className="text-white text-lg font-bold">Continue</Text>
            </Button>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const FEATURES = [
  {
    title: 'Supplier Management',
    description:
      'Easily connect with suppliers to manage tea leaf deliveries and transactions.',
    icon: 'account-off-outline',
  },
  {
    title: 'Factory Insights',
    description:
      'Access detailed analytics about production processes and quality metrics.',
    icon: 'water-outline',
  },
  {
    title: 'Marketplace Integration',
    description:
      'Seamlessly connect with buyers to sell your products globally.',
    icon: 'cart-outline',
  },
] as const;
