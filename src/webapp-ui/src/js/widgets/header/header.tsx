import fn from './header';
const { navBarSlideOn } = fn;

export default function Header() {
  window.addEventListener('DOMContentLoaded', function () {
    // Add 'auto-hide nav bar'
    navBarSlideOn(document.getElementsByTagName('header')[0]);
  });

  return (
    <header>
      <div class="container-fixed">
        <a href="#/">Home</a>
        <a href="#/about">About</a>
        <a href="#/articles">Articles</a>
      </div>
    </header>
  );
}
