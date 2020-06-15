<template>
  <div>
    <el-form ref='systemForm'
             :model="formData"
             :rules="rules"
             :inline="inline"
             :label-width="labelWidth"
             :size='size'
    >
      <el-form-item v-for='(item,i) in formConfig'
                    :key='i'
                    :label="item.label"
                    :style="{width:item.width}"
                    :label-width="item.labelWidth"
                    :prop='item.key'>

        <!--text-->
        <div v-if="item.type == 'text'" :style="{color:item.color}">{{formData[item.key]}}</div>

        <!--input-->
        <el-input v-if="item.type == 'input'"
                  style="width: 100%;"
                  v-model="formData[item.key]"
                  :placeholder="item.placeholder"
                  :disabled='item.disabled'
                  :type='item.kind'
                  :rows="item.rows"
                  :show-password="item.password"
                  :clearable="item.clearable"
                  @click.native='formSelectClick(item.key)'/>

        <!--select-->
        <el-select v-if="item.type == 'select'"
                   style="width: 100%;"
                   class='elFormSelect'
                   v-model="formData[item.key]"
                   :multiple='item.multiple'
                   :filterable="item.filterable"
                   :disabled='item.disabled'
                   :placeholder="item.placeholder"
                   :clearable="item.clearable"
                   @click.native='formSelectClick(item.key)'
                   @change='formSelectchange'>
          <el-option v-for="(a,i) in formConfigObj[item.option]"
                     :key="i"
                     :label="a.label"
                     :value="a.value">
          </el-option>
        </el-select>

        <!--radio-->
        <el-radio-group v-if="item.type == 'radio'"
                        v-model="formData[item.key]"
                        @change='radioChange'
        >
          <el-radio v-for="(a,i) in formConfigObj[item.option]"
                    :key="i"
                    :label="a.value"
          >{{a.label}}</el-radio>
        </el-radio-group>

        <!--cascader-->
        <el-cascader v-if="item.type == 'cascader'"
                     style="width: 100%;"
                     change-on-select
                     :show-all-levels="item.showAllLevels"
                     :options="formConfigObj[item.option]"
                     :props="item.props"
                     :disabled='item.disabled'
                     v-model="formData[item.key]"
                     :clearable="item.clearable"
                     @click.native='formSelectClick(item.key)'
                     @change="formcascchange">
        </el-cascader>

        <!-- transfer 穿梭框 -->
        <el-transfer v-if="item.type == 'transfer'"
                     filterable
                     filter-placeholder="请输入搜索内容"
                     v-model="formData[item.key]"
                     :data="formConfigObj[item.option]"
                     :titles='item.titles'
                     :props='item.props'>
        </el-transfer>

        <!-- switch 开关 -->
        <el-switch v-if="item.type == 'switch'"
                   v-model="formData[item.key]"
                   :inactive-text="item.title">
        </el-switch>

        <!-- datepicker 日期选择器 -->
        <el-date-picker v-if="item.type == 'datepicker'"
                        style="width: 100%;"
                        v-model="formData[item.key]"
                        :type="item.dateType"
                        :placeholder="item.placeholder"
                        :start-placeholder="item.start"
                        :end-placeholder="item.end"
                        :unlink-panels="item.unlink"
                        :format="item.format"
                        :clearable="item.clearable"
                        :value-format="item.valFormat">
        </el-date-picker>
      </el-form-item>
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "hyFormDialog",
    props: {
      size: {
        type: String,
        default: () => 'mini'
      },
      inline: {
        type: Boolean,
        default: () => false
      },
      labelWidth: {
        type: String,
        default: () => '80px'
      },
      rules: {
        type: Object,
        default: () => {
        }
      },
      formData: {
        type: Object,
        default: () => {
        }
      },
      formConfig: {
        type: Array,
        default: () => []
      },
      formConfigObj: {
        type: Object,
        default: () => {
        }
      },
      treeScrollStyle: {
        type: Object,
        default: () => {
          return {}
        }
      },
      formButtonsConfig: {
        type: Array,
        default() {
          return [];
        }
      },
    },
    methods: {
      validateForm() {
        let aa;
        this.$refs["systemForm"].validate(valid => {
          aa = valid;
          if (valid) {
            return true;
          } else {
            this.$message.error("请填写完整信息");
            return false;
          }
        });
        return aa;
      },
      formSelectClick(e) {
        this.selectFormItem = e
      },
      formSelectchange(e) {
        this.$emit('formSelectchange', e, this.selectFormItem)
      },
      radioChange(e){
        this.$emit('formRadiochange', e, this.selectFormItem)
      },
      formcascchange(e) {
        this.$emit('formcascchange', e, this.selectFormItem)
      },
      buttonClick(item) {
        this.$emit("buttonClick", item);
      }
    }
  }
</script>

<style scoped lang="scss"></style>