/*
router.js

A very simple hash-based router for SPA apps
using window.location.hash. To use:
1. Create functions in /routes directory
   for each route
2. Import this module into main.jsx
3. Add anchor links into index for each page

Note that you need to include each of the
routes in the router.js page. Check the
routes dictionary.
*/

type StringFunctionDictionary = {
  [key: string]: (...args: any[]) => any;
};

export function router(routes: StringFunctionDictionary) {
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    const h = isNullOrEmpty(location.hash) ? '#/' : location.hash;
    const hash = parseRoute(h);
    render(hash, routes);
  });

  // Initial render
  window.addEventListener('DOMContentLoaded', () => {
    const h = isNullOrEmpty(location.hash) ? '#/' : location.hash;
    const hash = parseRoute(h); //location.hash.slice(1) || '/';
    render(hash, routes);
  });
}

// Render function: updates #app content
function render(route, routes) {
  const app = document.getElementById('route');
  if (app !== null) {
    if (route.length === 1) {
      // no parameters
      const view = routes[`/${route}`] || NotFound;
      app.innerHTML = ''; //clear
      app.appendChild(view());
    } else {
      // parameter is included
      console.log(route);
      const id = parseInt(route[1]);
      const view = routes[`/${route[0]}/:id`] || NotFound;
      console.log(view);
      console.log(id);
      app.innerHTML = ''; //clear
      app.appendChild(view(id));
    }
  }
}

function parseRoute(hash) {
  console.log(hash);
  const parts = hash.split('/').slice(1); // remove '#' and split
  console.log(parts);
  return parts;
}

// Fallback view for unknown routes
function NotFound() {
  return '<h1>404 - Page Not Found</h1>';
}

const isNullOrEmpty = function (str: string) {
  return (
    str === null || // null
    str === undefined || // undefined
    (typeof str === 'string' && str.trim().length === 0) // empty or whitespace
  );
};
