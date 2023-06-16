<script>
import { RouterLink } from 'vue-router'
export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      items: [
        { title: 'Ver actividades', url: '/activities', id: 1 },
        { title: 'Registrar actividad', url: '/activity-register', id: 2 },
        { title: 'Ver tabla del mes', url: '/activity-report/table', id: 3 },
        { title: 'Me Rendí', url: '/me-rendi', id: 4}
      ]
    }
  }
}
</script>

<template>
  <ul class="nav justify-content-center">
    <li v-for="item in items" class="nav-item">
      <RouterLink :to="item.url" class="nav-link" :class="id == item.id ? 'active': ''" aria-current="page">{{ item.title }}</RouterLink>
    </li>
  </ul>
</template>

<style>
.active {
  background-color: #e3f2fd;
  border-radius: 5px;
  padding: 10px;
}
</style>
