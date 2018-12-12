import request from '../utils/request';
import config from '../config'

export async function totalUserCount(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { totalUsersCount(dateTime: "${params.dateTime}" dayStart: "${params.dayStart}" dayEnd: "${params.dayEnd}") {day total}}`}
  }); 
}
export async function totalPostCount(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { totalPostsCount(dateTime: "${params.dateTime}" dayStart: "${params.dayStart}" dayEnd: "${params.dayEnd}") {day total}}`}
  }); 
}
export async function totalCommentCount(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { totalCommentsCount(dateTime: "${params.dateTime}" dayStart: "${params.dayStart}" dayEnd: "${params.dayEnd}") {day total}}`}
  }); 
}
export async function usersGrowthData(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { userGrowth(dateType: "${params.dateType}" createdAfter: "${params.rangePickerValue[0].toISOString()}" createdBefore: "${params.rangePickerValue[1].toISOString()}") {beforeCount analysis{_id count}}}`}
  });
}
export async function postsGrowthData(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { postGrowth(dateType: "${params.dateType}" createdAfter: "${params.rangePickerValue[0].toISOString()}" createdBefore: "${params.rangePickerValue[1].toISOString()}") {beforeCount analysis{_id count}}}`}
  });
}
export async function commentsGrowthData(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { commentGrowth(dateType: "${params.dateType}" createdAfter: "${params.rangePickerValue[0].toISOString()}" createdBefore: "${params.rangePickerValue[1].toISOString()}") {beforeCount analysis{_id count}}}`}
  });
}
export async function hotUsersData(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { hotUsers {_id postCount commentCount rank}}`}
  });
}
export async function hotPostsData(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { hotPosts(sort: "${params.sort}") {_id title commentCount clickCount author createdAt lastReader}}`}
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

// export async function fakeAccountLogin(params) {
//   return request('/api/login/account', {
//     method: 'POST',
//     body: params,
//   });
// }
export async function fakeAccountLogin(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`mutation { login(username:"${params.username}",password:"${ params.password}") {id username email}}`}
  });
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function usersListData(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { userList(cursor:"${params.cursor}",limit:${params.limit}) {cursor userlist {_id user email postCount commentCount rank}}}`}
  });
}
export async function postsListData(params) {
  return request(config.graphql,{
    method: 'POST',
    headers: {'Content-Type': 'application/json','Accept': '*/*'},
    body: {
            "variables":{
            },
            "query":`query { hotPosts(sort: "${params.sort}") {_id title commentCount clickCount author createdAt lastReader}}`}
  });
}