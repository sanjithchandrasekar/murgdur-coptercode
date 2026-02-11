import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Sanity Config for Vite App
export const config = defineConfig({
    name: 'default',
    title: 'murgdur',
    projectId: 'qbaw2yts',
    dataset: 'production',
    basePath: '/sanity-studio',
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
})
