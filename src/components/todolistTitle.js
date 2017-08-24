((() => {
  const html = `
  <div class="todolist-title">
    <input class="title" v-model="title" placeholder="Todolist Title">
  </div>
  `

  Vue.component("todolist-title", {
    template: html,

    data() {
      return {
        title: ""
      }
    }
  })
}))()
