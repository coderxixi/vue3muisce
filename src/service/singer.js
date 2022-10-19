import get from "./base"
export function getsingList(){
  
  return get('/api/getSingerList',{})
}
export function getSingerDetail(singer){
  return get('/api/getSingerDetail',{
    mid:singer.mid
  })
}