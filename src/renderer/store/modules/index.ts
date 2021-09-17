const modules: any = {}
const files: Object = import.meta.globEager('./*.ts')
Object.keys(files).forEach((key: string) => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = files[key].default
})

export default modules
