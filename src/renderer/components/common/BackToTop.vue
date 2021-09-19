<template>
  <ElBacktop target=".page-component__scroll" :bottom="100">
    <div
      style="
         {
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }
      "
    >
      UP
    </div>
  </ElBacktop>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElBacktop } from 'element-plus'
  export default defineComponent({
    name: 'BackToTop',
    components: { ElBacktop },
  })
</script>
<style lang="scss" scoped></style>
