import '@root/css/style.css';
import '../../lib/createElement.js';
import '../../lib/createFragment.js';
import HomeRoute from '@routes/homeRoute';
import ReactiveRoute from '@routes/reactiveRoute';
import PostsRoute from '@routes/postsRoute/postsRoute.js';
import { type RouteRuleArray } from '@root/js/lib/router';
import styles from '@root/js/widgets/appWidget/appWidget.module.css';
import { ToastWidget } from '@widgets/toastWidget/toastWidget.tsx';
import FooterWidget from '@widgets/footerWidget/footerWidget.tsx';
import HeaderWidget from '@widgets/headerWidget/headerWidget.tsx';
import MainWidget from '@widgets/mainWidget/mainWidget.tsx';

// Set up routing
const routes: RouteRuleArray = [
  { name: 'Home', path: '/', handler: HomeRoute },
  { name: 'Posts', path: '/posts', handler: PostsRoute },
  { name: 'Reactive', path: '/reactive', handler: ReactiveRoute },
];

const x = (
  <div class={styles.app}>
    {ToastWidget()}
    {HeaderWidget(routes)}
    {MainWidget(routes)}
    {FooterWidget()}
  </div>
);

document.querySelector<HTMLDivElement>('#app')!.appendChild(x);
