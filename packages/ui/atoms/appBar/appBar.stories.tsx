import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AppBar, AppBarProps } from './index';

export default {
  component: AppBar,
} as Meta;

const Template: Story<AppBarProps> = (args) => {
  return React.createElement(AppBar, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
