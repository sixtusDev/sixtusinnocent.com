---
author: Sixtus Innocent
pubDatetime: 2024-08-02T18:30:10.294Z
title: "Chapter 6: Functional Programming"
slug: chapter-6-functional-programming
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-6-functional-programming
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

Functional programming is based on the lambda calculus developed by Alonzo Church in the 1930s

**Key Characteristics:**

- Immutability: Variables are not changed once set.
- Pure functions: Functions always produce the same output for given inputs, and have no side effects.
- Function compositions: Complex operations are built by combining simpler functions.

Functional programming aims to minimize or eliminate side effects, so that programs behavior can be more predictable and easier to test.

Instead of changing the state of a variable, new states are created and returned. Consider the JavaScript code below:

```javascript
const numbers = [1, 2, 3, 4, 5];

const numbersBy2 = numbers.map(num => num * 2);

console.log({ numbers, numbersBy2 });
```

The code above is a clear example of functional programming. We want to multiply each number in numbers array by two, instead of modifying the numbers variable directly, the `map` function is used to iterate the numbers and return a new array of the numbers multiplied by two. The result is then assigned to a new variable `numbersBy2`.

In contrast, the code snippet below is a violation of functional programming, because we were changing the states of these variables: numbers, and i.

```javascript
const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 2;
}

console.log({ numbers });
```

**Advantages of Functional Programming:**

1. Improved testability due to function purity.
2. Enhanced modularity and reusability of code.
3. Better support for parallel and concurrent programming.

> Event sourcing is a strategy wherein we store the transactions, but not the state. When state is required, we simply apply all the transactions from the beginning of time. — Robert C. Martin

Many modern languages and frameworks incorporate functional programming concepts, even if they're not purely functional.
