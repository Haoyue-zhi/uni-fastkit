import uniHelper from '@uni-helper/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwind from 'eslint-plugin-tailwindcss'

export default uniHelper(
	{
		uni: true,
		uniJson: true,
		vue: true,
		jsx: false,
		stylistic: false,
		typescript: {
			parserOptions: {
				extraFileExtensions: ['.vue', '.nvue'],
			},
		},
		ignores: ['**/*.d.ts', 'vite.config.ts'],
	},
	eslintConfigPrettier,
	...tailwind.configs['flat/recommended'],
	{
		settings: {
			tailwindcss: {
				whitelist: ['cus-[A-Za-z].*', '.*-uni'],
			},
		},
	}
)
