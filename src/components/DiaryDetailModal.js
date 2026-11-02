import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';
import { isValidDate } from './EntryForm';

const DANGER = '#DC2626';

export default function DiaryDetailModal({
  visible,
  onClose,
  onDelete,
  onEdit,
  entry,
}) {
  // Simpan entri terakhir supaya isi modal tidak hilang saat animasi tutup.
  const lastEntry = useRef(entry);
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: '',
    date: '',
    preview: '',
    body: '',
  });
  if (entry) lastEntry.current = entry;
  const shown = lastEntry.current;

  if (!shown) return null;
  const { id, title, date, preview, body, moodImage } = shown;

  const setField = (key) => (text) =>
    setDraft((prev) => ({ ...prev, [key]: text }));

  const dateValid = isValidDate(draft.date.trim());
  const canSave =
    draft.title.trim().length > 0 &&
    draft.preview.trim().length > 0 &&
    dateValid;

  const close = () => {
    setConfirming(false);
    setEditing(false);
    onClose();
  };

  const confirmDelete = () => {
    setConfirming(false);
    onDelete?.(id);
  };

  const startEdit = () => {
    setConfirming(false);
    setDraft({ title, date, preview, body });
    setEditing(true);
  };

  const saveEdit = () => {
    if (!canSave) return;
    onEdit?.(id, {
      title: draft.title.trim(),
      date: draft.date.trim(),
      preview: draft.preview.trim(),
      body: draft.body.trim() || draft.preview.trim(),
    });
    setEditing(false);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={close}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Image source={moodImage} style={styles.hero} resizeMode="cover" />

          {editing ? (
            <View style={styles.content}>
              <Text style={styles.heading}>Edit Entri</Text>

              <TextInput
                value={draft.title}
                onChangeText={setField('title')}
                placeholder="Judul"
                style={styles.input}
              />

              <TextInput
                value={draft.date}
                onChangeText={setField('date')}
                placeholder="YYYY-MM-DD"
                style={[styles.input, !dateValid && styles.inputError]}
              />
              {!dateValid && (
                <Text style={styles.error}>
                  Tanggal harus berformat YYYY-MM-DD dan valid.
                </Text>
              )}

              <TextInput
                value={draft.preview}
                onChangeText={setField('preview')}
                placeholder="Ringkasan..."
                style={styles.input}
              />

              <TextInput
                value={draft.body}
                onChangeText={setField('body')}
                placeholder="Isi lengkap..."
                style={[styles.input, styles.multiline]}
                multiline
              />

              <Pressable
                onPress={saveEdit}
                disabled={!canSave}
                style={[styles.button, !canSave && styles.buttonDisabled]}
              >
                <Text style={styles.buttonText}>Simpan</Text>
              </Pressable>

              <Pressable
                onPress={() => setEditing(false)}
                style={styles.outlineButton}
              >
                <Text style={styles.outlineText}>Batal</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.date}>{date}</Text>
              <Text style={styles.body}>{body}</Text>

              <Pressable onPress={close} style={styles.button}>
                <Text style={styles.buttonText}>Tutup</Text>
              </Pressable>

              <Pressable
                onPress={startEdit}
                style={styles.outlineButton}
                accessibilityLabel="Edit entri"
              >
                <Text style={styles.outlineText}>Edit</Text>
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
          )}
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
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: SPACE.s },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: DANGER },
  error: { color: DANGER, fontSize: TYPO.caption },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '700' },
  outlineButton: {
    padding: SPACE.m,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.accent,
    alignItems: 'center',
  },
  outlineText: { color: COLORS.accent, fontWeight: '700' },
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