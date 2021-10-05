import colors from 'windicss/colors';
import typography from 'windicss/plugin/typography';
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        svelte: {
          500: '#ff3e00'
        }
      }
    }
  }
})
