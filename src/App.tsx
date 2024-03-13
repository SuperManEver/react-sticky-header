import { useEffect, useRef, useState, useCallback } from 'react';
import cn from 'clsx';

import useScrollDirection from './utils/use-scroll-direction';

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

function useStickyHeader() {
  const [headerStickyVisible, setHeaderVisibility] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleSticky = () => {
    if (window.scrollY > 80) {
      setHeaderVisibility(true);

      if (headerRef && headerRef.current) {
        headerRef.current.style.display = 'none';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleSticky);

    return () => {
      window.removeEventListener('scroll', toggleSticky);
    };
  }, [toggleSticky]);

  return { headerRef, headerStickyVisible };
}

function App() {
  const scrollDirection = useScrollDirection();
  const { headerRef, headerStickyVisible } = useStickyHeader();

  const belowThreshold = window.scrollY > 82;

  const headerCn = cn(css.header, {
    [css.sticky]: belowThreshold,
    [css.visible]: scrollDirection === 'up' && belowThreshold,
    [css.hidden]: scrollDirection === 'down' && belowThreshold,
  });
  const rootCn = cn(css.root);

  // console.log('isSticky: ', isSticky);

  const valuesCn = cn(css.values, { [css.sticky]: belowThreshold });

  const stickyHeader = cn(css.stickyHeader);

  return (
    <div className={rootCn}>
      <div className={valuesCn}>
        <p>{window.scrollY}</p>
        <p>{scrollDirection}</p>
        <p>{headerStickyVisible ? 'visible' : 'hidden'}</p>
      </div>

      <header ref={headerRef} className={headerCn}>
        HEADER
      </header>

      {headerStickyVisible && (
        <header className={stickyHeader}>STICKY HEADER</header>
      )}

      {/* {isSticky && <header className={css.stickyHeader}>HEADER</header>} */}
      <section className={css.section}>SECTION </section>
      <aside className={css.aside}>ASIDE</aside>
      <footer className={css.footer}>FOOTER</footer>
    </div>
  );
}

export default App;
