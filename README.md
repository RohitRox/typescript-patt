**Typescript for better Javascript**

Version usage: > 3.4.0

The Book: [https://basarat.gitbooks.io/typescript/content/](https://basarat.gitbooks.io/typescript/content/)

Videos:

*   Beginner: [https://www.youtube.com/watch?v=WBPrJSw7yQA](https://www.youtube.com/watch?v=WBPrJSw7yQA)
*   React + Typescript: [https://www.youtube.com/watch?v=0_C2X1yRRac](https://www.youtube.com/watch?v=0_C2X1yRRac)

Typescript REPL: [https://repl.it/languages/typescript](https://repl.it/languages/typescript)

Shortcuts:

*   [https://learnxinyminutes.com/docs/typescript](https://learnxinyminutes.com/docs/typescript)
*   [https://github.com/labs42io/clean-code-typescript](https://github.com/labs42io/clean-code-typescript)

*All links are recommended at the time. With time they might become outdated.*

Scope of Typescript:

*   User Interface Development (with React)
*   Server side api development (with Express)
*   Tests (with Jest)


**How to use Typescript for better**

We want to use Typescript not only for typeschecks and auto-completions but for the bigger picture of scaling Javascript for readability, maintainability  across teams. and reduce overall bug density.

It is essential that to think in typescript while writing typescript to leverage full capabilities of the language. For this we need to be fluent with the concepts of **types**, **classes** and **interfaces** in typescript. There are tens of best practices and guides but unless we organize our code in typescipt’s philosophy we won’t get the best out of it.

The **types**, **classes** and **interfaces** are the key elements and better we become at these, better typescript’s autosuggestion, bug detection becomes.  It may not seem to be that much important the beginning, but once we get past a level of complexity we get stuck with typescript because of the nature of complex javascript object and complicated use cases, we just can’t go with what typescript expects, we fail to represent our data, behaviour and interactions and at that point we lose the benefit of typescript.

We should be able to use [advanced types ](https://www.typescriptlang.org/docs/handbook/advanced-types.html)to proper represent our data structure, able to create our own type definitions, use available definitions for open source libraries and in some cases even write [type declarations](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) for external libraries which do not have type definitions.

Interfaces provide a great way to enforce consistency across objects. In addition to consistency, interfaces can also be used to ensure that proper data is passed to properties, constructors and functions. Classes with interfaces are powerful structures that facilitate not just object-oriented programming but also fantastic type-checking. \


One the of advanced patterns we need to learn is to use [generics](https://www.typescriptlang.org/docs/handbook/generics.html) in interfaces and [extend interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html). This is also something we get into immediately after we past a medium level of complexity.  In any project, after some time, we soon find ourselves writing behaviors based on the data types,  passing complex objects as args, adding or extending available types. Without proper knowledge of these, we’ll end up making use of `any`, and the benefits of specifying a type.

**Recommended Reading:**



*   **[Advance Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)**
*   **[Advance Types with examples](https://levelup.gitconnected.com/advanced-typescript-types-with-examples-1d144e4eda9e)**
*   **[Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)**
*   **[Generics](https://www.typescriptlang.org/docs/handbook/generics.html)**
*   **[Generics with examples](https://medium.com/@rossbulat/typescript-generics-explained-15c6493b510f)**
*   **[Extending Interfaces: an example with Express Req/Resp](https://truetocode.com/extend-express-request-and-response-typescript-declaration-merging/)**
*   **[Clean & Consistent Express.js Controllers](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/clean-consistent-expressjs-controllers/)**
*   **[SOLID Typescript](https://khalilstemmler.com/articles/solid-principles/solid-typescript/)**


**Some patterns in this repo**

- Classes, Base classes and abstract classes => [Controllers Section](./app/controllers/)
- Interfaces for defining contracts within our code as well as contracts with code outside of our project  => [Cognito Section](./app/services/)
- Make your own Error => [Errors](./app/lib/)
- Fighting with Typescript in tests => [Controller spec](./app/controllers/serviceStatus/spec.ts)

The project might not be all complete and not all perfect, but there are also plently of good ideas. Also find some real world usage of advance concepts like abstract classes, generics, type assertion, typescript promises and some domain driven designs.
