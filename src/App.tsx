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

function App() {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<HTMLHtmlElement>(null);
  const { scrollDirection, scrollY } = useScrollDirection();

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    const isBeyondViewport = window.scrollY > elTopOffset + elHeight;

    // TODO: this condinition should be different
    // if (isBeyondViewport) {
    //   setSticky({ isSticky: true, offset: elHeight });
    // } else {
    //   setSticky({ isSticky: false, offset: 0 });
    // }

    // console.log(scrollDirection, scrollY);
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      if (!headerRef) {
        return;
      }

      if (!headerRef.current) {
        return;
      }

      const header = headerRef.current.getBoundingClientRect();

      handleScroll(header.top, header.height);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const headerCn = cn(css.header, { [css.sticky]: sticky.isSticky });
  const rootCn = cn(css.root, { [css.withStickyHeader]: sticky.isSticky });

  return (
    <div className={rootCn}>
      <div className={css.values}>
        <p>{window.scrollY}</p>
      </div>

      <header ref={headerRef} className={headerCn}>
        HEADER
      </header>
      <section className={css.section}>SECTION </section>
      <aside className={css.aside}>ASIDE</aside>
      <footer className={css.footer}>FOOTER</footer>
    </div>
  );
}

export default App;
