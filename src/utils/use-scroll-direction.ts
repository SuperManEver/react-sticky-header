import { useState, useEffect } from 'react';

const Y_DIFF_THRESHOLD = 0;

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up' | null>(
    null,
  );
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      if (direction !== scrollDirection) {
        // console.log(direction);

        setScrollDirection(direction);

        console.log('scrollDirection: ', scrollDirection);
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;

      setScrollY(lastScrollY);
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return { scrollDirection, scrollY };
}
