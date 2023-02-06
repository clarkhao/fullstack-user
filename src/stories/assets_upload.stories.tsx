import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import Upload from '../pages/assets/upload';

export default {
    title: 'Page/AssetsUpload',
    component: Upload,
    
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

export const AssetsUpload = Template.bind({});
AssetsUpload.args = {}
AssetsUpload.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}