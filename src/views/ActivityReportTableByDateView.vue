<script>
import NavBar from '../components/NavBar.vue'
import dateUtilsMixin from '../mixins/dateUtilsMixin.js'
export default {
  components: {
    NavBar
  },
  mixins: [dateUtilsMixin],
  data() {
    return {
      activities: [],
      isLoading: false
    }
  },
  created() {
    this.getTable()
  },
  methods: {
    getTable() {
      fetch('https://activities-register-server-app-b11a66e54362.herokuapp.com/api/activity_report/table')
        .then((response) => response.json())
        .then((data) => {
          this.activities = data
          console.log(data)
        })
    },

  }
}
</script>

<template>
  <NavBar :id="3" />
  <div class="container">
    <h3>Tabla Resumen</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Fecha</th>
          <th scope="col">Horas trabajadas</th>
          <th scope="col">Horas libres</th>
          <th scope="col">Total horas trabajadas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities ">
          <th scope="row">{{ formatddddMMyyyy(activity.fecha) }}</th>
          <td>{{ formatHour(activity.horas_trabajadas) }}</td>
          <td>{{ formatHour(activity.horas_libres) }}</td>
          <td>{{ formatHour(activity.total_horas_trabajadas) }}</td>
        </tr>
        
        
      </tbody>
    </table>
  </div>
</template>
