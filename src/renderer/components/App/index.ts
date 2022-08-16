import type { App, DefineComponent } from 'vue'

export function defineAppComponent(app: App) {
  const globalEgle = import.meta.globEager('./*.vue')
  Object.entries(globalEgle).forEach(([name, component]) => {
    const nameIcon =
      'app-' + name.replace('./', '').replace('.vue', '').toLowerCase()
    app.component(nameIcon, component.default as DefineComponent)
  })
}
