<template>
  <div class="contentBottom">
    <Title>
      <p>EDITION</p>
    </Title>
    <ul>
      <div
        class="shopList"
        v-for="(item, index) in shopImgList.slice(0, 3)"
        :key="index"
        @mouseover="engraft(index)"
        @mouseout="exgraft"
      >
        <div >
          <div class="img">
            <div
              :class="{ mask: index == index_page }"
              :style="{ backgroundColor: mask_background[index] }"
            ></div>
            <img :src="item.img" alt="" />
          </div>
          <div class="detail">
            <div class="title">{{ item.title }}</div>
            <div class="des">www.stride.fun</div>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import Title from "@/components/content/title/Title.vue";

export default {
  name: "ContentBottom",
  components: { Title },
  data() {
    return {
      mask_background: [
        `rgba(234,255,130,0.8)`,
        `rgba(255,105,153,0.8)`,
        `rgba(83,173,116,0.8)`,
      ],
      index_page: null,
    };
  },
  props: {
    shopImgList: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    engraft(index) {
      this.index_page = index;
    },
    exgraft() {
      this.index_page = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.contentBottom {
  width: 100%;

  ul {
    min-width: 1240px;
    text-align: left;
    width: 100%;
    display: flex;
    .shopList {
      margin: 0 30px;
      width: calc(33.33333%);
      position: relative;
      &:hover {
        border-color: rgba(0, 0, 0, 0.09);
        box-shadow: 0px 2px 8px rgb(0 0 0 / 9%);
      }
      .img {
        width: 100%;
        img {
          width: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          animation: mask_ 1s;
        }
        @keyframes mask_ {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
      .detail {
        width: 100%;
        .title {
          margin: 15px 0 8px 0;
          color: rgba(0, 0, 0, 0.85);
          font-weight: 500;
          font-size: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .des {
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }
  }
}
</style>