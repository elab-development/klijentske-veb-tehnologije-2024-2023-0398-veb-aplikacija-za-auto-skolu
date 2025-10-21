import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { load, save } from '../store/localStorage';
import { type Course, type Lesson } from '../types';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>(
    load<Course[]>('courses', [])
  );
  const course = useMemo(() => courses.find((c) => c.id === id), [courses, id]);

  useEffect(() => {
    const latest = load<Course[]>('courses', courses);
    if (latest !== courses) setCourses(latest);
  }, [id]);

  if (!course) {
    return (
      <div className='mx-auto max-w-4xl px-3 py-6'>
        <p className='text-red-600'>Kurs nije pronađen.</p>
        <Link
          to='/courses'
          className='inline-flex items-center gap-2 text-blue-600 mt-2'
        >
          <FaArrowLeft /> Nazad na kurseve
        </Link>
      </div>
    );
  }

  function addLesson(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get('title') || '').trim();
    const content = String(fd.get('content') || '').trim();
    if (!title || !content) return alert('Popunite naslov i sadržaj lekcije.');

    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      title,
      content,
    };

    const nextCourses = courses.map((c) => {
      if (c.id !== course!.id) return c;
      const nextDetails = [...(c.details || []), newLesson];
      return {
        ...c,
        details: nextDetails,
        lessons: Math.max(c.lessons, nextDetails.length),
      };
    });

    setCourses(nextCourses);
    save('courses', nextCourses);
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <div className='mx-auto max-w-4xl px-3 py-6'>
      <Link
        to='/courses'
        className='inline-flex items-center gap-2 text-blue-600 mb-4'
      >
        <FaArrowLeft /> Nazad na kurseve
      </Link>

      {/* Forma za instruktora */}
      {user?.role === 'instructor' && (
        <div className='rounded-2xl bg-white shadow p-5 mb-4'>
          <h3 className='font-semibold mb-2'>Dodaj lekciju</h3>
          <form onSubmit={addLesson} className='grid md:grid-cols-5 gap-3'>
            <input
              name='title'
              placeholder='Naslov lekcije'
              className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 md:col-span-2'
            />
            <input
              name='content'
              placeholder='Kratak sadržaj / opis'
              className='px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 md:col-span-3'
            />
            <button className='px-4 py-2 rounded-xl bg-blue-600 text-white shadow md:col-span-1'>
              Sačuvaj
            </button>
          </form>
        </div>
      )}

      <div className='rounded-2xl bg-white shadow p-5'>
        <h1 className='text-xl font-semibold mb-2'>{course.title}</h1>
        <p className='text-slate-600 mb-3'>{course.description}</p>
        <div className='text-sm text-slate-500 mb-4'>
          Kategorija: <b>{course.category}</b> • Nivo: <b>{course.level}</b> •
          Broj lekcija: <b>{course.lessons}</b>
        </div>

        <h2 className='font-semibold mb-2'>Lekcije</h2>
        <div className='space-y-2'>
          {course.details && course.details.length > 0 ? (
            course.details.map((l) => (
              <div
                key={l.id}
                className='rounded-xl bg-slate-50 border border-slate-100 p-3'
              >
                <h3 className='font-medium text-blue-700'>{l.title}</h3>
                <p className='text-sm text-slate-600'>{l.content}</p>
              </div>
            ))
          ) : (
            <div className='text-sm text-slate-500'>
              Još uvek nema dodatih lekcija.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
