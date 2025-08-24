import * as React from 'react'
import { Html, Head, Tailwind, Body, Container, Section, Img, Text, Hr } from '@react-email/components'

export const SignUp = ({ user }) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='mx-auto my-auto bg-white px-2 font-sans'>
          <Container className='mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid'>
            <Img
              src='https://gist.github.com/rafariass/9b9ceaea039433c82c4d511e70cddce9/raw/4ac0cc9042462563017b98d9015d18b168420eed/rafariass-banner-email.png'
              alt='Banner RaFariasS'
              className='mx-auto my-0 max-w-full h-auto rounded border'
            />
            <Section className='p-[20px]'>
              <Text className='text-[14px] text-black leading-[24px]'>
                Hola <strong>{user.firstname} {user.lastname}</strong> ({user.nickname}), Hemos detectado un nuevo inicio de sesión en tu cuenta. Si no fuiste tú, por favor cambia tu contraseña de inmediato y revisa tu actividad reciente.
              </Text>
              <Hr className='mx-0 my-[26px] w-full border border-[#eaeaea] border-solid' />
              <Text className='text-[#666666] text-[12px] leading-[24px]'>
                Todos los derechos reservados.<br />
                Created by <strong>{'>_'}RaFariasS</strong>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default SignUp
