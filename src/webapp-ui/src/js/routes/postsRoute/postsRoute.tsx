import { reactiveValue } from '@root/js/lib/reactive';
import { getPosts } from './postsHttp';
import { Button } from '@root/js/widgets/button/button';
import { Input } from '@root/js/widgets/input/input';
import { TableWidget } from '@root/js/widgets/table/table';
import { ModalWidget } from '@root/js/widgets/modal/modalWidget';

export default function PostsRoute() {
  const modalVisibility = new reactiveValue(true);

  const newContent = <div>test</div>;
  const modalContent = new reactiveValue(
    Input({
      name: 'Name',
      type: 'text',
      label: 'label',
      rows: 4,
      disabled: false,
      value: new reactiveValue(0),
    })
  );

  // Render JSX
  (async () => {
    const posts = await getPosts();
    const tableContent = (
      <>
        {Button({
          label: 'Click Me',
          click: () => {
            modalVisibility.set(true);
            modalContent.set(newContent);
          },
        })}

        {TableWidget({
          visible: true,
          data: posts,
          mapping: {
            Id: (row) => <>{row.id}</>,
            Teaser: (row) => <>{row.teaser}</>,
          },
        })}

        {ModalWidget({
          visibility: modalVisibility,
          children: modalContent,
        })}
      </>
    );
    document.getElementById('posts')!.appendChild(tableContent);
  })();

  return <div id="posts"></div>;
}
