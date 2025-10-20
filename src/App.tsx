import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Tests from './pages/Tests';
import Practice from './pages/Practice';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ensureSeed } from './data/seed';
import { useEffect } from 'react';
import CourseDetails from './pages/CourseDetails';

function Protected({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: ('student' | 'instructor')[];
}) {
  const { user } = useAuth();
  if (!user) return <Navigate to='/' replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to='/' replace />;
  return <>{children}</>;
}

export default function App() {
  useEffect(() => {
    ensureSeed();
  }, []);

  return (
    <AuthProvider>
      <div className='min-h-screen bg-slate-50'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/courses'
              element={
                <Protected>
                  <Courses />
                </Protected>
              }
            />
            <Route
              path='/courses/:id'
              element={
                <Protected>
                  <CourseDetails />
                </Protected>
              }
            />
            <Route
              path='/tests'
              element={
                <Protected>
                  <Tests />
                </Protected>
              }
            />
            <Route
              path='/practice'
              element={
                <Protected>
                  <Practice />
                </Protected>
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>
        <footer className='mt-10 py-6 border-t border-slate-100'>
          <div className='mx-auto max-w-6xl px-3 text-sm text-slate-500'>
            © {new Date().getFullYear()} Auto škola — edukacija i obuka
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
