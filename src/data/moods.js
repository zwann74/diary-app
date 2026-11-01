export const MOODS = {
  happy: require('../../assets/moods/happy.jpg'),
  focus: require('../../assets/moods/focus.jpg'),
  calm: require('../../assets/moods/calm.jpg'),
  default: require('../../assets/moods/default.jpg'),
};

export const getMoodImage = (key) => MOODS[key] ?? MOODS.default;