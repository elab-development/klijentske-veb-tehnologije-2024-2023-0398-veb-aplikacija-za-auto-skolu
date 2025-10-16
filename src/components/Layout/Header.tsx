
import { Link, NavLink } from 'react-router-dom';
import { FaCar, FaSignOutAlt, FaUser,  } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/', label: 'Početna' },
  { to: '/courses', label: 'Kursevi' },
  { to: '/tests', label: 'Testovi' },
  { to: '/practice', label: 'Praktična obuka' },
];

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className='sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-100'>
      <div className='mx-auto max-w-6xl px-3 py-3 flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-2'>
          <FaCar className='text-blue-600' />
          <span className='font-semibold text-slate-800'>Auto škola</span>
        </Link>

        {/* Desktop navigacija */}
        <nav className='hidden md:flex items-center gap-3'>
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1 rounded-xl transition shadow-sm ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 hover:shadow'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop user sekcija */}
        <div className='hidden md:flex items-center gap-3'>
          {user ? (
            <>
              <div className='flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 shadow-sm'>
                <FaUser className='text-blue-600' />
                <span className='text-sm'>
                  {user.fullName} •{' '}
                  {user.role === 'student' ? 'Student' : 'Instruktor'}
                </span>
              </div>
              <button
                onClick={logout}
                className='px-3 py-1 rounded-xl bg-white shadow-sm hover:shadow text-slate-700 flex items-center gap-2'
              >
                <FaSignOutAlt />
                Odjava
              </button>
            </>
          ) : (
            <span className='text-sm text-slate-500'>Niste prijavljeni</span>
          )}
        </div>

       
      </div>

     
      
    </header>
  );
}
