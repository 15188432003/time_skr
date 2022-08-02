<template>
  <div class="detailMiddle">
    <el-card shadow="never" class="standard-margin">
      <span class="font-title-medium">服务单信息</span>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >服务单号</el-col
          >
          <el-col class="form-border font-small" :span="18">{{ $route.params.id  }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >申请状态</el-col
          >
          <el-col class="form-border font-small" :span="18" v-if="tableData.status==1">待处理</el-col>
          <el-col class="form-border font-small" :span="18" v-else>已完成</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="form-border form-left-bg font-small"
            >订单编号
          </el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            
          >
            {{ $route.params.order_id }}
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >申请时间</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            tableData.create_time | formatDate("YYYY-MM-DD HH:mm:ss")
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >联系人</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            tableData.user
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >联系电话</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            tableData.userTel
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >退货原因</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            tableData.reason
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >订单金额</el-col
          >
          <el-col class="form-border font-small" :span="18"
            >￥{{ tableData.money  }}</el-col
          >
        </el-row>
        <el-row>
          <el-col
            class="form-border form-left-bg font-small"
            :span="6"
            style="height: 100px; line-height: 80px"
            >凭证图片
          </el-col>
          <el-col
            class="form-border font-small"
            :span="18"
            style="height: 100px"
          >
          </el-col>
        </el-row>
      </div>
      
      <div class="form-container-border" v-show="tableData.status===3">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small"
            >确认退款金额</el-col
          >
          <el-col class="form-border font-small" :span="18">{{ tableData.money  }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >收款人姓名</el-col
          >
          <el-col class="form-border font-small" :span="18">{{tableData.user}}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="6"
            class="form-border form-left-bg font-small"
            >所在区域
          </el-col>
          <el-col
            class="form-border font-small"
            :span="18"
           
          >
            {{ tableData.userAdd }}
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >详细地址</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            tableData.userAdd
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >联系电话</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            tableData.storeTel
          }}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6"
            >退货时间</el-col
          >
          <el-col class="form-border font-small" :span="18">{{
            tableData.create_time | formatDate("YYYY-MM-DD HH:mm:ss")
          }}</el-col>
        </el-row>
        
        
        
      </div>
    </el-card>
  </div>
</template>

<script>
import { formatDate } from "@/utils/data";
export default {
  name: "DetailMiddle",
props:{
    tableData:{
        type:Object,
        default:()=>{}
    }

}
};
</script>

<style lang="scss" scoped>
.standard-margin {
  margin-top: 50px;
}
.form-border {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}

.form-container-border {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  margin-top: 25px;
}

.form-left-bg {
  background: #f2f6fc;
}
.handle {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>