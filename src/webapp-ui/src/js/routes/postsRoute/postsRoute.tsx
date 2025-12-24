import { getPosts } from './postsHttp';
import { Button } from '@root/js/widgets/button/button';

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
        {posts.map((p) => (
          <div>{p.teaser}</div>
        ))}
      </>
    );
    document.getElementById('posts')!.appendChild(tableContent);
  })();

  return <div id="posts"></div>;
}
