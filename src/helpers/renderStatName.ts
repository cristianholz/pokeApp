export function renderStatName(name: string) {
  if (!name) return ''

  const splittedName = name.toString().split('-')

  if (splittedName.length > 1)
    return `${splittedName[0].charAt(0)}${splittedName[1].slice(0, 3)}`

  return name.toString().slice(0, 3)
}
