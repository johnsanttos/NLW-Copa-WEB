// interface HomeProps {
// count: number
// }
import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
export default function Home() {

  return (
<div>
  <main>
  <Image src={logoImg}  alt='Dois celulares exibindo uma prévia da aplicação'
quality={100}
/>
<h1>
Crie seu próprio bolão da copa e compartilhe entre amigos!
</h1>
  </main>
<Image src={appPreviewImg}  alt='Dois celulares exibindo uma prévia da aplicação'
quality={100}
/>
</div>
  )
}

// export const getServerSideProps = async () =>{

//   const response  = await fetch('http://localhost:3333/pools/count')
//  const data = await response.json()
//     console.log('aiaia ',data)
// return {
//   props:{
//     count: data.count
//   }
// }

// }