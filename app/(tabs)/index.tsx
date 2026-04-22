import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ color: 'white', fontSize: 32, fontWeight: '700', marginBottom: 12 }}>Parking Copilot</Text>
      <Text style={{ color: 'lightgray', fontSize: 16, textAlign: 'center', marginBottom: 24 }}>
        Your smart parking assistant for Montreal.
      </Text>
      <Link href="/(tabs)/explore" asChild>
        <Pressable style={{ backgroundColor: 'blue', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12 }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Find Parking</Text>
        </Pressable>
              </Link>
    </View>
  );
}