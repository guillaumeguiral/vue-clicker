<template>
  <div class="sidebar">
    <PartList :parts="parts" :energy="energy" :credits="credits"  v-on:buildPart="buildPart"></PartList>
  </div>
</template>

<script>
import PartList from "./PartList";

export default {
  name: 'Sidebar',
  components: {
    PartList
  },
  props: {
    parts: Array,
    credits: Number,
    energy: Number
  },
  methods: {
    buildPart(data) {
      this.$emit('buildPart', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  flex-basis: 30%;
  padding: 0 16px;
  overflow-y: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(#666, 0.1);
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
}
</style>
