<template>
  <div>
    <div class="comment-info" v-if="commentInfo.cRate !== 0">
      <!--  -->
      <div class="comment-top">
        <span>用户评论</span>
        <a href="#">
          更多
          <i>></i>
        </a>
      </div>
      <!--  -->
      <div class="comment-content-top" v-for="(item,index) in commentInfo.list" :key="index">
        <!--  -->
        <div class="comment-user">
          <img :src="item.user.avatar" alt />
          <span>{{item.user.uname}}</span>
        </div>
        <!--  -->
        <div class="comment-contents">
          <p class="comment-text">{{item.content}}</p>

          <div class="comment-data">
            <p class="info-data">{{item.created | showData}}</p>
            <p class="info-style">{{item.style}}</p>
          </div>

          <div class="comment-image">
            <img :src="image" alt v-for="(image,indey) in item.images " :key="indey" />
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <div class="comment-info" style="color:red;line-height:40px;text-align:center;" v-else>暂无用户评论</div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils';

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default () {
        return {};
      }
    }
  },
  filters: {
    showData (value) {
      // 1.将时间戳转成Date
      const date = new Date(value * 1000);

      //2.将date进行格式化
      return formatDate(date, 'yyyy-MM-dd hh:mm');

    }
  }
}
</script>

<style scoped>
.comment-info {
  font-size: 12px;
  /* margin: 10px; */
  padding: 10px 10px 10px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.comment-top {
  line-height: 40px;
  margin: 0 5px;
  border-bottom: 1px solid #f2f5f8;
}

.comment-top a {
  float: right;
  font-size: 12px;
}
.comment-top a i {
  margin-right: 5px;
}

.comment-user {
  height: 60px;
}

.comment-user img {
  height: 40px;
  border-radius: 20px;
  margin: 10px;
}
.comment-user span {
  line-height: 50px;
  position: relative;
  top: -2.3em;
  color: #333333;
}

.comment-text {
  margin: 10px 0;
  color: #777777;
}

.comment-data {
  position: relative;
  color: #999999;
}

.info-style {
  position: absolute;
  top: 0;
  left: 40%;
}

.comment-text {
  text-indent: 2em;
  letter-spacing: 1px;
}
.comment-image {
  margin-top: 12px;
}

.comment-image img {
  height: 70px;
  width: 70px;
  margin-right: 10px;
}
</style>