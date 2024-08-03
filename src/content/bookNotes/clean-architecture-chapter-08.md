---
author: Sixtus Innocent
pubDatetime: 2024-08-02T17:50:10.294Z
title: "Chapter 8: OCP: The Open-Closed Principle"
slug: chapter-8-ocp-the-open-closed-principle
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-8-ocp-the-open-closed-principle
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

In 1988, Bertrand Meyer discovered the Open-Closed Principle (OCP), and it states that: A software artifact should be open for extension but closed for modification.

If simple extension to a software causes a massive change in the software artifact, then a good architecture is not in place for that software.

**How Can OCP be Achieved?**
OCP can be achieved by applying the ff:

- Use abstractions:
  - Define interfaces or abstract classes that represent core behaviors in high level components (policy).
  - Implement these interfaces or abstract classes in concrete classes, which are the low level components (implementation details like database).
- Dependency Inversion:
  - Let high level components (policy) depend on abstractions instead of concrete implementations like database.
- Polymorphism:
  - Use polymorphic behavior to extend functionality without modifying existing code.

By applying the above, changes in the high level components are protected from changes in the low level components.

> Architects separate functionality based on how, why, and when it changes, and then organize that separated functionality into a hierarchy of components. Higher-level components in that hierarchy are protected from the changes made to lower-level components. — Robert C. Martin

Because the higher level components depend on abstractions instead of concrete implementations at the lower level components, it makes the higher level components not to depend on stuff they don't need that are in the lower level components.

**Transitive dependency** is the violation of principle that states that software entities should not depend on things they don't directly use.

> The OCP is one of the driving forces behind the architecture of systems. The goal is to make the system easy to extend without incurring a high impact of change. This goal is accomplished by partitioning the system into components, and arranging those components into a dependency hierarchy that protects higher-level components from changes in lower-level components. — Robert C. Martin
