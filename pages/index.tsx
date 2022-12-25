import { Suspense, useEffect, useState } from 'react';

import Container from '../components/Container';
import VideoCard from '../components/VideoCard';

export default function Home() {
  const [currently_reading, set_currently_reading] = useState([]);
  const [finished_reading, set_finished_reading] = useState([]);

  const get_currently_reading = async () => {
    const reading = await import('currently_reading.json');
    set_currently_reading(reading.default);
  };

  const get_previously_read = async () => {
    const read = await import('previously_read.json');
    set_finished_reading(read.default);
  };

  useEffect(() => {
    get_currently_reading();
    get_previously_read();
  }, []);

  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            Currently Reading
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            book i'm reading right now. my reading list often involves
            non-fiction and sometimes fiction.
            {currently_reading.map((book, index) => {
              return (
                <VideoCard
                  key={index + 1}
                  index={index + 1}
                  href={book.url}
                  title={book.title}
                  author={book.author}
                />
              );
            })}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-16 text-black dark:text-white">
            Previously Read
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            books i've finished reading. to see more of my previously read
            books, visit{' '}
            <a
              id="bio"
              href="https://www.goodreads.com/review/list/130435184-mano-sriram?ref=nav_mybooks&shelf=read"
            >
              my goodreads profile
            </a>
            {finished_reading.map((book, index) => {
              return (
                <VideoCard
                  key={index + 1}
                  index={index + 1}
                  href={book.url}
                  title={book.title}
                  author={book.author}
                />
              );
            })}
          </p>
        </div>
      </Container>
    </Suspense>
  );
}
