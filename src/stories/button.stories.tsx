import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../component/ui/button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select'}, options: ['small', 'medium', 'large']
    },
    onClick: {action: 'clicked'}
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const UIButton = Template.bind({});
UIButton.args = {
  primary: true,
  label: 'Button'
};