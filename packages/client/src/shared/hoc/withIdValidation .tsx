import { ElementType } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DOMAIN_URL } from '../constant';

const withIdValidation = (WrappedComponent: ElementType) => {
  const WithIdValidationComponent = (props: any) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const idNumber = Number(id);

    if (!id || Number.isNaN(idNumber)) {
      navigate(DOMAIN_URL.HOME);
      return null;
    }

    const extendedProps = { ...props, id: idNumber };

    return <WrappedComponent {...extendedProps} />;
  };

  return WithIdValidationComponent;
};

export default withIdValidation;
