const config = [
  {
    path: '/',
    name: 'container',
    component: reslove => require(['@/views/'], reslove),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'home',
        component: reslove => require(['@/views/home/'], reslove)
      },
      {
        path: '/file',
        name: 'file',
        component: reslove => require(['@/views/file/'], reslove)
      },
      {
        path: '/declare',
        name: 'declare',
        component: reslove => require(['@/views/declare/'], reslove)
      },
      {
        path: '/read',
        name: 'read',
        component: reslove => require(['@/views/read/'], reslove)
      },
      {
        path: '/maps',
        name: 'maps',
        component: reslove => require(['@/views/maps/'], reslove)
      },
      {
        path: '/:type/detail',
        name: 'detail',
        component: reslove => require(['@/views/article/'], reslove)
      },
      {
        path: '/user',
        name: 'user',
        component: reslove => require(['@/views/user/'], reslove),
        redirect: '/user/centerSubscribe',
        children: [
          {
            path: '/user/centerSubscribe',
            name: 'CenterSubscribe',
            component: reslove => require(['@/views/center/CenterSubscribe'], reslove),
          },
          {
            path: '/user/centerCollect',
            name: 'CenterCollect',
            component: reslove => require(['@/views/center/CenterCollect'], reslove),
          },
          {
            path: '/user/setInfo',
            name: 'SetInfo',
            component: reslove => require(['@/views/set/SetInfo'], reslove),
          },
          {
            path: '/user/setPassword',
            name: 'SetPassword',
            component: reslove => require(['@/views/set/SetPassword'], reslove),
          },
          {
            path: '/user/setSubscribe',
            name: 'SetSubscribe',
            component: reslove => require(['@/views/set/SetSubscribe'], reslove),
          },
          {
            path: '/user/releaseNew',
            name: 'ReleaseWait',
            component: reslove => require(['@/views/release/ReleaseNew'], reslove),
          },
          {
            path: '/user/releaseWait',
            name: 'ReleaseWait',
            component: reslove => require(['@/views/release/ReleaseWait'], reslove),
          },
          {
            path: '/user/releaseAlready',
            name: 'ReleaseAlready',
            component: reslove => require(['@/views/release/ReleaseAlready'], reslove),
          },
          {
            path: '/user/releaseNo',
            name: 'ReleaseNo',
            component: reslove => require(['@/views/release/ReleaseNo'], reslove),
          },
          {
            path: '/user/problem',
            name: 'Problem',
            component: reslove => require(['@/views/problem/Problem'], reslove),
          },
          {
            path: '/user/picture',
            name: 'Picture',
            component: reslove => require(['@/views/syscon/Picture'], reslove),
          },
          {
            path: '/user/link',
            name: 'Link',
            component: reslove => require(['@/views/syscon/Link'], reslove),
          },
          {
            path: '/user/journal',
            name: 'Journal',
            component: reslove => require(['@/views/journal/Journal'], reslove),
          },
          {
            path: '/user/adminUser',
            name: 'AdminUser',
            component: reslove => require(['@/views/admin/AdminUser'], reslove),
          },
          {
            path: '/user/adminType',
            name: 'AdminType',
            component: reslove => require(['@/views/admin/AdminType'], reslove),
          },
          {
            path: '/user/adminDictionaries',
            name: 'AdminDictionaries',
            component: reslove => require(['@/views/admin/AdminDictionaries'], reslove),
          },
          {
            path: '/user/adminRole',
            name: 'AdminRole',
            component: reslove => require(['@/views/admin/AdminRole'], reslove),
          }
        ]
      },
      {
        path: '/user/releaseDetail',
        name: 'ReleaseDetail',
        component: reslove => require(['@/views/release/ReleaseDetail'], reslove),
      },
      {
        path: '/match',
        name: 'match',
        component: reslove => require(['@/views/match/'], reslove)
      },
      {
        path: '/match/result',
        name: 'MatchResult',
        component: reslove => require(['@/views/match/MatchResult'], reslove)
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: reslove => require(['@/views/login'], reslove)
  }
];

export default config
