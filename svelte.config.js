import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { escapeSvelte, mdsvex } from 'mdsvex'
import { getHighlighter } from 'shiki/index.mjs'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
  remarkPlugins: [remarkUnwrapImages, [remarkToc, { tight: true}]],
  rehypePlugins: [rehypeSlug],
  layout: {
    _: './src/mdsvex.svelte'
  },
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript', 'svelte', 'swift', 'python']
			})
      // NOTE: new languages can be added here
      await highlighter.loadLanguage('javascript', 'typescript')
      const html = escapeSvelte(highlighter.codeToHtml(code, {lang, theme: 'poimandres'}))
      return `{@html \`${html}\` }`
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
}

export default config
