import Home from 'pages/Home';
import Mine from 'pages/Mine';
import WorkSpace from 'pages/WorkSpace';

const tabBarConfig = [
  {
    name: '首页',
    icon: 'shouye',
    path: 'Home',
    component: Home,
  },
  {
    name: '工作台',
    icon: 'kucunguanli',
    path: 'WorkSpace',
    component: WorkSpace,
  },
  {
    name: '我的',
    icon: 'wode1',
    path: 'Mine',
    component: Mine,
  },
];

export {tabBarConfig};
