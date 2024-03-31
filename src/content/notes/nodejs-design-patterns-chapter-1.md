## The Node.js Platform

### How Node.js works

#### I/O Operation

**I/O (Input/Output) operation** is a fundamental operation performed by a computer, whereby the computer reads data, process it, and outputs the results.

I/O operations are slow, because of the layer of communication between the computer and the input/output devices.

**Types of I/O operations:**

- Blocking I/O or Synchronous I/O
- Non-blocking I/O or Asynchronous I/O
- Direct I/O
- Buffered I/O
- Memory-mapped I/O

**Blocking I/O** operation blocks or waits for the operation to complete before proceeding to the next operation. The thread or process that issued the I/O operation is blocked and cannot perform any other operation until the data transfer is complete.

> “Thread is a basic unit of CPU utilization; it comprises a thread ID, a program counter (PC), a register set, and a stack. Consider it as a basic unit of work that is scheduled by the CPU. All the necessary resources needed for that unit of work is allocated in when the thread is created.”
>
> - Abraham Silberschatz, Greg Gagne, and Peter B, _Operating System Concepts_

**Non-blocking I/O** operation allow the program to continue executing while the data transfer is still in progress. The thread that issued the I/O operation is not blocked and can perform other operations while the I/O operation is still in progress.

**Techniques for processing non-blocking resources:**

- **Busy-waiting:** Also known as “spinning“ is a technique whereby a program constantly/repeatedly checks for a condition to become true without doing anything else. In the context of non-blocking I/O operation, the program will continuously check if data has been received from an I/O operation like network connection or if a file has been completely read.
  - Pros
    - Simple to implement.
    - Low latency.
    - Ideal for real time systems.
  - Cons
    - High consumption of CPU resource.
    - Increased power consumption and heat generation.
- **Event demultiplexing:** Also known as “event notification interface“ monitors multiple I/O sources simultaneously for any signs or activity. When demultiplexer detects that a read or write operation has completed on one of the monitored resources, it generates an event or sets of events. These events are then used to notify the application that the I/O operation is ready to be processed (e.g., reading incoming data from a file system I/O operation). When using a synchronous event demultiplexer, the thread or process that's waiting for events effectively remains idle—meaning it does nothing and consumes minimal resources—while it waits (or “blocks”) for an event to occur. This idle state continues until the demultiplexer detects that one of the monitored events (like data arriving on a network socket, a timer expiring, or a file becoming ready for reading/writing) has occurred. At that point, the demultiplexer will unblock and allow the application to handle the event, after which the application typically resumes waiting for the next event by re-entering the idle state.
  - Pros
    - CPU are not used unnecessarily to poll resources continuously because of its synchronous nature.
    - Scalable.
    - Simplified program flow.
  - Cons
    - Difficulty in debugging.
    - Potential for callback hell.

#### The Reactor Pattern

> “The main idea behind the reactor pattern is to have a handler associated with each I/O operation. A handler in Node.js is represented by a callback (or cb for short) function.”

The asynchronous construct of a Node.js application is based on the reactor pattern whereby the demultiplexer in a blocking manner waits and reacts to I/O operation events. As soon as an I/ operation event occurs (like data arrival on network socket) that the demultiplexer is monitoring, the demultiplexer reacts by unblocking, and pushes the event(s) into the event queue. The event loop polls over the items in the event queue, and invokes the handler (function) in each event.

---
