import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AppLayout, AppLayoutProps } from './index';

export default {
  component: AppLayout,
} as Meta;

const Template: Story<AppLayoutProps> = (args) => {
  return React.createElement(AppLayout, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
