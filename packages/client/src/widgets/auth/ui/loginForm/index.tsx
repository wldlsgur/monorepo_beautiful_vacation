import Lottie from 'react-lottie-player';
import { ENV } from '@/shared/Constant';
import { LOGO_LOTTIE } from '@/shared/lottie';
import { KakaoIcon } from '@/shared/svg';
import * as S from './style';

const { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URL } = ENV;
const KAKAO_LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

const LoginForm = () => {
  return (
    <S.Form>
      <Lottie
        animationData={LOGO_LOTTIE}
        play
        loop
        speed={1}
        style={{ width: 200, height: 200 }}
      />
      <S.OauthLink to={KAKAO_LOGIN_URL}>
        <KakaoIcon />
        카카오 로그인
      </S.OauthLink>
    </S.Form>
  );
};

export default LoginForm;
