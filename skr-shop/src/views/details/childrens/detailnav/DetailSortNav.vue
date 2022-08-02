<template>
  <div class="detailNav">
    <ul class="nav">
      <li
        @click="$emit('changeNav', 'detailImg')"
        :class="{ on: currentindexOn === 0 }"
      >
        DETAILS
      </li>
      <li
        @click="$emit('changeNav', 'REVIEW')"
        :class="{ on: currentindexOn === 1 }"
      >
        REVIEW(98)
      </li>
      <li
        @click="$emit('changeNav', 'Q_A')"
        :class="{ on: currentindexOn === 2 }"
      >
        Q&A
      </li>
      <li
        @click="$emit('changeNav', 'RETURN')"
        :class="{ on: currentindexOn === 3 }"
      >
        RETURN&FRLIVERY
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentindexOn: Number,
  },
};
</script>

<style lang="scss" scoped>
.detailNav {
  width: 100%;
  height: 100px;
  .nav {
    height: 100px;
    line-height: 100px;
  }
  li {
    width: 25%;
    float: left;
    cursor: pointer;
    border: 1px solid #efefef;
    border-bottom: 2px solid #000;
  }
  .on {
    border: 2px solid #000;
    border-bottom: 1px solid transparent;
  }
}
</style>