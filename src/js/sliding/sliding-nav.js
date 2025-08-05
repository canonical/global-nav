import { setUpListeners } from './listeners';
import {
  useDesktopListeners,
  useResizeListener as desktopResizeListener,
} from '../simple/listeners';

export const initNavigationSliding = (breakpoint, animationDuration) => {
  const { closeDesktopGlobalNav } = useDesktopListeners();
  desktopResizeListener(breakpoint);

  const { addListeners, useResizeListener } = setUpListeners(
    breakpoint,
    animationDuration,
    closeDesktopGlobalNav
  );
  addListeners();
  useResizeListener();
};
