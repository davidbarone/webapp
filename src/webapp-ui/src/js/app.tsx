import '@root/css/style.css';
import './lib/createElement.js';
import './lib/createFragment.js';
import Header from '@root/js/widgets/header/header.tsx';
import Footer from '@root/js/widgets/footer/footer.tsx';
import Main from '@root/js/widgets/main/main.tsx';
import HomeRoute from '@root/js/routes/homeRoute';
import { router } from '@root/js/lib/router';

// Set up routing
const routes = {
  '/': HomeRoute,
};

router(routes);

const x = (
  <div class="app">
    {Header()}
    {Main()}
    {Footer()}
  </div>
);

document.querySelector<HTMLDivElement>('#app')!.appendChild(x);
