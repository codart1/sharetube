import { supabasePublic } from '../../shared/supabase/supabasePublic';
import { CreatePostForm } from '../../shared/CreatePostForm';
import { rpc } from '../../shared/rpc/hook';
import { withAuthGuard } from '../../shared/withAuthGuard';
import type { Post } from '@prisma/client';

export default withAuthGuard(function createPostPage() {
  const { mutateAsync: createPost } = rpc.useMutation([
    'authenticated.createPost',
  ]);
  return (
    <CreatePostForm
      onSubmit={async (values) => {
        await createPost(values);
      }}
    />
  );
});

supabasePublic
  .from<Post>('Post')
  .on('INSERT', (payload) => {
    console.log('Change received!', payload);
  })
  .subscribe();
