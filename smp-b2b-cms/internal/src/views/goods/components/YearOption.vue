<template>
  <div >
    <!--<label class="radio-label" style="padding-left:0;">年份: </label>
    <el-select v-model="year" style="width:120px;">
      <el-option
        v-for="item in year"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>-->
    <span class="demonstration">年份:</span>
    <el-select v-model="year" clearable placeholder="请选择年份">
      <el-option
        v-for="(item,index) in year"
        :key="index"
        :label="index"
        :value="item"
        clearable
      />
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    year: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
