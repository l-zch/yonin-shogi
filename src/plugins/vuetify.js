import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { nordDark} from '../components/ui/theme'

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: { nordDark },
    defaultTheme:'nordDark'
  }
})