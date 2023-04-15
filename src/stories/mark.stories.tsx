import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Mark from '../component/ui/mark';

export default {
    title: 'UI/Mark',
    component: Mark,
} as ComponentMeta<typeof Mark>;

const Template: ComponentStory<typeof Mark> = (args) => <Mark {...args} />;

export const MarkStory = Template.bind({});
MarkStory.args = {size: 100};
MarkStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}