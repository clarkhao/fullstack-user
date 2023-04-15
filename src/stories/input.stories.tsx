import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Input from '../component/ui/input';

export default {
    title: 'UI/Input',
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputStory = Template.bind({});
InputStory.args = {
    id: 'input-story', 
    type: 'search',
    text: 'search'
};
InputStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}