---
author: Sixtus Innocent
pubDatetime: 2024-08-03T02:55:23.091Z
title: "A Closer Look at the `this` Keyword in JavaScript, Part 1"
slug: a-closer-look-at-the-this-keyword-in-javascript-part-1
featured: false
draft: false
tags:
  - javascript
  - web-development
description: The JavaScript “this” keyword can be daunting to grasp, but in this article, I exhaustively unravelled it with detailed examples.
---

## Table of contents

## Introduction

`this`, a powerful feature in JavaScript, can confuse engineers if not properly grasped, especially when debugging code that is littered with them. In this article, I am going to explain with detailed examples the `this` keyword. We will explore how `this` is contextually bound and varies depending on how a function is invoked. This article is tailored for both junior and senior engineers who want to fully understand the magic behind the `this` keyword.

## Lexical Scoping vs Dynamic Scoping

In JavaScript, variables and function declarations are lexically scoped, meaning, they can only be accessed within the context in which they are declared/placed physically within the code, and not at runtime (known as dynamic scoping). If you want to know whether a variable is accessible within a context (global or function context), look where the variable sits physically in your code.

Consider this example:

```javascript
function func1() {
  const func1Var = "I am in func1";

  function func2() {
    console.log(func1Var);
  }
  func2();
}

func1();
```

In the above example:

- The `func1Var` is defined in the scope of `func1`.
- By merely looking at the code structure, `func2`, which is nested inside `func1` can access `func1Var` because of where it sits physically within the code (lexical scoping).
- When `func1` is invoked, a new [execution context](https://www.sixtusinnocent.com/posts/javascript-internals-the-execution-context/) will be created and pushed onto the call stack. As the JS engine keeps running `func1` and reaches the line where `func2` is invoked, another execution context is created and pushed onto the call stack, on top of `func1`'s execution context. A key thing to note is that `func2` will remember the environment in which it was created; it will have access to its outer environment, which is `func1`. Meaning, `func2` will have access to all the variables defined in `finc1`.

I will advise that you read [JavaScript Internals: The Execution Context](https://www.sixtusinnocent.com/posts/javascript-internals-the-execution-context/), one of my articles where I dived deep into the subject of execution context, and lexical scoping in JavaScript.

On the other hand, some programming languages support [dynamic scoping](https://www.geeksforgeeks.org/static-and-dynamic-scoping/), although powerful, it comes with its complexities. Dynamic scoping is a model of scoping where the scope is determined dynamically at runtime, rather than lexically at author-time. In dynamic scoping, the resolution of a variable (searching) is performed in the call stack, first you search in the local function, then you search in the function that called the local function, then you search in the function that called that function, and so on, up the call stack. There is no need to dig deep into dynamic scoping since JavaScript does not support dynamic scoping, and our topic of discussion is the `this` keyword.

Okay, we have established the fact that JavaScript is a lexically scoped language. All variables are lexically scoped. There is a special keyword in JavaScript known as the `this` keyword. It references an object and is bound to an execution context.

In JavaScript, the `this` keyword does not conform to the typical rules of lexical or dynamic scoping found in variable declarations. Instead, `this` behaves uniquely, with its value determined at runtime based on the context of the function's invocation. This dynamic determination makes its behavior appear similar to dynamic scoping because it can change depending on how and where the function is called, not statically defined at compile time. So, I introduced lexical and dynamic scoping to guide our understanding and give us a mental model of `this` behavior.

## What is `this`?

The `this` keyword in JavaScript is a reserved keyword that references the current execution context's object. To fully understand the `this` keyword, we need to ask ourselves two questions: Firstly, what does the `this` keyword reference, and secondly, how does the JavaScript engine determine what it references? Before we delve into these questions, it’s crucial to note that the context of the `this` keyword in classical [Object Oriented Programming (OOP)](https://www.freecodecamp.org/news/what-is-object-oriented-programming/) languages like Java is different from the context in JavaScript. If you are coming from a classical OOP background, you may need to set aside what you know about `this`, as its behavior in JavaScript is quite distinct. I'll outline their differences after establishing what the `this` keyword represents in JavaScript.

`this` refers to the current context in which a function is invoked, and it is bound to an object at runtime. Hence, its reference can change at runtime depending on how the function is called. This means that we cannot determine the reference of `this` merely by looking at a function declaration or where it is placed within the code, but rather by understanding how it is called. This behavour makes the `this` keyword dynamically scoped.

Consider this code:

```javascript
const person = {
  name: "Sixtus",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

person.greet(); // Output: Hello, my name is Sixtus
```

A quick question, in the code above, what will `this.name` evaluate to when the `greet` function is called? If you answered `Sixtus`, you are neither wrong nor right, due to the nuances in the evaluation of `this`, which is not determined at [compile/author](https://stackoverflow.com/questions/35686903/author-time-vs-run-time-in-javascript#:~:text=Author%2Dtime%20means%20%2D%20it's%20decided,basically%20target%20to%20Dynamic%20scope%20.) time but rather at run time.

As a JavaScript Engineer, merely looking at the person object definition, and the `greet` function definition to figure out the value of `this` in the code above is not the right approach. What then is the right approach? The right approach is to look at how the function `greet` is invoked, the object that calls the function will be referenced to `this`. In our code above, the object that called the `greet` function is the `person` object, hence `this` used in the `greet` function will point to the `person` object (by reference).

Therefore, to determine the value of `this` keyword in functions where it is used, we scan through our code to look out for where the functions are invoked to see how they are invoked.

What if the `greet` function is invoked in a different context like this: `setTimeout(person.greet, 1000)`. What will be the output? Take a few minutes to run it, and see the output. Think why you got that output.

## How Function Invocation Affects the Binding of `this`

The way a function is invoked in JavaScript is the factor that determines the binding of `this` in functions where they are used. We are going to look at the different methods functions are called in JavaScript.

### Free Function Invocation

Free function invocation is invoking a function that is not tied to any object as a method. It typically means invoking a function standalone, without it being a property of an object or without using the `new` keyword for constructing instances.

The value of `this` inside a function that is invoked freely depends on two factors:

- **In non-strict mode:** `this` value will be the global object. The global object is `window` in browsers, and `global` in Node.js.
- **In strict mode:** `this` value will be `undefined`.

#### They are all Free Function Invocation

```javascript
function display() {
  console.log("Value of `this` is: ", this);
}

display(); // `this` will be global object in non-strict mode, and undefined in strict mode.
```

In the above code example, `display` is called directly and not as a method of any object, making it a free function invocation. After invoking the `display` function above, the value of `this` that will be logged on the console is either the global object (`window` in browser, and `global` in Node.js) in non-strict mode or `undefined` in strict mode.

```javascript
const person = {
  name: "Sixtus",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

const newGreet = person.greet;
newGreet(); // This is a free function invocation. `this` is the global object or `undefined` in strict mode.
```

You might argue that the invocation of `newGreet()` in the code above is not a free function invocation since the `newGreet` variable initialized value is `person.greet`. Take a close look, we are not invoking `person.greet`, because there is no parenthesis to signify invocation like this `person.greet()`. What happens is that the `newGreet` variable holds a reference to the `person.greet` function without explicitly binding `this` to `person`, which could be done using `bind()` (You can explicitly bind `this` to the context you want. More on this in part two of this series). When `person.greet` is assigned to `newGreet`, a new reference to the existing `greet` function is created. Therefore, `newGreet` is the same function as `person.greet`, only without the object context that `person.greet` would have when called as a method of `person`.

Because the invocation of `newGreet()` function is a free function invocation:

- `Hello, my name is ` will be printed on the browser console in non-strict mode, because the property `name` does not exist on the `window` object.
- In strict mode, `this` will be `undefined`, and the JavaScript engine will throw a `TypeError` exception with the message “Cannot read properties of undefined (reading 'name')”, because it is trying to access `name` property in `undefined` (the value of `this`).

Therefore, the value of `this` for all free function invocations in JavaScript is either the `global` object in non-strict mode or `undefined` in strict mode.

**Note:** Arrow functions do not have their own `this` context; instead, they inherit it from the surrounding scope (More on this in part two of this series).

### Method Invocation

Method invocation in JavaScript is the process of calling a method of an object. The method is a function that is defined as a property of an object. The [first example]() we looked at in this article has to do with method invocation. Let us revisit the example.

```javascript
const person = {
  name: "Sixtus",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

person.greet(); // Output: Hello, my name is Sixtus
```

In the code example above, the variable `person` is declared and initialized as an object with properties name, and greet along with their respective values. The `greet` property is a method in the `person` object. To invoke the `greet` method, we use the dot notation to access the property followed by parentheses: `person.greet()`. If you can recall from the first example, what will be the value of `this` upon invocation? The value of `this` will be the `person` object because the `greet` method was invoked on the `person` object. The output of the above code will be `Hello, my name is Sixtus`.

Whenever a function containing the `this` keyword is invoked as a method of an object, whether through dot notation (e.g., person.greet()) or bracket notation (e.g., person['greet']()), the value of `this` within that function is bound to the object from which the method is called. This means that `this` will reference the object itself, linking directly to where the method is invoked.

In the code above, `this` will reference the `person` object.

### Constructor Invocation

[Constructor functions](https://www.programiz.com/javascript/constructor-function) in JavaScript are special functions that are used to model, create, and initialize objects. In a constructor function, properties and behaviors (methods) are modeled and defined, which will belong to any newly created object that is created using the `new` keyword. The `new` keyword is used to instantiate new objects that inherit from the constructor's prototype.

#### How Constructor Invocation Works

What happens when a constructor function is invoked?

- A new object is automatically created.
- The newly created object's prototype (`__proto__` or `[[Prototype]]`) is set to the constructor function's `prototype` property. This implies that any properties defined on the constructor's prototype are accessible to the newly created object.
- `this` inside the constructor function will have a reference to the newly created object. This allows properties and methods to be directly attached to the object.
- The constructor function's body is then executed for the initialization of the object properties.
- Lastly, the constructor implicitly returns the newly created object, unless it explicitly returns a different object.

Consider this example:

```javascript
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;

  this.displayInfo = function () {
    return `Make: ${this.make}, Model: ${this.model} Year: ${this.year}`;
  };
}

// Creating a new instance of Car
const myCar = new Car("Toyota", "Camry", "2020");
console.log(myCar.displayInfo()); // Output: Make: Toyota, Model: Camry Year: 2020
```

The `Car` function in the above code is a constructor function where the properties and behaviors of the car are modeled. It kind of serves as a template or a way of prototyping an object.

Following the way constructor function invocation works that we previously established, we can say the following about the invocation of the `Car` constructor function:

- `new Car("Toyota", "Camry", "2020")` created a new object with `make`, `model`, and `year` properties, and a `displayInfo` method (function).
- `this` will be bound (point) to the newly created object that is created as a result of `new Car("Toyota", "Camry", "2020")`.
- The newly created object with the properties and methods will be returned, and `myCar` variable will hold the object.

### Indirect Function Invocation

Indirect function invocation is an invocation method where a function is passed around, and its execution is triggered by another part of the program, rather than being directly called in the sequence of code.

In indirect invocation, the context in which the function executes is different from the context in which it was defined unless the function is explicitly bound to a particular object or context (I will throw more light on this in part two of this topic).

[Callback functions](https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/) are good examples of functions that are called indirectly. A callback function is a function that is passed to another function as an argument and is invoked by that function.

Let's revisit one of our previous code examples, this time we will call the `greet` method differently.

```javascript
const person = {
  name: "Sixtus",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

setTimeout(person.greet, 1000);
```

In the code above, the `person.greet` function is executed after 1000 milliseconds, that is, the `setTimeout` API schedules the function to be executed after 1000 milliseconds by the JavaScript runtime's event loop. To have a perspective on the event loop, and the JavaScript runtime environment, read [JavaScript Internals: The JavaScript Runtime Environment](https://www.sixtusinnocent.com/posts/javascript-internals-the-javascript-runtime-environment/), which is one of my articles on the JavaScript runtime environment.

The caller of `person.greet` function is the event loop mechanism that handles the execution of queued tasks. When `person.greet` is passed to `setTimeout`, the method is essentially being passed as a reference to a function, not as a method of the `person` object. Therefore, when it is invoked after the delay, it is called as a standalone function without its original object context. `this` in the `greet` function will be bound to the `global` context or `undefined` in strict mode, because `person.greet` function is not invoked as a method of the `person` object.

Running, the above code will produce `Hello, my name is ` on the browser console in non-strict mode, or the JS engine will raise a `TypeError` exeception in strict mode.

## Conclusion

Congratulations, you have reached the end of this article but not the end of the topic. I will publish part two of this topic, once I am done writing it.

Recall, that we established the fact that `this` is dynamically scoped at runtime, and we asked an important question: if we can make `this` lexically scoped? The answer is “YES!”, we can explicitly make `this` lexically scope. But how can we do it? Well, in part 2 of this series, I will explain the different ways we can achieve it.

You might need to reread this article, and practice the example codes for an in-depth understanding of `this` because mastering it will help you as a Software Engineer in these aspects:

- Effective use of OOP
- Understanding scope and context
- Better debugging and troubleshooting
- Effective use of libraries and frameworks
- And of course interviews (for that senior role you have been dreaming of 😎)

For now, have a great time, and see you soon in part two. Cheers!

## Further Reading

- [JavaScript Internals: The Execution Context](https://www.sixtusinnocent.com/posts/javascript-internals-the-execution-context/)
- [JavaScript Internals: The JavaScript Runtime Environment](https://www.sixtusinnocent.com/posts/javascript-internals-the-javascript-runtime-environment/)
- [You Don't Know JS Yet: Objects & Classes - 2nd Edition](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/objects-classes)
- [A Beginner’s Guide to JavaScript’s Prototype](https://www.freecodecamp.org/news/a-beginners-guide-to-javascripts-prototype/)
