import { ElementType, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DOMAIN_URL } from '../constant';

const withIdValidation = (WrappedComponent: ElementType) => {
  const WithIdValidationComponent = (props: any) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const idNumber = Number(id);

    useEffect(() => {
      if (!id || Number.isNaN(idNumber)) {
        navigate(DOMAIN_URL.HOME);
      }
    }, [id, idNumber, navigate]);

    if (!id || Number.isNaN(idNumber)) {
      return null;
    }

    const extendedProps = { ...props, id: idNumber };

    return <WrappedComponent {...extendedProps} />;
  };

  return WithIdValidationComponent;
};

export default withIdValidation;
