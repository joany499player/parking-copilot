import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { api } from '../api';

type Spot = {
  id: string;
  name: string;
  status: string;
  until: string;
  price: string;
};

export default function ParkingDetailScreen() {
    const [alertOn, setAlertOn] = useState(false);
  const [spot, setSpot] = useState<Spot | null>(null);

  useEffect(() => {
    api.get('/spots/1').then((response) => {
      setSpot(response.data);
    });
  }, []);

  if (!spot) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    );
      }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 24, justifyContent: 'center' }}>
      <Text style={{ color: 'white', fontSize: 30, fontWeight: '700', marginBottom: 16 }}>
        Parking Validation
      </Text>

      <View style={{ backgroundColor: '#1F2937', borderRadius: 20, padding: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 10 }}>
          {spot.name}
        </Text>

        <Text
          style={{
                     color: spot.status === 'Warning' ? 'orange' : 'lightgreen',
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 12,
          }}
        >
          {spot.status}
        </Text>

        <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 8 }}>
          Until {spot.until}
        </Text>

        <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 20 }}>
          {spot.price}
                     </Text>

        <Pressable
          onPress={() => setAlertOn(true)}
          style={{ backgroundColor: 'blue', paddingVertical: 14, borderRadius: 12, alignItems: 'center' }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
            Activate Alert
          </Text>
        </Pressable>

        {alertOn && (
          <Text style={{ color: 'lightgreen', fontSize: 16, marginTop: 16, textAlign: 'center' }}>
            Alert activated successfully.
          </Text>
                  )}
      </View>
    </View>
  );
}