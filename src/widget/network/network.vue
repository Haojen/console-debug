<template>
    <div class="network-widget">
        <table>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Type</th>
                <th>Initiator</th>
                <th>Size</th>
                <th>Time</th>
                <th>Timeout</th>
                <th>Waterfall</th>
            </tr>
            <tbody>
                <tr v-for="chunk in NetworkData">
                    <td v-text="chunk.name"></td>
                    <td v-text="chunk.entryType"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: "network",
    data() {
      return {
        NetworkData: []
      }
    },
    mounted() {
      setInterval(() => {
        this.NetworkData = window.performance.getEntries()
        // console.log(this.NetworkData)
      }, 100)


      const xhr = new XMLHttpRequest()

      let count = 0
      setInterval(() => {
        xhr.open('GET', `http://www.baidu.com/?${count}`)
        xhr.send()
        count+=1
      }, 10000)
    }
  }
</script>

<style scoped>

</style>