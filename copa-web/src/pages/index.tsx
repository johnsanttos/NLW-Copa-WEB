import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import userAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '@/lib/axios'
import { FormEvent, useState } from 'react'


interface HomeProps {
  poolCount: number
  guessesCount:number
  usersCount:number
}



export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState ('')
  console.log('aaaaaaaaaaa' , poolTitle)

 async function createPool(event: FormEvent){
    //para não redirecionar usuarios usamos o  event.preventDefault()  FormEvent
    event.preventDefault()
    try {
      const response = await api.post('/pools', {
        title:poolTitle.toUpperCase()})
       
        const {code} = response.data
       //navigator.clipboard.writeText(code) para copiar a resposta da requisição e compartilhar
        await navigator.clipboard.writeText(code)

        alert('Bolão criado com sucesso, o código fiu copiado para a área de transferência!');
        setPoolTitle('')
    } catch (err) {
      console.log(err)
      alert('falha ao carregar bplão, tente novamente!')
    }
    
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28"  >
      <main>

        <Image src={logoImg} alt='Dois celulares exibindo uma prévia da aplicação'
        />
        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={userAvatarExampleImg} alt=''
          />

          <strong className='text-gray-100 text-xl'> <span className='text-ignite-500'> + {props.usersCount} </span> pessoas já estão usando</strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2' >

          <input
          onChange={event => setPoolTitle(event.target.value)}
          value={poolTitle}
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100' 
            type="text" required placeholder='Qual o nome do seu bolão' />
            

          <button
            className='bg-yellow-500  px-6 py-4 rounded font-bold text-sm uppercase hover:bg-yellow-700'
            type='submit'> Criar meu bolão</button>
        </form>

        <p className="text-gray-300 mt-4 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className='mt-10 pt-10 border-t items-center border-gray-600 flex justify-between text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='' />
            <div className=' flex flex-col'>
              <span className='font-bold'> + {props.poolCount} </span>
              <span> Bolões criados </span>

            </div>
          </div>
          <div className='w-px h-14 bg-gray-600' />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt='' />
            <div className=' flex flex-col'>
              <span className='font-bold'> + {props.guessesCount} </span>
              <span> Palpites enviados </span>
            </div>
          </div>
        </div>

      </main>
      <Image src={appPreviewImg} alt='Dois celulares exibindo uma prévia da aplicação'
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps = async () => {
  // const pollCountResponse = await api.get('pools/count')
  // const pollGuessestResponse = await api.get('guesses/count')
  // outra forma de fazer essa requisisição e ultilizando o Promise.all, para executarem em palarelo

  const [pollCountResponse,guessCountResponse,usersCountResponse]=  await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('/users/count'),])

    console.log('users ===>', usersCountResponse.data)

  return {
    props: {
      poolCount: pollCountResponse.data.count,
      guessesCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count
    }
  }

}