import React, { useRef, useState } from 'react';
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

const DANGER = '#DC2626';

export default function DiaryDetailModal({
  visible,
  onClose,
  onDelete,
  entry,
}) {
  // Simpan entri terakhir supaya isi modal tidak hilang saat animasi tutup.
  const lastEntry = useRef(entry);
  const [confirming, setConfirming] = useState(false);
  if (entry) lastEntry.current = entry;
  const shown = lastEntry.current;

  if (!shown) return null;
  const { id, title, date, body, moodImage } = shown;

  const close = () => {
    setConfirming(false);
    onClose();
  };

  const confirmDelete = () => {
    setConfirming(false);
    onDelete?.(id);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ScrollView>
          <Image source={moodImage} style={styles.hero} resizeMode="cover" />
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.body}>{body}</Text>

            <Pressable onPress={close} style={styles.button}>
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>

            {!confirming ? (
              <Pressable
                onPress={() => setConfirming(true)}
                style={styles.deleteButton}
                accessibilityLabel="Hapus entri"
              >
                <Text style={styles.deleteText}>Hapus</Text>
              </Pressable>
            ) : (
              <View style={styles.confirmBox}>
                <Text style={styles.confirmText}>
                  Hapus entri ini? Tindakan ini tidak bisa dibatalkan.
                </Text>
                <View style={styles.confirmRow}>
                  <Pressable
                    onPress={() => setConfirming(false)}
                    style={[styles.confirmButton, styles.cancelButton]}
                  >
                    <Text style={styles.cancelText}>Batal</Text>
                  </Pressable>
                  <Pressable
                    onPress={confirmDelete}
                    style={[styles.confirmButton, styles.yesButton]}
                  >
                    <Text style={styles.yesText}>Ya, hapus</Text>
                  </Pressable>
                </View>
              </View>
            )}
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
  deleteButton: {
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: DANGER,
    alignItems: 'center',
  },
  deleteText: { color: DANGER, fontWeight: '700' },
  confirmBox: {
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: DANGER,
    gap: SPACE.m,
  },
  confirmText: { color: COLORS.text, fontSize: TYPO.body },
  confirmRow: { flexDirection: 'row', gap: SPACE.m },
  confirmButton: {
    flex: 1,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    alignItems: 'center',
  },
  cancelButton: { borderWidth: 1, borderColor: COLORS.border },
  cancelText: { color: COLORS.text, fontWeight: '700' },
  yesButton: { backgroundColor: DANGER },
  yesText: { color: '#fff', fontWeight: '700' },
});