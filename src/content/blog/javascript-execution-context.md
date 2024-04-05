---
author: Sixtus Innocent
pubDatetime: 2024-04-03T14:18:33.622Z
title: "JavaScript Internals: The Execution Context"
slug: javascript-internals-the-execution-context
featured: false
draft: false
tags:
  - javascript
  - web-development
description: A detailed guide on how global and function execution contexts operate, their phases, along with the call stack, scope chain, lexical environments, variable environments, and the `this` keyword.
---

## Table of contents

## Introduction

In this article, I am going to delve into one of the internals and core features of JavaScript program execution know as the execution context. I will explain the types of execution context, what is contained in each execution context, and phases in the activation of execution contexts. Ta-da! Let's begin 😀.

## What is Execution Context?

Execution context in JavaScript is simply the space or environment in which a particular JavaScript scope's code (global and function scope) is executed. When an execution context is created, it gets pushed onto the [call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack). The call stack is a data structure that keeps track of execution contexts. There are essentially two types of execution context that gets created and executed when the engine runs a JavaScript code: global and function execution contexts. The first that gets created and pushed onto the call stack is the global execution context, followed by function execution contexts which also gets created and pushed onto the call stack when they are invoked. When an execution context completes its execution, it gets popped out of the call stack and control of execution is moved to the execution context below it in the call stack. The global execution context is the last to complete its execution and popped out of the call stack.

<a id="code-example-1"></a>

```javascript
// Global scope
var globalVar = "I am in the global scope";

function func1() {
  var func1Var = "I am in func1";

  function func2() {
    var func2Var = "I am in func2";

    function func3() {
      var func3Var = "I am in func3";

      function func4() {
        var func4Var = "I am in func4";
        // func4 has access to variables in its own scope,
        // as well as those in the scopes of func3, func2, func1, and the global scope
        console.log(func4Var); // Accesses its own variable
        console.log(func3Var); // Accesses func3's variable
        console.log(func2Var); // Accesses func2's variable
        console.log(func1Var); // Accesses func1's variable
        console.log(globalVar); // Accesses global variable
      }

      func4(); // Invoke func4 to demonstrate access to outer environments
    }

    func3();
  }

  func2();
}

func1();
```

_Code Example 1_

Consider the code above, the equivalent execution contexts that will be created for the global scope and each of the function calls is represented in the image below.

<a id="figure-1"></a>

![JavaScript call stack and execution contexts](https://assets.sixtusinnocent.com/javascript-execution-context%2Fcall-stack-execution-contexts.png)
_Figure 1: Execution context for Code Example 1_

**Note:** Execution context is only created for function and global scopes. It is not created for block scopes.

### What's Contained in Each Execution Context?

By now we all know that when a JavaScript program gets executed, a `global` execution context is created, and `function` execution contexts are created if the program has in it functions that are invoked. If execution context is the environment in which a global scope or a function scope is executed, then it should contain within that environment all the necessary artifacts to execute that scope's code. Each execution context contains variable environment, `this`, and the outer environment.

- **Variable Environment:** Variable environment houses variables, function declarations, and function parameters available within an execution context. It keeps track of identifier bindings (variables and function declarations).
- **`this`:** In JavaScript, `this` is a special keyword. It's an identifier built into the language that can hold a value. The value of `this` is determined by the invocation context of the function it's used in. Let's look at the different scenarios a function can be invoked that will determine the value of `this`.
  - **Global context:** When a function is invoked without any owner object, the value of `this` will be the global object (`window` in browser and `global` in Node.js). In strict mode, `this` will be `undefined`. Example, if a function `function sayHello() {}` is invoked as `sayHello()`, the value of `this` will be the global object.
  - **Function called with the `new` key word:** When a [constructor function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) is called with the `new` keyword, `this` will refer to a newly created object that inherits from the constructor's prototype.
  - **Method call:** When a function is called as a method of an object (e.g, `obj.sayHello()`), `this` is set to the object the method is called on.
  - **Function invocation with `call`, `apply`, and `bind`:** When `call`, `apply`, and `bind` are used to invoke a function, `this` is explicitly defined by the first argument of these methods.
  - **Arrow functions:** [Arrow functions](https://www.freecodecamp.org/news/javascript-arrow-functions-in-depth/) do not have their own `this` binding. They inherit `this` from the parent scope at the time they are defined.
- **Outer Environment:** Each execution context has its own [lexical environment](https://www.borderlessengineer.com/p/how-js-works-lexical-environment)–comprising an outer environment and a variable environment—and a reference to its parent's lexical environment. This linkage continues up to the global execution context, thereby forming the [scope chain](https://medium.com/@aastha6348/understanding-scopes-and-scope-chain-in-javascript-4d87f7a4b144). The outer environment holds a reference/link to the lexical environment of its parent execution context. I will throw more light on this when I explain “scope chain resolution“ in this article.

It's okay if you are confused at this point. Don't panic, I will add more light with clear examples for better understanding.

## Phases in Execution Context

There are essentially two phases in execution context, and they include creation phase and execution phase. Let's explain each of these phases.

### Creation Phase

The JavaScript engine performs various key actions during the creation phase of an execution context. It is in this phase that the JavaScript engine sets the variable environment, scope chain, and the `this` value. Variable and function declarations are hoisted, and the scope chain is established via the outer environment. Below are the key actions performed by the JavaScript engine.

- **Lexical Environment Creation:** The term “lexical“ means grammar. A [lexical environment](https://www.borderlessengineer.com/p/how-js-works-lexical-environment) is an internal JavaScript data structure that stores the variables and functions defined in the current scope of an execution context, and has references to the outer environment. During the creation phase of an execution context, the lexical environment is created, which is composed of the [variable environment](https://www.borderlessengineer.com/p/how-js-works-lexical-environment) and the [outer environment](https://www.borderlessengineer.com/p/how-js-works-lexical-environment). The variable environment includes the identifier (variables, functions, and classes) bindings that are scoped to the execution context. The outer environment holds a reference to the lexical environment of the next execution context in the call stack.
- **Hoisting:** [Function declarations](https://javascript.info/function-expressions) and variable declarations are hoisted, i.e., moved to the top of their scope or environment during the creation phase of an execution context. Function declarations are hoisted with their definitions. Variables declared with the `var` keyword are hoisted and initialized a default value of `undefined` by the compiler while variables declared with the `let` or `const` keyword are hoisted without being initialized a default value. For more on hoisting, read my articles on hoisting: [Hoisting in JavaScript: A Complete Guide, Part 1](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1/) and [Hoisting in JavaScript: A Complete Guide, Part 2](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-2/)
- **`this` Binding** The value of `this` is determined by the compiler during the creation phase of an execution context, and it is determined based on the execution context (global execution context or function execution context). In global execution context, `this` value is the global object (`window` in browsers, `global` in Node.js). The `this` value in function execution context is determined by how the function is called.

### Execution Phase

The next phase after the creation phase is the execution phase. In this phase, the JavaScript engine executes the code in that execution context (global or function) line by line. Below are key operations performed by the JavaScript engine during the execution phase.

- **Variable Assignment:** Variables and functions are assigned their real values as the code is executed line by line. Recall hoisting? It is in this phase that variables and functions that are hoisted are assigned their actual values when the engine executes the line of code where that variable or function is defined and initialized. Recall that in the creation phase of an execution context, when a variable is declared and initialized with the `var` keyword, that variable will be hoisted and initialized a default value of `undefined` by the JavaScript engine. During the execution phase, when the engine reaches the actual declaration and initialization of that variable, the engine will re-assign the hoisted value that was `undefined` to the actual value defined in the code. Variables declared with `let` and `const` that were in Temporal Dead Zone (TDZ) during the creation phase will be initialized and assigned values when execution reaches their declaration.
- **Code Execution:** The engine executes [functions](<https://en.wikipedia.org/wiki/Function_(computer_programming)>), [expressions](<https://en.wikipedia.org/wiki/Expression_(computer_science)>), and [statements](<https://en.wikipedia.org/wiki/Statement_(computer_science)>). Control structures like loops and conditionals dictate the flow of execution. Function invocations results in the creation of new execution contexts, which go through their own creation and execution phases.
- **Scope Chain Resolution:** During execution, any references to variables or functions are resolved through the scope chain established in the creation phase. Each execution context maintains a reference to the [lexical environment (variable environment and outer environment)](https://www.borderlessengineer.com/p/how-js-works-lexical-environment) of its immediate predecessor in the call stack, forming a chain of references down the stack. Consider [code example 1](https://www.sixtusinnocent.com/posts/javascript-internals-the-execution-context/#code-example-1) and its equivalent call stack and execution contexts [figure 1](https://www.sixtusinnocent.com/posts/javascript-internals-the-execution-context/#figure-1). Each execution context on the call stack in the image has a reference to the outer environment because of how they sit [lexically (physically)](https://stackoverflow.com/questions/1047454/what-is-lexical-scope) in the code. `func4` has a reference to the variable environment of `func3()`, `func3()` has a reference to the variable environment of `func2()`, `func2()` has a reference to the variable environment of `func1()`, and `func1()` has a reference to the variable environment of `global()`. This chain of references is called [scope chain](https://medium.com/@aastha6348/understanding-scopes-and-scope-chain-in-javascript-4d87f7a4b144). When `func4()` attempts to access `globalVar` variable defined and initialized in the global scope, the JavaScript engine initiates the lookup within `func4()`'s scope or execution context. If the variable is not found, the search proceeds sequentially through `func3()`, `func2()` and `func1()`, via their respective outer environment references, until reaching the `global()` execution context where the variable is declared and initialized. This variable lookup is called “scope chain resolution“.

### Important Points to Note

- When a JavaScript program starts execution, a global execution context is created first.
- If a function gets invoked during the thread of execution of a JavaScript program, a new execution content is created for that function and popped onto the call stack.
- After a function completes its execution, the execution context for that function is popped out of the call stack.
- When the JavaScript program finishes execution, the global execution context is popped out of the call stack.

## Practical Examples

Let's explore a few examples to further solidify our understanding on “execution context“.

### Example 1

Consider the code below.

```javascript
// Global scope
const objective = "Greeting Program";

function sayHello() {
  // Function scope
  const greet = "Hello World!";
  console.log(greet);

  sayHi();
}

function sayHi() {
  // Function Scope
  const greet = "Hi, Marie!";
  console.log(greet);
}

console.log(objective);

sayHello();
```

_Code Example 2_

For “Code Example 2“ which is the code above, below is the call stack and execution contexts for the `global`, `sayHello` function, and `sayHi` function.

![The call stack and execution context for the above code](https://assets.sixtusinnocent.com/javascript-execution-context%2Fcode-example-1-call-stack-execution-context.png)
_Figure 2: Execution context for Code Example 2_

Here are the steps of actions and the corresponding execution context activations for the code above:

1. The Global Execution Context (GEC) is created and pushed onto the call stack as the script starts execution. The variable `objective` is stored in its environment variable, and the functions `sayHello` and `sayHi` are hoisted, stored in its environment variable, and available for execution.
2. When `console.log(objective);` executes, `objective` is accessed from the global execution context's variable environment.
3. Upon calling `sayHello()`, a new execution context for `sayHello` is created and pushed onto the call stack. The variable `greet` is stored in `sayHello` environment variable, and is accessible only within the `sayHello` context. The call to `sayHi()` from within `sayHello` creates another execution context for `sayHi`.
4. The execution context for `syaHi` is then pushed onto the call stack, creating its own variable environment for its `greet` variable. After `sayHi` completes execution, its execution context is popped off the call stack, returning control to the next execution context of `sayHello`.
5. Once `sayHello` completes execution, its execution context is also popped off the call stack, returning control to the global execution context.

#### Quick Questions

Observe that in figure 2 of this article, the outer environment of the `global` execution context is null, and the outer environment of the `sayHello()` and `sayH()` execution contexts is `global` respectively.

- Why is the outer environment of the `global` execution context null?
  - The outer environment of the `global` execution context is set to `null` because the `global` scope is the topmost level of the scope chain in a JavaScript environment.
  - Recall that every execution context except `global` execution context has a reference to an outer environment.
- Why is the outer environment of `sayHello` and `sayHi` execution contexts `global`?
  - In JavaScript environment, outer environment for an execution context is resolved based on where that execution context (function) sits physically in the code.
  - In Code Example 2, the `sayHello`, and `sayHi` functions, which are the execution contexts on the call stack sits physically on the global scope, hence their direct outer environment will be the `global` execution context.

## Further Reading

- [You Don’t Know JS Yet: Scope & Closures by Kyle Simpson](https://www.amazon.com/You-Dont-Know-JS-Yet/dp/B086GD45ZG)
- [JavaScript Execution Context by JavaScript Tutorial](https://www.javascripttutorial.net/javascript-execution-context/)
