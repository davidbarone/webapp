import { getPosts } from './postsHttp';
import { TableWidget } from '@root/js/widgets/table/table';

export default function PostsRoute() {
  // Render JSX
  (async () => {
    const posts = await getPosts();
    const tableContent = (
      <>
        {TableWidget({
          visible: true,
          data: posts,
          listMapping: {
            id: (row) => <>{row.id}</>,
            teaser: (row) => <>{row.teaser}</>,
          },
          editMapping: {
            id: {
              name: 'id',
              type: 'input',
              label: 'Id',
              value: (post) => post.id,
            },
            slug: {
              name: 'slug',
              type: 'input',
              label: 'Slug',
              value: (post) => post.slug,
            },
            teaser: {
              name: 'teaser',
              type: 'text',
              label: 'Teaser',
              rows: 5,
              value: (post) => post.teaser,
            },
            content: {
              name: 'content',
              type: 'text',
              label: 'Content',
              rows: 10,
              value: (post) => post.content,
            },
          },
        })}
      </>
    );
    document.getElementById('posts')!.appendChild(tableContent);
  })();

  return <div id="posts"></div>;
}
