((() => {
  const html = `
  <div class="todolist-title">
    <input v-focus class="title" v-model="title" placeholder="Todo list Title">
  </div>
  `

  Vue.component("todolist-title", {
    template: html,

    data() {
      return {
        title: ""
      }
    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    }
  })
}))()
