<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Eliminar'
    },
    activityId: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      default: () => {}
    },
    styleClass: {
      type: String,
      default: 'btn btn-sm btn-danger'
    }
  },
  methods: {
    handleClick() {
      fetch(`https://activities-register-server-app-b11a66e54362.herokuapp.com/api/activity/${this.activityId}`, {
        method: 'DELETE'
      })
        .then((response) =>
          response.json().then((data) => {
            console.log(data)
            // TODO show message
            this.callback()
          })
        )
        .catch((error) => {
          // TODO show message
          console.error(error)
        })
    }
  }
}
</script>

<template>
  <div v-if="activityId == null"></div>
  <button v-else :class="styleClass" @click="handleClick">{{ label }}</button>
</template>
