<template>
  <div class="person">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="box-card">
          <div class="avator">
            <div class="avator_top">
              <div class="block">
                <el-avatar :size="120"></el-avatar>
              </div>
              <div class="avator_text">
                <div class="username">明明</div>
                <div class="admin">管理员</div>
              </div>
            </div>
            <div class="datebox">
              上次登录时间：
              <span class="date">2021-4-21</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="box-card agebox">
          <template #header>
            <div class="clearfix">
              <span>读者年龄</span>
            </div>
          </template>
          00后
          <el-progress :percentage="36.3" color="#42b983"></el-progress>90后
          <el-progress :percentage="44.1" color="#f1e05a"></el-progress>80后
          <el-progress :percentage="18.7"></el-progress>70后
          <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-card
              class="box-card"
              shadow="hover"
              :body-style="{ padding: '0px', border: '0px' }"
            >
              <div class="iconbox first">
                <i class="el-icon-user-solid icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1000</div>
                  <div class="grid-text">阅读量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" class="box-card" :body-style="{ padding: '0px' }">
              <div class="iconbox second">
                <i class="el-icon-message-solid icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">12</div>
                  <div class="grid-text">事件量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" class="box-card" :body-style="{ padding: '0px' }">
              <div class="iconbox third">
                <i class="el-icon-s-goods icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">288</div>
                  <div class="grid-text">昨日收益</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" class="box-card event">
          <template #header>
            <div class="clearfix">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
          </template>

          <el-table :show-header="false" :data="todoList" style="width: 100%">
            <el-table-column width="40">
              <template #default="scope">
                <el-checkbox v-model="scope.row.status"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column>
              <template #default="scope">
                <div
                  class="todo-item"
                  :class="{
                    'todo-item-del': scope.row.status,
                  }"
                >{{ scope.row.title }}</div>
              </template>
            </el-table-column>

            <el-table-column width="60">
              <template>
                <i class="el-icon-edit"></i>
                <i class="el-icon-delete"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="box-card">
          <v-chart class="chart" :option="option1" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" class="box-card">
          <div>
            <v-chart class="chart" :option="option2" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
} from "echarts/components";
import VChart from "vue-echarts";
use([
  CanvasRenderer,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
]);
export default defineComponent({
  name: "Person",
  components: {
    VChart,
  },
  setup: () => {
    const option1 = ref({
      title: {
        text: "读者意见分布",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["好评", "差评", "一般般", "稍好", "稍差"],
      },
      series: [
        {
          name: "Traffic Sources",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "一般般" },
            { value: 310, name: "稍好" },
            { value: 234, name: "稍差" },
            { value: 135, name: "差评" },
            { value: 1548, name: "好评" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });

    const option2 = ref({
      title: {
        text: "最近一周相关数据统计",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        right: "right",
        data: ["阅读人数", "阅读收益"],
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "阅读人数",
          type: "line",
          smooth: true,
          data: [1600, 1275, 3260, 3830, 2141, 2454, 2710],
        },
        {
          name: "阅读收益",
          type: "line",
          smooth: true,
          data: [300, 182, 434, 791, 390, 200, 310],
        },
      ],
    });
    return {
      todoList: [
        {
          status: false,
          title: "吃饭",
        },
      ],
      option1,
      option2,
    };
  },
});
</script>
<style scoped>
.avator_top {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px #999999 solid;
}
.avator_text {
  position: absolute;
  left: 190px;
}
.username {
  font-size: 28px;
}
.admin {
  margin-top: 8px;
  font-size: 17px;
  color: #999;
}
.datebox {
  display: flex;
  align-items: center;
  margin-top: 23px;
  font-size: 16px;
}
.date {
  margin-left: 70px;
}
.agebox {
  margin-top: 15px;
  margin-bottom: 15px;
}
.iconbox {
  padding: 0;
  display: flex;
  align-items: center;
}
.first .icon {
  background-color: rgb(45, 140, 240);
}
.second .icon {
  background-color: rgb(100, 213, 114);
}
.third .icon {
  background-color: rgb(242, 94, 67);
}
.icon {
  width: 100px;
  height: 100px;
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
}
.grid-cont-right {
  margin-left: 35px;
  text-align: center;
}
.grid-num {
  font-size: 28px;
}
.grid-text {
  margin-top: 3px;
  font-size: 14px;
  color: #999;
}
.event {
  margin-top: 15px;
  margin-bottom: 15px;
}
.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.chart {
  height: 400px;
}
</style>
