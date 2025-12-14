/* -------------------------------------------
autoHideNavBar (on/off)
----------------------------------------------*/
const navBarSlideOn = function (element): number {
  let didScroll;
  let lastScrollTop = 0;
  const delta = 5;
  const navbarHeight = element.offsetHeight;
  const el = element;

  window.onscroll = function () {
    didScroll = true;
  };

  const interval = setInterval(function () {
    if (didScroll) {
      console.log('x');
      handleScroll();
      didScroll = false;
    }
  }, 250);

  function handleScroll() {
    const st = window.pageYOffset;

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      if (!el.classList.contains('header-up')) {
        el.classList.add('header-up');
      }
      if (el.classList.contains('header-down')) {
        el.classList.remove('header-down');
      }
    } else {
      // Scroll Up
      //                if (st + window.offsetHeight < document.offsetHeight) {
      if (el.classList.contains('header-up')) {
        el.classList.remove('header-up');
      }
      if (!el.classList.contains('header-down')) {
        el.classList.add('header-down');
      }
      //                }
    }
    lastScrollTop = st;
  }

  return interval;
};

const navBarSlideOff = function (interval: number) {
  clearInterval(interval);
  window.onscroll = function () {};
};

export default {
  navBarSlideOn,
  navBarSlideOff,
};
