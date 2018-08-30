<template>
    <div class="performance-widget">
        <div style="height: 200px">
            <FPS></FPS>
        </div>
    </div>
</template>

<script>
  import FPS from '../fps/fps'
  export default {
    name: "performance",
    components: {FPS}
  }
</script>

<style scoped>

</style>