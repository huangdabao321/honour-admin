<template>
  <el-form
    ref="form"
    class="app_container"
    :model="playerForm"
  >
    <el-form-item label="账号名">
      <el-input v-model="playerForm.acountname" />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="playerForm.nickname" />
    </el-form-item>
    <el-form-item>
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :on-success="handlerAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="imgSrc"
          :src="imgSrc"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handlerSub"
      >
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import {
  defaultPlayerData,
  getPlayer,
  createPlayer,
  updatePlayer
} from '@/api/players'

import {
  ElUploadInternalRawFile,
  ElUploadInternalFileDetail
} from 'element-ui/types/upload'
import { Form } from 'element-ui'
@Component({
  name: 'playerDetail'
})
export default class extends Vue {
  @Prop({ default: false })
  private isEdit!: boolean;

  private playerForm = Object.assign({}, defaultPlayerData);
  loading = false;
  imgSrc = '';

  @Ref('form')
  form!: Form;

  validateRequire = (rule: any, value: string, callback: Function) => {
    if (value === '') {
      this.$message({
        message: rule.field + '必须填写',
        type: 'error'
      })
      callback(new Error(rule.field + '必须填写'))
    } else {
      callback()
    }
  };

  rules = {
    acountname: [
      {
        validator: this.validateRequire
      }
    ],
    nickname: [
      {
        validator: this.validateRequire
      }
    ]
  };

  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(parseInt(id))
    }
  }

  async fetchData(id: number) {
    try {
      const { data } = await getPlayer(id)
      this.playerForm = data.player
    } catch (err) {
      console.log(err)
    }
  }

  async handlerSub() {
    this.loading = true
    this.form.validate(async valid => {
      try {
        if (this.isEdit) {
          await updatePlayer(this.playerForm.id, this.playerForm)
        } else {
          await createPlayer(this.playerForm)
        }

        this.$notify({
          title: '操作成功',
          message: '新增玩家成功',
          type: 'success',
          duration: 2000
        })
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    })
  }

  handlerAvatarSuccess(res: any, file: ElUploadInternalFileDetail) {
    this.imgSrc = URL.createObjectURL(file.raw)
    this.playerForm.avatar = file.name
  }

  beforeAvatarUpload(file: ElUploadInternalRawFile) {
    const isLt2M = file.size / 1024 / 1024
    if (!isLt2M) {
      this.$message.error('头像大小U币能超过2M')
    }

    return isLt2M
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
