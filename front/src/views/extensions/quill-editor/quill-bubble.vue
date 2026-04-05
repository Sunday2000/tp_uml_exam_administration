<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'

const content = ref('<h1 class="ql-align-center">Quill Rich Text Editor</h1><p><span style="color: rgba(var(--v-theme-on-surface),var(--v-medium-emphasis-opacity));">Quill is a free, </span><a href="https://github.com/quilljs/quill/" rel="noopener noreferrer" target="_blank" style="color: rgb(var(--v-theme-primary)); ">open source</a><span style="color: rgba(var(--v-theme-on-surface),var(--v-medium-emphasis-opacity));"> WYSIWYG editor built for the modern web. With its </span><a href="https://quilljs.com/docs/modules/" rel="noopener noreferrer" target="_blank" style="color: rgb(var(--v-theme-primary));>modular architecture</a><span style="color: rgba(var(--v-theme-on-surface),var(--v-medium-emphasis-opacity));"> and expressive </span><a href="https://quilljs.com/docs/api/" rel="noopener noreferrer" target="_blank" style="color: rgb(var(--v-theme-primary)); ">API</a><span>, it is completely customizable to fit any need.</span></p><h3 class="ql-align-right">Flexible &amp; Powerful</h3><p class="ql-align-right" style="color: rgba(var(--v-theme-on-surface),var(--v-medium-emphasis-opacity));"><strong>Lorem Ipsum has been the industry\'s</strong>&nbsp;standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p><ul><li>List item 1</li><li>List item 2</li><li>List item 3</li><li>List item 4</li></ul>')
</script>

<template>
  <QuillEditor
    v-model:content="content"
    theme="bubble"
    toolbar="minimal"
    content-type="html"
  />
</template>

<style lang="scss">
@import "@vueup/vue-quill/dist/vue-quill.bubble.css";
@import "@/styles/libs/quill-editor";
</style>
