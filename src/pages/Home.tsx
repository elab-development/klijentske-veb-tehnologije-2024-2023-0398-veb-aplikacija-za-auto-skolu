import { FaClipboardList, FaSchool, FaTools } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user, login } = useAuth();

  return (
    <div className='mx-auto max-w-6xl px-3 py-6'>
      {!user && (
        <section className='grid md:grid-cols-2 gap-4'>
          <div className='rounded-2xl bg-white shadow p-5'>
            <h2 className='text-lg font-semibold mb-2'>Prijava</h2>
            <LoginForm onLogin={(name, role) => login(name, role)} />
          </div>
          <div className='rounded-2xl bg-blue-600 text-white shadow p-5'>
            <h2 className='text-lg font-semibold mb-2'>
              Dobro došli u Auto školu
            </h2>
            <p className='opacity-90'>
              Platforma za kurseve, materijale, testove i planiranje praktične
              obuke.
            </p>
          </div>
        </section>
      )}

      {user && (
        <section className='grid md:grid-cols-3 gap-4'>
          <Card to='/courses' title='Kursevi' icon={<FaSchool />} />
          <Card to='/materials' title='Materijali' icon={<FaTools />} />
          <Card to='/tests' title='Testovi' icon={<FaClipboardList />} />
        </section>
      )}

      {user?.role === 'instructor' && (
        <section className='mt-6'>
          <div className='rounded-2xl bg-white shadow p-5'>
            <h3 className='font-semibold mb-3'>Instruktorski alati</h3>
            <p className='text-sm text-slate-600 mb-3'>
              Kreirajte nove kurseve ili ažurirajte postojeće (lokalno čuvanje).
            </p>
            <Link
              to='/courses'
              className='inline-block px-4 py-2 rounded-xl bg-blue-600 text-white shadow'
            >
              Upravljanje kursevima
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

function Card({
  to,
  title,
  icon,
}: {
  to: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className='rounded-2xl bg-white shadow p-5 flex items-center gap-3 hover:shadow-md'
    >
      <div className='text-blue-600 text-xl'>{icon}</div>
      <div className='font-semibold'>{title}</div>
    </Link>
  );
}

function LoginForm({
  onLogin,
}: {
  onLogin: (name: string, role: 'student' | 'instructor') => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget as HTMLFormElement);
        const fullName = String(fd.get('fullName') || '').trim() || 'Korisnik';
        const role =
          (String(fd.get('role')) as 'student' | 'instructor') || 'student';
        onLogin(fullName, role);
      }}
      className='flex flex-col gap-3'
    >
      <input
        name='fullName'
        placeholder='Ime i prezime'
        className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200'
      />
      <select
        name='role'
        className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200'
      >
        <option value='student'>Student</option>
        <option value='instructor'>Instruktor</option>
      </select>
      <button className='px-4 py-2 rounded-xl bg-blue-600 text-white shadow'>
        Prijavi se
      </button>
    </form>
  );
}
