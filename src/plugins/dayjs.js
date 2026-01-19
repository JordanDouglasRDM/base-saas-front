import dayjs from 'dayjs'

// Plugins úteis (opcionais, mas recomendados)
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import 'dayjs/locale/pt-br'

// Configuração global
dayjs.locale('pt-br')
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)

export default dayjs
