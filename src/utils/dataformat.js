export function formatForDate(type,params){
    const data = params.analysis
    let tagCount = params.beforeCount
    if(type == 'today'){
        let result = []
        for (let i = 1; i <= 24; i++) {
            for (let j = 0; j < data.length; j++) {
                if(parseInt(data[j]['_id'])+1 == i){
                    const nowcount = parseInt(data[j]['count'])
                    tagCount = nowcount+tagCount
                    break
                }
            }
            result.push({"x":i.toString() ,"y":tagCount})
        }
        return result
    }else if(type == 'week'){
        let result = []
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < data.length; j++) {
                if(parseInt(data[j]['_id']) == i){
                    const nowcount = parseInt(data[j]['count'])
                    tagCount = nowcount+tagCount
                    break
                }
            }
            if(i==0){
                result.push({"x":'周日' ,"y":tagCount})
            }else{
                result.push({"x":'周'+i ,"y":tagCount})
            }
        }
        return result      
    }else if(type == 'month'){
        let result = []
        for (let i = 1; i <= 31; i++) {
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
        for (let i = 1; i <= 12; i++) {
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