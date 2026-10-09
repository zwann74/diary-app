import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import DiaryCard from '../components/DiaryCard';

import happyMood from '../../assets/moods/happy.png'; 

const diaryEntries = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    moodUri: happyMood, 
    moodColor: '#4ade80', 
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    moodUri: 'https://picsum.photos/seed/focus/80',
    moodColor: '#60a5fa', 
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    moodUri: 'https://picsum.photos/seed/calm/80',
    moodColor: '#fb923c', 
  },
  {
    id: 4,
    title: 'Makan Siang Bareng Teman',
    date: '2025-10-03',
    preview: 'Mencoba tempat makan baru di dekat kampus. Makanannya enak dan murah...',
    moodUri: 'https://picsum.photos/seed/food/80',
    moodColor: '#c084fc', 
  },
  {
    id: 5,
    title: 'Coding Semalaman',
    date: '2025-10-02',
    preview: 'Akhirnya berhasil memperbaiki bug yang bikin pusing dari kemarin. Rasanya lega...',
    moodUri: 'https://picsum.photos/seed/code/80',
    moodColor: '#f87171', 
  }
];

export default function DiaryListScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Buku Harian</Text>
        <Image 
          source={{ uri: 'https://picsum.photos/seed/avatar/100' }} 
          style={styles.avatar} 
        />
      </View>
      
      {diaryEntries.map((entry) => (
        <DiaryCard
          key={entry.id}
          title={entry.title}
          date={entry.date}
          preview={entry.preview}
          moodUri={entry.moodUri}
          moodColor={entry.moodColor} 
        />
      ))}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#0bf8dc',
  },
});