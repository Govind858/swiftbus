import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MapPin, ArrowRightLeft, Calendar, Users, Bus, Clock, DollarSign, Search } from 'lucide-react-native';

// Mock data for cities
const citiesData = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad',
  'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'
];

// Mock bus data
const busMockData = [
  {
    id: 1,
    busOperator: 'Volvo Travels',
    departureTime: '08:00 AM',
    arrivalTime: '04:00 PM',
    duration: '8h 00m',
    seats: 32,
    price: 850,
    busType: 'AC Sleeper'
  },
  {
    id: 2,
    busOperator: 'Shree Travels',
    departureTime: '10:30 AM',
    arrivalTime: '06:30 PM',
    duration: '8h 00m',
    seats: 45,
    price: 750,
    busType: 'AC Semi Sleeper'
  },
];

const RouteSelection = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [availableBuses, setAvailableBuses] = useState([]);

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const handleSearch = () => {
    if (fromCity && toCity && travelDate) {
      console.log('Searching routes:', {
        from: fromCity,
        to: toCity,
        date: travelDate,
        passengers
      });
      setAvailableBuses(busMockData);
    }
  };

  return (
    <View style={styles.container}>
      {/* City Selection Inputs */}
      <View style={styles.inputRow}>
        <View style={styles.pickerContainer}>
          <MapPin size={20} />
          <Picker
            selectedValue={fromCity}
            onValueChange={(itemValue) => setFromCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Origin" value="" />
            {citiesData.filter(city => city !== toCity).map(city => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.swapButton} onPress={swapCities}>
          <ArrowRightLeft size={20} />
        </TouchableOpacity>

        <View style={styles.pickerContainer}>
          <MapPin size={20} />
          <Picker
            selectedValue={toCity}
            onValueChange={(itemValue) => setToCity(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Destination" value="" />
            {citiesData.filter(city => city !== fromCity).map(city => (
              <Picker.Item key={city} label={city} value={city} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Travel Date Input */}
      <View style={styles.inputRow}>
        <Calendar size={20} />
        <TextInput
          placeholder="Select Date (YYYY-MM-DD)"
          value={travelDate}
          onChangeText={setTravelDate}
          style={styles.input}
        />
      </View>

      {/* Passenger Selection */}
      <View style={styles.inputRow}>
        <Users size={20} />
        <Picker
          selectedValue={passengers}
          onValueChange={(itemValue) => setPassengers(itemValue)}
          style={styles.picker}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <Picker.Item key={num} label={`${num} Passenger${num > 1 ? 's' : ''}`} value={num} />
          ))}
        </Picker>
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={!fromCity || !toCity || !travelDate}>
        <Search size={20} color="white" />
        <Text style={styles.searchButtonText}>Search Buses</Text>
      </TouchableOpacity>

      {/* Bus Results */}
      {availableBuses.length > 0 && (
        <FlatList
          data={availableBuses}
          keyExtractor={(bus) => bus.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.busCard}>
              <View style={styles.busHeader}>
                <Bus size={20} />
                <Text style={styles.busOperator}>{item.busOperator}</Text>
                <Text style={styles.busType}>{item.busType}</Text>
              </View>

              <View style={styles.busDetails}>
                <View style={styles.busTime}>
                  <Clock size={16} />
                  <Text>{item.departureTime}</Text>
                  <Text>→ {item.arrivalTime}</Text>
                </View>
                <Text>{item.duration}</Text>
                <Text>{item.seats} Seats</Text>
                <View style={styles.priceContainer}>
                  <DollarSign size={16} />
                  <Text>₹{item.price}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.payButton} onPress={() => console.log(`Paying for bus ${item.id}`)}>
                <Text style={styles.payButtonText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  pickerContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingVertical: 5 },
  picker: { flex: 1, height: 40 },
  swapButton: { marginHorizontal: 10, padding: 8, backgroundColor: '#ddd', borderRadius: 8 },
  input: { flex: 1, borderBottomWidth: 1, paddingVertical: 5, marginLeft: 8 },
  searchButton: { flexDirection: 'row', backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  searchButtonText: { color: '#fff', marginLeft: 8, fontWeight: 'bold' },
  busCard: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, marginVertical: 10 },
  busHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  busOperator: { fontSize: 16, fontWeight: 'bold' },
  busType: { fontSize: 12, color: '#666' },
  busDetails: { marginTop: 10 },
  busTime: { flexDirection: 'row', alignItems: 'center' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  payButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  payButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default RouteSelection;
