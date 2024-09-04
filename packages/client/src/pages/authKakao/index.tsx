import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { MUTATE_OPTION, DOMAIN_URL } from '@/shared/constant';
import { KAKAO_LOANING_LOTTIE } from '@/shared/lottie';
import * as S from './style';

const AuthKakao = () => {
  const code = new URL(window.location.href).searchParams.get('code') as string;
  const { mutateAsync } = useMutation(MUTATE_OPTION.KAKAO_LOGIN({ code }));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKakaoLogin = async () => {
      await mutateAsync();
      navigate(DOMAIN_URL.HOME);
    };

    fetchKakaoLogin();
  }, [mutateAsync, navigate]);

  return (
    <S.Wrapper>
      <Lottie
        animationData={KAKAO_LOANING_LOTTIE}
        play
        loop
        speed={1}
        style={{ width: 200, height: 200 }}
      />
    </S.Wrapper>
  );
};

export default AuthKakao;
