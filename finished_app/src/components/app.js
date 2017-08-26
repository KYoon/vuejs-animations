((() => {
  const html = `
    <div class="todolist">
      <div class="col-9 notebook">
        <todolist-title></todolist-title>
        <create-item @add-item="handleAddItem"></create-item>
        <items :items="prioritizedItems" @toggle-checked="handleToggleChecked" @change-priority="handleChangePriority"></items>
        <div class="completed-action">
          <a v-if="hasCompletedItems" v-on:click.stop.prevent="completeItems()" class="item-button add">Complete Checked Items</a>
        </div>
      </div>
    </div>
  `

  Vue.component("todolist-app", {
    template: html,
    data(){
      return {
        items: [],
        itemIndex: 0
      }
    },

    computed: {
      prioritizedItems() {
        var priorities = ["high", "medium","low"]
        return this.items.sort(function(a, b){
          var firstPriority = priorities.indexOf(a.priority) ;
          var secPriority = priorities.indexOf(b.priority)
          return firstPriority - secPriority 
        })
      },

      hasCompletedItems() {
        return this.items.some(item => item.checked === true)
      }
    },

    methods: {
      completeItems() {
        this.items = this.items.filter((item) => {
          return item.checked === false
        })
      },

      handleAddItem(item) {
        // give the item an id for list transition
        this.items.push({id: this.itemIndex, priority: 'low', checked: false, text: item})
        this.itemIndex += 1
      },

      handleChangePriority(priority, index) {
        this.items[index].priority = priority
      },

      handleToggleChecked(checked, index) {
        this.items[index].checked = checked
      }
    }
  })
}))()
