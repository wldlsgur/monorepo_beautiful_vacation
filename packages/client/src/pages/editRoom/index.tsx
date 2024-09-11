import { Suspense } from 'react';
import { Modal } from 'jiponent';
import { useNavigate } from 'react-router-dom';
import { withIdValidation } from '@/shared/hoc';
import { Spinner } from '@/shared/ui';
import { EditRoomForm } from '@/widgets/room/ui';

interface Props {
  id: number;
}

const EditRoom = ({ id }: Props) => {
  const navigate = useNavigate();

  return (
    <Modal
      visible
      onClose={() => navigate(-1)}
    >
      <Suspense fallback={<Spinner />}>
        <EditRoomForm roomId={id} />
      </Suspense>
    </Modal>
  );
};

export default withIdValidation(EditRoom);
