import { ref, defineProps, computed, watch } from "vue";
import { useStore } from "@/store/index.js";
import {PLAY_MODE,FAVORITE_KEY} from "@/assets/js/constant.js"
import {save,remove} from "@/assets/js/array-store.js"
export default  function useFavorite(){
  const maxLen=100
   const store=useStore();
   const favoriteList=  computed(()=>{
    return store.favoriteList
   }) 
   function isFavorite(song){
    return favoriteList.value.findIndex((item)=>{
      return item.id==song.id
    })>-1
 }
   const getFavoriteIcon=(song)=>{
     return isFavorite(song)?'icon-favorite':'icon-not-favorite'
   }

  
// 点击anniu
const toggleFavorite=(song)=>{
  
  let lists;
  if(isFavorite(song)){
    //remove
  lists=remove(FAVORITE_KEY,compare)

  }else{
    lists= save(song,FAVORITE_KEY,compare,maxLen)
    //save
  }

  function compare(item){
   return item.id===song.id
  }
  console.log('list',lists);
  store.setFavoriteList(lists)
}
   return {
    getFavoriteIcon,
    toggleFavorite
   }
}