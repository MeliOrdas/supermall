<template>
  <div v-if="Object.keys(paramInfo).length!==0" class="detailInfo">
    <p style="margin:10px 0">参数信息</p>
    <table v-for="(table,index) in paramInfo.rule" :key="index" class="param-info-top">
      <tr v-for="(tr,indey) in table" :key="indey">
        <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="param-info-buttom">
      <tr v-for="(item,index) in paramInfo.info" :key="index">
        <td class="info-key">{{item.key}}</td>
        <td class="info-value">{{item.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default () {
        return;
      }
    }
  }
}
</script>

<style scoped>
table[class*="param-info"] {
  font-size: 11px;
}

.detailInfo {
  padding: 20px 15px;
  border-bottom: 5px solid #f2f5f8;
}

.detailInfo table {
  width: 100%;
  border-collapse: collapse;
}
.detailInfo table tr {
  height: 42px;
}
.detailInfo table tr td {
  width: 2em;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.detailInfo .info-key {
  width: 1px;
}

.param-info-buttom {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.info-value {
  color: #eb4868;
}
</style>