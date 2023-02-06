import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Input from "../component/ui/input";

export default {
    title: 'UI/Input',
    component: Input,
    argTypes: {
        type: {
            control: {type: 'select'}, options: ['email','password','text']
        }
    }
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const SignInput = Template.bind({});
SignInput.args = {name: 'emailInput', value: ''};
SignInput.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}