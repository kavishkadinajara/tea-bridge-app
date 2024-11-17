import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image, ActivityIndicator, Platform } from "react-native";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { supabase } from "../../lib/supabase";

import { Button } from "@/components/nativewindui/Button";

const Register = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const submit = async () => {
    if (
      !form.fullName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.role
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            fullName: form.fullName,
            role: form.role, // Save the user role in Supabase metadata
          },
        },
      });

      if (error) {
        throw error;
      }
      Alert.alert("Success", "Account created successfully. Please log in.");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
        <View className="flex-1 justify-center items-center px-5 py-10">
          <Image
            source={require('../../assets/images/icon.png')}
            resizeMode="contain"
            className="w-40 h-40 mb-8"
          />

          <Text className="text-2xl font-bold text-green-700 mb-4">
            Register for Tea Bridge
          </Text>

          {/* Form Fields */}
          <FormField
            title="Full Name"
            value={form.fullName}
            placeholder="Enter your full name"
            handleChangeText={(e) => setForm({ ...form, fullName: e })}
            otherStyles="mt-4"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-4"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-4"
            secureTextEntry
          />

          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            placeholder="Confirm your password"
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-4"
            secureTextEntry
          />

          <View className="w-full mt-8">
            <Button
                size={Platform.select({ ios: 'lg', default: 'md' })}
                className="bg-[#22d607] rounded-lg shadow-lg hover:bg-[#1cb906] w-full flex items-center justify-center"
                onPress={submit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center text-lg font-bold">Sign in</Text>
                )}
            </Button>
          </View>

          {/* Navigate to Login */}
          <View className="flex flex-row justify-center items-center mt-8">
            <Text className="text-base text-gray-600">
              Already have an account?
            </Text>
            <Link href="/login" className="text-base text-green-700 font-semibold ml-2">
              Log In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
