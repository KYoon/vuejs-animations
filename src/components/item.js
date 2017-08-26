((() => {
  const html = `
  <div class="item">
    <select v-model="item.priority" @change="changePriority($event)" class="priority" name='priorities' v-bind:class="item.priority">
        <option value='low' class="low">low</option>
        <option value='medium' class="medium">medium</option>
        <option value='high' class="high">high</option>
    </select>
    <div class="text">{{ item.text }}</div>
    <div class="status">
      <div v-if="item.checked" @click="toggleChecked()" class="icon-container checked">
        <svg class="svg-icon">
          <path d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z"></path>
        </svg>
      </div>
      <div v-if="!item.checked" @click="toggleChecked()" class="icon-container unchecked">
        <svg class="svg-icon">
          <path d="M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM28 28h-24v-24h24v24z"></path>
        </svg>
      </div>
    </div>
  </div>
  `

  Vue.component("item", {
    template: html,

    props: {
      item: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },

    methods: {
      changePriority(event) {
        this.$emit("change-priority", event.target.value, this.index)
      },

      toggleChecked() {
        this.$emit("toggle-checked", !this.item.checked, this.index)
      }
    }

  })
}))()
