import styled from 'styled-components'
import Image from 'next/image'

export default function Home() {
  return (
    <Container>
      <div style={{width: '50%', textAlign: 'center'}}>
        <Image src="/whatsapp-home.png" height={250} width={250} alt=''/>
        <h2 style={{ color: '#727372' }}>Keep your phone connected</h2>
        <p style={{ color: '#b7b9bb' }}>
          WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.
        </p>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  width: 100%;
  height: 100%;
`