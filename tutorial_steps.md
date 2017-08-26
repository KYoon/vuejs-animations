# Transitions / Animations

## Why?

Transitions and animations are a very important design tool. They can be used to influence or focus user action, make content more readable, and make designs more kinetic and engaging. One of my favorite videos about the power of animations is this one - [Juice it or lose it - a talk by Martin Jonasson & Petri Purho](https://www.youtube.com/watch?v=Fy0aCDmgnxg). They call adding animations to something making it *juicey* which I think just is the best way to describe making a design more engaging! While they are speaking of animations in terms of game design, the power that they can have is very clear! If you don't have time to check out the whole video at least watch the last 2 minutes. You'll see just how much animations can change the feel of a design! It almost feels like a completely different game even though the all the game mechanics are exactly the same. 
 
Before we begin talking details, I think it is also important to note the difference between transitions and animations. Transitions are moving from some initial state to an end state. Animations are a little more complicated. While they can behave like transitions, moving from one state to the next, they can and often trigger multiple different states during the animation duration. Animations can chain multiple different states together causing all sorts of different effects and can be much more complex than transitions.
 
 
 ## How?
 
 ### Basics
 
 Now that you're hopefully psyched up about transitions and animations let's discuss how to implement them in a Vue.js app!
 Vue provides a transition wrapper component out of the box that allows you to add enter and leave transtions for any element 
 in one of four contexts:
 * conditional rendering `v-if`
 * conditional display `v-show`
 * dynamic components `is="component-name"`
 * component root nodes
 
So let's dive in and see how to implement some transitions!
 
 ### Step-1 First Transition
 
Open the app in your favorite text editor. Here you'll see a functioning todo list app with no transitions applied. After playing around with it you'll notice that some of the actions can be pretty jarring. Let's fix this. A good place to start is the `createItem` component. This component is made up of an `<input>` tag and some `<a>` tag action buttons. You can see that they are rendered conditionally using a `v-if` so that they are only visible when there is actually some text in the input box. This way we only allow the user to add an item when there is something to add. Let's add a transition to these buttons so that showing and hiding them is a little smoother and easier on the eyes. 

First, we need to wrap our conditionally rendered html in a `<transition></transition>` tag.

`createItem.js`
```html
...
<transition>
  <div v-if="showActions" class="buttons">
    <a v-on:click.stop.prevent="addItem()" class="item-button add">Add Item</a>
    <a v-on:click.stop.prevent="reset()" class="item-button clear">Clear</a>
  </div>
</transition>
...
```

Great! This will expose for us 6 CSS classes on the element that is conditionally rendered. In our case on `<div v-if="showActions" class="buttons"></div>`. These classes are:
* `v-enter` - starting state for enter
* `v-enter-active` - active state for enter
* `v-enter-to` - ending state for enter
* `v-leave` - starting state for leave
* `v-leave-active` - active state for leave
* `v-leave-to` - ending state for leave

The [vuejs transition documentation](https://vuejs.org/v2/guide/transitions.html) has a great graphic for explaining these different states. So let's leverage these classes to create our transition and make the button fade in and out. Inside our `animations.css` file let's add the classes that we will need. We know that the transition occurs over the course of the active states for enter and leave so we know we will need `v-enter-active` and `v-leave-active`. We also will want to define the start and end states of the transition, so that we know what the element will look like when the transition has completed. So we will also need `v-enter` and `v-leave-to`. 

`animations.css`
```css
.v-enter-active, .v-leave-active {

}
.v-enter, .v-leave-to {

}
```

Now that we have all the classes we need, we can apply some css that will create the transition. Here we are trying to create a fade effect. A good css property to create this is opacity. And we also want to add a transition to this opacity, so we can use the transition css property!

`animations.css`
```css
.v-enter-active, .v-leave-active {
 transition: opacity 1s;
}
.v-enter, .v-leave-to {
 opacity: 0;
}
```

That's all there is to it! Now the buttons should fade in and out over one course of one second. You may want to tweak the transition duration to a time you see fit, I personally like `0.25s` for my effects, but for learning purposes `1s` is much more pronounced. This is awesome, but what if we wanted to add another transition on a different element? We wouldn't be able to do it cleanly as the name space of the transitions would collide. Lucky for us, the transition wrapper component can take a name attribute. This attribute will prefix our 6 css classes with that name. So let's make that change. Since it is a fade, let's name it fade!

`createItem.js`
```html
...
<transition name="fade">
  <div v-if="showActions" class="buttons">
    <a v-on:click.stop.prevent="addItem()" class="item-button add">Add Item</a>
    <a v-on:click.stop.prevent="reset()" class="item-button clear">Clear</a>
  </div>
</transition>
...
```

`animations.css`
```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
```

This allows us to scope and reuse our animations across our app! This is just an example of a simple transition, but the possibilities are endless. 

### Step-2 List Transitions

Now that we know some of the basics about transitions, let's tackle something a bit more challenging - adding transitions to the list items. 




