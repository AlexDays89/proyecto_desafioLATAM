import { format } from '@formkit/tempo'

export const tempo = () => format(new Date(), { date: 'full', time: 'full' })

export default tempo
