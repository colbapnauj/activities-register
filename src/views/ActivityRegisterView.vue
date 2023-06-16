<script>
import NavBar from '@/components/NavBar.vue'
import dateUtilsMixin from './../mixins/dateUtilsMixin.js'
import DeleteButton from './../components/DeleteButton.vue'

export default {
  components: {
    NavBar,
    DeleteButton
},
  mixins: [dateUtilsMixin],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: '',
      dateSelected: '',
      typeSelected: 'Seleccione un tipo',
      description: '',
      startTime: '',
      endTime: '',
      // types: [
      //   { id: 1, name: 'Trabajo' },
      //   { id: 2, name: 'Estudio' },
      //   { id: 3, name: 'Ocio' },
      //   { id: 4, name: 'Otros' }
      // ]
      activityIdParam: null,
      isLoading: false
    }
  },
  created() {
    this.dateSelected = this.getCurrentDate
    this.activityIdParam = this.$route.params.activityId
  },
  methods: {
    handleRegister() {
      const isValid = this.validateForm()
      if (!isValid) return

      console.log(this.dateSelected)
      console.log(this.typeSelected)
      console.log(this.description)
      console.log(this.startTime)
      console.log(this.endTime)

      // create startDateTime with lima format
      // create a Date object with the current date and time
      const localDate = new Date(this.dateSelected + ' ' + '00:00:00' + '-05:00')

      const startDateTime = new Date(this.dateSelected + ' ' + this.startTime + '-05:00')
      // create endDateTime with lima format
      const endDateTime = new Date(this.dateSelected + ' ' + this.endTime + '-05:00')
      console.log(startDateTime)
      console.log(endDateTime)

      const data = {
        fecha: localDate,
        tipo: this.typeSelected,
        descripcion: this.description,
        hora_inicio: startDateTime,
        hora_fin: endDateTime
      }

      fetch('https://activities-register-server-app-b11a66e54362.herokuapp.com/api/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) =>
          response.json().then((data) => {
            console.log(data)
          })
        )
        .catch((error) => {
          console.error(error)
        })
    },
    validateForm() {
      if (this.dateSelected == null || this.dateSelected == '') {
        alert('Debe seleccionar una fecha')
        return false
      }
      if (
        this.typeSelected == null ||
        this.typeSelected == '' ||
        this.typeSelected == 'Seleccione un tipo'
      ) {
        alert('Debe seleccionar un tipo')
        return false
      }
      if (this.description == null || this.description == '') {
        alert('Debe ingresar una descripción')
        return false
      }
      if (this.startTime == null || this.startTime == '') {
        alert('Debe ingresar una hora de inicio')
        return false
      }
      if (this.endTime == null || this.endTime == '') {
        alert('Debe ingresar una hora de fin')
        return false
      }
      return true
    },
    async fetchActivity() {
      // validate if activityIdParam is null
      if (this.activityIdParam == null || this.activityIdParam == '') {
        return
      }

      if (this.isLoading) return

      this.isLoading = true

      try {
        const response = await fetch('https://activities-register-server-app-b11a66e54362.herokuapp.com/api/activity/' + this.activityIdParam)

        if (response.status == 500) {
          console.error('Error en el servidor: ' + response)
          this.$router.push('/activities')
          return
        }

        const data = await response.json()
        console.log(data)
        this.id = data._id
        this.dateSelected = this.shortDate(data.fecha)
        this.typeSelected = data.tipo
        this.description = data.descripcion
        this.startTime = this.dateInHours(data.hora_inicio)
        this.endTime = this.dateInHours(data.hora_fin)
      } catch (error) {
        console.error(error)
        this.$router.push('/activities')
      } finally {
        this.isLoading = false
      }
    },
    handleEdit() {
      const isValid = this.validateForm()
      if (!isValid) return

      // create startDateTime with lima format
      // create a Date object with the current date and time
      const localDate = new Date(this.dateSelected + ' ' + '00:00:00' + '-05:00')

      const startDateTime = new Date(this.dateSelected + ' ' + this.startTime + '-05:00')
      // create endDateTime with lima format
      const endDateTime = new Date(this.dateSelected + ' ' + this.endTime + '-05:00')

      const data = {
        fecha: localDate,
        tipo: this.typeSelected,
        descripcion: this.description,
        hora_inicio: startDateTime,
        hora_fin: endDateTime
      }

      console.log(data)

      fetch('https://activities-register-server-app-b11a66e54362.herokuapp.com/api/activity/' + this.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) =>
          response.json().then((data) => {
            console.log(data)
            this.$router.push('/activities')
          })
        )
        .catch((error) => {
          console.error(error)
        })
    },
    goToActivities() {
      this.$router.push('/activities')
    },

  },
  computed: {
    getCurrentDate() {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      const yyyy = today.getFullYear()
      return yyyy + '-' + mm + '-' + dd
    }
  },
  watch: {
    activityIdParam: {
      handler: function (val) {
        console.log('route.params.activityId: ' + val)
        this.fetchActivity()
      },
      deep: true,
      inmediate: true
    },
    dateSelected: function (val) {
      console.log('dateSelected: ' + val)
    },
    typeSelected: function (val) {
      console.log('typeSelected: ' + val)
    },
    description: function (val) {
      console.log('description: ' + val)
    },
    startTime: function (val) {
      console.log('startTime: ' + val)
    },
    endTime: function (val) {
      console.log('endTime: ' + val)
    }
  }
}
</script>

<template>
  <NavBar :id="activityIdParam != null ? 2 : 0" />
  <div class="container">
    <div class="mt-5">
      <h3 v-if="!activityIdParam">Registrar Actividad</h3>
      <h3 v-else>Editar Actividad</h3>
      <div class="row mt-3">
        <div class="col-lg-6">
          <form>
            <div class="mb-3">
              <label class="form-label">Fecha</label>
              <input type="date" class="form-control" v-model="dateSelected" />
            </div>
            <div class="mb-3">
              <label class="form-label">Tipo</label>
              <select class="form-select mb-3" v-model="typeSelected" aria-label=".form-select-sm">
                <option selected>Seleccione un tipo</option>
                <option id="trabajo" value="trabajo">Trabajo</option>
                <option id="libre" value="libre">Libre</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="inputDescription" class="form-label">Descripción</label>
              <input
                v-model="description"
                type="text"
                class="form-control"
                id="inputDescription"
                aria-describedby="descriptionHelp"
                placeholder="Editar video para proyecto Chihuata"
              />
              <div id="descriptionHelp" class="form-text">
                Agregue una descripción para la actividad a registrar.
              </div>
            </div>
            <div class="mb-3">
              <label for="inputStartTime" class="form-label">Hora de inicio</label>
              <input v-model="startTime" type="time" class="form-control" id="inputStartTime" />
            </div>
            <div class="mb-3">
              <label for="inputEndTime" class="form-check-label">Hora de fin</label>
              <input v-model="endTime" type="time" class="form-control" id="inputEndTime" />
            </div>
            <div class="row">
              <button
                v-if="!activityIdParam"
                type="submit"
                class="btn btn-primary"
                @click.prevent="handleRegister"
              >
                Registrar
              </button>

              <button v-else type="submit" class="btn btn-primary" @click.prevent="handleEdit">
                Guardar
              </button>

              <div class="m-1"></div>

              <DeleteButton v-if="activityIdParam" :activityId="id" styleClass="btn btn-danger" :callback="goToActivities"/>

            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
