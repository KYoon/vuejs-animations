((() => {
  const html = `
  <div class="items">
    <item v-for="(item, index) in items" key="index" :item="item" :index="index" @toggle-checked="passToggleChecked" @change-priority="passChangePriority"></item>
  </div>
  `

  Vue.component("items", {
    template: html,

    props: {
      items: {
        type: Array,
        required: true
      }
    },

    methods: {
      passChangePriority(priority, index) {
        this.$emit("change-priority", priority, index)
      },

      passToggleChecked(checked, index) {
        this.$emit("toggle-checked", checked, index)
      }
    }

  })
}))()
