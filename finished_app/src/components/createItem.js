((() => {
  const html = `
  <div class="create-item">
    <input v-on:keyup.enter="addItem()" class="item-input" v-model="item" placeholder="Add item to todo list">
    <transition name="fade">
      <div v-if="showActions" class="buttons">
        <a v-on:click.stop.prevent="addItem()" class="item-button add">Add Item</a>
        <a v-on:click.stop.prevent="reset()" class="item-button clear">Clear</a>
      </div>
    </transition>
  </div>
  `

  Vue.component("create-item", {
    template: html,

    data() {
      return {
        item: ""
      }
    },

    computed: {
      showActions() {
        return this.item.length > 0
      }
    },

    methods: {
      addItem() {
        if (!this.item.length > 0) {return}
        this.$emit("add-item", this.item)
        this.reset()
      },

      reset() {
        this.item = ""
      }
    }
  })
}))()
