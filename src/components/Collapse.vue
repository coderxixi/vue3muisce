<template>
  <div class="accordion">
    <div class="accordion-content" v-for="(n, index) of list" :key="index">
      <!-- 标题 -->
      <div class="title" @click="cliTitle(index)" :class="{'active':n.flag}">
        <h3>{{n.title}}</h3>
      </div>
      <!-- 列表 -->
      <div class="list"  v-if="n.flag" ref="listRef">
        <ul class="list-ul">
          <li class="li-item" v-for="(item,index) of n.children" :key="index">
            <div class="container">
              <div class="item">
                <div class="phone">{{item.phone}}</div>
                <div class="number">{{item.number}}</div>
              </div>
              <div class="item">
                <div class="text">积分类型：{{item.text}}</div>
                <div class="jifen">积分:{{item.jifen}}</div>
              </div>
              <div class="item">
                <div class="time">入网时间:{{item.time}}</div>
                <div></div>
              </div>
              <!-- 按钮 -->
              <div class="btn">
                  <span class="detail">查看详情</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps,ref,onMounted,watch,defineEmits} from "vue";
const emit=defineEmits(['change','update:modelValue'])
const props=defineProps({
  list:{
    type:Array,
    default:[]
  },
  modelValue:{
    type:String||Array,
    default:''
  }
})
const active=ref(1);
const listRef=ref(null);
const height=ref()
const cliTitle=(idx)=>{
  active.value=idx
  emit('ahyhan',idx)
  console.log('idx',idx);
}
onMounted(()=>{
  // height.value=listRef.value[active]
  // console.log('listRef',listRef.value[active.value].offsetHeight);
})
watch(active,()=>{
  // console.log('listRef',listRef.value[active.value].offsetHeight);
})
</script>

<style lang="scss" scoped>
.accordion {
  .accordion-content {
    .title {
      padding: 10px 10px;
      // height: 44px;
      // line-height: 44px;
      font-weight: bold;
      font-size: 20px;

    }
    .active{
      color: #0081FF;
    }
    .list {
      .list-ul {
        padding: 0 10px;
        color: black;
        .li-item {
          border-radius: 10px;
          background: #ffffff;
          .container {
            margin-top: 10px;
            padding: 10px 18px;
            .item {
              padding: 10px 0;
              display: flex;
              justify-content: space-between;
              .phone {
                color: #141c23;
                font-size: 24px;
                font-weight: bold;
              }
              .number {
                color: #0081ff;
                font-size: 18px;
                font-weight: bold;
              }
              .text {
                font-size: 18px;
                color: #141c23;
              }
              .jifen {
                font-size: 18px;
                color: #141c23;
              }
              .time{
                color: #A2A7AD;
                font-size: 18px;
              }
            }
            .btn{
              display: flex;
              flex-direction: row-reverse;
              .detail{
                display: block;
                width: 124px;
                height: 24px;
                background:#0081FF ;
                border-radius: 24px;
                text-align: center;
                line-height: 24px;
                padding: 8px 8px;
                color: #FFFFFF;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
</style>