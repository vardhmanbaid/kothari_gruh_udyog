import { Meta, Story } from '@storybook/react';
import React from 'react';

import { PageNotFound, PageNotFoundProps } from './index';

export default {
  component: PageNotFound,
} as Meta;

const Template: Story<PageNotFoundProps> = (args) => {
  return React.createElement(PageNotFound, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
