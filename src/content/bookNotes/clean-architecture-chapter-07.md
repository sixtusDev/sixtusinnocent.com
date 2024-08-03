---
author: Sixtus Innocent
pubDatetime: 2024-08-02T18:00:10.294Z
title: "Chapter 7: SRP: The Single Responsibility Principle"
slug: chapter-7-srp-the-single-responsibility-principle
bookId: clean-architecture
url: /notes/books/clean-architecture/chapter-7-srp-the-single-responsibility-principle
featured: false
draft: false
tags:
  - software-architecture
  - clean-architecture
---

The Single Responsibility Principle (SRP) states that a module should have one, and only one, reason to change.

Over the course of time, software systems will require change from people. These people are in groups, they could be end users of the software, or stakeholders of the software. These groups of people that require the change can be termed as actors.

> A module should be responsible to one, and only one, actor. — Robert C. Martin

**Consider the violation of Single Responsibility Principle:**
The code examples here are all written in TypeScript.

```typescript
class Employee {
  constructor(
    public name: string,
    public position: string,
    public hourlyRate: number
  ) {}

  calculatePay(): number {
    return this.hourlyRate * 40;
  }

  reportHours(): string {
    return `${this.name} worked 40 hours`;
  }

  save(): void {
    console.log(`Saving ${this.name} to database`);
  }
}

const employee = new Employee("John Doe", "Developer", 50);
console.log(employee.calculatePay());
console.log(employee.reportHours());
employee.save();
```

The `Employee` class above violates the SRP principle, because it has three distinct responsibilities for three actors:

- Calculating pay (specified by accounting department, reporting to the CFO).
- Reporting hours (specified by the human resource department, reporting to the COO).
- Saving employee data (specified by database administrators, reporting to the CTO).

Two issues can arise because of this violation:

- Accidental code change based on a new change by a different actor.
- Merge conflicts.

To adhere to SRP, the code can be refactored like this:

```typescript
class Employee {
  constructor(
    public name: string,
    public position: string,
    public hourlyRate: number
  ) {}
}

class PayCalculator {
  calculatePay(employee: Employee): number {
    return employee.hourlyRate * 40;
  }
}

class HourReporter {
  reportHours(employee: Employee): string {
    return `${employee.name} worked 40 hours`;
  }
}

class EmployeeRepository {
  save(employee: Employee): void {
    console.log(`Saving ${employee.name} to database`);
  }
}

const employee = new Employee("John Doe", "Developer", 50);
const payCalculator = new PayCalculator();
const hourReporter = new HourReporter();
const employeeRepository = new EmployeeRepository();

console.log(payCalculator.calculatePay(employee));
console.log(hourReporter.reportHours(employee));
employeeRepository.save(employee);
```

In the refactored code, each class has a single responsibility, and is responsible to one actor:

- `Employee` just holds employee data.
- `PayCalculator` handles pay calculation.
- `HourReporter` manages reporting of hours.
- `EmployeeRepository` deals with database operations.
