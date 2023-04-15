import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Switch from '../component/ui/switch';

export default {
    title: 'UI/Switch',
    component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const SwitchStory = Template.bind({});
SwitchStory.args = {id: 'switch-theme'};
SwitchStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}