import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import List from '../component/ui/list';

export default {
    title: 'UI/List',
    component: List,
    argTypes: {
        lIcon: {control: {type: 'select'}, options: ['file', 'trash']},
        rIcon: {control: {type: 'select'}, options: ['file', 'trash']}
    }
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => <List {...args} />;

export const ListStory = Template.bind({});
ListStory.args = {list: [{id:'a',name:'a'},{id:'b',name:'b'},{id:'c',name:'c'}]};
ListStory.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
}