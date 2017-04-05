import React from 'react';
import Form from './Form';
import Layout from './Layout';
import Background from './Background';

export default function Login() {
    return (
        <span>
            <Background />
            <Layout>
                <Form />
            </Layout>
        </span>
    )
}