<template>
    <span>
        <background></background>
        <layout>
            <main-form></main-form>
        </layout>
    </span>
</template>

<script>
    import Layout from './Layout/index';
    import MainForm from './Form/index';
    import Background from './Background/index';

    export default {
        name: 'login',
        components: {
            Layout,
            MainForm,
            Background
        }
    }
</script>