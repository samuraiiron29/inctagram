import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/lib/path';
import { useDeletePostMutation } from '@/shared/api';

export const useDeletePost = (postId: string, onCloseModal: () => void, onCloseConfirm: () => void) => {
  const router = useRouter();
  const [deletePost, { isLoading, isSuccess, isError }] = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(postId).unwrap();
      router.push(PATH.POSTS);
      onCloseModal();
      onCloseConfirm();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return { handleDelete, isLoading, isSuccess, isError };
};