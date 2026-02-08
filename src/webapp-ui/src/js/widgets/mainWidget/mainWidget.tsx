import logo from '@root/assets/logo.png';
import { type RouteRuleArray, router } from '@root/js/lib/router.tsx';
import styles from '@root/js/widgets/mainWidget/mainWidget.module.css';

export default function MainWidget(routes: RouteRuleArray) {
  router(routes, 'route');
  return (
    <main class={styles.main}>
      <div class="title">
        <div class="container-fixed">
          <div class="col s100 m75">dbarone.com</div>
          <div class="col s100 m25 logo">
            <img src={logo} class="logo" alt="logo" />
          </div>
        </div>
      </div>
      <div class="route container-fixed" id="route"></div>
    </main>
  );
}
