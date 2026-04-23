import { Pressable, Text, View } from 'react-native';

export default function ScanScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 30, fontWeight: '700', marginBottom: 16 }}>
        Scan a Sign
      </Text>

      <View
        style={{
          height: 260,
                    backgroundColor: '#1F2937',
          borderRadius: 20,
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'lightgray', fontSize: 18 }}>
          Camera preview placeholder
        </Text>
      </View>

      <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 20 }}>
        Point your camera at a parking sign to get a clear verdict.
      </Text>
      <Pressable
  style={{
        backgroundColor: 'blue',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  }}
>
  <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
    Analyze Sign
  </Text>
</Pressable>
          </View>
  );
}