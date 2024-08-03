---
author: Sixtus Innocent
pubDatetime: 2024-08-01T02:10:12.674Z
title: "Chapter 2: A Tale of Two Values"
slug: chapter-2-a-tale-of-two-values
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-2-a-tale-of-two-values
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

**Values provided by software systems to its stakeholders**

- Behavioral (functional) value
- Structural (architectural) value

**Behavioral value** is achieved when a software system operates and functions the ways it should be, based on the specification and requirements of the software. This is the most obvious value that is pushed by every stakeholder to come to fruition.

**Structural value** has to do with the shape of the source code of a software system. Every good software system has to be shaped in such a way that every new features and changes from the stakeholder can be fixed and plugged in easily without being a nightmare to the developers.

> Software was invented to be “soft.” It was intended to be a way to easily change the behavior of machines — Robert C. Martin.

If a software is “soft”, then it should be easy to change — This is only achievable with a good software architecture in place. Hence, a good software is not just a software system that works, but a software system that can be easily adapted based on new features and requirements.

**Which is more important of the two: A software system to work or to be easy to change?**

Consider a quote by President Dwight D. Eisenhower:

> I have two kinds of problems, the urgent and the important. The urgent are not important, and the important are never urgent. — President Dwight D. Eisenhower

- Firstly, behavioral value of a software is urgent but not important.
- Secondly, the architectural value of a software is not urgent but important.

Software development team should fight for what is right and important, because they are part of the stakeholders of a software system, and when the software system fails, it means they have equally failed. This fight is a fight of architecture, the fight to adopt a good architecture at inception irrespective of the pressure from the management to ship the software to market fast.
