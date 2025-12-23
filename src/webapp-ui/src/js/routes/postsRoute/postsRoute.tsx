import { getPosts } from './postsHttp';
export default function PostsRoute() {
  // Render JSX
  (async () => {
    const posts = await getPosts();
    const tableContent = (
      <>
        {posts.map((p) => (
          <div>{p.teaser}</div>
        ))}
      </>
    );
    document.getElementById('posts')!.appendChild(tableContent);
  })();

  return <div id="posts"></div>;
}
