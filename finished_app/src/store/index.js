((() => {

  var Vuex = window.Vuex

  const Store = new Vuex.Store({
    state: {
      animationEffect: "list"
    },

    mutations: {

      changeAnimationEffect(state, animationEffect) {
        state.animationEffect = animationEffect
      },
    },

    actions: {

      changeAnimationEffect(context, animationEffect) {
        context.commit("changeAnimationEffect", animationEffect)
      },

    },
  })
  window.store = Store
}))()