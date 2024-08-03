---
author: Sixtus Innocent
pubDatetime: 2024-08-03T12:05:10.294Z
title: "Chapter 12: Component Cohesion"
slug: chapter-13-component-cohesion
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-13-component-cohesion
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

Cohesion is about placing stuff that are closely related together.

**Three Principles of Component Cohesion:**

- The Reuse/Release Equivalence Principle (REP)
- The Common Closure Principle (CCP)
- The Common Reuse Principle (CRP)

#### The Reuse/Release Equivalence Principle (REP)

_The granule of release is the granule of release._

The REP states that the units of reuse in software should coincide with the units of release. In other words, the components that are reused together should be released together.

Classes and modules that are grouped into a component should be releasable and reusable together.

All classes and modules should share the same version number and included in the same release.

Users of a component expect all parts of the component to work together harmoniously, which is ensured by releasing them together.

#### The Common Closure Principle (CCP)

_Gather into components those classes that change for the same reasons and at the same times. Separate into different components those classes that change at different times and for different reasons._

CCP is Single Responsibility Principle (SRP) applied at the component level.

CCP aims to minimize the number of components that need to be changed when requirements change.

#### The Common Reuse Principle (CRP)

_Don't force users of a component to depend on things they don't need_

This means that classes and modules that are reused together should belong in the same component. Why? Do that other components that use the component will most likely need most of the functionalities within it.

> Thus, when we depend on a component, we want to make sure we depend on every class in that component. Put another way, we want to make sure that the classes that we put into a component are inseparable—that it is impossible to depend on some and not on the others. Otherwise, we will be redeploying more components than is necessary, and wasting significant effort. — Robert C. Martin
