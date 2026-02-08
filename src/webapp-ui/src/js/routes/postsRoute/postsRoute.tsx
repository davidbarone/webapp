import { getPosts, deletePost, initPosts } from './postsHttp';
import { TableWidget } from '@root/js/widgets/tableWidget/tableWidget';
import { type PostType } from '@root/js/routes/postsRoute/api.types';
import { ButtonWidget } from '@root/js/widgets/buttonWidget/buttonWidget';
import { showToast } from '@root/js/widgets/toastWidget/toastWidget';

async function render() {
  const posts = await getPosts();
  const initContent = (
    <>
      {ButtonWidget({
        label: 'Reset',
        visible: true,
        click: () => {
          initPosts()
            .then(() => {
              showToast({
                message: 'Data has been initialised.',
                type: 'success',
              });
              render();
            })
            .catch((result) =>
              showToast({
                message: result,
                type: 'error',
              })
            );
        },
      })}
    </>
  );
  const tableContent = (
    <>
      {TableWidget<PostType>({
        visible: true,
        data: posts,
        onDelete: (row) => {
          deletePost(row.id)
            .then(() => {
              showToast({
                message: 'Row deleted.',
                type: 'success',
              });
              render();
            })
            .catch((error) => {
              showToast({
                message: error,
                type: 'error',
              });
            });
        },
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
  document.getElementById('posts')!.innerHTML = '';
  document.getElementById('posts')!.appendChild(initContent);
  document.getElementById('posts')!.appendChild(tableContent);
}

export default function PostsRoute() {
  // Render JSX
  render();

  return <div id="posts"></div>;
}
