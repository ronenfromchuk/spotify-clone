import React from 'react';
import { getProviders, signIn } from 'next-auth/react';

function Login({ providers }) {
  return (
    <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
        <img
        className='w-52 mb-5'
        src='https://links.papareact.com/9xl'
        alt=''
        />

        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className='bg-[#18D860] text-white p-5 rounded-full'
            onClick={() => signIn(provider.id, { callbackUrl: "/"})}>Login with {provider.name}</button>            
          </div>
        ))}
        <div className='flex '>
        <h2 className='text-white p-5'>👉 Make sure to open your original spotify to enable spotify functionalities!</h2>
        <h3 className='text-green-400 p-5'>before playing music at clone, play music at the original spotify first!</h3>         
        </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}