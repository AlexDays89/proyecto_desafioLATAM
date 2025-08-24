import { Resend } from 'resend'
import { render, pretty } from '@react-email/render'
import * as templates from './templates/index.js'
import logger from '../../../utils/logger.js'

const resend = new Resend(process.env.RESEND_SECRET)
const environment = process.env.NODE_ENV === 'production'
const RESEND_FROM = environment ? process.env.RESEND_FROM : 'onboarding@resend.dev'

const signUp = async (user) => {
  try {
    const htmlEmail = await pretty(await render(templates.SignUp({ user })))
    const { data, error } = await resend.emails.send({
      from: `Proyescto Base Backend <${RESEND_FROM}>`,
      to: environment ? user.email : process.env.RESEND_TO,
      subject: 'Gracias por registrarse en nuestra plataforma.',
      html: htmlEmail
    })

    if (error) {
      return logger.error(`[resend/signUp] ${JSON.stringify(error)}`)
    }

    logger.info(`[resend/signUp] ${user.email}: ${data.id}`)
  } catch (error) {
    logger.error(`[resend/signUp] ${error}`)
  }
}

const signIn = async (user) => {
  try {
    const htmlEmail = await pretty(await render(templates.SignIn({ user })))
    const { data, error } = await resend.emails.send({
      from: `Proyescto Base Backend <${RESEND_FROM}>`,
      to: environment ? user.email : process.env.RESEND_TO,
      subject: 'Nuevo inicio de sesión detectado en tu cuenta.',
      html: htmlEmail,
      headers: {
        Importance: 'high',
        'X-Priority': '1',
        'X-MSMail-Priority': 'High'
      }
    })

    if (error) {
      return logger.error(`[resend/signIn] ${JSON.stringify(error)}`)
    }

    logger.info(`[resend/signIn] ${user.email}: ${data.id}`)
  } catch (error) {
    logger.error(`[resend/signIn] ${error}`)
  }
}

export const sendEmail = {
  signUp: (user) => signUp(user),
  signIn: (user) => signIn(user)
}

export default sendEmail
