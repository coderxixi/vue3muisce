import axios from "axios"
const baseUrl="./"
const ERR_OK=0
axios.defaults.baseURL=baseUrl;
export default function get(url,params){
  return axios.get(url,{
    params
  }).then((res)=>{
    // const res=res.data
    if(res.code==ERR_OK){
    return res.result
    }
   
  }).catch((e)=>{
    console.log(e);
  })

}