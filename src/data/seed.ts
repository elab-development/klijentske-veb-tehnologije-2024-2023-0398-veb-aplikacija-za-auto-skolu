import type { Course, QuizQuestion } from '../types';
import { load, save } from '../store/localStorage';

const defaultCourses: Course[] = [
  {
    id: 'c1',
    title: 'Teorija saobraćaja - osnove',
    category: 'B',
    level: 'početni',
    description: 'Osnovna pravila, znakovi i raskrsnice.',
    lessons: 12,
    details: [
      {
        id: 'l1',
        title: 'Saobraćajni znakovi',
        content: 'Pregled osnovnih znakova opasnosti, obaveze i informacija.',
      },
      {
        id: 'l2',
        title: 'Raskrsnice',
        content: 'Pravila prolaska kroz raskrsnice i primena znaka STOP.',
      },
      {
        id: 'l3',
        title: 'Brzina kretanja',
        content: 'Ograničenja brzine u naselju i van naselja.',
      },
    ],
  },
  {
    id: 'c2',
    title: 'Praktična vožnja - gradska B',
    category: 'B',
    level: 'napredni',
    description: 'Gusta saobraćajna okruženja i parkiranje.',
    lessons: 10,
    details: [
      {
        id: 'l1',
        title: 'Polazak i zaustavljanje',
        content:
          'Postupak pravilnog polaska i zaustavljanja vozila u gradskoj vožnji.',
      },
      {
        id: 'l2',
        title: 'Parkiranje',
        content: 'Tehnike paralelnog i koso parkiranja.',
      },
      {
        id: 'l3',
        title: 'Vožnja kroz kružni tok',
        content: 'Pravila ulaska, kretanja i izlaska iz kružnog toka.',
      },
    ],
  },
  {
    id: 'c3',
    title: 'Motocikli A - teorija',
    category: 'A',
    level: 'početni',
    description: 'Specifičnosti vožnje dvotočkaša.',
    lessons: 8,
    details: [
      {
        id: 'l1',
        title: 'Zaštitna oprema',
        content: 'Kaciga, odeća i ostala zaštitna oprema za motocikliste.',
      },
      {
        id: 'l2',
        title: 'Ravnoteža',
        content: 'Osnovne tehnike održavanja ravnoteže tokom vožnje.',
      },
      {
        id: 'l3',
        title: 'Kočenje',
        content: 'Pravilna upotreba prednje i zadnje kočnice.',
      },
    ],
  },
  {
    id: 'c4',
    title: 'Motocikli A - praksa',
    category: 'A',
    level: 'napredni',
    description: 'Poligon, krivine i kočenje.',
    lessons: 10,
    details: [
      {
        id: 'l1',
        title: 'Vožnja na poligonu',
        content: 'Vežbanje slaloma i upravljanje pri malim brzinama.',
      },
      {
        id: 'l2',
        title: 'Krivine',
        content: 'Tehnika ulaska i izlaska iz krivine.',
      },
      {
        id: 'l3',
        title: 'Ubrzanje i kočenje',
        content: 'Vežbanje ravnomernog ubrzanja i blagovremenog kočenja.',
      },
    ],
  },
  {
    id: 'c5',
    title: 'Prva pomoć',
    category: 'B',
    level: 'početni',
    description: 'Osnovne procedure zbrinjavanja.',
    lessons: 5,
    details: [
      {
        id: 'l1',
        title: 'Bezbednost mesta nesreće',
        content: 'Prvi koraci prilikom pružanja pomoći.',
      },
      {
        id: 'l2',
        title: 'Osnovne mere oživljavanja',
        content: 'CPR i proveravanje vitalnih funkcija.',
      },
    ],
  },
  {
    id: 'c6',
    title: 'Noćna vožnja B',
    category: 'B',
    level: 'napredni',
    description: 'Specifične uslove slabog osvetljenja.',
    lessons: 6,
    details: [
      {
        id: 'l1',
        title: 'Upotreba svetala',
        content: 'Duga i kratka svetla, maglenke i signalizacija.',
      },
      {
        id: 'l2',
        title: 'Vidljivost',
        content:
          'Kako prepoznati prepreke i reagovati na osvetljenje drugih vozila.',
      },
    ],
  },
];

const defaultQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Ko ima prvenstvo na raskrsnici sa znakom STOP?',
    answers: [
      'Onaj ko prvi stigne',
      'Vozilo sa desne strane',
      'Vozilo sa leve strane',
      'Pešaci',
    ],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question:
      'Koja je dozvoljena brzina u naselju (ako nije drugačije označeno)?',
    answers: ['30 km/h', '40 km/h', '50 km/h', '60 km/h'],
    correctIndex: 2,
  },
  {
    id: 'q3',
    question: 'Šta znači žuto trepćuće svetlo?',
    answers: [
      'Zabrana prolaska',
      'Pažnja, povećan oprez',
      'Slobodan prolaz',
      'Zabrana skretanja levo',
    ],
    correctIndex: 1,
  },
  {
    id: 'q4',
    question: 'Minimalna dubina šare pneumatika je?',
    answers: ['1.6 mm', '2.0 mm', '1.0 mm', '2.5 mm'],
    correctIndex: 0,
  },
  {
    id: 'q5',
    question: 'Ko ima prednost na kružnom toku?',
    answers: ['Onaj ko ulazi', 'Vozilo u kružnom toku', 'Pešaci uvek', 'Niko'],
    correctIndex: 1,
  },
];

export function ensureSeed() {
  const courses = load('courses', null as any);
  if (!courses) save('courses', defaultCourses);

  const quiz = load('quiz', null as any);
  if (!quiz) save('quiz', defaultQuiz);

  const enrollments = load('enrollments', null as any);
  if (!enrollments) save('enrollments', [] as string[]);

  const scores = load('scores', null as any);
  if (!scores) save('scores', [] as number[]);
}
