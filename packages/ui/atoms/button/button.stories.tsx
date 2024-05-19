import { Meta, Story } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

import { Button, ButtonProps } from './index';

export default {
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return React.createElement(Button, args);
};

export const Default = Template.bind({});
Default.args = {
  children: 'A button',
  onClick: () => enqueueSnackbar('A button component', { variant: 'success' }),
};
