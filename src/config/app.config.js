import Home from 'pages/Home';
import ProjectManage from 'pages/ProjectManage';
import Mine from 'pages/Mine';
import WorkSpace from 'pages/WorkSpace';

export const tabBarConfig = [
  {
    name: '首页',
    icon: 'shouye',
    path: 'Home',
    component: Home,
  },
  {
    name: '订单管理',
    icon: 'dingdanguanli',
    path: 'ProjectManage',
    component: ProjectManage,
  },
  {
    name: '工作台',
    icon: 'gongzuotai',
    path: 'WorkSpace',
    component: WorkSpace,
  },
  {
    name: '我的',
    icon: 'wode',
    path: 'Mine',
    component: Mine,
  },
];

// 开发地址
export const dev = '';

// 生产地址
export const prod = '';
