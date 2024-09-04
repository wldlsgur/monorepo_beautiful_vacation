import Lottie from 'react-lottie-player';
import { CONFIG } from '@/shared/constant';
import { LOGO_LOTTIE } from '@/shared/lottie';
import { KakaoIcon } from '@/shared/svg';
import * as S from './style';

const { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URL } = CONFIG;
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
