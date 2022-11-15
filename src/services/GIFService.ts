import api from './ApiClient';

export const fetchGifSuggestions = async (
  q: string,
  limit: number,
  offset: number,
) => api.get('/search', {q, limit, offset});
