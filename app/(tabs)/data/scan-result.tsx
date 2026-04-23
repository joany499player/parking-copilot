import { Pressable, Text, View } from 'react-native';

export default function ScanResultScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 30, fontWeight: '700', marginBottom: 16 }}>
        Scan Result
      </Text>

      <View style={{ backgroundColor: '#1F2937', borderRadius: 20, padding: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 10 }}>
          Parking Sign Analysis
        </Text>
                <Text style={{ color: 'lightgreen', fontSize: 20, fontWeight: '700', marginBottom: 12 }}>
          You can park here
        </Text>

        <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 8 }}>
          Allowed until 4:45 PM
        </Text>

        <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 8 }}>
          Max stay: 2 hours
        </Text>

        <Text style={{ color: 'orange', fontSize: 16, marginBottom: 20 }}>
          Street cleaning starts tomorrow at 8:00 AM
                  </Text>

        <Pressable style={{ backgroundColor: 'blue', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
            Activate Alert
          </Text>
        </Pressable>
      </View>
    </View>
  );
}