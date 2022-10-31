import { getLyric } from "@/service/song.js"
import { useStore } from "@/store/index.js"
import Lyric from "lyric-parser";
import { computed, watch, ref, handleError } from "vue";
export default function useLyric() {
  const currentLyric = ref()
  const store = useStore();
  const currentSong = computed(() => store.currentSong);
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) {
      return
    }
    let res = await getLyric(newSong);
    store.addSonglyric(newSong, res);

    if(currentSong.value.lyric!==res){
      return
      
    }
    currentLyric.value = new Lyric(res, handleLyric)
    console.log('reswerwer', res);

  })
  function handleLyric() {

  }
}