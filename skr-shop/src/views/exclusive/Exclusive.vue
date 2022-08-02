<template>
  <div class="exclusive">
    <Title><p>EXCLUSIVE</p></Title>
    <ExclusiveContent />
    <ExclusiveContenta />
    <ExclusiveContentb />
    <ExclusiveContentc />
  </div>
</template>

<script>
import Title from "@/components/content/title/Title.vue";
import ExclusiveContent from "./children/ExclusiveContent.vue";
import ExclusiveContenta from "./children/ExclusiveContenta.vue";
import ExclusiveContentb from "./children/ExclusiveContentb.vue";
import ExclusiveContentc from "./children/ExclusiveContentc.vue";
export default {
  name: "Exclusive",
  components: {
    Title,
    ExclusiveContent,
    ExclusiveContenta, 
    ExclusiveContentb,
    ExclusiveContentc,
  },
};
</script>

<style lang="scss" scoped>
</style>