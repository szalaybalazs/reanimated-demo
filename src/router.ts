import {
  AuthenticationScreen,
  CatalogScreen,
  HomeScreen,
  MaterialScreen,
  RetailersScreen,
  TurntableScreen,
  CompositionScreen,
} from './routes';

interface iNavRoute {
  name: string;
  component: any;
  options?: any;
}

interface iRouter {
  routes: iNavRoute[];
  home: string;
}

const router = (token: string | null): iRouter => {
  return {
    home: token ? 'HOME' : 'AUTH',
    routes: [
      {
        name: 'AUTH',
        component: AuthenticationScreen,
      },
      {
        name: 'HOME',
        component: HomeScreen,
      },
      {
        name: 'CATALOG',
        component: CatalogScreen,
      },
      {
        name: 'MATERIAL',
        component: MaterialScreen,
        options: {
          gestureEnabled: false,
          stackAnimation: 'fade',
        },
      },
      {
        name: 'RETAILERS',
        component: RetailersScreen,
      },
      {
        name: 'TURNTABLE',
        component: TurntableScreen,
        options: {
          gestureEnabled: false,
          stackAnimation: 'fade',
        },
      },
      {
        name: 'COMPOSITION',
        component: CompositionScreen,
        options: {
          gestureEnabled: false,
          stackAnimation: 'fade',
        },
      },
    ],
  };
};

export default router;
