import { useEffect, useMemo, useState } from 'react';
import { type Course } from '../types';
import { load, save } from '../store/localStorage';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>(
    load<Course[]>('courses', [])
  );
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);

  useEffect(() => save('courses', courses), [courses]);

  function addCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get('title') || '').trim();
    const category = (fd.get('category') as 'A' | 'B') || 'B';
    const level = (fd.get('level') as 'početni' | 'napredni') || 'početni';
    const description = String(fd.get('description') || '').trim();
    const lessons = Number(fd.get('lessons') || 6);
    if (!title || !description) return alert('Popunite naslov i opis');
    const next: Course = {
      id: crypto.randomUUID(),
      title,
      category,
      level,
      description,
      lessons,
    };
    setCourses([next, ...courses]);
    (e.currentTarget as HTMLFormElement).reset();
    alert('Kurs dodat (lokalno)');
  }

  return (
    <div className='mx-auto max-w-6xl px-3 py-6'>
      <h1 className='text-xl font-semibold mb-4'>Kursevi</h1>

      {user?.role === 'instructor' && (
        <div className='rounded-2xl bg-white shadow p-4 mb-6'>
          <h3 className='font-semibold mb-2'>Dodaj kurs</h3>
          <form onSubmit={addCourse} className='grid md:grid-cols-5 gap-3'>
            <input
              name='title'
              placeholder='Naslov'
              className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 md:col-span-2'
            />
            <select
              name='category'
              className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200'
            >
              <option value='B'>B</option>
              <option value='A'>A</option>
            </select>
            <select
              name='level'
              className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200'
            >
              <option value='početni'>Početni</option>
              <option value='napredni'>Napredni</option>
            </select>
            <input
              name='lessons'
              type='number'
              min={1}
              defaultValue={6}
              className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200'
            />
            <input
              name='description'
              placeholder='Kratak opis'
              className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 md:col-span-5'
            />
            <button className='px-4 py-2 rounded-xl bg-blue-600 text-white shadow md:col-span-1'>
              Sačuvaj
            </button>
          </form>
        </div>
      )}

      <div className='grid md:grid-cols-2 gap-4'>
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>

      <div className='mt-4'>
        <Pagination
          page={page}
          total={filtered.length}
          pageSize={size}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
