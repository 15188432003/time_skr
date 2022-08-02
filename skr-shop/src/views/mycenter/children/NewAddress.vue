<template>
  <div class="new_address">
    <div class="address_top">
      <span>我的地址</span>
      <span
        ><button @click="addressShow = true" class="address">+</button
        >新增地址</span
      >
    </div>
    <div class="address_body">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-row-style="{
          height: '68px',
          color: 'black',
          padding: ' 0 14px',
        }"
      >
        <el-table-column prop="name" label="收货人姓名" width="135">
        </el-table-column>
        <el-table-column prop="address" label="收货人地址" width="845">
          <template slot-scope="scope">
            <div class="default">
              <span>{{ scope.row.address }}</span>
              <button class="yesdefault" v-if="scope.row.prime">
                默认地址
              </button>
              <button class="nodefault" @click="changePrime(scope.row)" v-else>
                设为默认
              </button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="tel" label="收货人电话" width="130">
        </el-table-column>
        <el-table-column label="操作" width="130">
          <template slot-scope="scope">
            <div class="operation">
              <el-button @click="delectAddress(scope.row.id)">删除</el-button>
              <el-button @click="changeInfo(scope.row)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddWrapper
      v-if="addressShow"
      :addShow="addShow"
      :getAddress="getAddress"
    />
    <ChangeAddress
      v-if="changeShow"
      :changeShows="changeShows"
      :getAddress="getAddress"
      :addInfo="addInfo"
    />
  </div>
</template>

<script>
import AddWrapper from "@/components/common/address/AddressWrapper.vue";
import ChangeAddress from "@/components/common/address/ChangeAddress.vue";
import { getAddress, deleteAddress, defaultAddress } from "@/api/address.js";
export default {
  name: "NewAddress",
  components: { AddWrapper, ChangeAddress },
  data() {
    return {
      addressShow: false,
      changeShow: false,
      tableData: [],
      addInfo: {},
    };
  },
  methods: {
    addShow() {
      this.addressShow = false;
    },
    changeShows() {
      this.changeShow = false;
    },
    changeInfo(data) {
      const { name, tel, prime, id } = data;
      this.addInfo = { name, tel, prime, id };
      this.changeShow = true;
    },
    delectAddress(id) {
      this.$confirm("此操作将永久删除该地址, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAddress({ id }).then((data) => {
            if (data.code !== 200) {
              this.$message({
                type: "info",
                message: data.message,
              });
            } else {
              this.getAddress();
              this.$message({
                type: "success",
                message: data.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getAddress() {
      this.id = this.$store.state.user.userInfo.id;
      getAddress({ customer_id: this.id }).then((data) => {
        this.tableData = data.data;
      });
    },
    changePrime(res) {
      const { id, customer_id } = res;
      defaultAddress({ id, prime: 1, customer_id }).then((data) => {
        if (!data.code == 200) {
          this.$message({
            type: "info",
            message: data.message,
          });
        } else {
          this.getAddress();
          this.$message({
            type: "success",
            message: data.message,
          });
        }
      });
    },
    changeAddressInfo() {},
  },
  created() {
    this.getAddress();
  },
};
</script>

<style lang="scss" scoped>
.new_address {
  width: 1240px;
  margin: 0 auto;
  p {
    text-align: left;
  }
  .address_top {
    height: 36px;
    line-height: 36px;
    display: flex;
    justify-content: space-between;
    span {
      &:first-child {
        font-size: 24px;
        color: #000;
      }
      &:last-child {
        font-size: 24px;
        line-height: 30px;
        color: #000;
        button {
          width: 30px;
          height: 30px;
          border-radius: 19px;
          color: #fff;
          background-color: #000;
          border: none;
          outline: none;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
  .address_body {
    border-top: 2px solid #171717;
    border-bottom: 1px solid #171717;
    margin-bottom: 60px;
    .operation {
      display: flex;
      justify-content: space-between;
      .el-button {
        width: 50px;
        height: 30px;
        margin-right: 10px;
        color: #000;
        background-color: #fff;
        border: 1px solid #000;
        text-align: center;
        line-height: 30px;
        line-height: 30px;
        padding: 0;
        cursor: pointer;
        border-radius: 0;
      }
    }
    .default {
      button {
        margin-left: 10px;
        padding: 3px;
        border-radius: 4px;
        cursor: pointer;
      }
      .nodefault {
        background-color: #fff;
        color: #000;
        border: 1px solid #999999;
      }
      .yesdefault {
        background-color: #000;
        color: #fff;
      }
    }
  }
}
</style>