module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/index.js', // 컴파일된 JavaScript 파일
      instances: 1, // 인스턴스 수 설정
      exec_mode: 'cluster', // 클러스터 모드 (옵션)
      watch: false, // 프로덕션 모드에서는 false
      env: {
        NODE_ENV: 'production',
      },
      interpreter: 'node',
      interpreter_args: '-r tsconfig-paths/register',
    },
    {
      name: 'server-dev',
      script: 'src/index.ts', // 개발 모드에서 TypeScript 파일 직접 실행
      instances: 1, // 인스턴스 수 설정
      exec_mode: 'fork', // 포크 모드 (개발 모드에서는 클러스터 모드 대신)
      watch: ['src'], // 핫 리로드를 위해 소스 파일만 감시
      ignore_watch: ['node_modules', 'dist'], // 무시할 파일 및 디렉토리
      env: {
        NODE_ENV: 'development',
      },
      interpreter: 'node',
      interpreter_args: '-r tsconfig-paths/register -r ts-node/register', // TypeScript 실행을 위한 설정
    },
  ],
};
