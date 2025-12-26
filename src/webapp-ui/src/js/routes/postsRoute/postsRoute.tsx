import { reactiveValue } from '@root/js/lib/reactive';
import { getPosts } from './postsHttp';
import { Button } from '@root/js/widgets/button/button';
import { Input } from '@root/js/widgets/input/input';

export default function PostsRoute() {
  // Render JSX
  (async () => {
    const posts = await getPosts();
    const tableContent = (
      <>
        {Input({
          name: 'Name',
          type: 'text',
          label: 'label',
          rows: 4,
          disabled: false,
          value: new reactiveValue(0),
        })}

        {Button({
          label: 'Click Me',
          click: () => alert('clicked!'),
        })}
        {posts.map((p) => (
          <div>{p.teaser}</div>
        ))}
      </>
    );
    document.getElementById('posts')!.appendChild(tableContent);
  })();

  return <div id="posts"></div>;
}
