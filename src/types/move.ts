import { SimpleAttribute } from './simple-attribute'
import { VersionGroupDetail } from './version-group-detail'

export type Move = {
  move: SimpleAttribute
  version_group_details: VersionGroupDetail[]
}
