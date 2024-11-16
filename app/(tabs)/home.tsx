import React from 'react'
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '../../components/nativewindui/Text';

export default function home() {
  return (
        <ThemedView>
            <Text>This is Home page</Text>
        </ThemedView>
    );
}
