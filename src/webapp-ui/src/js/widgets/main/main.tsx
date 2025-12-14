import logo from '@root/assets/logo.png';
import { type RouteRuleArray, router } from '@root/js/lib/router.tsx';

export default function Main(routes: RouteRuleArray) {
  router(routes, 'route');
  return (
    <main>
      <div class="title">
        <div class="container-fixed">
          <div class="col s100 m75">dbarone.com</div>
          <div class="col s100 m25 logo">
            <img src={logo} class="logo" alt="logo" />
          </div>
        </div>
      </div>
      <div class="route" id="route"></div>
    </main>
  );
}
