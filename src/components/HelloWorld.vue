<template>
  <div class="hello">
   <el-button>hellow</el-button>
  <!-- <el-radio v-model="radio" label="1" @change="toggleRadio">备选项</el-radio>
   <el-radio v-model="radio" label="2" @change="toggleRadio">备选项</el-radio> -->

    <el-radio-group v-model="radio">
       <el-radio-button :label="3" @change="toggleRadio">3</el-radio-button>
       <el-radio-button :label="6" @change="toggleRadio">6</el-radio-button>
       <el-radio-button :label="9" @change="toggleRadio">9</el-radio-button>
     </el-radio-group>
      <el-link  type="primary">helloe world</el-link>
      <el-row :gutter="20">
          <el-col :span="4">1</el-col>
          <el-col :span="4">1</el-col>
          <el-col :span="4">1</el-col>
          <el-col :span="4">1</el-col>
          <el-col :span="4">1</el-col>
      </el-row>

      <div class="container">
          <div class="card">
              <div class="card-header bg-primary text-white ">1</div>
              <div class="card-body bg-info">2</div>
              <div class="card-footer bg-danger">3</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {

  },
  data() {
	  return {
		  radio: 6
	  }
  },
  methods: {
	  toggleRadio() {
		 console.log(this.radio);
	  }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
