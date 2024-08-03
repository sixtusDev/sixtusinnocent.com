---
author: Sixtus Innocent
pubDatetime: 2024-08-02T17:30:10.294Z
title: "Chapter 5: Object-Oriented Programming"
slug: chapter-5-structured-programming
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-5-structured-programming
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

> Programmers were passing data structures into functions long before 1966, when Dahl and Nygaard moved the function call stack frame to the heap and invented OO. — Robert C. Martin

Object-Oriented Programming (OOP) defined as a means of modelling the real world in code does not give a clear picture and intricacies of OOP in real sense.

**OOP supports:**

- Encapsulation — OOP provides out of the box an intuitive means of abstracting/hiding data and functions.
- Inheritance — The re-declaration of a group of variables and functions in an enclosing scope
- Polymorphism — It enables single interface to represent different underlying forms. Example is a shape class with different subclasses (circle, square, triangle) that all implement a common “draw” method differently.
  - Polymorphism is like having a universal remote control for different devices. Imagine you have a button labeled “Turn On” on your remote. This button can turn on your TV, your stereo, or your game console. Each device responds to the “Turn On” command in its own way, but you don't need to know the specifics — you just press the button.
  - In programming terms:
    - The remote control is like a common interface.
    - The “Turn On” button is like a method.
    - The different devices are like different classes.
    - The way each device responds is like method implementation.
  - So, polymorphism allows you to:
    - Write code that can work with different types of objects.
    - Use the same command (method) for different objects, and each object responds appropriately.
    - Add new types of objects without changing existing code.

Polymorphism is where OOP excels at the most — With the power of polymorphism, [plugin architecture](https://medium.com/omarelgabrys-blog/plug-in-architecture-dec207291800) can be used anywhere, for anything.

Dependency Inversion uses polymorphism to achieve its goal. It involves:

1. High-level modules depending on abstractions (interfaces or abstract classes)
2. Low-level modules implementing these abstractions.

> What can you do with that power? As an example, you can rearrange the source code dependencies of your system so that the database and the user interface (UI) depend on the business rules (Figure 5.3), rather than the other way around. — Robert C. Martin

From the above excerpt from Uncle Bob's boo, it means that the codes for the business rules will never mention UI or database directly except through an abstraction (interface or abstract class), in this case, the dependency has been inverted.

In a nutshell, Uncle Bod in his ow term defines OOP this way:

> OO is the ability, through the use of polymorphism, to gain absolute control over every source code dependency in the system. It allows the architect to create a plugin architecture, in which modules that contain high-level policies are independent of modules that contain low-level details. — Robert C. Martin
