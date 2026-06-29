import styles from '@widgets/tabsWidget/tabsWidget.module.css';

interface TabsPropsType {
  tabs: Array<TabPropsType>;
}

interface TabPropsType {
  id: string;
  title: string;
  default: boolean;
  content?: HTMLElement;
}

const initTabs = () => {
  // Select all tab containers
  const tabContainers = document.querySelectorAll(`.${styles.tabs}`);
  if (!tabContainers.length) return;

  tabContainers.forEach((container) => {
    const buttons = container.querySelectorAll(
      [`.${styles.tabButtons}`, 'button'].join(' ')
    );
    const contents = container.querySelectorAll(`.${styles.tabContent}`);
    if (!buttons.length || !contents.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-tab');
        if (!targetId) return;

        // Deactivate all buttons
        buttons.forEach((btn) => btn.classList.remove('active'));

        // Activate clicked button
        button.classList.add('active');

        // Deactivate all content panels
        contents.forEach((content) => content.classList.remove('active'));

        // Activate target content if exists
        const target = container.querySelector('#' + targetId);
        if (target) {
          target.classList.add('active');
        }
      });
    });
  });
};

export const TabsWidget = (props: TabsPropsType) => {
  const tabs = props.tabs.map((t) => (
    <div
      class={
        t.default ? [styles.tabContent, 'active'].join(' ') : styles.tabContent
      }
      id={t.id}
    >
      {t.content}
    </div>
  ));

  const content = (
    <>
      <div class={styles.tabs} id="example-tabs">
        <div class={styles.tabButtons}>
          {props.tabs.map((t) => (
            <button data-tab={t.id} class={t.default ? 'active' : ''}>
              {t.title}
            </button>
          ))}
        </div>
        {tabs}
      </div>
    </>
  );

  //https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask
  // Need to run initTabs after the content is attached to the DOM.
  queueMicrotask(() => {
    initTabs();
  });

  return content;
};
