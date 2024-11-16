import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
// import { images } from '../constants';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { supabase } from '../lib/supabase';

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
    return (
      <Loader isLoading={loading} />
    );
  }

  if (session && session.user) {
    return <Redirect href='/home' />;
  }

  return (
    <SafeAreaView className="bg-[#000801] h-full">

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          {/* <Image
            source={images.logoH}
            className="h-[70px]"
            resizeMode="contain"
          />

          <Image
            source={images.welcome}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          /> */}

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
            Revolutionize Event{"\n"}
            Ticketing with{" "}
              <Text className="text-[#22d607]">TeaBridge</Text>
            </Text>

            {/* <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            /> */}
          </View>

          <Text className="text-sm text-gray-100 mt-7 text-center">
          Say goodbye to manual ticketing hassles and hello to effortless event experiences.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/login")}
            containerStyles={{ width: '100%', marginTop: 28 }}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

