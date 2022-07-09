import { noti } from '@sharetube/notification';
import { useRouter } from 'next/router';
import { CreatePostForm } from '../../shared/CreatePostForm';
import { rpc } from '../../shared/rpc/hook';
import { withAuthGuard } from '../../shared/withAuthGuard';

function CreatePostPage() {
  const { mutateAsync: createPost } = rpc.useMutation([
    'authenticated.createPost',
  ]);
  const router = useRouter();
  return (
    <CreatePostForm
      onSubmit={async (values) => {
        await createPost(values);
        noti.show('success', 'You posted a new video');
        router.push('/');
      }}
    />
  );
}

export default withAuthGuard(CreatePostPage);
