import { useMemo, useState } from 'react';
import { type QuizQuestion } from '../types';
import { load, save } from '../store/localStorage';

export default function Tests() {
  const questions = load<QuizQuestion[]>('quiz', []);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(-1)
  );
  const scores = load<number[]>('scores', []);

  const score = useMemo(() => {
    let s = 0;
    answers.forEach((a, i) => {
      if (a === questions[i]?.correctIndex) s++;
    });
    return s;
  }, [answers, questions]);

  const submit = () => {
    const next = [score, ...scores].slice(0, 10);
    save('scores', next);
    alert(`Rezultat: ${score}/${questions.length}`);
  };

  return (
    <div className='mx-auto max-w-6xl px-3 py-6'>
      <h1 className='text-xl font-semibold mb-4'>Testovi</h1>
      <div className='grid gap-4'>
        {questions.map((q, i) => (
          <div key={q.id} className='rounded-2xl bg-white shadow p-4'>
            <div className='font-semibold mb-2'>
              {i + 1}. {q.question}
            </div>
            <div className='grid gap-2'>
              {q.answers.map((ans, idx) => (
                <label key={idx} className='flex items-center gap-2'>
                  <input
                    type='radio'
                    name={q.id}
                    checked={answers[i] === idx}
                    onChange={() => {
                      const next = answers.slice();
                      next[i] = idx;
                      setAnswers(next);
                    }}
                  />
                  <span>{ans}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4 flex items-center gap-3'>
        <button
          onClick={submit}
          className='px-4 py-2 rounded-xl bg-blue-600 text-white shadow'
        >
          Predaj
        </button>
        <div className='text-sm text-slate-600'>
          Trenutno: {score}/{questions.length}
        </div>
      </div>

      <div className='mt-6 rounded-2xl bg-white shadow p-4'>
        <h3 className='font-semibold mb-2'>Istorija rezultata</h3>
        <div className='flex flex-wrap gap-2'>
          {scores.length === 0 && (
            <span className='text-sm text-slate-500'>
              Nema sačuvanih rezultata.
            </span>
          )}
          {scores.map((s, i) => (
            <span key={i} className='px-3 py-1 rounded-xl bg-slate-100 text-sm'>
              #{i + 1}: {s}/{questions.length}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
