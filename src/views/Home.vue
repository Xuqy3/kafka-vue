<template>
  <div id="app">
    <div class="left">

        <div id="producer">
          <div align="left">
            <span style="color: #409EFF">生产者发送数据</span>
          </div>

          <el-input
            id="producerText"
            type="textarea"
            :rows="7"
            placeholder="请输入内容"
            v-model="textarea"
            class="textarea"
            aria-required="true">
          </el-input>

          <div align="right">
            <el-button type="primary" @click="send(textarea)">发送</el-button>
          </div>
        </div>

        <div id="consumer">
          <div align="left">
            <span style="color: #409EFF">消费者接收消息</span>
          </div>

          <el-input
            id="consumerText"
            type="textarea"
            :rows="7"
            placeholder="接收生产者发送的消息"
            v-model="textarea1"
            class="textarea">
          </el-input>

          <div align="right">
            <el-button type="primary" @click="receive" id="receive_button" v-bind:disabled="dis">接收</el-button>
            <el-button type="success" @click="saveToOracle(textarea1)">保存到oracle</el-button>
          </div>
        </div>

    </div>
    <div class="right">
      <div class="table">
        <el-table
          :data="tableData"
          stripe
          style="width: 85%">
          <el-table-column
            align="center"
            prop="id"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            prop="createTime"
            label="日志时间"
            width="180">
          </el-table-column>
          <el-table-column
            align="center"
            prop="status"
            label="HTTP状态码">
          </el-table-column>
          <el-table-column
            align="center"
            prop="msg"
            label="日志内容">
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="recordsSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dis:true,
        textarea:'',
        textarea1:'',
        tableData: [],
        currentPage3: 1,
        recordsSize:''
      }
    },
    methods:{
      showOracle(){
        const _this = this
        _this.$axios.get("/kafka/findAll").then(res=>{
          console.log(res.data)
          _this.tableData = res.data.rows
          _this.recordsSize = res.data.recordsSize
        })
      },
      send(textarea){
        console.log(textarea)
        const _this = this
        _this.$axios.get("/kafka/send/"+textarea)
        _this.dis=false
        // document.getElementById("receive_button")

      },
      receive(){
        const _this = this
        _this.$axios.get("kafka/receive").then(res=>{
          console.log(res.data)
          console.log(JSON.stringify(res.data))
          _this.textarea1 = JSON.stringify(res.data)
          _this.dis=true
        })
      },
      saveToOracle(textarea1){
        const _this = this
        let log = JSON.parse(textarea1)
        console.log(log)
        _this.$axios.post("/kafka/insert",log,{
          headers: {
            "Content-Type": "application/json;charset=utf-8"  //头部信息
          }
        }).then(res=>{
          this.showOracle()
          _this.textarea1=''
          _this.textarea=''
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange: function (currentPage) {
        this.PageAxios(currentPage)
      },
      PageAxios (currentPage) {
        this.$axios.get("/kafka/findAll?pageNo="+currentPage).then(res =>{
          console.log(res.data.rows)
          this.tableData = res.data.rows
        })
      }
    },
    created () {
      this.showOracle()
    }
  }
</script>

<style scoped>
  .left{
    margin-top: 40px;
    float: left;
    width: 500px;
    margin-left: 50px;
  }
  .right{
    width: 100%;
  }
  .textarea{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .table{
    margin-left: 650px;
  }
  .pagination{
    margin-top: 10px;
    margin-left: 550px;
  }
</style>
