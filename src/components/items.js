((() => {
  const html = `
  <div class="items">
    <item v-for="(item, index) in items" v-bind:key="item.id" :item="item" :index="index" @toggle-checked="passToggleChecked" @change-priority="passChangePriority"></item>
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

    computed: {
      listAnimation() {
        return this.$store.state.animationEffect
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
