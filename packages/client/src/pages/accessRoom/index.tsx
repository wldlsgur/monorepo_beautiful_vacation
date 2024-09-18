import { Suspense } from 'react';
import { Modal } from 'jiponent';
import { useNavigate } from 'react-router-dom';
import { withIdValidation } from '@/shared/hoc';
import { Spinner } from '@/shared/ui';
import { RoomAccessForm } from '@/widgets/auth/ui';

interface Props {
  id: number;
}

const AccessRoom = ({ id }: Props) => {
  const navigate = useNavigate();

  return (
    <Modal
      visible
      onClose={() => navigate(-1)}
    >
      <Suspense fallback={<Spinner />}>
        <RoomAccessForm roomId={id} />
      </Suspense>
    </Modal>
  );
};

export default withIdValidation(AccessRoom);
