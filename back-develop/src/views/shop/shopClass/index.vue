<template>
  <div>
     <div
      style="
        width: 96%;
        margin: auto;
        line-height: 70px;
        height: 70px;
        margin-top: 30px;
        margin-bottom: 30px;
        border: 1px solid #ddd;
      "
    >
       <span style="margin-left:20px">数据列表</span>
        <el-button  size="mini" plain :style="{marginLeft:'1100px',color:'#666',border:'solid 1px #666',paddingLeft:'10px',paddingRight:'10px'}" type="text" @click="open">添加</el-button>
    </div>
    
    <el-table  border textAlign:center  style="width: 96%; margin: auto">


      <el-table-column prop="date" label="编号" width="width"> </el-table-column>
      <el-table-column prop="分类名称" label="LOGO" width="width"> ></el-table-column>
      <el-table-column prop="address" label="设置" width="width">> </el-table-column>
      <el-table-column prop="address" label="操作" width="width">> </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  methods: {
      open() {
        this.$prompt('选择一级分类', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      }
    }
};

</script>

<style lang='scss' scoped>
.header {
  width: 1200px;
  height: 60px;
  line-height: 60px;
    .button{
        margin-left: 80%;
    }
}
</style>