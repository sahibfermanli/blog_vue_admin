<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
          </span>
          <h3 class="card-label">
            Home page
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          Welcome, {{ $store.getters['auth/GET_USER']?.name }} {{ $store.getters['auth/GET_USER']?.surname }}
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          <el-badge :value="allStatistics.all_blogs_count" class="item">
            <el-button>All blogs</el-button>
          </el-badge>
          <el-badge :value="allStatistics.active_blogs_count" class="item ml-10" type="primary">
            <el-button>Active blogs</el-button>
          </el-badge>
          <el-badge :value="allStatistics.all_users_count" class="item ml-10">
            <el-button>All users</el-button>
          </el-badge>
          <el-badge :value="allStatistics.active_users_count" class="item ml-10" type="primary">
            <el-button>Active users</el-button>
          </el-badge>
        </div>
        <el-row class="mt-10">
          <div class="row align-items-end">
            <h3>Top commented blogs:</h3>
          </div>
          <el-table
              ref="multipleTable"
              v-loading="loading"
              :data="allStatistics.top_commented_blogs"
              max-height="70vh"
              border
              :empty-text="'No data!'"
          >
            <el-table-column
                prop="title"
                label="Title"
            />
            <el-table-column
                prop="comments_count"
                label="Comments"
            />
          </el-table>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import internalUserService from '@/services/internal-users/internalUserService'
import blogService from '@/services/blogService'
import statisticsService from '@/services/statisticsService'
import { Delete } from '@element-plus/icons'

const route = useRoute()
const store = useStore()

let loading = ref(false)
let allStatistics = ref([])

onMounted(async () => {
  try {
    loading.value = true
    await internalUserService.checkLoggedIn()

    const {
      data: statisticsData,
    } = await statisticsService.load()
    allStatistics.value = statisticsData
  } catch (e) {

  } finally {
    loading.value = false
  }
})

</script>
