---
author: Sixtus Innocent
pubDatetime: 2024-03-17T20:42:26.025Z
title: "Hoisting in JavaScript: A Complete Guide, Part 2"
slug: hoisting-in-javascript-a-complete-guide-part-2
featured: false
draft: false
tags:
  - javascript
  - hoisting
  - web-development
description: A clear explanation with examples of Temporal Dead Zone (TDZ), and how classes are hoisted in JavaScript.
---

## Table of contents

## Introduction

This article is the continuation of the previous article I published on hoisting, [Hoisting in JavaScript: A Complete Guide, Part 1](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1/). I will advise you first read it before engaging with this article. In the previous article I explained hoisting with well-thought-out examples. We looked at how variables declared with the `var`, `let`, and `const` keywords are hoisted, including function declarations and function expressions. We also established [hoisting rules](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1/#hoisting-rules), which served as our guide for explaining hoisting in JavaScript. In this article, I am going to deep dive into how variables declared with the ES6 `let` and `const` keywords are hoisted, particularly the Temporal Dead Zone (TDZ), and I will also explain how classes are hoisted. Happy reading!

## What is Temporal Dead Zone (TDZ)?

The term “Temporal Dead Zone“ is mostly attributed to the behavior of `let` and `const` declarations in the ECMAScript 2015 (ES6) when they are referenced before declaration. In JavaScript, all variable declarations (`var`, `const`, and `let`) are hoisted at the top of their containing scope, but are not initialized the same. Confused? Don't sweat it, I will drive the point home. Recall in the [part one](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1/) of this article I said that, variables declared with the `var` keyword are hoisted/lifted without their initialized values, but rather the compiler assigns a default value to them. Can you recall the default value? Yes, it's `undefined`.
Consider this example:

```javascript
console.log(pet); // undefined

var pet = "Cat 🐱";
```

The result of running the above code will produce `undefined` on the browser console. This is because the JavaScript engine lifted the variable, pet above in the global scope and initializes a default value of `undefined` to it. Check the [part one](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1/) of this article for an in-depth explanation.

Have a look at these examples where the variable pet is declared with `let` and `const` keywords.

```javascript
console.log(pet); // ReferenceError

let pet = "Cat 🐱";
```

![](../../assets/images/hoisting-in-javascript-part-2/2024-03-11-21-57-41.png)

```javascript
console.log(pet); // ReferenceError

const pet = "Cat 🐱";
```

![](../../assets/images/hoisting-in-javascript-part-2/2024-03-11-21-57-41.png)

The compiler threw a `ReferenceError` exception. Have a close look at the error message for both codes which is the same: “Cannot access 'pet' before initialization“. The error message in each case signifies that the compiler is aware of the variable, pet, but cannot read/access it due to the fact that it is not initialized. Meaning, variables declared with the `let` keyword are hoisted just like `var`, but they are not initialized a default value like the way `var` is initialized a default value of `undefined`. Because `let` are not initialized a default value, they remain in a state where they are unreachable if referenced before their declaration, which is known as **Temporal Dead Zone (TDZ)**.

Temporal Dead Zone (TDZ) as defined by [Kyle Simpson](https://me.getify.com) is the time window where a variable exists but is still uninitialized, and therefore cannot be accessed in any way.

Some developers have wrongly believed that `let` and `const` declared variables are not hoisted because of the `ReferenceError` exception the compiler throws when they are referenced before their declaration. If they are not hoisted, the exception will still be `ReferenceError`, but with an entirely different message, one that the compiler throws when accessing a variable that is not declared. E.g “pet is not defined“, just like the way we have it below.

```javascript
console.log(pet);
```

![](../../assets/images/hoisting-in-javascript-part-2/2024-03-11-23-57-42.png)

### Key Takeaways

- When you try to access a variable that is not declared, you get a `ReferenceError` exception with a message telling you that the variable is not defined.
- When you try to access a variable declared with the `let` or `const` keyword before its declaration, you get a `ReferenceError` exception with a message telling you that you cannot access the variable before initialization.
- When you try to access a variable declared with the `var` keyword before its declaration, you get `undefined`.

## How are ES6 Classes Hoisted?

We have covered how variables declarations, function declarations, and function expressions are hoisted. We had a deep dive of their nuances and gotchas and how to avoid them. Next, we are going to take a look at [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

### ES6 Classes

ES6 classes are a syntactic way of creating the good ol' [function constructors](https://www.programiz.com/javascript/constructor-function) with additional enhancements. They are hoisted, and behave differently based on the way they are declared in the code.

#### Class Declarations

Class declaration is the conventional way of creating classes in JavaScript. Classes are declared in this fashion: the `class` key word followed by an identifier and a set of opening and closing brackets. E.g. `class Car {}`. Class declarations are hoisted the same way `let` and `const` are hoisted. They are lifted at the top of their containing scope and remain in a state where they are unreachable if referenced before they are declared. Their entire class definition is not lifted alongside their identifier neither are they initialized a default value when hoisted.
Consider:

```javascript
const sixtus = new User();

class User {}
```

![](../../assets/images/hoisting-in-javascript-part-2/2024-03-12-18-37-00.png)

Just like the way the JavaScript engine threw a `ReferenceError` exception when we tried to access the variable pet before it's declaration, the engine did same here with a message “Cannot access 'User' before initialization“. This means that the engine is aware of the class `User`, but because it was referenced before its declaration i.e., in its TDZ state, it threw a `ReferenceError` exception.

#### Class Expressions

Like functions, JavaScript classes are first-class citizens, which means they can be passed into a function as arguments, returned from a function and assigned to a variable. Class expression is a way of defining a class where a variable declared is initialized to a class. Just like the way we have named and unnamed (anonymous) function expressions, we also have named and unnamed class expressions. Below are examples of class expressions.

```javascript
var User = class {}; // Declared with `var`. Anonymous class expression

const Animal = class {}; // Decalared with `const`. Anonymous class expression

let Car = class {}; // Declared with `let`. Anonymous class expression

let User = class UserCls {}; // Named class expression
```

Recall the hoisting rules we established in [part one](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1) of this article? Class expressions take on the hoisting rule of the variable they are initialized to. In reality, variables are what are hoisted in class expressions. Note these two points about hoisting for class expressions:

- If a variable is declared with the `var` keyword and initialized with a class expression (named or unnamed), the variable will be hoisted (lifted) to the top of its containing scope without its initialized value (class expression) and the JavaScript engine will initialize a default value of `undefined` to the variable.
- If a variable is declared with `const` or `let` keyword and initialized with a class expression (named or unnamed), the variable will be hoisted (lifted) to the top of its scope without its value, and it will not be initialized a default value by the JavaScript. Accessing the variable before its declaration will result to a `ReferenceError` exception.

Consider this code example where the variable “User” is declared with the `var` keyword:

```javascript
console.log(User); // undefined

var john = new User(); // TypeError

var User = class {}; // Anonymous class expression
```

![](../../assets/images/hoisting-in-javascript-part-2/2024-03-15-19-11-05.png)

The first log of `undefined` on the browser console is an indicator that the JavaScript engine hoisted the variable “User” and initialized it a default value of undefined. The second log, which is a `TypeError` exception thrown by the engine signifies that since the variable “User” is of type `undefined` before its declaration and initialization, It cannot be instantiated. Only constructor functions and classes can be instantiated in JavaScript.

Let's look at one more code example declared with `let` keyword

```javascript
let john = new User(); // ReferenceError

let User = class {}; // Anonymous class expression
```

![](../../assets/images/hoisting-in-javascript-part-2/2024-03-15-19-43-09.png)

Guess why the JavaScript engine threw the above error? [Rule three](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1/#hoisting-rule3) of our hoisting rules explains it all. The variable “User” is hoisted without it's initialized value (class expression), and because it's declared using the `let` keyword, it will not be initialized a default value. It remains in a state where it's inaccessible when referenced before its actual declaration. Can you still recall the name of that state where variables declared with `let` and `const` remain before their declaration? Don't feel bad if you can't recall it. Most times to have a solid grasp of these subtle concepts, we have to re-read the necessary materials to allow them sink. The name of that state is called Temporal Dead Zone (TDZ).

## Conclusion

We took some time to go through Temporal Dead Zone (TDZ) and hoisting in ES6 classes. We identified that variables declared with the `let` and `const` keywords as well as class declarations enter a state known as Temporal Dead Zone when they are hoisted, and accessing them in that state will result to a `ReferenceError` exception. Furthermore, we discovered that class expressions take on the hoisting rule of the variable they are initialized to.

I will advise you revisit the [hoisting rules](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1/#hoisting-rules) we established in part one of this article, reread them and use them as a reference while practicing. My advice at this point is to get your hands dirty by practicing to further internalize this concept called hoisting.

If you think there is any statement or explanation that I made in this article that is not correct or need improvement, please reach out to me via any of my [social links](https://www.sixtusinnocent.com/#social-links). I am still on my journey to a perfectionist in my craft as a programmer and will like to embrace any advantage that will help me get better. My main goal is to provide quality educational content for my esteemed readers.

Thank you!

## Further Reading

- [Part one of this article](https://www.sixtusinnocent.com/posts/hoisting-in-javascript-a-complete-guide-part-1)
- [You Don't Know JS Yet: Scope & Closures by Kyle Simpson](https://www.amazon.com/You-Dont-Know-JS-Yet/dp/B086GD45ZG)
- [An article on hoisting by Dillion Megida](https://www.freecodecamp.org/news/what-is-hoisting-in-javascript-3)
- [An article on Temporal Dead Zone (TDZ) by Dillion Megida](https://dillionmegida.com/p/temporal-dead-zone-in-javascript/)
