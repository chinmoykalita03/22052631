export const generateRandomImage = (seed: number): string => {
  const categories = ['nature', 'tech', 'food', 'animals'];
  return `https://source.unsplash.com/random/300x200/?${categories[seed % 4]}&sig=${seed}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};