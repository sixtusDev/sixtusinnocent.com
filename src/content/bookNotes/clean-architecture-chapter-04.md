---
author: Sixtus Innocent
pubDatetime: 2024-08-02T16:59:12.674Z
title: "Chapter 4: Structured Programming"
slug: chapter-4-structured-programming
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-4-structured-programming
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

**Origin:**
Structured programming was discovered by Edsger Wybe Dijkstra in 1968.

**Core Concept:**
Dijkstra showed that the use of unrestrained jumps (goto statements) was harmful to program structure.

**Key Elements:**
Structured programming is based on three main control structures:

- Sequence
- Selection (if/then/else)
- Iteration (loops)

**Theorem:**
Any program can be constructed from just these three structures of sequence selection, and iteration.

**Impact:**
The discovery led to the elimination of goto statements and the adoption of more structured control flow in programming languages.

**Relation to Decomposition:**
Structural programming allows modules to be recursively decomposed into provable units.

**Proof and Testing:**
While formal proofs are challenging for larger systems, the structured programming approach supports informal proofs and enhances testability.

**Modern Relevance:**
Today, we regard structured programming more as a discipline than a set of rules, focusing on creating provable or, at least, testable program structures.
