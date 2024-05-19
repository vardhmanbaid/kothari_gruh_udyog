# typescript cheatsheet

## TypeScript provides a set of built-in utility types

Partial<T> - creates a new type with all properties of T set as optional.

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type PartialPerson = Partial<Person>;

const partialPerson: PartialPerson = { name: 'John' };
// equivalent to: const partialPerson: Partial<Person> = { name: "John" };
```

Required<T> - creates a new type with all properties of T set as required.

```ts
interface Person {
  name?: string;
  age?: number;
  address?: string;
}

type RequiredPerson = Required<Person>;

const requiredPerson: RequiredPerson = { name: 'John', age: 30, address: '123 Main St' };
// equivalent to: const requiredPerson: Required<Person> = { name: "John", age: 30, address: "123 Main St" };
```

Readonly<T> - creates a new type with all properties of T set as readonly.

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type ReadonlyPerson = Readonly<Person>;

const readonlyPerson: ReadonlyPerson = { name: 'John', age: 30, address: '123 Main St' };
// equivalent to: const readonlyPerson: Readonly<Person> = { name: "John", age: 30, address: "123 Main St" };

// The following line will result in a compilation error
// readonlyPerson.name = "Jane";
```

Record<K, T> - creates a new type with keys of type K and values of type T.

```ts
type RecordOfNumbers = Record<string, number>;

const recordOfNumbers: RecordOfNumbers = { a: 1, b: 2, c: 3 };
```

Pick<T, K> - creates a new type by picking a subset of properties from T specified by K.

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonNameAndAge = Pick<Person, 'name' | 'age'>;

const personNameAndAge: PersonNameAndAge = { name: 'John', age: 30 };
```

Omit<T, K> - creates a new type by removing a subset of properties from T specified by K.

```ts
interface Person {
  name: string;
  age: number;
  address: string;
}

type PersonWithoutAddress = Omit<Person, 'address'>;

const personWithoutAddress: PersonWithoutAddress = { name: 'John', age: 30 };
```

Exclude<T, U> - creates a new type by removing all types in U from T.

```ts
type Numbers = 1 | 2 | 3 | 4 | 5;

type OddNumbers = Exclude<Numbers, 2 | 4>;

const oddNumbers: OddNumbers = 1 | 3 | 5;
```

Extract<T, U> - creates a new type by extracting all types in U from T.

```ts
type Numbers = 1 | 2 | 3 | 4 | 5;

type EvenNumbers = Extract<Numbers, 2 | 4>;

const evenNumbers: EvenNumbers = 2 | 4;
```

NonNullable<T> - creates a new type by removing null and undefined from T.

```ts
interface Person {
  name: string | null;
  age: number | undefined;
}

type NonNullablePerson = NonNullable<Person>;

const nonNullablePerson: NonNullablePerson = { name: 'John', age: 30 };
```

ReturnType<T> - creates a new type from the return type of function T.

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

type GreetReturnType = ReturnType<typeof greet>;

const greetMessage: GreetReturnType = 'Hello, John!';
```

Parameters<T> - creates a new type from the parameter types of function T.

```ts
function greet(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old.`;
}

type GreetParameters = Parameters<typeof greet>;

const [name, age]: GreetParameters = ['John', 30];
const greetMessage: string = greet(name, age);
```

ConstructorParameters<T> - creates a new type from the parameter types of the constructor function T.

```ts
class Person {
  constructor(name: string, age: number) {}
}

type PersonConstructorParameters = ConstructorParameters<typeof Person>;

const [name, age]: PersonConstructorParameters = ['John', 30];
const person: Person = new Person(name, age);
```

InstanceType<T> - creates a new type from the instance type of constructor function T.

```ts
class Person {
  constructor(name: string, age: number) {}
}

type PersonInstanceType = InstanceType<typeof Person>;

const person: PersonInstanceType = new Person('John', 30);
```

RequiredKeys<T> - creates a union type of all the keys in T that are required.

```ts
interface Person {
  name: string;
  age?: number;
  address?: string;
}

type PersonRequiredKeys = RequiredKeys<Person>;

const personRequiredKeys: PersonRequiredKeys = 'name';
```

OptionalKeys<T> - creates a union type of all the keys in T that are optional.

```ts
interface Person {
  name: string;
  age?: number;
  address?: string;
}

type PersonOptionalKeys = OptionalKeys<Person>;

const personOptionalKeys: PersonOptionalKeys = 'age' | 'address';
```
