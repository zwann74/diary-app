import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import SearchBar from '../components/SearchBar';
import EntryForm from '../components/EntryForm';

const INITIAL_ENTRIES = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2026-10-18',
    preview: 'Jalan pagi 20 menit dan menikmati udara segar.',
    body: 'Hari ini aku bangun lebih pagi dan berjalan kaki selama 20 menit.',
    moodImage: require('../../assets/moods/happy.jpg'),
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2026-10-17',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim.',
    body: 'Hari ini cukup produktif karena beberapa target perkuliahan selesai.',
    moodImage: require('../../assets/moods/focus.jpg'),
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2026-10-16',
    preview: 'Membaca buku sambil menikmati suasana senja.',
    body: 'Sore ini saya menikmati waktu di taman sambil membaca buku.',
    moodImage: require('../../assets/moods/calm.jpg'),
  }
];

export default function DiaryListScreen() {
  // STATE UTAMA
  const [entries, setEntries] = useState(INITIAL_ENTRIES);
  const [query, setQuery] = useState('');
  const [likedIds, setLikedIds] = useState(new Set());
  const [selected, setSelected] = useState(null);
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;
  const numColumns = twoCols ? 2 : 1;
  const keyForCols = `cols-${numColumns}`;
  const itemWidth = twoCols
  ? (width - SPACE.l * 2 - SPACE.m) / 2
  : undefined;

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

    const renderItem = ({ item }) => (
      <View style={itemWidth ? { width: itemWidth } : undefined}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodImage={item.moodImage}
        liked={likedIds.has(item.id)}
        onToggleLike={() => toggleLike(item.id)}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>
      
      <SearchBar onChange={setQuery} />
      <EntryForm onSubmit={addEntry} />
      
      <FlatList
        data={filtered}
        key={keyForCols}
        numColumns={numColumns}
        columnWrapperStyle={twoCols ? styles.row : undefined}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>Belum ada entri.</Text>
        }
      />
      
      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
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
    paddingHorizontal: SPACE.l, // huruf l kecil
    paddingTop: SPACE.l,        // huruf l kecil
    color: COLORS.text,
  },
  listContent: {
    padding: SPACE.l,           // huruf l kecil
    gap: SPACE.m,
    paddingTop: SPACE.m,
  },
    empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
  },
  row: { gap: SPACE.m },
});