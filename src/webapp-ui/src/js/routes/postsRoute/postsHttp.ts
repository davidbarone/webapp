import { HttpWrapper } from '@root/js/lib/httpWrapper';
import { API_URL } from '@root/js/lib/environment';
import type { PostType } from './api.types';

export async function getPosts(): Promise<PostType[]> {
  const wrapper = new HttpWrapper(API_URL);
  return await wrapper.apiGet('posts');
}
