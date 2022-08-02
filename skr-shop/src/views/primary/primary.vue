<template>
  <div class="primary">
    <Title><p>{{ $route.params.parent_name }}</p></Title>
    <PriTag :list="list" />
    <div class="breadCrumb">
      <div class="ant-breadcrumb">
        <span>
          <span><a href="/home">Home</a></span>
          <span class="divide">/</span>
        </span>
        <span>Primary</span>
      </div>
    </div>
    <PriItem />
  </div>
</template>

<script>
import Title from "@/components/content/title/Title.vue";
import { getTypeTwo } from "@/api/navbar";
import PriTag from "./children/PriTag.vue";
import PriItem from "./children/PriItem.vue";
export default {
  components: { PriTag, PriItem, Title },
  name: "Primary",
  data() {
    return {
      typeTwo: [],
      list: [],
    };
  },
  methods: {
    RndNum(n, data) {
      if (data == undefined) return;
      let rnd = "";
      let arr = [];
      for (var i = 0; i < n; i++) {
        rnd = Math.floor(Math.random() * data.length);
        arr.push(data[rnd]);
        data.splice(rnd, 1);
      }
      return arr;
    },
    getTypeTwo() {
      getTypeTwo({ parent_name: this.$route.params.parent_name }).then(
        (res) => {
          let arr = this.RndNum(5, res.data);
          this.list = arr;
        }
      );
    },
  },
  created() {
    this.getTypeTwo();
  },
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        if (to.path !== from.path) this.getTypeTwo();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.primary {
  .breadCrumb {
    width: 58%;
    display: flex;
    align-items: center;
    margin: 20px auto;
    .ant-breadcrumb {
      text-align: left;
      span {
        color: rgba(0, 0, 0, 0.65);
        .divide {
          margin: 0 8px;
        }
        span {
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #1890ff;
            }
          }
        }
      }
    }
  }
}
</style>