<template>
  <div class="app-container">
    <div class="app-filter">
      <el-input
        v-model="listQuery.acountname"
        class="input"
        :placeholder="$t('player.acountname')"
        style="width:200px"
        @keydown.enter.native="handlerFilter"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handlerFilter"
      >
        {{
          $t("player.btnFilter")
        }}
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      fit
      border
      :data="list"
      highlight-current-row
    >
      <el-table-column
        label="ID"
        align="center"
      >
        <template v-slot="{row}">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column label="账号1">
        <template v-slot="{row}">
          {{ row.acountname }}
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'
import Pagination from '@/components/Pagination/index.vue'
@Component({
  name: 'PlayList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  list: Player[] = [];
  total = 0;
  loading = true;
  listQuery = {
    page: 1,
    limit: 10,
    acountname: undefined
  };

  created() {
    this.getList()
  }

  async getList() {
    this.loading = true
    const { data } = await getPlayers(this.listQuery)
    this.list = data.players
    this.total = data.total
    this.loading = false
  }

  handlerFilter() {
    this.listQuery.page = 1
    this.getList()
  }
}
</script>

<style scoped>
.app-filter{
  margin-bottom: 20px;
}
.app-filter .input{
  margin-right: 10px;
}
</style>
