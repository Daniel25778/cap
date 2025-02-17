/* eslint-disable sort-keys-fix/sort-keys-fix */
export enum routePaths {
  login = '/',
  panel = '/painel',
  match = '/partida',
  matchDetails = '/partida/:matchId',
  teamRegister = '/partida/:matchId/cadastrar-time',
  functionalityTest = '/painel/teste-de-funcinalidade/:functionalityKeyword',
  home = '/plataforma',
  platform = '/plataforma/:platformKeyword',
  functionality = '/plataforma/:platformKeyword/:functionalityKeyword',
  profile = '/perfil',
  recoverPassword = '/recuperar-senha',
  register = '/cadastro'
}

export const paths = {
  login: '/',
  home: '/plataforma',
  match: 'partida',
  panel: '/painel',
  teamRegister: (matchId: string): string => `/partida/${matchId}/cadastrar-time`,
  matchDetails: (matchId: string): string => `/partida/${matchId}`,
  profile: '/perfil',
  recoverPassword: '/recuperar-senha',
  register: '/cadastro'
};

export const apiPaths = {
  default: '/default',
  auth: '/login',
  resetPassword: '/reset-password',
  executeFunctionality: '/functionality/execute',
  platform: '/platform',
  player: '/player',
  match: '/match',
  user: '/user',
  favoriteUserFunctionality: '/favorite-user-functionality',
  functionality: '/functionality',
  newFunctionality: '/new-functionality',
  email: 'email'
};
