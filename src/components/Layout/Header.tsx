import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaCar, FaSignOutAlt, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/', label: 'Početna' },
  { to: '/courses', label: 'Kursevi' },
  { to: '/tests', label: 'Testovi' },
  { to: '/practice', label: 'Praktična obuka' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

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

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className='md:hidden p-2 rounded-xl bg-white shadow text-slate-700'
          aria-label='Otvori meni'
          aria-expanded={open}
          aria-controls='mobile-menu'
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile meni (collapsible panel) */}
      <div
        id='mobile-menu'
        className={`md:hidden px-3 pb-3 border-t border-slate-100 transition-[max-height,opacity] duration-200 ease-out overflow-hidden ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className='flex flex-col gap-2 pt-3'>
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={close}
              className={({ isActive }) =>
                `px-3 py-2 rounded-xl transition shadow-sm ${
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

        <div className='mt-3 flex items-center justify-between gap-3'>
          {user ? (
            <>
              <div className='flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 shadow-sm flex-1'>
                <FaUser className='text-blue-600' />
                <span className='text-sm truncate'>
                  {user.fullName} •{' '}
                  {user.role === 'student' ? 'Student' : 'Instruktor'}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  close();
                }}
                className='px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow text-slate-700 flex items-center gap-2'
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
