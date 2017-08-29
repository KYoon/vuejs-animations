# Transitions / Animations

## Why?

Transitions and animations are a very important design tool. They have many uses — some important ones being: the ability to influence or focus user action, make content more readable, and make designs more kinetic and engaging. One of my favorite videos about the power of animations is this one — [Juice it or lose it - a talk by Martin Jonasson & Petri Purho](https://www.youtube.com/watch?v=Fy0aCDmgnxg). If you don’t have time to check out the whole video at least watch the last 2 minutes. You’ll see just how much animations can change the feel of a design. Their demo game seems almost completely different despite the fact that all the game mechanics are exactly the same. While they are speaking of animations in terms of game design, the power that they can have is very clear. Plus they describe adding animations to something making it juicey which has got to be one of the most colorful ways to describe making a design more engaging!

Before we begin talking details, I think it is also important to note the difference between transitions and animations. Transitions are moving from some initial state to an end state. Animations are a little more complicated. While they can behave like transitions, moving from one state to the next, they can and often trigger multiple different states during the animation duration. Animations can chain multiple different states together causing all sorts of complex effects.
 
 ## How?
 
 ### Basics
 
Now that you’re hopefully psyched up about transitions and animations let’s discuss how to implement them in a Vue.js app to make it juicey! Luckily for us, Vue provides a transition wrapper component out of the box. It allows us to add enter and leave transtions for any element in one of four contexts:
 * conditional rendering `v-if`
 * conditional display `v-show`
 * dynamic components `is="component-name"`
 * component root nodes
 
So let's dive in and see how to implement some transitions!
 
 ### Step-1 First Transition
 
Open the app in your favorite text editor. Here you'll see a functioning todo list app with no transitions applied. After playing around with it you'll notice that some of the actions can be pretty jarring. Let's fix this. A good place to start is the `createItem` component. This component is made up of an `<input>` tag and some `<a>` tag action buttons. You can see that they are rendered conditionally using a `v-if` so that they are only visible when there is actually some text in the input box. This way we only allow the user to add an item when there is something to add. Let's add a transition to these buttons so that showing and hiding them is a little smoother and easier on the eyes. 

First, we need to wrap our conditionally rendered html in a `<transition></transition>` tag.

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
`createItem.js`

Great! This will expose for us 6 CSS classes on the element that is conditionally rendered. In our case on `<div v-if="showActions" class="buttons"></div>`. These classes are:
* `v-enter` - starting state for enter
* `v-enter-active` - active state for enter
* `v-enter-to` - ending state for enter
* `v-leave` - starting state for leave
* `v-leave-active` - active state for leave
* `v-leave-to` - ending state for leave

The [vuejs transition documentation](https://vuejs.org/v2/guide/transitions.html) has a great graphic for explaining these different states. So let's leverage these classes to create our transition and make the button fade in and out. Inside our `animations.css` file let's add the classes that we will need. We know that the transition occurs over the course of the active states for enter and leave so we know we will need `v-enter-active` and `v-leave-active`. We also will want to define the start and end states of the transition, so that we know what the element will look like when the transition has completed. So we will also need `v-enter` and `v-leave-to`. 

```css
.v-enter-active, .v-leave-active {

}
.v-enter, .v-leave-to {

}
```
`animations.css`

Now that we have all the classes we need, we can apply some css that will create the transition. Here we are trying to create a fade effect. A good css property to create this is opacity. And we also want to add a transition to this opacity, so we can use the transition css property!

```css
.v-enter-active, .v-leave-active {
 transition: opacity 1s;
}
.v-enter, .v-leave-to {
 opacity: 0;
}
```
`animations.css`

That's all there is to it! Now the buttons should fade in and out over one course of one second. You may want to tweak the transition duration to a time you see fit, I personally like `0.25s` for my effects, but for learning purposes `1s` is much more pronounced. This is awesome, but what if we wanted to add another transition on a different element? We wouldn't be able to do it cleanly as the name space of the transitions would collide. Lucky for us, the transition wrapper component can take a name attribute. This attribute will prefix our 6 css classes with that name. So let's make that change. Since it is a fade, let's name it fade!

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
`createItem.js`

```css
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
```
`animations.css`

This allows us to scope and reuse our animations across our app! This is just an example of a simple transition, but the possibilities are endless. 

### Step-2 List Transitions (adding & removing items)

Now that we know some of the basics about transitions, let's tackle something a bit more challenging - adding transitions to the list items. Previously we used the `transition` component for an individual node being rendered conditionally. But what if you have many items being rendered using a `v-for` like in the case of the body of our todo list? Here the simple `transition` is not enough. For these scenarios, Vue provides the `transition-group` component wrapper. `transition-group` differs from `transition` in two ways. 

1. `transition-group` actually renders an element `<span>` by default that wrapps all of the elements in the list. You can change this wrapper element by defining the `tag="<el>"` attribute on the `transition-group` component.
2. All of the list elements inside the `transition-group` must have a unique `key` attribute assigned to them. This helps for determining when an item has been added or removed from the list.

With that in mind let's begin coding our transition. First let's add the wrapper around our rendered list.

```html
...
<transition-group name="list">
  <item v-for="(item, index) in items" v-bind:key="item.id" :item="item" :index="index" @togglechecked="passToggleChecked" @change-priority="passChangePriority"></item>
</transition-group>
...
```
`items.js`

Let's zero in on the important parts here. We have an `<item>` component that we are rendering as a list with `v-for`. We wrapped this component in a `<transition-group>` with the name `list`. And, we have bound a unique key on the item `item.id`. Now that we have taken care of everything in the markup, all we need to do is add the css hooks!

```css
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```
`animations.css`

Here we are utilizing the different css states to slide in our newly added list items. However, one problem is that when we transition out the elements, the list snaps the elements into their new places. Wouldn't it be much nicer if those elements gracefully slid to their new positions? We will tackle this next. 

### Step-3 List Transitions (changing an items position)

In the previous step we implemented a transition effect for adding and removing an item from a list. However, there is no transition effect for changing an items position in the list. We can see this problem when we remove an item as the other items snap to their new position, and also when we change the priority of an item.

This leads us to another concept of `list-transitions` - the `v-move` class. This class is added to a list item when its position is changing. This makes our job of adding a transition effect to any item that changes position really simple!

```css
.list-move {
  transition: transform 1s;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
  position: absolute;
  width: 100%;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
```
`animations.css`

Here we simply add the css move hook and give it a transition. We also can add an absolute position and width to our elements leaving hooks so that they are taken out of the flow of the list during the transition allowing the items that need to move the space to do so.

There we go! Now our list is much more responsive.

### Bonus List Animation

We spent all this time talking about transitions, let's throw in an animation for fun! 

Instead of a simple slide in, let's make our list components bounce in and out of the list. Let's change the name of our `transition-group` component so we don't tamper with our nice and neat `list` transition. 

```html
...
<transition-group name="list-bounce">
  <item v-for="(item, index) in items" v-bind:key="item.id" :item="item" :index="index" @togglechecked="passToggleChecked" @change-priority="passChangePriority"></item>
</transition-group>
...
```
`items.js`

And let's add a css animation on our active enter and leave css hooks.

```css
.list-bounce-enter-active, .list-bounce-leave-active {
  position: absolute;
  width: 100%;
}
.list-bounce-enter-active {
  animation: bounce-in .5s;
}
.list-bounce-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```
`animations.css`

Here you'll notice a couple things. We've defined a css animation called bounce-in. All it does is transform the scale of our element over some duration. You'll notice that we've seperated out the animation on the `enter-active` and `leave-active` class so that we can play the animation fowards and backwards depending on the action. And finally our `v-enter` and `v-leave-to` hooks. They are not necessary because the animation takes care of this. 

### Challenge

There is one element left that we didn't apply any transition or animation to! This is the `<div class="completed-action">` in `app.js`. Now that you know the basics of implementing Vue transitions and animations, try giving this button a fun new effect!

Also look out for the next post about transitions and animations using Vue. We will be looking at some more advanced concepts including creating reusable custom transitions, javascript hooks with transitions, and some other transitioning scenarios.
