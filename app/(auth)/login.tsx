import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, Platform, ActivityIndicator } from "react-native";

import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { supabase } from "../../lib/supabase";
import { Button } from '../../components/nativewindui/Button';

const Login = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const submit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setSubmitting(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: form.email,
                password: form.password,
            });

            if (error) {
                throw error;
            }
            Alert.alert("Success", "User signed in successfully");
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", (error as Error).message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-green-50">
            <ScrollView contentContainerStyle={{ minHeight: Dimensions.get("window").height }}>
                <View className="flex-1 justify-center items-center px-5 py-10">
                    <Image
                        source={require('../../assets/images/icon.png')}
                        resizeMode="contain"
                        className="w-40 h-40 mb-8"
                    />

                    <Text className="text-2xl font-bold text-green-700 mb-4">
                        Log in to Tea Bridge
                    </Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="Enter your email"
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-6 text-black"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="Enter your password"
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-6"
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
                        j
                    <Button
                        size={Platform.select({ ios: 'lg', default: 'md' })}
                        className="bg-blue-500 rounded-lg shadow-lg hover:bg-blue-400 w-full flex items-center justify-center mt-4"
                        onPress={() => router.replace("/(tabs)/home")}
                    >
                        <Text className="text-white text-center text-lg font-bold">Go to Home</Text>
                    </Button>
                    </View>

                    <View className="flex flex-row justify-center items-center mt-8">
                        <Text className="text-base text-gray-600 py-3">
                            Don't have an account?
                        </Text>
                        <Link href="../register" className="text-base text-green-700 font-semibold ml-2 py-4">
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
