<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Blogs
          </h3>
        </div>
      </div>
      <div class="card-body">
        <el-row style="margin-bottom: 5px;">
          <el-col :span="4">
            <label>Pagination (Total : <strong>{{ pagination.total }}</strong>)</label>
            <el-select
                v-model="perPage"
                placeholder="Seç"
                @change="search"
            >
              <el-option
                  v-for="item in perPageCounts"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-pagination
              v-model:currentPage="currentPage"
              :hide-on-single-page="true"
              layout="prev, pager, next"
              v-bind="pagination"
              sortable="custom"
              @update:current-page="onCurrentPageUpdated"
          />
        </el-row>
        <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="allBlogs"
            max-height="70vh"
            border
            :empty-text="'No data!'"
        >
          <el-table-column
              type="expand"
              width="30"
              fixed
          >
            <template #default="props">
              <div m="4">
                <h3 style="margin-left: 10px;">
                  Comments:
                </h3>
                <el-table
                    :data="props.row.comments"
                    :empty-text="'No comment!'"
                    :header-cell-style="{ background: '#d9cfcf' }"
                    :cell-style="{ background: '#ece6e6' }"
                >
                  <el-table-column
                      label="Comment"
                      prop="body"
                  />
                  <el-table-column
                      label="User"
                      prop="created_by"
                  />
                  <el-table-column
                      label="Date"
                      prop="created_date"
                  />
                </el-table>
              </div>
            </template>
          </el-table-column>

          <el-table-column
              prop="id"
              label="#"
              width="100"
              fixed
          />
          <el-table-column
              prop="image"
              label="Image"
              width="100"
          >
            <template #default="scope">
              <img
                  v-if="scope.row.image"
                  :src="scope.row.image"
                  class="img-fluid"
                  width="50"
                  height="50"
                  alt="img"
              >
            </template>
          </el-table-column>
          <el-table-column
              prop="title"
              label="Title"
          />
          <el-table-column
              prop="description"
              label="Description"
          />
          <el-table-column
              prop="comments_count"
              label="Comments"
          />
          <el-table-column
              prop="created_date"
              label="Date"
          />
          <el-table-column
              prop="created_by"
              label="User"
          />
          <el-table-column
              label="Operations"
              width="170"
              class-name="actions"
          >
            <template #default="scope">
              <div style="display: flex; gap: 2px;">
                <el-button
                    size="small"
                    :icon="More"
                    type="primary"
                    @click="$router.push({name: 'blog_show', params: {id: scope.row.id}})"
                />
                <el-switch
                    v-model="scope.row.is_active"
                    :loading="loading"
                    class="ml-2"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                    @change="changeActiveStatus(scope.row.id)"
                />
                <el-popconfirm
                    cancel-button-text="Cancel"
                    confirm-button-text="Yes"
                    title="Are you sure you want to delete?"
                    @confirm="deleteRow(scope.row.id)"
                >
                  <template #reference>
                    <el-button
                        size="small"
                        :icon="Delete"
                        type="danger"
                    />
                  </template>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-row justify="center">
          <el-pagination
              v-model:currentPage="currentPage"
              :hide-on-single-page="true"
              layout="prev, pager, next"
              v-bind="pagination"
              sortable="custom"
              @update:current-page="onCurrentPageUpdated"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import blogService from '@/services/blogService'
import { Delete, More } from '@element-plus/icons'
import usePagination from '@/composables/common/usePagination'

const route = useRoute()
const store = useStore()

let search_data = reactive({})

const { pagination, setPagination, currentPage, perPage, perPageCounts } = usePagination(route.params.page)

let loading = ref(false)
let allBlogs = ref([])

const search = async () => {
  try {
    loading.value = true

    const {
      data: {
        data: blogsData,
        meta
      }
    } = await blogService.load(search_data, currentPage.value, perPage.value)
    allBlogs.value = blogsData

    setPagination(meta)
  } catch (e) {

  } finally {
    loading.value = false
  }
}

const onCurrentPageUpdated = async (page) => {
  currentPage.value = page

  await search()
}

const changeActiveStatus = async (id) => {
  if (loading.value) return false

  try {
    loading.value = true

    await blogService.changeActiveStatus(id)
  } catch (e) {

  } finally {
    loading.value = false
  }
}

const deleteRow = async (id) => {
  if (loading.value) return false

  try {
    loading.value = true

    await blogService.delete(id)
    allBlogs.value = allBlogs.value.filter(row => row.id !== id)
  } catch (e) {

  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true

    await search()
  } catch (e) {

  } finally {
    loading.value = false
  }
})

</script>
