---
title: 基础用法
---


# 基础用法
<div>
  <el-button @click="onClick">aa</el-button>
  <form-grid :model="form" @search="onSearch">
    <form-grid-item label="名称" prop="name">
      <template #default>
        <el-input v-if="flag" v-model="form.name"></el-input>
        <span v-else>111</span>
      </template>
    </form-grid-item>
    <form-grid-item label="年龄年龄年龄年龄" prop="age" :span="1">
      <template #default>
        <el-select v-model="form.age">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </template>
    </form-grid-item>
    <form-grid-item label="名称名称名称" prop="name">
      <template #default>
        <el-input v-if="flag" v-model="form.name"></el-input>
        <span v-else>111</span>
      </template>
    </form-grid-item>
    <form-grid-item label="年龄" prop="age" :span="1">
      <template #default>
        <el-select v-model="form.age">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </template>
    </form-grid-item>
    <form-grid-item label="名称名称名称" prop="name">
      <template #default>
        <el-input v-if="flag" v-model="form.name"></el-input>
        <span v-else>111</span>
      </template>
    </form-grid-item>
    <form-grid-item label="年龄年龄年龄年龄" prop="age" :span="2">
      <template #default>
        <el-select v-model="form.age">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </template>
    </form-grid-item>
    <form-grid-item label="名称名称名称" prop="name">
      <template #default>
        <el-input v-if="flag" v-model="form.name"></el-input>
        <span v-else>111</span>
      </template>
    </form-grid-item>
    <form-grid-item label="年龄年龄年龄年龄" prop="age" :span="2">
      <template #default>
        <el-select v-model="form.age">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </template>
    </form-grid-item>
    <form-grid-item label="名称名称名称" prop="name">
      <template #default>
        <el-input v-if="flag" v-model="form.name"></el-input>
        <span v-else>111</span>
      </template>
    </form-grid-item>
    <form-grid-item label="年龄年龄年龄年龄" prop="age" :span="2">
      <template #default>
        <el-select v-model="form.age" >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </template>
    </form-grid-item>
    <template #buttonGroup>
      <el-button type="primary">111</el-button>
      <el-button type="primary">1112</el-button>
    </template>
  </form-grid>
</div>


<script>
import { FormGrid, FormGridItem } from '@'
export default {
  name:'demo',
  components:{FormGrid, FormGridItem},
  data() {
    return {
      form:{
        name: 'aaa',
        age: 1,
        date: null,
      },
      flag: true
    }
  },
  methods:{
    onSearch(){
      console.log(this.form);
    },
    onClick(){
      this.flag =!this.flag;
    }
  }
}
</script>