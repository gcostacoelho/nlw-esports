//JSX = JS + XML (HTML)

/*
//Exemplo de componente
function Button(props:ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}

//Propriedade do componente Button
interface ButtonProps{
  title: string;
}
*/

import { useState, useEffect } from "react";

import './styles/main.css';
import logoImg from './assets/logo.svg';
import * as Dialog from "@radix-ui/react-dialog";
import axios from 'axios'

import { GameBanner } from './components/GameBanner';
import { NewAdBanner } from './components/NewAdBanner';
import { FormAds } from "./components/FormAds";

interface Game {
  id: string;
  title: string
  banner: string;
  _count:{ ads: number;}
}


function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:5000/games').then(response => {
      setGames(response.data)
    });
  }, [])


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {
          games.map(game => {
              return (
                <GameBanner
                  key={game.id}
                  title={game.title} 
                  bannerUrl={game.banner} 
                  adsCount={game._count.ads} 
                />
              )
            })
          }
      </div>
        
      <Dialog.Root>

        <NewAdBanner/>

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <FormAds/>

          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      
    </div>
  )
}

export default App
