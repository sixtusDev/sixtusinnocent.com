## Why Vue.js?

Below are few reasons why it's nice picking up Vue for any frontend project.

- **Approachable:** Vue was built on top of core web technologies (HTML, CSS, JavaScript), and exposes APIs that makes it easy for someone who has bare knowledge of HTML, CSS, and JavaScript to interface with. It also has a good documentation.
- **Performant:** Vue is a reactive, compiler-optimized rendering system that requires manual optimization.
- **Versatile:** Vue can either be used as library or as a framework. You can adopt Vue into your project as a library and eventually scale your Vue application to a full-featured framework.
- **Community First:** The three major frontend libraries now are React, Angular, and Vue. React is backed by Facebook, Angular is backed by Google, but Vie is backed by the community. It rose to its prominence by the community. It is driven by what's best for the community, rather than what is best for a cooperation.
- **Enterprise Driven:** Many enterprise business have adopted Vue in their enterprise applications.

## Creating a Vue App

Creating a Vue app is as easy as creating an HTML document, adding Vue CDN in a script tag, and mounting the Vue app.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue 3 Fundamentals</title>
  </head>
  <body>
    <h1>Hey Vue.js</h1>
    <div id="app"> {{message}} <div>
  </body>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const {createApp} = Vue

    const app = createApp({
      data() {
        return {
          message: "Hello world!"
        }
      }
    })

    app.mount('#app')
  </script>
</html>
```

In the above code, we loaded Vue unto the page, created our Vue app, and then mounted our app o the Vue app.

Like react, Vue is reactive, i.e. it can track application states and updates the DOM automatically when the state changes.

The `data()` method (function) in the `createApp` argument returns an object that holds our application data. It makes the states of our application reactive.

## Vue Directives

Vue directives are special attributes provided by Vue, which are added to an HTML element, and they are prefixed with `v-`. They apply reactive behavior to the DOM when the value of their expression changes.

### Conditional Rendering in Vue

```html
<p v-if="count % 2 === 0">Even number</p>
<p v-else>Odd Number number</p>
```

### Rendering a list in Vue

`v-for` directive is used for rendering a list in Vue.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue 3 Fundamentals</title>
  </head>
  <body>
    <h1>Hey Vue.js</h1>
    <div id="app">
      <ul>
        <li v-for="animal in animals">{{ animal }}</li>
      </ul>
    <div>
  </body>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const {createApp} = Vue

    const app = createApp({
      data() {
        return {
          animals: ["cat", "dog", "bird"]
        }
      }
    })

    app.mount('#app')
  </script>
</html>
```

For best practices, don't inline JavaScript logic in Mustache tags (`{{}}`), try as much as possible to only use them to bind data from Vue instance to DOM.

```html
<!-- Bad practice -->
<p>{{ number * Math.random() }}</p>

<!-- God practice -->
<!-- Used only to display data. No JavaScript expression -->
<p>{{ number }}</p>
```

Practice

## Event Handling & Vue Model

### Vue Methods

In Vue, methods are functions that are defined on the Vue instance, and can be used to perform actions, handle events, or execute logic associated with a given component. They are useful for handling events triggered by users, like click event.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue 3 Fundamentals</title>
  </head>
  <body>
    <h1>Counter App</h1>
    <div id="app">
      <p>Count: {{ count }}</p>
      <button v-on:click="increment">Increment</button>
      <div>
        <span>Increment by</span>
        <input
          type="number"
          v-model="incrementByValue"
          v-on:input="incrementBy"
        />
      </div>
    </div>
  </body>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    const { createApp } = Vue;

    const app = createApp({
      data() {
        return {
          count: 0,
          incrementByValue: 11,
        };
      },
      methods: {
        increment() {
          this.count++;
        },
        incrementBy() {
          this.count += +this.incrementByValue;
        },
      },
    });

    app.mount("#app");
  </script>
</html>
```

In the code above, the directive `v-on` is used, which is used to attach event listeners to elements. The name of the event to listen to is added after the `:` colon. In the code above, click event is being listened.

What about 2 way data binding? How can we achieve reactivity between our HTML inputs and data (states)? We achieve it using the `v-model` directive. In the code above, by the help of the `v-model` directive, the `incrementByValue` changes when the input element is keyed a value.

## Slots for Layout

Slots are used for creating reusable components that do not know or need to specify their content beforehand. They kind of act like React.js `props.children`. For example, you might have a generic container component that provides a frame and padding around whatever content you place inside it.

Consider this example:

```html
<template>
  <div class="container">
    <slot />
    <!-- Default slot -->
  </div>
</template>

<style>
  .container {
    border: 2px solid #666;
    padding: 20px;
  }
</style>
```

_ContainerComponent.vue_

We can use the above component `ContainerComponent.vue`, and pass in contents in it:

```html
<ContainerComponent>
  <p>Content</p>
</ContainerComponent>
```

In the above example, `<p>Content</p>` will be inserted where the `<slot />` is defined within `ContainerComponent`.

### Named Slots

Named slots allows us to define multiple slots in a component. Each slot can be filled with different content when the component is used.

Let's define a layout component with named slots:

```html
<template>
  <div>
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot name="main" />
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>
```

_LayoutComponent.vue_

```html
<LayoutComponent>
  <template v-slot:header>
    <h1>Header Content</h1>
  </template>
  <template v-slot:main>
    <p>Main content of the page.</p>
  </template>
  <template v-slot:footer>
    <p>Footer details here.</p>
  </template>
</LayoutComponent>
```

We use the `v-slot` directive to target the slot to render contents within it.
