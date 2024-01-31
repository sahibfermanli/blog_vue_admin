<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon" />
          <h3 class="card-label">
            Show blog
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="card-body">
          <div
              v-if="currentImages"
              class="form-group row"
          >
            <div v-for="image in currentImages" :key="image" class="border p-2 mt-3">
              <img
                  :src="image"
                  class="img-fluid"
                  width="250"
              >
            </div>
          </div>
          <div class="form-group row">
            <BaseInput
                v-model="input_data.created_by"
                label="User"
                max-length="255"
                colspan-class="col-lg-6"
                disabled
            />
            <BaseInput
                v-model="input_data.created_date"
                label="Date"
                max-length="255"
                colspan-class="col-lg-6"
                disabled
            />
          </div>
          <div class="form-group row">
            <BaseInput
                v-model="input_data.title"
                label="Title"
                max-length="255"
                colspan-class="col-lg-12"
                disabled
            />
          </div>
          <div class="form-group row">
            <BaseInput
                v-model="input_data.description"
                label="Description"
                max-length="500"
                colspan-class="col-lg-12"
                disabled
            />
            <BaseTextarea
                v-model="input_data.body"
                label="Body"
                colspan-class="col-lg-12"
                disabled
            />
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="allComments"
              max-height="70vh"
              border
              :empty-text="'No comments!'"
          >
            <el-table-column
                prop="body"
                label="Text"
            />
            <el-table-column
                prop="created_by"
                label="User"
            />
            <el-table-column
                prop="created_date"
                label="Date"
            />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import blogService from '@/services/blogService'

const route = useRoute()
const store = useStore()
const router = useRouter()

let loading = ref(false)
let allComments = ref([])

const id = route.params.id

let currentImages = ref([])

let input_data = ref({
  title: '',
  description: '',
  body: '',
  created_by: '',
  created_date: '',
})

onMounted(async () => {
  try {
    loading.value = true
    const { data: { data: blogData } } = await blogService.show(id)
    input_data.value = blogData
    currentImages.value = blogData.images
    allComments.value = blogData.comments
  } catch (e) {

  } finally {
    loading.value = false
  }
})

</script>
