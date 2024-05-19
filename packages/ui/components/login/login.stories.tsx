import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Login, LoginProps } from './index';

export default {
  component: Login,
} as Meta;

const Template: Story<LoginProps> = (args) => {
  return React.createElement(Login, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
