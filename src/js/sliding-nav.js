import { debounce } from "./utils";


const ANIMATION_SNAP_DURATION = 100;


const setActiveDropdown = (dropdownToggleButton, isActive = true) => {
  // set active state of the dropdown toggle (to slide the panel into view)
  const dropdownToggleEl = dropdownToggleButton.closest(
    '.p-navigation__item--dropdown-toggle',
  );
  if (dropdownToggleEl) {
    dropdownToggleEl.classList.toggle('is-active', isActive);
  }

  // set active state of the parent dropdown panel (to fade it out of view)
  const parentLevelDropdown = dropdownToggleEl.closest(
    '.p-navigation__dropdown',
  );
  if (parentLevelDropdown) {
    parentLevelDropdown.classList.toggle('is-active', isActive);
  }

  // set active state of the top navigation list under p-navigation__nav
  // to set the position of the sliding panel properly
  const topLevelNavigation = dropdownToggleButton.closest('.p-navigation__nav');
  if (topLevelNavigation) {
    const topLevelItems = topLevelNavigation
      .querySelectorAll(':scope > .p-navigation__items');
    // eslint-disable-next-line no-restricted-syntax
    for (const item of topLevelItems) {
      // in case there are more than one top level navigation lists, we need to
      // mark as active the one that contains the clicked button and hide the rest
      if (item.contains(dropdownToggleButton)) {
        item.classList.toggle('is-active', isActive);
      } else {
        item.classList.toggle('u-hide', isActive);
      }
    }
  }
};

const setListFocusable = (list) => {
  // turn on focusability for all direct children in the target dropdown
  if (list) {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of list.children) {
        item.children[0].setAttribute('tabindex', '0');
    }
  }
};

const setFocusable = (target) => {
  // if target dropdown is not a list, find the list in it
  const isList = target.classList.contains('p-navigation__dropdown')
    || target.classList.contains('p-navigation__items');

  if (!isList) {
    // find all lists in the target dropdown and make them focusable
    target
      .querySelectorAll('.p-navigation__dropdown')
      .forEach((element) => {
        setListFocusable(element);
      });
  } else {
    setListFocusable(target);
  }
};

const collapseDropdown = (
  dropdownToggleButton,
  targetDropdown,
  animated = false,
  animationDuration = ANIMATION_SNAP_DURATION,
) => {
  const closeHandler = () => {
    targetDropdown.setAttribute('aria-hidden', 'true');
    setActiveDropdown(dropdownToggleButton, false);
  };

  if (animated) {
    setTimeout(closeHandler, animationDuration);
  } else {
    closeHandler();
  }
};

const expandDropdown = (
  dropdownToggleButton,
  targetDropdown,
  animated = false,
  animationDuration = ANIMATION_SNAP_DURATION,
) => {
  const expandHandler = () => {
    setActiveDropdown(dropdownToggleButton);
    targetDropdown.setAttribute('aria-hidden', 'false');
    setFocusable(targetDropdown);
  };

  if (animated) {
    setTimeout(expandHandler, animationDuration);
  } else {
    expandHandler();
  }
};


export const initNavigationSliding = (breakpoint) => {
  /* eslint-disable */
  const navigation = document.querySelector('.p-navigation--sliding, .p-navigation--reduced');
  const menuButton = document.querySelector('.p-navigation__banner .p-navigation__toggle--open');

  const toggles = document.querySelectorAll('.p-navigation__nav .p-navigation__link[aria-controls]:not(.js-back-button)');
  const topNavLists = document.querySelectorAll('.p-navigation__nav > .p-navigation__items');
  const dropdownNavLists = document.querySelectorAll('.p-navigation__dropdown');
  /* eslint-enable */

  const resetToggles = () => {
    toggles.forEach((toggle) => {
      // eslint-disable-next-line no-undef
      const target = document.getElementById(
        toggle.getAttribute('aria-controls'),
      );
      if (!target) {
        return;
      }
      collapseDropdown(toggle, target);
    });
  };

  const closeAllDropdowns = () => {
    resetToggles();
    navigation.classList.remove('has-menu-open');
    menuButton.innerHTML = 'Menu';
  };

  const unfocusAllLinks = () => {
    // turn off focusability for all dropdown lists in the navigation
    dropdownNavLists.forEach((list) => {
      const elements = list.querySelectorAll('ul > li > a, ul > li > button');
      elements.forEach((element) => {
        element.setAttribute('tabindex', '-1');
      });
    });
  };

  const goBackOneLevel = (e, backButton) => {
    e.preventDefault();
    const target = backButton.closest('.p-navigation__dropdown');

    unfocusAllLinks();
    setFocusable(target.parentNode.parentNode);
    target.parentNode.querySelector('.p-navigation__link').focus();

    target.setAttribute('aria-hidden', 'true');
    setActiveDropdown(backButton, false);
  };

  const handleMenuButtonClick = (e) => {
    e.preventDefault();

    if (navigation.classList.contains('has-menu-open')) {
      closeAllDropdowns();
      // reshow scroll bar
      // eslint-disable-next-line no-undef
      document.body.style.overflow = 'visible';
    } else {
      navigation.classList.add('has-menu-open');
      unfocusAllLinks();
      e.target.innerHTML = 'Close menu';
      // eslint-disable-next-line no-restricted-syntax
      for (const topNavList of topNavLists) {
        setFocusable(topNavList);
      }
      // hide scroll bar
      // eslint-disable-next-line no-undef
      document.body.style.overflow = 'hidden';
    }
  };

  const handleClickOutsideNavigation = (e) => {
    const {target} = e;
    if (target.closest) {
      if (
        !target.closest(
          '.p-navigation, .p-navigation--sliding, .p-navigation--reduced',
        )
      ) {
        closeAllDropdowns();
      }
    }
  };

  // needed to be able to remove the listeners
  const toggleHandlerFunctions = [];
  const handleToggle = (e, toggle) => {
    e.preventDefault();

    // eslint-disable-next-line no-undef
    const target = document.getElementById(
      toggle.getAttribute('aria-controls'),
    );
    if (target) {
      // check if the toggled dropdown is child of another dropdown
      const isNested = !!target.parentNode.closest('.p-navigation__dropdown');
      if (!isNested) {
        resetToggles(target);
      }

      if (target.getAttribute('aria-hidden') === 'true') {
        // only animate the dropdown if menu is not open, otherwise just switch the visible one
        unfocusAllLinks();
        expandDropdown(
          toggle,
          target,
          !navigation.classList.contains('has-menu-open'),
        );
        navigation.classList.add('has-menu-open');
      } else {
        collapseDropdown(toggle, target, true);
        if (!isNested) {
          navigation.classList.remove('has-menu-open');
        }
      }
    }
  }

  const dropdownNavListsHandlers = [];
  const handleDropdownNavList = (e, dropdown) => {
    if (
      e.shiftKey &&
      e.key === 'Tab' &&
      // eslint-disable-next-line no-undef
      window.getComputedStyle(dropdown.children[0], null).display === 'none'
    ) {
      goBackOneLevel(e, dropdown.children[1].children[0]);
      dropdown.parentNode.children[0].focus({ preventScroll: true });
    }
  };

  const goBackOneLevelHandlers = [];
  const handleGoBackOneLevel = (e, backButton) => {
    goBackOneLevel(e, backButton);
  };

  const addListeners = () => {
    menuButton.addEventListener('click', handleMenuButtonClick);
    // when clicking outside navigation, close all dropdowns
    // eslint-disable-next-line no-undef
    document.addEventListener('click', handleClickOutsideNavigation);
    toggles.forEach((toggle) => {
      const handler = (e) => handleToggle(e, toggle)
      toggleHandlerFunctions.push(handler);
      toggle.addEventListener('click', handler);
    });
    dropdownNavLists.forEach((dropdown) => {
      const handler = (e) => handleDropdownNavList(e, dropdown);
      dropdownNavListsHandlers.push(handler);
      dropdown.children[1].addEventListener('keydown', handler);
    });
    // eslint-disable-next-line no-undef
    document.querySelectorAll('.js-back-button').forEach((backButton) => {
      const handler = (e) => handleGoBackOneLevel(e, backButton);
      goBackOneLevelHandlers.push(handler);
      backButton.addEventListener('click', handler);
    });
  };

  const removeListeners = () => {
    menuButton.removeEventListener('click', handleMenuButtonClick);
    // eslint-disable-next-line no-undef
    document.removeEventListener('click', handleClickOutsideNavigation);
    toggles.forEach((toggle) => {
      const handler = toggleHandlerFunctions.shift();
      toggle.removeEventListener('click', handler);
    });
    dropdownNavLists.forEach((dropdown) => {
      const handler = dropdownNavListsHandlers.shift();
      dropdown.children[1].removeEventListener('keydown', handler);
    });
    // eslint-disable-next-line no-undef
    document.querySelectorAll('.js-back-button').forEach((backButton) => {
      const handler = goBackOneLevelHandlers.shift();
      backButton.removeEventListener('click', handler);
    });
  };

  // hide side navigation drawer when screen is resized horizontally
  /* eslint-disable */
  let previousWidth = window.innerWidth;
  window.addEventListener(
    'resize',
    debounce(() => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== previousWidth) {
        closeAllDropdowns();
        previousWidth = currentWidth;
      }
      if (currentWidth >= breakpoint) {
        // deactivate sliding navigation listeners because we are in desktop mode
        removeListeners();
        // make sure we display the scroll bar if it was hidden
        document.body.style.overflow = 'visible';
      } else {
        // activate sliding navigation listeners
        addListeners();
      }
    }, 10),
  );
  /* eslint-enable */

  // init listeners if we are in mobile view
  // eslint-disable-next-line no-undef
  if (window.innerWidth < breakpoint) {
    addListeners();
  }
};
