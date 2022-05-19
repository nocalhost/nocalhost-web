// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const { override, addLessLoader } = require('customize-cra');
module.exports = {
    webpack: override(addLessLoader(), (config) => {
        const loaders = config.module.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf;
        loaders.push({
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'babel-loader',
                },
                {
                    loader: '@svgr/webpack',
                    options: {
                        babel: false,
                        icon: true,
                    },
                },
            ],
        });
        loaders.push({
            test: /\.(xlsx|yaml)$/,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        });
        return config;
    }),
};
