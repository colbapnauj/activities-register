<script>
import NavBar from '../components/NavBar.vue'
import dateUtilsMixin from './../mixins/dateUtilsMixin.js'
import DeleteButton from './../components/DeleteButton.vue'

export default {
  components: {
    NavBar,
    DeleteButton
  },
  mixins: [dateUtilsMixin],
  data() {
    return {
      activities: [],
      isLoading: false
    }
  },
  created() {
    this.fetchActivities()
  },
  computed: {
    // create method that return today date in format yyyy-mm-dd
    getCurrentDate() {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      const yyyy = today.getFullYear()
      return yyyy + '-' + mm + '-' + dd
    }
  },
  methods: {
    fetchActivities() {
      if (this.isLoading) return

      this.isLoading = true
      // delay 1 second to show loading

      fetch(`https://activities-register-server-app-b11a66e54362.herokuapp.com/api/activity`)
        .then((response) => response.json())
        .then((data) => {
          this.activities = data
          console.log(data)
          console.log(this.activities)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
<template>
  <div class="container">
    <NavBar :id="1" />
    <h1>Registro de Actividades</h1>

    <span v-if="isLoading">Cargando</span><br />

    <button class="btn btn-primary" @click="fetchActivities">Obtener actividades</button>

    <table class="table">
      <thead>
        <tr>
          <th class="hidden" scope="col">Id</th>
          <th scope="col">Tipo</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha</th>
          <th scope="col">Incio</th>
          <th scope="col">Fin</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities">
          <th class="hidden" scope="row">{{ activity._id }}</th>
          <td>{{ activity.tipo }}</td>
          <td>{{ shortDate(activity.fecha) }}</td>
          <td>{{ activity.descripcion }}</td>
          <td>{{ dateInHours(activity.hora_inicio) }}</td>
          <td>{{ dateInHours(activity.hora_fin) }}</td>
          <td>
            <RouterLink :to="`/activities/detail/${activity._id}`" class="btn btn-sm btn-primary"
              >Editar</RouterLink
            >
            <DeleteButton label="Eliminar" :activityId="activity._id" :callback="fetchActivities" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.hidden {
  display: none;
}
</style>
