import { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { usePostKakaoLogin } from '@/entities/auth';
import { DOMAIN_URL } from '@/shared/constant';
import { KAKAO_LOANING_LOTTIE } from '@/shared/lottie';
import * as S from './style';

const AuthKakao = () => {
  const code = new URL(window.location.href).searchParams.get('code') as string;
  const { mutateAsync } = usePostKakaoLogin({ code });
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
