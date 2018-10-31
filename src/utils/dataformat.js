export function formatForDate(type,params){
    const data = params.analysis
    let tagCount = params.beforeCount
    if(type == 'week'){
        let result = []
        const now = new Date()
        now.setHours(0)
        now.setMinutes(0)
        now.setSeconds(0)

        const lastday = new Date(now.getTime()-1000)
        const day = lastday.getDay()
        for(let i =day-6;i<=day;i++){
            const flag=i;
            if(i<=0){flag=i+7}
            for (let j = 0; j < data.length; j++) {
                let tagDay = parseInt(data[j]['_id'])
                if(tagDay==1){
                    tagDay=tagDay+6
                }else{
                    tagDay=tagDay-1
                }
                if(tagDay == flag){
                    const nowcount = parseInt(data[j]['count'])
                    tagCount = nowcount+tagCount
                    break
                }
            }
            result.push({"x":'周'+flag ,"y":tagCount})        
        }
        return result      
    }else if(type == 'month'){
        let result = []
        const now = new Date()
        now.setHours(0)
        now.setMinutes(0)
        now.setSeconds(0)
        const lastday = new Date(now.getTime()-1000)
        const day = lastday.getDate()

        for (let i = 1; i <= day; i++) {
            for (let j = 0; j < data.length; j++) {
                if(parseInt(data[j]['_id']) == i){
                    const nowcount = parseInt(data[j]['count'])
                    tagCount = nowcount+tagCount
                    break
                }
            }
            result.push({"x":i.toString() ,"y":tagCount})
        }
        return result      
    }else if(type == 'year'){
        let result = []
        const now = new Date()
        now.setHours(0)
        now.setMinutes(0)
        now.setSeconds(0)
        const lastday = new Date(now.getTime()-1000)
        const month = lastday.getMonth()

        for (let i = 1; i <= month+1; i++) {
            for (let j = 0; j < data.length; j++) {
                if(parseInt(data[j]['_id']) == i){
                    const nowcount = parseInt(data[j]['count'])
                    tagCount = nowcount+tagCount
                    break
                }
            }
            result.push({"x":i.toString() ,"y":tagCount})
        }
        return result      
    }
}

export function formatForHotUserTable(data){
    let result=[]
    data.forEach(function(val,key){
        result.push({
            index: key+1,
            user: val["_id"],
            postcount: val["postCount"],
            commentcount: val["commentCount"],
            rank: val["rank"]
          })
    })
    return result.slice(0,10)
}

export function formatForHotPostTable(data){
    let result=[]
    data.forEach(function(val,key){
        result.push({
            index: key+1,
            id: val["_id"],
            post: val["title"],
            commentcount: val["commentCount"],
            clickcount: val["clickCount"],
            author: val["author"]
          })
    })
    return result.slice(0,10)
}

export function formatForUserList(data){
    let result=[]
    data.forEach(function(val,key){
        result.push({
            index: key+1,
            user: val["user"],
            id: val["id"],
            email: val["email"],
            postcount: val["postCount"],
            commentcount: val["commentCount"],
            rank: val["rank"],
          })
    })
    return result
}
export function formatForHotPostList(data){
    let result=[]
    data.forEach(function(val,key){
        result.push({
            index: key+1,
            id: val["_id"],
            post: val["title"],
            commentcount: val["commentCount"],
            clickcount: val["clickCount"],
            author: val["author"],
            createdAt: (new Date(val["createdAt"])).toLocaleString()
          })
    })
    return result
}

