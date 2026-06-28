import { TabsWidget } from '@root/js/widgets/tabsWidget/tabsWidget.tsx';

export default function TestRoute() {
  return (
    <>
      <h1>Tab Widget</h1>
      {TabsWidget({
        tabs: [
          {
            id: 'tab1',
            title: 'Tab 1',
            content: (
              <>
                <h2>Tab #1</h2>This is contents of tab 1.
              </>
            ),
            default: true,
          },
          {
            id: 'tab2',
            title: 'Tab 2',
            content: (
              <>
                <h2>Tab #2</h2>This is contents of tab 2.
              </>
            ),
            default: false,
          },
          {
            id: 'tab3',
            title: 'Tab 3',
            content: (
              <>
                <h2>Tab #3</h2>This is contents of tab 3.
              </>
            ),
            default: false,
          },
        ],
      })}
    </>
  );
}
