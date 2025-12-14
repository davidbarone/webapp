import '@root/css/style.css';
import './lib/createElement.js';
import './lib/createFragment.js';
import Header from '@root/js/widgets/header/header.tsx';
import Footer from '@root/js/widgets/footer/footer.tsx';
import Main from '@root/js/widgets/main/main.tsx';
import HomeRoute from '@root/js/routes/homeRoute';
import { type RouteRuleArray } from '@root/js/lib/router';

// Set up routing
const routes: RouteRuleArray = [
  { Name: 'Home', Path: '/', Handler: HomeRoute },
];

const x = (
  <div class="app">
    {Header(routes)}
    {Main(routes)}
    {Footer()}
  </div>
);

document.querySelector<HTMLDivElement>('#app')!.appendChild(x);
