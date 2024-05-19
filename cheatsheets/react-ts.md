# React-ts Cheatsheet

##

## Different props

```ts
interface Props {
  prop1: string;
  prop2: number;
  prop3: boolean;
  // array of any type
  prop4: any[];
  // object with string keys and any values
  prop5: { [key: string]: any };
  // function that takes an argument of any type and returns void.
  prop6: (arg1: any) => void;
  prop7?: string;
  prop8: 'option1' | 'option2' | 'option3';
  // array of objects, each with properties 'id', 'name', and 'description'
  data: {
    id: number;
    name: string;
    description: string;
  }[];

  // boolean that indicates whether the component is currently loading data
  isLoading: boolean;

  // function that takes a single 'id' argument of type number and returns void
  handleClick: (id: number) => void;

  // optional prop that can be any valid React node (e.g. a string, a React element, or an array of React elements)
  children?: React.ReactNode;
}
```

## React hooks in TypeScript:

```ts
useState<T>(): [T, Dispatch<SetStateAction<T>>]
useEffect(() => void, [dependencies?: any[]]): void
useContext<T>(context: React.Context<T>): T
useReducer<S, A>(reducer: (S, A) => S, initialState: S, init?: (initialState: S) => S): [S, Dispatch<A>]
useCallback<T extends (...args: any[]) => any>(callback: T, dependencies?: any[]): T
useMemo<T>(factory: () => T, dependencies?: any[]): T
useRef<T>(initialValue?: T): React.RefObject<T>
useImperativeHandle<T>(ref: React.Ref<T>, createHandle: (instance: T | null) => any, dependencies?: any[]): void
useLayoutEffect(() => void, [dependencies?: any[]]): void
useDebugValue<T>(value: T, formatterFn?: (value: T) => any): void
```
