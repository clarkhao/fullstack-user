import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Bar from '../component/layout/bar';

export default {
    title: 'Composite/Bar',
    component: Bar,
} as ComponentMeta<typeof Bar>;

const Template: ComponentStory<typeof Bar> = (args) => <Bar {...args} />;

export const BarStory = Template.bind({});
BarStory.args = {};
BarStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}