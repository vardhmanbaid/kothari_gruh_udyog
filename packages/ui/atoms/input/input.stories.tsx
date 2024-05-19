import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Input, InputProps } from './index';

export default {
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => {
  return React.createElement(Input, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
