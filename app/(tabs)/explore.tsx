import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { parkingSpots } from '../../parkingData';

export default function MapScreen() {
  const firstSpot = parkingSpots[0];

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 28, fontWeight: '700', marginBottom: 16 }}>
        Parking Map
      </Text>
            <View
        style={{
          height: 220,
          backgroundColor: '#111827',
          borderRadius: 20,
          marginBottom: 16,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <View style={{ position: 'absolute', top: 40, left: 60, width: 18, height: 18, borderRadius: 9, backgroundColor: 'lime' }} />
        <View style={{ position: 'absolute', top: 120, right: 70, width: 18, height: 18, borderRadius: 9, backgroundColor: 'red' }} />
        <View style={{ position: 'absolute', bottom: 40, left: 140, width: 18, height: 18, borderRadius: 9, backgroundColor: 'lime' }} />
      </View>
            {parkingSpots.map((spot) => (
        <View key={spot.id} style={{ backgroundColor: '#1F2937', borderRadius: 16, padding: 16, marginBottom: 12 }}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 8 }}>
            {spot.name}
          </Text>

          <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 6 }}>
            {spot.distance} • {spot.price}
          </Text>

          <Text style={{ color: spot.status === 'Warning' ? 'orange' : 'lightgreen', fontSize: 16, fontWeight: '600', marginBottom: 16 }}>
            {spot.status} until {spot.until}
          </Text>

          {spot.id === firstSpot.id && (
                        <Link href="/modal" asChild>
              <Pressable style={{ backgroundColor: 'blue', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
                  View Details
                </Text>
              </Pressable>
            </Link>
          )}
        </View>
      ))}
    </View>
  );
}