import { getPosts, deletePost } from './postsHttp';
import { TableWidget } from '@root/js/widgets/table/table';
import { type PostType } from '@root/js/routes/postsRoute/api.types';

export default function PostsRoute() {
  // Render JSX
  (async () => {
    const posts = await getPosts();
    const tableContent = (
      <>
        {TableWidget<PostType>({
          visible: true,
          data: posts,
          onDelete: (row) => deletePost(row.id),
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
              rows: 2,
              value: (post) => post.teaser,
            },
            content: {
              name: 'content',
              type: 'text',
              label: 'Content',
              rows: 5,
              value: (post) => post.content,
            },
            author: {
              name: 'author',
              type: 'input',
              label: 'Author',
              value: (post) => post.author,
            },
            createdDt: {
              name: 'createdDt',
              type: 'datetime-local',
              label: 'Created Date',
              value: () => '2024-12-31T23:59',
            },
          },
        })}
      </>
    );
    document.getElementById('posts')!.appendChild(tableContent);
  })();

  return <div id="posts"></div>;
}
