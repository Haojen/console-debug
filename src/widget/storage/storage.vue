<template>
    <div class="storage-widget">
        <div>
            <h2>Name</h2>
            <span>{{url}}</span>
        </div>
        <div>
            <h2>Storage</h2>
            <div>
                <div>
                    <canvas ref="storageCanvas"></canvas>
                </div>
                <div>
                    <canvas ref="cookieCanvas"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Chart from 'chart.js'
  export default {
    name: "storage",
    data() {
      return {
        url: window.location.href
      }
    },
    mounted() {

      new Chart(this.$refs.storageCanvas, {
        type: 'pie',
        data: 10
      })
    }
  }
</script>

<style scoped lang="scss">
    .storage-widget {
        padding: 0 12px;
    }
</style>