<template>
  <div class="qa">
    <el-button>商品咨询</el-button>
    <div class="rate">
      <ul>
        <li v-for="(item, index) in 6" :key="index" class="">
          <span class="answer">完整回答</span>
          <span class="question"> {{ index }} <i></i></span>
          <span class="username">haey***</span>
          <span class="time">2021. 04. 1{{ index }}</span>
        </li>
      </ul>
    </div>
    <div class="dynamic" style="display: none">
      <div
        class="comments"
        style="width: 100%; border: 1px solid #333"
        v-for="(item, index) in comments"
        :key="index"
      >
        <p style="float: left; width: 10%">用户{{ customer_id }}:</p>
        <p
          style="
            float: left;
            width: 78%;
            background-color: red;
            text-align: left;
          "
        >
          {{ comment }}
        </p>
        <img :src="imgs" alt="" />
        <span>{{ create_time }}</span>
        <el-button style="float;:right;width: 5%;" size="mini">删除</el-button>
        <el-button style="float: right; width: 5%" size="mini">回复</el-button>
      </div>
      <p>添加评论</p>
      <input type="textarea" v-model="comment" />
      <div>
        <p>添加图片</p>
        <input type="url" v-model="imgs" />
      </div>
      <el-button @click="addComment">添加评论</el-button>
    </div>
  </div>
</template>

<script>
import { getRating, addRating } from "@/api/details.js";
export default {
  data() {
    return {
      tableData: [
        {
          date: "th",
          name: "",
          address: "",
        },
      ],
      comments: [],
      comment: "",
      picture:
        "https://www.baidu.com/link?url=5trUk9rAut0oQggL0CDKkQ4wuNT-4hmgVVom2wpAatXENjyqIz_SdnMYVh1bDHNrx2cX7Nqek9t2nzgiMgB20Bf_GlW_ASNLMGUaKMAk_zlK5veaj7zfJs8HOkplAoWhKnhAv-5Zf8Za93vA8A3vw91MbnCENnqrDHp1mzyW4L9yl8RL8l5Xs5jMgWrFpFckipFK18RxtPpgrDEX60NyLtbO8pMkwsShENijVVDyd1pQ8WRoMbxPTexn8Nvhp8wPHKSDwuRxH-Ri4dbh1Nq1p4ZaIAXa4PLAehf00AwYrVGJHBS8JnXy7MPTQp62v1nz1JU4-L4KGUAgqOMhKIIhaP6bVaWatsIFYwaQTucAzHLQaMmARe1gpRTUzenWppEzCxJylJfKXKOISXTXKQ2u_HX2UOg8OkCDi-umQ2n46hb-3AqLosWeC0u_CFwyZFwxmNRMBQyp7rEH3Q26yw0N5P0XK5wnQwh6e6VGBMPerZLjwSpkSGRlwWV0y6Mpc1M0cNvKyNTwVGGxX7GD0DDuTyJjEQ86tH848-Bvfldh7aXJ_WmEVNIotP0iyl26PcV7Lg0rwBxplEclpK488TEjCtnS6dm0k-ZiWyLePcggJIpdaOgfPb36RbeczB0dPcaIYTAgjhqXu-GHFjlvolpenq&wd=&eqid=d826dcb80009f01f0000000262c00282",
      imgs: "",
      customer_id: 0,
      rating: 0,
      create_time: Date.now(),
    };
  },
  methods: {
    //暂未添加数据，添加后即可获取评论
    getRatingList() {
      let data = {
        spu_id: this.$route.params.id,
      };
      getRating(data).then((data) => {
      });
    },
    //添加评论
    addComment() {
      let data = {
        sku_id: this.$route.params.id,
        customer_id: JSON.parse(window.localStorage.userInfo).id,
        rating: this.rating,
        comment: this.comment,
        img: this.imgs,
        parent_comment: null,
      };

      addRating(data).then((data) => {
      });
    },
  },

  created() {
    this.getRatingList();
  },
};
</script>

<style lang="scss" scoped>
.qa {
  height: 520px;
  button {
    float: right;
  }
  .rate {
    width: 100%;
    height: 410px;
    border-top: 1px solid #d9d9d9;
    ul {
      li {
        width: 100%;
        height: 68px;
        line-height: 68px;
        text-align: left;
        display: flex;
        border-bottom: 1px solid #d9d9d9;
        .answer {
          width: 10%;
        }
        .question {
          width: 20%;
          text-align: left;
        }
        .username {
          width: 50%;
        }
        .time {
          width: 20%;
          text-align: right;
        }
      }
    }
  }
}
</style>