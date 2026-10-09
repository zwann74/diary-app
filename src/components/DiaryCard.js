import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Tambahkan moodColor di dalam kurung kurawal
export default function DiaryCard({ title, date, preview, moodUri, moodColor }) {
  return (
    // Gabungkan array style agar borderColor menyesuaikan prop moodColor
    <View style={[styles.card, { borderColor: moodColor || '#e5e7eb' }]}>
      <Image 
        source={typeof moodUri === 'string' ? { uri: moodUri } : moodUri} 
        style={styles.mood} 
      />
      {/* Sisa kodenya tetap sama ... */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
        <Text
          style={styles.preview}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {preview}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 12,
  },
  mood: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 6,
  },
  preview: {
    fontSize: 14,
  },
});