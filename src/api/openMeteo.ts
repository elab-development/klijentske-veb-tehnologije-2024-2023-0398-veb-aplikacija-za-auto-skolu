export type City = { name: string; lat: number; lon: number };

export const CITIES: City[] = [
  { name: 'Beograd', lat: 44.787, lon: 20.457 },
  { name: 'Novi Sad', lat: 45.267, lon: 19.833 },
  { name: 'Niš', lat: 43.32, lon: 21.895 },
];

export async function fetchCurrentWeather(lat: number, lon: number) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Neuspešan zahtev ka Open-Meteo');
  return res.json() as Promise<{
    current: {
      temperature_2m: number;
      wind_speed_10m: number;
      weather_code: number;
    };
  }>;
}
