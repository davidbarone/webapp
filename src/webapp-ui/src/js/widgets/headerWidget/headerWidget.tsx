import fn from './headerWidget';
import { type RouteRuleArray } from '@root/js/lib/router';

const { navBarSlideOn } = fn;

export default function HeaderWidget(routes: RouteRuleArray) {
  window.addEventListener('DOMContentLoaded', function () {
    // Add 'auto-hide nav bar'
    navBarSlideOn(document.getElementsByTagName('header')[0]);
  });

  return (
    <header>
      <div class="container-fixed">
        {routes.map((route) => (
          <a href={`#${route.path}`}>{route.name}</a>
        ))}
      </div>
    </header>
  );
}
