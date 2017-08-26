((() => {
  const html = `
  <div class="items">
    <div class="items-wrapper">
      <transition-group name="list">
        <item v-for="(item, index) in items" v-bind:key="item.id" :item="item" :index="index" @toggle-checked="passToggleChecked" @change-priority="passChangePriority"></item>
      </transition-group>
    </div>
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
