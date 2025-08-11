import { setUpListeners } from './listeners';
import {
  useDesktopListeners,
  useResizeListener as desktopResizeListener,
} from '../simple/listeners';

/*
The sliding navigation is meant only for mobile.
That's why we add also the desktop listeners.
*/

const DEFAULT_CLOSE_MENU_ANIMATION_DURATION = 100;

export const initNavigationSliding = (breakpoint, closeMenuAnimationDuration) => {
  const { closeDesktopGlobalNav } = useDesktopListeners();
  desktopResizeListener(breakpoint);

  const { addListeners, useResizeListener } = setUpListeners(
    breakpoint,
    closeDesktopGlobalNav,
    closeMenuAnimationDuration || DEFAULT_CLOSE_MENU_ANIMATION_DURATION
  );
  addListeners();
  useResizeListener();
};
