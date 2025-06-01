import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Home = () => {
  const [studentID, setStudentID] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const [grade, setGrade] = useState('');
  const [numericScore, setNumericScore] = useState<number | null>(null);

   const router = useRouter();

  const handleResult = () => {
    const parsedScore = parseInt(score, 10);
    if (isNaN(parsedScore)) {
      Alert.alert("Invalid Score", "Please enter a valid number.");
      return;
    }


    setNumericScore(parsedScore);
    let calculatedGrade = '';

    if (parsedScore >= 80) calculatedGrade = 'A';
    else if (parsedScore >= 75) calculatedGrade = 'B+';
    else if (parsedScore >= 70) calculatedGrade = 'B';
    else if (parsedScore >= 65) calculatedGrade = 'C+';
    else if (parsedScore >= 60) calculatedGrade = 'C';
    else if (parsedScore >= 50) calculatedGrade = 'D';
    else if (parsedScore >= 40) calculatedGrade = 'E';
    else calculatedGrade = 'F';

    setGrade(calculatedGrade);
    Alert.alert(`Result`, `Grade for ${subject} (${parsedScore}) is ${calculatedGrade}`);
  };

  const gradingData = [
    { score: '80 - 100', grade: 'A', interpretation: 'Excellent', pass: true },
    { score: '75 - 79', grade: ' B+', interpretation: 'Very Good', pass: true },
    { score: '70 - 74', grade: ' B', interpretation: 'Good', pass: true },
    { score: '65 - 69', grade: ' C+', interpretation: 'Fairly Good', pass: true },
    { score: '60 - 64', grade: ' C', interpretation: 'Average', pass: true },
    { score: '55 - 59', grade: ' D+', interpretation: 'Below Average', pass: true },
    { score: '50 - 54', grade: ' D', interpretation: 'Weak Pass', pass: true },
    { score: '0 - 49', grade: '  F', interpretation: 'Fail', pass: false },
  ];
    const handleLogout = async () => {
  try {
    console.log('Logging out...');
    await AsyncStorage.removeItem('isLoggedIn');
    Alert.alert('Logged Out', 'You have been logged out successfully.');
    router.replace('/userLogin'); // Or 'UserLogin' based on your routing
  } catch (error) {
    console.error('Logout error:', error);
    Alert.alert('Error', 'Something went wrong during logout.');
  }
};
  return (
    <LinearGradient colors={['#FFD700', '#FFF']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Welcome to Student Dashboard</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            placeholderTextColor="#888"
            value={studentID}
            onChangeText={setStudentID}
          />
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Course Name"
            placeholderTextColor="#888"
            value={subject}
            keyboardType='default'
            onChangeText={setSubject}
          />
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Score in Quiz/Exams"
            placeholderTextColor="#888"
            value={score}
            keyboardType='numeric'
            onChangeText={setScore}
          />
          <TouchableOpacity style={styles.button} onPress={handleResult}>
            <Text style={styles.buttonText}>Get Result</Text>
          </TouchableOpacity>
        </View>

        {numericScore !== null && (
          <View style={styles.card}>
            <Text style={styles.label}>Student ID: {studentID}</Text>
            <Text style={styles.label}>{subject}</Text>
            <Text style={styles.label}>Score: {numericScore}</Text>

            <View style={styles.progressBar}>
              <View
                style={{
                  backgroundColor: 'green',
                  flex: numericScore / 100,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              />
              <View
                style={{
                  backgroundColor: 'red',
                  flex: (100 - numericScore) / 100,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              />
            </View>

            <Text style={styles.gradeText}>
              Grade:{' '}
              <Text style={{ color: numericScore >= 50 ? 'green' : 'red' }}>
                {grade} {numericScore >= 50 ? '✅' : '❌'}
              </Text>
            </Text>
          </View>
        )}

        <ScrollView style={styles.tableContainer}>
          <View>
            <Text style={styles.tableTitle}>Grading System (University of Ghana)</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellHeader}>Score</Text>
              <Text style={styles.tableCellHeader}>Grade</Text>
              <Text style={styles.tableCellHeader}>Interpretation</Text>
            </View>

            {gradingData.map((row, index) => {
              const isActive = row.grade === grade;
              return (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    {
                      backgroundColor: isActive ? '#FFF3CD' : row.pass ? '#d4edda' : '#f8d7da',
                      borderWidth: isActive ? 1.5 : 0,
                      borderColor: isActive ? '#FFD700' : 'transparent',
                    },
                  ]}
                >
                  <Text style={styles.tableCell}>{row.score}</Text>
                  <Text style={styles.tableCell}>{row.grade}</Text>
                  <Text style={styles.tableCell}>{row.interpretation}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
  },
  gradeText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 20,
    maxHeight: 250,
    width: '100%',
    paddingHorizontal: 10,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#FFD700',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginVertical: 2,
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
});
