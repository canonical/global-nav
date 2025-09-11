import { setUpListeners } from './listeners';
import {
  useDesktopListeners,
  useResizeListener as desktopResizeListener,
} from '../simple/listeners';

/*
The sliding navigation is meant only for mobile.
That's why we add also the desktop listeners.
*/

const DEFAULT_ANIMATION_DURATION = 100;

export const initNavigationSliding = (
  breakpoint,
  closeMenuAnimationDuration,
  dropdownAnimationDuration
) => {
  const { closeDesktopGlobalNav } = useDesktopListeners();
  desktopResizeListener(breakpoint);

  const addListeners = setUpListeners(
    closeDesktopGlobalNav,
    closeMenuAnimationDuration || DEFAULT_ANIMATION_DURATION,
    dropdownAnimationDuration || DEFAULT_ANIMATION_DURATION
  );
  addListeners();
};
