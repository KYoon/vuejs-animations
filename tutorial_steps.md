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
 
We will primarily be focusing on the first two bullets in this tutorial. So let's dive in and see how to implement these!
 
 ### Step-1 First Transition
 
Open the app in your favorite text editor. Here you'll see a functioning todo list app with no transitions applied. After playing around with it you'll notice that some of the actions can be pretty jarring. This can be solved with some transitions. A good place to start is the `createItem` component. This component is made up of an `<input>` tag and some `<a>` tag action buttons. You can see that they are rendered conditionally using a `v-if` so that they are only visible when there is actually some text in the input box. This way we only allow the user to add an item when there is something to add. Let's add a transition to these buttons so that showing and hiding them is a little smoother and easier on the eyes. 

First, we need to wrap our conditionally rendered html in a `<transition></transition>` tag.

`createItem.js`
```
lang=html
<transition>
  <div v-if="showActions" class="buttons">
    <a v-on:click.stop.prevent="addItem()" class="item-button add">Add Item</a>
    <a v-on:click.stop.prevent="reset()" class="item-button clear">Clear</a>
  </div>
</transition>
```
