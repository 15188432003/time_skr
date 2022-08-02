<template>
  <div class="active">
    <div class="mark-header" style="padding: 0 20px">
      <div>
        <el-card class="box-card" shadow="never">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <div :style="{ margin: '10px 0 10px 0' }" class="div">
            <span style="margin: 0 10px 0 60px">活动名称：</span>
            <el-input
              placeholder="活动名称"
              v-model="input"
              style="width: 200px"
            >
            </el-input>
            <el-button
              type="primary"
              size="small"
              :style="{ height: '40px', marginLeft: '20px' }"
              @click="search"
              >查询搜索</el-button
            >
          </div>
        </el-card>
      </div>
      <div class="mark-header-top">
        <el-card class="box-card" shadow="never">
          <i class="el-icon-tickets"></i>
          <span>数据列表</span>
          <el-button size="mini" style="float: right" @click="add"
            >添加活动</el-button
          >
        </el-card>
      </div>
    </div>
    <div class="mark-main">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column prop="id" label="id" align="center" width="100">
        </el-table-column>
        <el-table-column
          prop="spu_id"
          label="秒杀商品标号"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column prop="active_name" label="活动标题" align="center">
        </el-table-column>
        <el-table-column prop="star_time" label="开始时间" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.star_time | formatDate("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="end_time" label="结束时间" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.end_time | formatDate("YYYY-MM-DD HH:mm:ss")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="update(scope.row.id)"
              >修改商品</el-button
            >
            <el-button type="primary" size="mini" @click="update(scope.row.id)"
              >修改活动</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteOrder(scope.row.id)"
              >删除活动</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mark-bottom">
      <el-dialog title="添加活动" :visible.sync="dialogFormVisible">
        <el-form
          ref="sizeForm"
          :model="sizeForm"
          label-width="80px"
          size="mini"
          :rules="rules"
        >
          <el-form-item label="活动名称" label-width="150px" prop="active_name">
            <el-input
              v-model="sizeForm.active_name"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="参加活动的商品id"
            label-width="150px"
            prop="spu_id"
          >
            <el-input v-model="sizeForm.spu_id" style="width: 300px"></el-input>
          </el-form-item>

          <el-form-item
            label="活动开始时间"
            label-width="150px"
            prop="star_time"
          >
            <el-col :span="11">
              <el-time-picker
                placeholder="选择时间"
                v-model="sizeForm.star_time"
                style="width: 100%"
                value-format="timestamp"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item
            label="活动结束时间"
            label-width="150px"
            prop="end_time"
          >
            <el-col :span="11">
              <el-time-picker
                placeholder="选择时间"
                v-model="sizeForm.end_time"
                style="width: 100%"
                value-format="timestamp"
              ></el-time-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small"
            >取 消</el-button
          >
          <el-button type="primary" @click="submitForm" size="small"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="mask">
      <el-dialog
        title="活动列表"
        :visible.sync="dialogTableVisible"
        width="70%"
      >
        <el-table
          :data="tableDataT"
          border
          style="width: 100%"
          empty-text="暂无数据"
        >
          <el-table-column prop="id" label="id" align="center">
          </el-table-column>
          <el-table-column prop="spu_id" label="秒杀商品标号" align="center">
          </el-table-column>
          <el-table-column prop="active_name" label="活动标题" align="center">
          </el-table-column>
          <el-table-column prop="star_time" label="开始时间" align="center">
            <template slot-scope="scope">
              <span>{{
                scope.row.star_time | formatDate("YYYY-MM-DD HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="end_time" label="结束时间" align="center">
            <template slot-scope="scope">
              <span>{{
                scope.row.end_time | formatDate("YYYY-MM-DD HH:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            align="center"
            width="300"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="updateShop(scope.row.id)"
                >修改商品</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="update(scope.row.id)"
                >修改活动</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deleteOrder(scope.row.id)"
                >删除活动</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/data";
import {
  addspike,
  getspike,
  updatespike,
  delspike,
  slectspike,
} from "@/api/market.js";
export default {
  name: "Active",
  data() {
    return {
      input: "",
      tableDataT: [],
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      addShow: true,
      sizeForm: {
        id: "",
        active_name: "",
        spu_id: "",
        star_time: "",
        end_time: "",
      },
      rules: {
        active_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        spu_id: [
          { required: true, message: "请选择活动id", trigger: "change" },
        ],
        id: [{ required: true, message: "请选择活动id", trigger: "change" }],
        star_time: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        end_time: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      if (this.addShow) {
        console.log(111111);
        this.$refs.sizeForm.validate((valid) => {
          if (valid) {
            let data = {
              active_name: this.sizeForm.active_name,
              spu_id: this.sizeForm.spu_id,
              star_time: this.sizeForm.star_time,
              end_time: this.sizeForm.end_time,
            };
            console.log(data);
            addspike(data).then((data) => {
              this.$message({
                message: "添加秒杀活动成功",
                type: "success",
              });
              this.getspike();
            });

            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: "添加秒杀活动成功",
              type: "warning",
            });
            return false;
          }
        });
      } else {
        this.$refs.sizeForm.validate((valid) => {
          if (valid) {
            let data = this.sizeForm;
            console.log(data);
            console.log(data);
            updatespike(data).then((data) => {
              this.$message({
                message: "修改秒杀活动成功",
                type: "success",
              });
              this.getspike();
            });

            this.dialogFormVisible = false;
          } else {
            this.$message({
              message: "修改秒杀活动成功",
              type: "warning",
            });
            return false;
          }
        });
      }
    },
    add() {
      this.addShow = true;
      this.dialogFormVisible = true;
    },
    getspike() {
      getspike({ id: 1 }).then((data) => {
        console.log('#######3',data);
        if (data.res) {
          data.res.forEach((item) => {
            item.star_time = new Date(item.star_time).getTime();
            item.end_time = new Date(item.end_time).getTime();
          });
        }

        this.tableData = data.res;
      });
    },
    update(id) {
      (this.sizeForm.id = id), (this.addShow = false);
      this.dialogFormVisible = true;
    },
    deleteOrder(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delspike({ id }).then((data) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            console.log(data.res);
            // this.tableData = data.res;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    search() {
      slectspike({ active_name: this.input })
        .then((data) => {
          if (data.res) {
            data.res.forEach((item) => {
              item.star_time = new Date(item.star_time).getTime();
              item.end_time = new Date(item.end_time).getTime();
            });
          }
          // console.log(data);
          this.tableDataT = data.res;
          this.dialogTableVisible = true;
        })
        .catch((data) => {
          this.$message({
            type: "info",
            message: "查询失败",
          });
        });
    },
    updateShop() {},
  },
  created() {
    this.getspike();
  },
};
</script>

<style lang="scss" scoped>
.active {
  padding: 40px;
}
.el-icon-search {
  margin-right: 10px;
}
.el-icon-tickets {
  margin-right: 10px;
}
button {
  vertical-align: top;
}
.mark-header-top {
  margin: 20px 0 10px 0;
}
</style>