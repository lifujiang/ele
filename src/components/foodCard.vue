<template>
  <div class="foodCardCPNT">
    <div class="foodCard">
      <div class="left">
        <img :src="imgsrc + food.image_path" alt="">
      </div>
      <div class="right">
        <p class="title">{{ food.name }}</p>
        <p class="subTitle">{{ food.description }}</p>
        <p>月售{{ food.month_sales }}份 好评率{{ food.satisfy_rate }}%</p>
        <p class="tag" v-if="food.activity">{{ food.activity.image_text }}</p>
        <div class="priceSection">
          <p class="left">
            <span class="price">&yen;20</span>
            <span> 起</span>
          </p>
          <span>+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['food'],
  data () {
    return {
      imgsrc: 'https://elm.cangdu.org/img/'
    }
  }
}
</script>

<style lang="scss">
  .foodCardCPNT {

  }
</style>
