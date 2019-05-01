<template>
  <div class="questionPage">
    <header-default :title="explain[captionList[num]]" />
    <div class="content" v-html="explain[contentList[num]]"></div>
  </div>
</template>

<script>
import headerDefault from '../components/header-default'
export default {
  props: ['num'],
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    contentList () {
      return this.$store.state.explainContent
    },
    captionList () {
      return this.$store.state.explainCaption
    },
    explain () {
      return this.$store.state.explain
    }
  },
  methods: {},
  components: {
    headerDefault
  }
}
</script>

<style lang="scss">
  .questionPage {
    .content {
      white-space:pre-wrap;
      word-wrap:break-word;
      width: 100%;
    }
  }
</style>
