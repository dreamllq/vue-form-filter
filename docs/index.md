# lc-vue-form-filter

table过滤表单

## 安装

```
npm i lc-vue-form-filter
```

## 基础用法
<div>
  <p>{{ form }}</p>
  <form-grid :model="form" @search="onSearch">
    <form-grid-item label="名称名称名称名称" prop="name">
      <template #default>
        <el-input  v-model="form.name"></el-input>
      </template>
    </form-grid-item>
    <form-grid-item label="年龄年龄年龄" prop="age">
      <template #default>
        <el-select v-model="form.age">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
        </el-select>
      </template>
    </form-grid-item>
    <form-grid-item label="时间" prop="date">
      <template #default>
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a day"
          :size="size"
        />
      </template>
    </form-grid-item>
  </form-grid>
</div>


<script>
import { FormGrid, FormGridItem } from 'lc-vue-form-filter'
export default {
  name:'demo',
  components:{FormGrid, FormGridItem},
  data() {
    return {
      form:{
        name: 'aaa',
        age: 1,
        date: null,
      }
    }
  },
  methods:{
    onSearch(){
      console.log(this.form);
    }
  }
}
</script>

```vue
<template>
  <div>
    <form-grid :model="form" @search="onSearch">
      <form-grid-item label="名称" prop="name">
        <template #default>
          <el-input  v-model="form.name"></el-input>
        </template>
      </form-grid-item>
      <form-grid-item label="年龄" prop="age">
        <template #default>
          <el-select v-model="form.age">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </template>
      </form-grid-item>
      <form-grid-item label="时间" prop="date">
        <template #default>
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="Pick a day"
            :size="size"
          />
        </template>
      </form-grid-item>
    </form-grid>
  </div>
</template>

<script>
import { FormGrid, FormGridItem } from 'lc-vue-form-filter'
export default {
  name:'demo',
  components:{FormGrid, FormGridItem},
  data() {
    return {
      form:{
        name: 'aaa',
        age: 1,
        date: null,
      }
    }
  },
  methods:{
    onSearch(){
      console.log(this.form);
    }
  }
}
</script>
```

## Api

### FormGrid Props

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| model | 数据模型 | \{[index: string]: any\} | {} |
| minShowLineNumber | 最少展示行数 | number | 2 |
| miniItemWidth | 每个单独项的宽度 | number | 300 |
| btnGroupWidth | 右侧按钮组宽度 | number | 205 |
| onlyForm | 是否只显示form区域 | boolean | false |


### FormGrid Events

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| search | 搜索和重置时触发 | - |

### FormGridItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| label | 名称 | string |  '' |
| span | 占几列 | number | 1 |
| prop | 数据关联标识 | string | - |
