export const isProduction = process.env.REACT_STATIC_ENV === 'production';

export const siteName = 'Анонимный чат';

export const siteUrl = isProduction
  ? 'https://xn----7sbb4afrfacg5c4c7b.xn--p1ai'
  : 'http://localhost:3000';

export const wsUrl = isProduction
  ? 'wss://api.xn----7sbb4afrfacg5c4c7b.xn--p1ai'
  : 'ws://localhost:3001';
