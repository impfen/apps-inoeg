import { Meta } from '@storybook/react';
import React from 'react';
import { UserApiProvider } from '../common/UserApiContext';
import { FinderStateProvider } from './FinderStateProvider';
import { LocationStep } from './LocationStep';

export default {
    component: LocationStep,
} as Meta;

export const Default = () => (
    <UserApiProvider>
        <FinderStateProvider>
            <LocationStep />
        </FinderStateProvider>
    </UserApiProvider>
);