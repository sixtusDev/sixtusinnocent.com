---
author: Sixtus Innocent
pubDatetime: 2024-08-02T19:52:10.294Z
title: "Chapter 11: DIP: The Dependency Inversion Principle"
slug: chapter-11-dip-the-dependency-inversion-principle
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-11-dip-the-dependency-inversion-principle
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

The Dependency Inversion Principle (DIP) states that the high level components which houses the business rules and policies should not depend on low level components which are the implementation details. DIP is achieved by introducing an interface that both low level and high level components can depend on.

Based on this rule, we can say that:

1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend on details. Details should depend on abstractions.

> It is the volatile concrete elements of our system that we want to avoid depending on. Those are the modules that we are actively developing, and that are undergoing frequent change. - Robert C. Martin

Most often, the volatile parts of the systems are the concrete implementation details.

Interfaces are less volatile than concrete implementations because, changes to interfaces will result to changes to concrete implementations, while changes to concrete implementations will not result in changes to interfaces.

**Coding practices to achieve stable abstractions:**

- Don't refer to volatile concrete classes, instead refer to interfaces.
- Don't derive from volatile concrete classes.
- Don't override concrete functions.
- Don't mention the name of anything concrete and volatile.
