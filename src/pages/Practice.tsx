import { useEffect, useState } from 'react';
import { CITIES, fetchCurrentWeather } from '../api/openMeteo';
import { FaWind, FaThermometerHalf } from 'react-icons/fa';

type Weather = {
  temperature_2m: number;
  wind_speed_10m: number;
};

export default function Practice() {
  const [cityIndex, setCityIndex] = useState(0);
  const [w, setW] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const city = CITIES[cityIndex];

  async function load() {
    try {
      setLoading(true);
      const data = await fetchCurrentWeather(city.lat, city.lon);
      setW(data.current);
    } catch {
      setW(null);
      alert('Greška pri preuzimanju vremena');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    load();
  }, [cityIndex]);

  return (
    <div className='mx-auto max-w-6xl px-3 py-6'>
      <h1 className='text-xl font-semibold mb-4'>
        Praktična obuka — vremenski uslovi
      </h1>
      <div className='rounded-2xl bg-white shadow p-4 mb-4 flex items-center gap-3'>
        <select
          value={cityIndex}
          onChange={(e) => setCityIndex(Number(e.target.value))}
          className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200'
        >
          {CITIES.map((c, i) => (
            <option key={c.name} value={i}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          onClick={load}
          className='px-4 py-2 rounded-xl bg-blue-600 text-white shadow disabled:opacity-50'
          disabled={loading}
        >
          Osveži
        </button>
      </div>

      <div className='grid md:grid-cols-3 gap-4'>
        <InfoCard
          icon={<FaThermometerHalf />}
          label='Temperatura'
          value={w ? `${w.temperature_2m}°C` : '—'}
        />
        <InfoCard
          icon={<FaWind />}
          label='Vetar'
          value={w ? `${w.wind_speed_10m} m/s` : '—'}
        />
      </div>

      <p className='text-xs text-slate-500 mt-4'>Podaci sa Open-Meteo.</p>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='rounded-2xl bg-white shadow p-4 flex items-center gap-3'>
      <div className='text-blue-600 text-xl'>{icon}</div>
      <div>
        <div className='text-sm text-slate-500'>{label}</div>
        <div className='font-semibold'>{value}</div>
      </div>
    </div>
  );
}
