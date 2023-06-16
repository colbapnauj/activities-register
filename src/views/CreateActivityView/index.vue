<script>
export default {
  data() {
    return {
      activities: [
        {
          id: 1,
          tipo: "trabajo",
          description: "trabajo",
          fecha: "2023-12-12",
          hora_inicio: "2023-12-12 12:00:00",
          hora_fin: "2023-12-12 12:00:00"
        },
        {
          id: 2,
          tipo: "libre",
          description: "libre",
          fecha: "2023-12-12",
          hora_inicio: "2023-12-12 12:00:00",
          hora_fin: "2023-12-12 12:00:00"
        }
      ],
    }
  },
  computed: {
    // create method taht return today date in format yyyy-mm-dd
    getCurrentDate  () {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      return yyyy + '-' + mm + '-' + dd;
    }
  }


}
</script>
<template>

  <h1>

    Activities View
  </h1>
  <form>
    <!-- 
    {
      "tipo": {
        allow: ["trabajo", "libre"],
        type: "options"
      },
      "description": {
        type: "text"
      },
      "fecha": "2023-12-12",
      "hora_inicio": {
        example: "2023-12-12 12:00:00",
        type: "picker"
      }
      "hora_fin": {
        example: "2023-12-12 12:00:00",
        type: "picker"
    }
    -->
    <input type="text" placeholder="description" />
    <input type="text" placeholder="description" />
    <input type="date" id="start" name="activity-start"
      :value="getCurrentDate"
      min="2023-01-01" max="2023-12-31" />
    
  </form>
</template>
