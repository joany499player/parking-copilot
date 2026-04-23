import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { api } from '../../api';

type Spot = {
  id: string;
  name: string;
  status: string;
  until: string;
  price: string;
};
export default function MapScreen() {
  const [spots, setSpots] = useState<Spot[]>([]);

  useEffect(() => {
    api.get('/spots').then((response) => {
      setSpots(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 28, fontWeight: '700', marginBottom: 16 }}>
        Parking Map
      </Text>
            {spots.map((spot) => (
        <View
          key={spot.id}
          style={{ backgroundColor: '#1F2937', borderRadius: 16, padding: 16, marginBottom: 12 }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 8 }}>
            {spot.name}
          </Text>

          <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 6 }}>
            {spot.price}
          </Text>

          <Text
            style={{
                            color: spot.status === 'Warning' ? 'orange' : 'lightgreen',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 12,
            }}
          >
            {spot.status} until {spot.until}
          </Text>

          <Link href="/modal" asChild>
            <Pressable
              style={{
                backgroundColor: 'blue',
                paddingVertical: 12,
                borderRadius: 12,
                                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
                View Details
              </Text>
            </Pressable>
          </Link>
        </View>
      ))}
    </View>
  );
}