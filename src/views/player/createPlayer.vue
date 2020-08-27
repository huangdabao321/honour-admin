<template>
  <playerDetail :is-edit="false" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import playerDetail from './components/playerDetail.vue'

@Component({
  name: 'createPlayer',
  components: {
    playerDetail
  }
})
export default class extends Vue {}
</script>

<style scoped>
.app_container {
  width: 50%;
  margin: 30px 30px;
}
</style>
