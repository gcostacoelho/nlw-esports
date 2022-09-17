import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./Forms/Input";

export function FormAds(){
    return (
        <form action="" className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Input id="game" placeholder="Selecione o game que deseja jogar"/>
            </div>
            
            <div className="flex flex-col gap-2">
                <label htmlFor="nickname">Seu nome (ou nickname)</label>
                <Input type="text" placeholder="Como te chamam dentro do game?" id="nickname" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="GamingTime">Joga há quantos anos?</label>
                    <Input type="number" placeholder="Tudo bem ser ZERO" id="gameTime"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input type="text" placeholder="Usuario#0000" id="discord"/>
                </div>
            </div>

            <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="whenPlaying">Quando costuma jogar</label>

                    <div className="grid grid-cols-4 gap-2">
                        <button title="Domingo" className="w-8 h-8 rounded bg-zinc-900 ">D</button>
                        <button title="Segunda" className="w-8 h-8 rounded bg-zinc-900 ">S</button>
                        <button title="Terça" className="w-8 h-8 rounded bg-zinc-900 ">T</button>
                        <button title="Quarta" className="w-8 h-8 rounded bg-zinc-900 ">Q</button>
                        <button title="Quinta" className="w-8 h-8 rounded bg-zinc-900 ">Q</button>
                        <button title="Sexta" className="w-8 h-8 rounded bg-zinc-900 ">S</button>
                        <button title="Sábado" className="w-8 h-8 rounded bg-zinc-900 ">S</button>
                    </div>
                    
                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourPlaying">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input type="time" placeholder="De" id="HourStart" />
                        <Input type="time" placeholder="Até" id="hourEnd" />
                    </div>
                </div>
            </div>

            <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
                Costume me conectar ao chat de voz
            </div>

            <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close 
                    type="button" 
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                    Cancelar
                </Dialog.Close>
                
                <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                    <GameController size={24}/>
                    Encontrar duo
                </button>
            </footer>
      </form>
    )
}