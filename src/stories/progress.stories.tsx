import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Progress from '../component/ui/progress';

export default {
    title: 'UI/Progress',
    component: Progress,
    argTypes: {
        Progress
    }
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => <Progress {...args} />;

export const ProgressStory = Template.bind({});
ProgressStory.args = {id: 'progress', value: 10};
ProgressStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}