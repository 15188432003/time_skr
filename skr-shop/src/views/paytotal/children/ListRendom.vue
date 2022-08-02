<template>
  <div class="list_item">
    <div class="list_left">
      <img :src="paylist.img" alt="" />
      <ul>
        <li>{{ paylist.title }}</li>
        <li>
          <span>颜色:{{ paylist.params[0] }}，</span
          ><span>尺码:{{ paylist.params[1] }}</span>
        </li>
        <li>数量:{{ paylist.num }}</li>
      </ul>
    </div>
    <div class="list_right">
      <p>¥&nbsp;{{ paylist.special_price }}</p>
      <p>¥&nbsp;{{ paylist.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: ["paylist"],
  data() {
    return {};
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.list_item {
  height: 120px;
  display: flex;
  justify-content: space-between;
  .list_left {
    display: flex;
    justify-content: flex-start;
    flex: 0.7;
    img {
      width: 100px;
      height: 100px;
    }
    ul {
      color: #999999;
      padding: 15px 10px;
      font-size: 15px;
      li {
        margin-top: 5px;
        &:first-child {
          color: rgb(0, 0, 0);
        }
      }
    }
  }
  .list_right {
    padding: 30px 10px;
    flex: 0.2;
    text-align: center;
    p {
      font-size: 16px;
      margin: 5px;
      &:first-child {
        font-weight: bolder;
      }
      &:last-child {
        font-size: 14px;
        color: #4c4c4c;
        -webkit-text-decoration: line-through #999999;
        text-decoration: line-through #999999;
      }
    }
  }


}
</style>