import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

const usePreventScrollRestoration = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);
};

export default usePreventScrollRestoration;
