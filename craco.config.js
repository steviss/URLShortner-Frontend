const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@root': path.resolve(__dirname, 'src/'),
            '@headers': path.resolve(__dirname, 'src/headers/'),
            '@api': path.resolve(__dirname, 'src/api/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@modal': path.resolve(__dirname, 'src/modal/index.tsx'),
            '@objects': path.resolve(__dirname, 'src/objects/'),
            '@routes': path.resolve(__dirname, 'src/routes/index.tsx'),
            '@layout': path.resolve(__dirname, 'src/layout/index.tsx'),
            '@pages': path.resolve(__dirname, 'src/pages/index.tsx'),
            '@utility': path.resolve(__dirname, 'src/utility/'),
            '@stores': path.resolve(__dirname, 'src/stores/index.tsx'),
            '@styles': path.resolve(__dirname, 'src/styles/index.ts'),
            '@drawers': path.resolve(__dirname, 'src/drawers/'),
            '@types': path.resolve(__dirname, 'src/types/'),
            '@graphql': path.resolve(__dirname, 'src/generated/graphql.tsx'),
        },
    },
};
