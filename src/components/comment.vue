<template>
  <div class="CommentCPNT">
    <header class="Commentheader">
      <div class="left">
        <p class="rating">4.6</p>
        <p>综合评价</p>
        <p class="percent">高于周边商家76.9%</p>
      </div>
      <div class="right">
        <p>
          <span>服务态度</span>
          <span class="rating">★★★★★</span>
          <span class="rating">4.7</span>
        </p>
        <p>
          <span>菜品评价</span>
          <span class="rating">★★★★☆</span>
          <span class="rating">4.4</span>
        </p>
        <p>
          <span>送达时间</span>
          <span class="minute"></span>
          <span class="minute">分钟</span>
        </p>
      </div>
    </header>
    <div class="commentContent">
      <div class="cateBox">
        <ul class="cate" ref="cateList">
          <!-- 这里的数据对象定义在内联显得臃肿, 应想办法解决 -->
          <li v-for="(item, index) in commentCate" :key="item._id" :class="{disabled: item.unsatisfied, active: item.name === '全部'}" @click="filter(item, index)">{{ item.name }}({{ item.count }})</li>
        </ul>
      </div>
      <div class="commentCard" v-for="item in commentRes" :key="item._id">
        <img :src="avatar(item.avatar)" alt="" class="avatar">
        <div class="content">
          <p>{{ item.username }}</p>
          <p>
            <span class="star">★★★★★</span>
            <span> {{ item.time_spent_desc }}</span>
          </p>
          <img :src="handlerImgSrc(foodItem.image_hash)" v-for="foodItem in item.item_ratings" :key="foodItem.food_id" alt="" class="img">
          <p>
            <span class="foodName" v-for="foodItem in item.item_ratings" :key="foodItem.food_id">{{ foodItem.food_name }}</span>
          </p>
        </div>
        <span class="postDate">{{ item.rated_at }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      commentCate: undefined,
      commentRes: undefined,
      imgsrc: 'https://fuss10.elemecdn.com',
      defaultAvatar: 'default.jpg'
    }
  },
  mounted () {
    this.getCommentTags()
  },
  methods: {
    getCommentTags () {
      this.axios.get(`ugc/v2/restaurants/${this.id}/ratings/tags`).then(res => {
        this.commentCate = res.data
        this.getComment()
      })
    },
    filter (item, index) {
      var cateListElement = this.$refs.cateList
      for(const i of cateListElement.children) {
        i.classList.remove('active')
      }
      var activeElement = cateListElement.children[index]
      activeElement.classList.add('active')
    },
    getComment (tagname='全部') {
      this.axios.get(`ugc/v2/restaurants/${this.id}/ratings`, {
        params: {
          tag_name: tagname,
          offset: 0,
          limit: 10
        }
      }).then(res => {
        this.commentRes = res.data
      })
    },
    avatar (avatar) {
      if (avatar === '') {
        return 'https://elm.cangdu.org/img/' + this.defaultAvatar
      } else {
        return this.handlerImgSrc(avatar)
      }
    },
    handlerImgSrc (avatar) {
      // 固定格式
      var src = '/' + avatar.substring(0, 1) + '/' + avatar.substring(1, 3) + avatar.substring(3) + '.jpeg'
      return this.imgsrc + src
    }
  }
}
</script>

<style lang="scss">
  .CommentCPNT {
    @import '../static/styles/mixin.scss';
    color: #555;
    .Commentheader {
      @include bgc(white);
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .left {
        font-size: 15px;
        text-align: center;
        padding: 15px;
        padding-left: 25px;
        padding-bottom: 20px;
        p {
          padding-top: 5px;
        }
        .rating {
          color: rgb(255, 121, 24);
          font-size: 26px;
        }
        .percent {
          color: rgb(156, 154, 156);
          font-size: 12px;
        }
      }
      .right {
        padding: 15px;
        p {
          padding-top: 8px;
          span {
            padding-left: 10px;
            font-size: 15px;
          }
          .rating {
            color: rgb(255, 162, 33);
            font-size: 12px;
          }
          .minute {
            font-size: 12px;
            color: rgb(156, 154, 156);
          }
        }
      }
    }
    .commentContent {
      .cateBox {
        @include bgc(white);
        .cate {
          display: flex;
          flex-wrap: wrap;
          padding: 10px;
          padding-bottom: 20px;
          li {
            font-size: 14px;
            @include bgc(rgb(224, 238, 252));
            display: inline-block;
            padding: 8px;
            margin: 3px 4px;
            border-radius: 3px;
            white-space:pre-wrap;
            word-wrap:break-word;
          }
          .disabled {
            @include bgc(rgb(247, 247, 247));
            color: rgb(181, 182, 181);
          }
          .active {
            @include bgc($maincl);
            color: white;
          }
        }
      }
      .commentCard {
        @include bgc(white);
        font-size: 12px;
        display: flex;
        border-top: 1px solid $bordercl;
        padding: 10px;
        .avatar {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .content {
          flex-grow: 1;
          p {
            padding: 5px;
            .star {
              color: rgb(255, 162, 33);
            }
            .foodName {
              display: inline-block;
              font-size: 13px;
              padding: 5px;
              border-radius: 5px;
              width: 50px;
              height: 27px;
              border: 1px solid $bordercl;
              color: #888;
              overflow: hidden;
              margin-right: 5px;
            }
          }
          .img {
            width: 70px;
            margin-right: 10px;
          }
        }
        .postDate {
          font-size: 12px;
        }
      }
    }
  }
</style>
