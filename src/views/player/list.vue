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
      <el-button
        type="success"
        icon="el-icon-add"
        @click="handlerCreatePlayer"
      >
        {{
          $t("player.btnCreate")
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
      <el-table-column
        label="操作"
      >
        <template v-slot="scope">
          <router-link :to="'/players/edit/'+ scope.row.id">
            <el-button
              type="primary"
              icon="el-icon-edit"
            >
              编辑
            </el-button>
          </router-link>
          <el-button
            type="danger"
            @click="handlerDelete(scope)"
          >
            删除
          </el-button>
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
import { deleteUser } from '@/api/users'
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

  handlerCreatePlayer() {
    this.$router.push('/players/create')
  }

  handlerDelete(scope:any) {
    const { $index, row } = scope
    this.$confirm('确定删除玩家信息?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      await deleteUser(row.id)
      this.list.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
    }).catch(err => console.log(err))
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
