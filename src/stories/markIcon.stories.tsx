import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import MarkIcon from '../component/ui/markIcon';

export default {
    title: 'UI/MarkIcon',
    component: MarkIcon,
} as ComponentMeta<typeof MarkIcon>;

const Template: ComponentStory<typeof MarkIcon> = (args) => <MarkIcon {...args} />;

export const Mark = Template.bind({});
Mark.args = {size: 1}