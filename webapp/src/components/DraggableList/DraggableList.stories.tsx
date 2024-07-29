import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableList from './DraggableList';
import { Order, Product, Status, TransformedOrder, TransformedProduct } from '../interfaces';

export default {
    title: 'Draggable List',
    component: DraggableList,
} as ComponentMeta<typeof DraggableList>;

const Template: ComponentStory<typeof DraggableList<TransformedOrder>> = (args) => (
    <DragDropContext onDragEnd={() => {}}>
        <DraggableList {...args} />
    </DragDropContext>
);

const getArgs = (OrderStatus: string) => ({
    ID: '12345',
    listTitle: 'Test List',
    processItem: (order: Order) => {},
    items: [
        { OrderID: 1234, CustomerID: 1234, ProductID: 123456, OrderStatus, id: 1234 },
        { OrderID: 1235, CustomerID: 1235, ProductID: 123456, OrderStatus ,id: 1235},
        { OrderID: 1236, CustomerID: 1236, ProductID: 123456, OrderStatus, id: 1236 },
    ],
});



export const OrderNotInQA = Template.bind({});
OrderNotInQA.args = getArgs('InProgress');

export const OrderInQA = Template.bind({});
OrderInQA.args = getArgs('QA');


const ProductTemplate: ComponentStory<typeof DraggableList<TransformedProduct>> = (args) => (
    <DragDropContext onDragEnd={() => {}}>
        <DraggableList {...args} />
    </DragDropContext>
);

const getProductArgs = () => ({
    ID: '12345',
    listTitle: 'Test List',
    processItem: (product: Product) => {},
    items: [
        {
            "ProductID": 1,
            "id": 1,
            "ProductName": "Hat",
            "ProductPhotoURL": "https://i.imghippo.com/files/OwfHU1722122788.jpg",
            "ProductStatus": Status.Active
        },
        {
            "ProductID": 2,
            "id": 2,
            "ProductName": "Shoes",
            "ProductPhotoURL": "https://www.imghippo.com/files/iiInM1722123023.jpg",
            "ProductStatus": Status.Active
        }
    ],
});

export const ProductDisplay = ProductTemplate.bind({});
ProductDisplay.args = getProductArgs();
