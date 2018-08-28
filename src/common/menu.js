import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '每日统计',
        path: 'dailycount'
      },
    ],
  },
  {
    name: '用户',
    icon: 'user',
    path: 'users',
    children: [
      {
        name: '用户分析',
        path: 'analysis'
      },
      {
        name: '用户列表',
        path: 'list'
      }
    ],
  },
  {
    name: '帖子',
    icon: 'file-text',
    path: 'posts',
    children: [
      {
        name: '帖子分析',
        path: 'analysis'
      }
    ],
  },
  {
    name: '评论',
    icon: 'edit',
    path: 'comments',
    children: [
      {
        name: '评论分析',
        path: 'analysis'
      }
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      }
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
