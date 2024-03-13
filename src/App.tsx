import { useEffect, useRef, useState, useCallback } from 'react';
import cn from 'clsx';

import useScrollDirection from './utils/use-scroll-direction';

import './global.css';

import css from './styles.module.scss';

/**
 *
 * starting position:
 *  display header using normal document flow (position: relative or absolute)
 *
 * track 'scroll' event
 *  what should I capture on scroll event??
 *    - whether is scroll up or scroll down
 *    - when header is beyond viewport
 *
 */

const HEADER_HEIGHT = 80;

function getDistanceToTop() {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

function useStickyHeader(scrollDirection: 'up' | 'down' | null) {
  const [isSticky, setSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleSticky = () => {
    if (headerRef && headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();

      if (scrollDirection === 'down') {
        if (getDistanceToTop() > HEADER_HEIGHT) {
          setSticky(true);
        }
      }

      // it means we reached TOP but scrolling up
      if (scrollDirection === 'up') {
        if (rect.top <= 0 && getDistanceToTop() <= 0) {
          setSticky(false);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleSticky);

    return () => {
      window.removeEventListener('scroll', toggleSticky);
    };
  }, [toggleSticky]);

  return { headerRef, isSticky };
}

function App() {
  const scrollDirection = useScrollDirection();
  const { headerRef, isSticky } = useStickyHeader(scrollDirection);

  const belowThreshold = window.scrollY > 82;

  const rootCn = cn(css.root);
  const headerCn = cn(css.header, {
    [css.sticky]: isSticky,
    [css.visible]: isSticky && scrollDirection === 'up',
    [css.hidden]: isSticky && scrollDirection === 'down',
  });

  const valuesCn = cn(css.values, { [css.sticky]: belowThreshold });

  return (
    <div className={rootCn}>
      <div className={valuesCn}>
        <p>
          HEADER RECT TOP:{' '}
          {headerRef &&
            Math.round(headerRef.current?.getBoundingClientRect().top || 0)}
        </p>
        <p>window.scrollY: {window.scrollY}</p>
        <p>
          document.documentElement.scrollTop:{' '}
          {document.documentElement.scrollTop}
        </p>
        <p>{scrollDirection}</p>
        <p>{isSticky ? 'STICKY' : 'NOT STICKY'}</p>

        {headerRef && headerRef.current && <p>{headerRef.current.style}</p>}
      </div>

      <header ref={headerRef} className={headerCn}>
        HEADER
      </header>

      {/* {isSticky && <header className={css.stickyHeader}>HEADER</header>} */}
      <section className={css.section}>SECTION </section>
    </div>
  );
}

export default App;
