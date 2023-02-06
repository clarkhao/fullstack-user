import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropZone from '../component/ui/dropZone';

export default {
  title: 'UI/DropZone',
  component: DropZone,

} as ComponentMeta<typeof DropZone>;

const Template: ComponentStory<typeof DropZone> = (args) => <DropZone {...args} />;

export const DropZoneStory = Template.bind({});
DropZoneStory.args = {
    height: '300px',
    handleAddFiles: (data) => {
      
    },
    err: {name: 'somefile', msg: ['some']}
};