((() => {
  const html = `
  <div class="items">
    <transition-group name="flip-list">
      <item v-for="(item, index) in items" v-bind:key="item" :item="item" :index="index" @toggle-checked="passToggleChecked" @change-priority="passChangePriority"></item>
    </transition-group>
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
