import { reactiveValue } from '@root/js/lib/reactive';
import { getPosts } from './postsHttp';
import { Button } from '@root/js/widgets/button/button';
import { Input } from '@root/js/widgets/input/input';
import { TableWidget } from '@root/js/widgets/table/table';
import { ModalWidget } from '@root/js/widgets/modal/modalWidget';

export default function PostsRoute() {
  // Render JSX
  (async () => {
    const posts = await getPosts();
    const tableContent = (
      <>
        {Button({
          label: 'Click Me',
          click: () => alert('clicked!'),
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
          initialVisibility: true,
          children: Input({
            name: 'Name',
            type: 'text',
            label: 'label',
            rows: 4,
            disabled: false,
            value: new reactiveValue(0),
          }),
        })}
      </>
    );
    document.getElementById('posts')!.appendChild(tableContent);
  })();

  return <div id="posts"></div>;
}
