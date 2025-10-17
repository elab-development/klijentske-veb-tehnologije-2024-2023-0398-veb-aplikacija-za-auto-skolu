import { useState } from 'react';
import { Link } from 'react-router-dom';
import { type Course } from '../types';
import { FaBookOpen, FaChevronRight } from 'react-icons/fa';
import { load, save } from '../store/localStorage';

export default function CourseCard({ course }: { course: Course }) {
  const [enrollments, setEnrollments] = useState(
    load<string[]>('enrollments', [])
  );
  const enrolled = enrollments.includes(course.id);

  const toggle = () => {
    const next = enrolled
      ? enrollments.filter((id) => id !== course.id)
      : [...enrollments, course.id];
    setEnrollments(next);
    save('enrollments', next);
  };

  return (
    <div className='rounded-2xl bg-white shadow p-4 flex flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <FaBookOpen className='text-blue-600' />
        <h3 className='font-semibold'>{course.title}</h3>
      </div>
      <p className='text-sm text-slate-600'>{course.description}</p>
      <div className='text-xs text-slate-500'>
        Kategorija: <b>{course.category}</b> • Nivo: <b>{course.level}</b> •
        Lekcija: <b>{course.lessons}</b>
      </div>
      <div className='flex items-center justify-between pt-2'>
        <button
          onClick={toggle}
          className={`px-3 py-1 rounded-xl shadow-sm transition ${
            enrolled ? 'bg-slate-100 text-slate-700' : 'bg-blue-600 text-white'
          }`}
        >
          {enrolled ? 'U mojim kursevima' : 'Upiši se'}
        </button>

        <Link
          to={`/courses/${course.id}`}
          className='px-3 py-1 rounded-xl bg-white shadow-sm text-slate-700 flex items-center gap-2 hover:shadow-md'
        >
          Detalji <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
