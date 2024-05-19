# Storybook Cheat sheet

## Glossary

title: Specifies the title of the story.
component: Specifies the component to be tested in the story.
args: Allows you to pass props to the component being tested in the story.
argTypes: Allows you to control the knobs and the types of the args.
decorators: Allows you to add additional elements or functionality to the story.
parameters: Allows you to customize the global settings of the story.
addDecorator: Allows you to add a decorator to a specific story.
addParameters: Allows you to add additional parameters to a specific story.

Example:

```jsx
import { MyComponent } from './MyComponent';

export default {
  title: 'MyComponent',
  component: MyComponent,
  args: {
    name: 'John Doe',
    age: 25,
  },
  argTypes: {
    name: { control: 'text' },
    age: { control: 'number' },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
  },
};

export const Default = (args) => <MyComponent {...args} />;
```

## Schema of a argType

```js
const argTypes = {
  label: {
    name: 'label',
    type: { name: 'string', required: false },
    defaultValue: 'Hello',
    description: 'overwritten description',
    table: {
      type: {
        summary: 'something short',
        detail: 'something really really long',
      },
      defaultValue: { summary: 'Hello' },
    },
    control: 'text',
    type: 'string',
  },
};
```

## story args and argTypes in Storybook:

args: Allows you to pass props to the component being tested in the story.
argTypes: Allows you to control the knobs and the types of the args

```jsx

import { MyComponent } from './MyComponent';

export default {
    title: 'MyComponent',
    component: MyComponent,
    argTypes: {
        name: { control: 'text', type: 'string', defaultValue: 'John Doe' },
        age: { control: 'number', type: 'number', defaultValue: 25 },
        isActive: { control: 'boolean', type: 'boolean', defaultValue: true },
        options: { control: 'select', options: ['option1', 'option2'], type: 'string', defaultValue: 'option1' },
        date: { control: 'date', type: 'date', defaultValue: new Date() },
        data: { control: 'object', type: 'object', defaultValue: { name: "John Doe", age: 25 } },
        items: { control: 'array', type: 'array', defaultValue: [1,2,3] },
        action: { control: 'button', type: 'function', defaultValue: () => alert('Hello World') }
        gender: { control: 'radios', options: ['male', 'female'], defaultValue: 'male'},
        color: { control: 'color', defaultValue: '#ff0000' },
        range: { control: 'range', min: 0, max: 100, defaultValue: 50 },
    },
};

```
