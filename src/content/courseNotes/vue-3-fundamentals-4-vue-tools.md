## Vue Tools

### Progressive Enhancement

Vue is a frontend framework that supports progressive enhancements. You can use Vue to build a fully fledged web application without a build tool. For example, when you want to move an enterprise application to Vue, it's not really ideal to stop and rewrite the entire application. With Vue's support for progressive enhancement, you can drop in the Vue CDN, and progressively integrate Vue bits by bits into your application.

[Replacing jQuery With Vue.js: No Build Step Necessary](https://www.smashingmagazine.com/2018/02/jquery-vue-javascript/)

GitLab slowly employed progressive enhancement to migrate their Ruby on Rails application to Vue.

### create-vue, Dev Tools, & Volar

The modern way of bootstrapping a Vue application is using Vite as the build tool, which allows us to use [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html)

[Find here](https://vuejs.org/guide/quick-start.html), the steps for creating a new Vue application.

#### Single-File Components (SFCs)

They are a nice feature in Vue that encapsulates the structure, functionality, and styling of a Vue components within a single file that ends with `.vue` extension.

An SFC consists of three primary sections:

- `<template>` Tag
  The `<template>` tag contains the HTML markup of the component. It defined the structure of the Vue component, and it is where Vue-specific directives and bindings are used.

  ```html
  <template>
    <div class="greeting">Hello, {{ name }}!</div>
  </template>
  ```

- `<script>` Tag
  The `<script>` tag encapsulates the JavaScript logic of the component. This includes data properties, methods, lifecycle hooks, and other component options defined by the Vue.js API.

  ```html
  <script>
    export default {
      data() {
        return {
          name: "Vue.js",
        };
      },
    };
  </script>
  ```

- `<style>` Tag
  The `<style>` tag contains the CSS styles specific to the component. Styles defined within this tag are scoped to the component by default, meaning they won't leak out and affect other parts of the application.

  ```html
  <style scoped>
    .greeting {
      color: blue;
    }
  </style>
  ```

### Custom Components

Just like React, Vue supports custom components, which facilitates Component-Driven Development (CDD). CDD is a methodology for building web applications by breaking the UI into smaller, reusable, and composable components, focussing on building the application from the bottom up, starting with the smallest components, and progressively combining them into larger components until the entire application is assembled.

```html
<!-- Child Component -->
<template>
  <div>
    <h3>Child Component</h3>
    <p>This content is defined within the Child component.</p>
  </div>
</template>
```

The child component above is imported into the parent component below and rendered as an HTML tag.

```html
<!-- Parent Component -->
<template>
  <div>
    <h1>Parent Component</h1>
    <ChildComponent />
  </div>
</template>

<script>
  import ChildComponent from "./ChildComponent.vue";

  export default {
    components: {
      ChildComponent,
    },
  };
</script>
```

### Props

Props provide a mechanism for us to pass data from the parent component to the child component. Consider the code snippets below.

```html
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  };
</script>
```

In the code snippet above (child component), the component expects two properties (props) title and message, that are required and of type String.

```html
<template>
  <div>
    <h1>Parent Component</h1>
    <ChildComponent
      title="Child Component"
      message="This content is passed from the Parent component."
    />
  </div>
</template>

<script>
  import ChildComponent from "./ChildComponent.vue";

  export default {
    components: {
      ChildComponent,
    },
  };
</script>
```

### Emitting Custom Events

Vue is against mutating props passed from the parent component to the child component, directly in the child component.

Consider this code:

```html
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
    methods: {
      changeTitle() {
        this.title = "Hello World!";
      },
    },
  };
</script>
```

In the code above, Vue will yell at, because we tried to mutate the value of title directly in the child components. It's an antipattern, and not a good practice.

The best way to mutate props is to emit an event from the child component up to the parent component. The parent component listens to the event, and then mutates the props which is defined in its component.

```html
<template>
  <div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <button @click="requestMessageUpdate">Update Message</button>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      message: String,
    },
    emits: ["update-message"],
    methods: {
      requestMessageUpdate() {
        // Emitting an event with the new message as payload
        this.$emit("update-message", "New message from the Child component");
      },
    },
  };
</script>
```

```html
<template>
  <div>
    <ChildComponent
      :title="title"
      :message="message"
      @update-message="message = $event"
    />
  </div>
</template>

<script>
  import ChildComponent from "./ChildComponent.vue";

  export default {
    components: {
      ChildComponent,
    },
    data() {
      return {
        title: "Initial Title",
        message: "Initial Message",
      };
    },
  };
</script>
```

In Vue.js, `$emit` is an instance method used by child components to dispatch custom events to their parent components. When a child component needs to send information to its parent, it can emit an event using `$emit`. The parent component listens for this event and defined a method to respond to it, to handle the emitted event.
