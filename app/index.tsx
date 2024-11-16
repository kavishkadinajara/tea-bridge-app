import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Loader from '../components/Loader';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (session && session.user) {
    return <Redirect href='/home' />;
  }

  return (
    <SafeAreaView className="bg-[#0a4627] h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          {/* Logo */}
          <Image
            source={require('../assets/teabridge_logo.png')} // Replace with your TeaBridge logo
            className="h-[80px] w-[200px]"
            resizeMode="contain"
          />

          {/* Banner Image */}
          <Image
            source={require('../assets/tea_leaves.png')} // Add a tea-related banner
            className="max-w-[380px] w-full h-[250px] mt-5"
            resizeMode="cover"
            style={{ borderRadius: 12 }}
          />

          {/* Welcome Text */}
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Welcome to{" "}
              <Text className="text-[#22d607]">TeaBridge</Text>
            </Text>

            <Text className="text-lg text-gray-100 mt-4 text-center">
              Streamline tea industry management effortlessly. Connect suppliers, buyers, and factories with ease.
            </Text>
          </View>

          {/* CTA Button */}
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/login")}
            containerStyles={{
              width: '100%',
              marginTop: 28,
              backgroundColor: '#22d607',
              borderRadius: 10,
            }}
            textStyles={{
              color: '#fff',
              fontWeight: 'bold',
            }}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="absolute bottom-4 w-full flex items-center">
        <Text className="text-gray-200 text-sm">
          Empowering Sri Lanka's tea industry
        </Text>
      </View>

      <StatusBar backgroundColor="#0a4627" style="light" />
    </SafeAreaView>
  );
}
