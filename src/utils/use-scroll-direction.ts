import { useState, useEffect } from 'react';

export default function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(
    null,
  );
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScrollPosition > prevScrollPosition) {
        setScrollDirection('down');
      } else if (currentScrollPosition < prevScrollPosition) {
        setScrollDirection('up');
      }

      setPrevScrollPosition(currentScrollPosition);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPosition]);

  return scrollDirection;
}
