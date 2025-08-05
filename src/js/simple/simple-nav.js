import {
  useClickOutsideListener,
  useDesktopListeners,
  useNavElementsListeners,
  useResizeListener,
} from './listeners';

export const initNavigationSimple = breakpoint => {
  const { closeDesktopGlobalNav } = useDesktopListeners();
  useNavElementsListeners(closeDesktopGlobalNav);
  useClickOutsideListener();
  useResizeListener(breakpoint);
};
