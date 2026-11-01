import React, { useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  // Simpan entri terakhir supaya isi modal tidak hilang saat animasi tutup.
  const lastEntry = useRef(entry);
  if (entry) lastEntry.current = entry;
  const shown = lastEntry.current;

  if (!shown) return null;
  const { title, date, body, moodImage } = shown;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ScrollView>
          <Image source={moodImage} style={styles.hero} resizeMode="cover" />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.body}>{body}</Text>
            <Pressable onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  hero: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: '#ddd',
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: { padding: SPACE.l, gap: SPACE.s },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: SPACE.s },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700' },
});