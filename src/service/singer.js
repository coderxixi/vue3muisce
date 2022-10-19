import get from "./base"
export function getsingList(){
  
  return get('/api/getSingerList',{})
}