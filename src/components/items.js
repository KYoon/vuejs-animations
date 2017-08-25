((() => {
  const html = `
  <div class="items">
    <transition-group v-bind:name="listAnimation">
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
