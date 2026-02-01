import { HttpWrapper } from '@root/js/lib/httpWrapper';
import { API_URL } from '@root/js/lib/environment';
import type { PostType } from './api.types';

export async function getPosts(): Promise<PostType[]> {
  const wrapper = new HttpWrapper(API_URL);
  return await wrapper.apiGet('posts');
}

export async function deletePost(postId: number): Promise<void> {
  const wrapper = new HttpWrapper(API_URL);
  return await wrapper.apiDelete(`posts/${postId}`);
}

export async function initPosts(): Promise<void> {
  const wrapper = new HttpWrapper(API_URL);
  return await wrapper.apiPost('init', {});
}
