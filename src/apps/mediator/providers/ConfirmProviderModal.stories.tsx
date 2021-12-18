import { Meta } from '@storybook/react';
import { providers } from 'apps/data';
import React from 'react';
import { MediatorApiProvider } from '../common/MediatorApiContext';
import { ConfirmProviderModal } from './ConfirmProviderModal';

export default {
    component: ConfirmProviderModal,
} as Meta;

export const Default = () => (
    <MediatorApiProvider>
        <ConfirmProviderModal provider={providers[0]} />
    </MediatorApiProvider>
);
