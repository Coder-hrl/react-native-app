import Home from 'pages/Home';
import FormDesign from 'pages/FormDesign';
import Mine from 'pages/Mine';
import WorkSpace from 'pages/WorkSpace';

export const tabBarConfig = [
  // 使用人数的查看，当前登录几人？
  {
    name: '首页',
    icon: 'shouye',
    path: 'Home',
    component: Home,
  },
  {
    name: '功能演示',
    icon: 'gongzuotai',
    path: 'WorkSpace',
    component: WorkSpace,
  },
  {
    name: '表单控制',
    icon: 'dingdanguanli',
    path: 'FormDesign',
    component: FormDesign,
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
