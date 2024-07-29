import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { DraggableProvided } from 'react-beautiful-dnd';
import { Order, Status,Product, TransformedOrder, TransformedProduct } from '../interfaces';
import DraggableItem from './DraggableItem';

export default {
    title: 'Draggable Item',
    component: DraggableItem,
} as ComponentMeta<typeof DraggableItem>;

const OrderTemplate: ComponentStory<typeof DraggableItem<TransformedOrder>> = (args) => <DraggableItem {...args} />;

const draggableProvided: DraggableProvided = ({
    innerRef: () => {},
    draggableProps: {
        'data-rbd-draggable-context-id': '1',
        'data-rbd-draggable-id': '1',
    },
    dragHandleProps: null,
}); 

const getArgs = (OrderStatus: string) => ({
    item:{
        OrderID: 1234,
        CustomerID: 2345,
        ProductID: 3456,
        id: 1,
        OrderStatus, 
    },
    draggableProvided,
    processItem: (order: Order) => {},
});

export const NotInQA = OrderTemplate.bind({});
NotInQA.args = getArgs('InProgress');

export const InQA = OrderTemplate.bind({});
InQA.args = getArgs('QA');

const ProductTemplate: ComponentStory<typeof DraggableItem<TransformedProduct>> = (args) => <DraggableItem {...args} />;
const getProductArgs = () => ({
    item:
        {
            "ProductID": 1,
            "id": 1,
            "ProductName": "Hat",
            "ProductPhotoURL": "https://i.imghippo.com/files/OwfHU1722122788.jpg",
            "ProductStatus": Status.Active
        },
    
    draggableProvided,
    processItem: (product: Product) => {},
});

export const IndividualProduct = ProductTemplate.bind({});
IndividualProduct.args = getProductArgs();