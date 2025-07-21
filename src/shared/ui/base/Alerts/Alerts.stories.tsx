import { Alerts } from './Alerts';
import {Meta, StoryObj} from "@storybook/nextjs";

const meta: Meta<typeof Alerts> = {
    title: 'Shared/UI/Alerts',
    component: Alerts,
};

export default meta;
type Story = StoryObj<typeof Alerts>;

export const Info: Story = {
    args: {
        message: 'Это информационное сообщение.',
        type: 'info',
    },
};

export const Success: Story = {
    args: {
        message: 'Успешно выполнено!',
        type: 'success',
    },
};

export const Warning: Story = {
    args: {
        message: 'Осторожно! Что-то не так.',
        type: 'warning',
    },
};

export const Error: Story = {
    args: {
        message: 'Произошла ошибка.',
        type: 'error',
    },
};
