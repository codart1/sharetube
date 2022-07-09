import { CreatePostForm } from '../../shared/CreatePostForm';
import { rpc } from '../../shared/rpc/hook';
import { withAuthGuard } from '../../shared/withAuthGuard';

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
