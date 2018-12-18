import { isUrl } from '../utils/utils';
import request from '../utils/request';
import config from '../config'
var  menuData =[
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    authority: 'admin',
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
    authority: 'admin',
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
    authority: 'admin',
    children: [
      {
        name: '帖子分析',
        path: 'analysis'
      },
      {
        name: '帖子列表',
        path: 'list'
      }
    ],
  },
  {
    name: '评论',
    icon: 'edit',
    path: 'comments',
    authority: 'admin',
    children: [
      {
        name: '评论分析',
        path: 'analysis'
      }
    ],
  },
  {
    name: '频道',
    icon: 'database',
    path: 'channel',
    authority: 'user',
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
function queryMenu(){
  const name = localStorage.getItem('username')
  request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { ownChannels(creator:"${name}") {name creator}}`}
  }).then((res)=>{
    menuData = [
      {
        name: 'dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        authority: 'admin',
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
        authority: 'admin',
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
        authority: 'admin',
        children: [
          {
            name: '帖子分析',
            path: 'analysis'
          },
          {
            name: '帖子列表',
            path: 'list'
          }
        ],
      },
      {
        name: '评论',
        icon: 'edit',
        path: 'comments',
        authority: 'admin',
        children: [
          {
            name: '评论分析',
            path: 'analysis'
          }
        ],
      },
      {
        name: '频道',
        icon: 'database',
        path: 'channel',
        authority: 'user',
        children: res.data.ownChannels.map(function(item){
          return {
            name: item.name,
            path: item.name,
            authority: 'user',
            children: [
              {
                name: '用户',
                path: 'userlist'
              },{
                name: '帖子',
                path: 'postlist'           
              }
            ],
          }
        })
      },
    ];
    return formatter(menuData)
  });
  return formatter(menuData)
  
}
export const getMenuData = () => queryMenu();
