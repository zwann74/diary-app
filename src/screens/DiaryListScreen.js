import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';
import { getMoodImage } from '../data/moods';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

const STORAGE_KEY = 'diary-app:entries';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-18',
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit.',
    mood: 'happy',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-17',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai.',
    mood: 'focus',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-16',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body: 'Sore ini saya menikmati waktu di taman sambil membaca buku.',
    mood: 'calm',
  },
];

export default function DiaryListScreen() {
  // STATE UTAMA
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const [contentWidth, setContentWidth] = useState(null);

  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const numColumns = twoCols ? 2 : 1;
  const keyForCols = `cols-${numColumns}`;
  const availWidth = contentWidth ?? width;
  const itemWidth = twoCols
    ? Math.floor((availWidth - SPACE.l * 2 - SPACE.m) / 2)
    : undefined;

  // Muat entri tersimpan saat layar pertama kali tampil.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && active) {
          const saved = JSON.parse(raw);
          if (Array.isArray(saved)) setEntries(saved);
        }
      } catch (e) {
        console.warn('Gagal memuat entri:', e);
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Simpan setiap kali entri berubah, setelah pemuatan awal selesai.
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries)).catch((e) =>
      console.warn('Gagal menyimpan entri:', e)
    );
  }, [entries, loaded]);

  // DERIVED STATE: Memfilter entri berdasarkan kata kunci pencarian
  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter((entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.preview.toLowerCase().includes(q) ||
      entry.date.toLowerCase().includes(q)
    );
  }, [entries, query]);

  const toggleLike = (id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addEntry = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
  };
  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    setSelected(null);
  };

  const renderItem = ({ item }) => (
    <View style={itemWidth ? { width: itemWidth } : undefined}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodImage={getMoodImage(item.mood)}
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLike(item.id)}
        onPress={() =>
          setSelected({ ...item, moodImage: getMoodImage(item.mood) })
        }
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.header}>Buku Harian</Text>

      <FlatList
        data={filtered}
        key={keyForCols}
        numColumns={numColumns}
        columnWrapperStyle={twoCols ? styles.row : undefined}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View
            style={styles.headerWrap}
            onLayout={(e) => setContentWidth(e.nativeEvent.layout.width)}
          >
            <SearchBar value={query} onChange={setQuery} />
            <EntryForm onSubmit={addEntry} />
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
        onDelete={deleteEntry}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  listContent: {
    padding: SPACE.l,
    gap: SPACE.m,
    paddingTop: SPACE.m,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
  },
  row: { gap: SPACE.m },
  headerWrap: { marginHorizontal: -SPACE.l },
});