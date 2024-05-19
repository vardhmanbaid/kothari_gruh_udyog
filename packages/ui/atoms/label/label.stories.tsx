import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Label, LabelProps } from './index';

export default {
  component: Label,
} as Meta;

const Template: Story<LabelProps> = (args) => {
  return React.createElement(Label, { ...args });
};

export const Default = Template.bind({});
Default.args = {
  children: 'Label',
};
