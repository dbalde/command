import * as Config from '@anycli/config'
import * as _ from 'lodash'

export interface ConvertToCachedOptions {
  id?: string
  plugin?: Config.IPlugin
}

export function convertToCached(c: Config.ICommand, opts: ConvertToCachedOptions = {}): Config.ICachedCommand {
  return {
    _base: c._base,
    title: c.title,
    id: c.id || opts.id!,
    description: c.description,
    usage: c.usage,
    pluginName: opts.plugin && opts.plugin.name,
    hidden: c.hidden,
    aliases: c.aliases || [],
    // help: c.help,
    flags: _.mapValues(c.flags, (flag, name) => {
      if (flag.type === 'boolean') {
        return {
          name,
          type: flag.type,
          char: flag.char,
          description: flag.description,
          hidden: flag.hidden,
          required: flag.required,
        }
      }
      return {
        name,
        type: flag.type,
        char: flag.char,
        description: flag.description,
        hidden: flag.hidden,
        required: flag.required,
      }
    }),
    args: c.args.map(a => ({
      name: a.name,
      description: a.description,
      required: a.required,
      // default: a.default && a.default(),
      hidden: a.hidden,
    })),
    load: async () => c,
  }
}
