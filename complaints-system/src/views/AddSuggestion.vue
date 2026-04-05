<template>
  <div class="suggestion-container">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span style="font-weight: bold; font-size: 1.2rem;">تقديم مقترح جديد</span>
        </div>
      </template>

      <el-form label-position="top">
        <el-form-item label="عنوان الفكرة">
          <el-input v-model="title" placeholder="اكتب عنواناً جذاباً لفكرتك..." />
        </el-form-item>

        <el-form-item label="تفاصيل المقترح">
          <el-input
            v-model="desc"
            type="textarea"
            :rows="5"
            placeholder="اشرح لنا كيف سنستفيد من هذه الفكرة؟"
          />
        </el-form-item>

        <el-button type="danger" @click="onSubmit" style="width: 100%; background-color: #b30000;">
          إرسال الآن
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const title = ref('')
const desc = ref('')

const onSubmit = () => {
  ElMessage.success('شكراً لك! تم استلام مقترحك بنجاح.')
  title.value = ''
  desc.value = ''
}
</script>

<style scoped>
.suggestion-container {
  display: flex;
  justify-content: center;
  padding: 50px;
  background-color: #f9f9f9;
  min-height: 90vh;
  direction: rtl; /* عشان التنسيق العربي */
}
.box-card {
  width: 100%;
  max-width: 500px;
  border-radius: 15px;
}
</style>