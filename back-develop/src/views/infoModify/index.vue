<template>
  <div class="infoModify">
    <section class="midcad">
      <el-form
        :model="userinfo"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="上传头像">
          <el-upload
            class="avatar-uploader cls"
            action="null"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model="userinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址" prop="address">
          <el-input v-model="userinfo.address"></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍" prop="insto">
          <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="userinfo.tel"></el-input>
        </el-form-item>
        <el-form-item label="店铺所在区" prop="region">
          <el-input v-model="userinfo.region"></el-input>
        </el-form-item>
        <el-form-item label="店主姓名" prop="real_name">
          <el-input v-model="userinfo.real_name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即更改</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "InfoModify",
  data() {
    const checkvalue = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入姓名"));
      }
      callback();
    };
    return {
      userinfo: {},
      imageUrl: "",
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请选择地址", trigger: "blur" },
        ],
        tel: [
          { required: true, message: "请填写电话号码", trigger: "blur" },
        ],
        region: [{ required: true, message: "请填写地区", trigger: "blur" }],
        real_name: [{ required: true, message: "请填写真实姓名", trigger: "blur" }],
      },
    };
  },
  created() {
    this.userinfo = this.$store.state.user.userinfo;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm() {
      this.$refs.ruleForm.validate((value) => {
        if (value) {
          alert("修改成功");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.infoModify {
  padding: 35px 35px 15px 35px;
  width: 720px;
  margin: 0 auto;
  margin-top: 30px;
  border: 1px solid #ebeef5;
  .midcad {
    padding: 20px;
    margin: 20px auto 0;
  }
}
.avatar-uploader {
  border: 1px dashed #d9d9d9 !important;
  width: 100px;
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>