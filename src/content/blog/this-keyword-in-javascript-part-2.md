---
author: Sixtus Innocent
pubDatetime: 2024-03-07T19:51:17.273Z
title: "A Closer Look at the `this` Keyword in JavaScript, Part 2"
slug: a-closer-look-at-the-this-keyword-in-javascript-part-2
featured: false
draft: true
tags:
  - javascript
  - web-development
description: In progress...
---

## Table of contents

## Introduction

## Lexical Scoping of `this`

In the part one of this article,

```javascript
const person = {
  name: "Sixtus",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

setTimeout(person.greet, 1000);
```

### Arrow Functions

I assume if you are reading this article, you have come across arrow functions and used them several times. Arrow functions were introduced in ES6, as a new way of creating functions which differs from the old ways (function declarations, and function expressions) in syntax and behavior, especially with the `this` keyword.

The value of `this` inside an arrow function is not bound to where the function is called. It is **lexically** inherited from the outer function where the arrow function is defined.
