import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DropZone from '../component/ui/dropZone';
import SvgIcon from '@mui/material/SvgIcon';
import {iconLibrary} from '../component/utils/define';

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
    child: <SvgIcon children={iconLibrary.get('import')} />
};