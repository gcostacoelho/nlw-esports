import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios'


import { Check, GameController } from "phosphor-react";
import { Input } from "./Forms/Input";
import { useEffect, useState, FormEvent } from "react";

interface Game {
    id: string;
    title: string
}




export function FormAds() {

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:5000/games').then(response => {
            setGames(response.data)
        });
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        console.log(data)

        if (!data.nickname) return

        try {
            await axios.post(`http://localhost:5000/games/${data.game}/ads`, {
                name: data.nickname,
                yearsPlaying: Number(data.gameTime),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hoursStart: data.hoursStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            alert('Anúncio criado com sucesso')

        } catch (error) {
            console.log(error)
            alert('Erro ao criar anúncio')
        }
    }



    return (
        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select
                    id="game"
                    name="game"
                    placeholder="Selecione o game que deseja jogar"
                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                >
                    <option disabled defaultValue="" value="">Selecione o game que deseja jogar</option>

                    {
                        games.map(game => {
                            return <option key={game.id} value={game.id}>{game.title}</option>
                        })
                    }
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="nickname">Seu nome (ou nickname)</label>
                <Input type="text" placeholder="Como te chamam dentro do game?" name="nickname" id="nickname" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="GamingTime">Joga há quantos anos?</label>
                    <Input type="number" placeholder="Tudo bem ser ZERO" id="gameTime" name="gameTime" />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input type="text" placeholder="Usuario#0000" id="discord" name="discord" />
                </div>
            </div>

            <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="whenPlaying">Quando costuma jogar</label>

                    <ToggleGroup.Root type="multiple" value={weekDays} className="grid grid-cols-4 gap-2" onValueChange={setWeekDays}>
                        <ToggleGroup.Item
                            value="0" title="Domingo"
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' : ''}`}
                        >
                            D
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="1"
                            title="Segunda"
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500' : ''}`}
                        >
                            S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="2"
                            title="Terça"
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500' : ''}`}
                        >
                            T
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="3"
                            title="Quarta"
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500' : ''}`}
                        >
                            Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="4"
                            title="Quinta"
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500' : ''}`}
                        >
                            Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="5"
                            title="Sexta"
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500' : ''}`}
                        >
                            S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="6"
                            title="Sábado"
                            className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500' : ''}`}
                        >
                            S
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>

                </div>

                <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourPlaying">Qual horário do dia?</label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input type="time" placeholder="De" id="HourSart" name="hoursStart" />
                        <Input type="time" placeholder="Até" id="hourEnd" name="hourEnd" />
                    </div>
                </div>
            </div>

            <label className="mt-2 flex items-center gap-2 text-sm">
                <Checkbox.Root
                    className="w-6 h-6 p-1 rounded bg-zinc-900"
                    checked={useVoiceChannel}
                    onCheckedChange={
                        (checked) => {
                            if (checked === true) setUseVoiceChannel(true)
                            else setUseVoiceChannel(false)
                        }
                    }>
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Costume me conectar ao chat de voz
            </label>

            <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                    type="button"
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                    Cancelar
                </Dialog.Close>

                <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                    <GameController size={24} />
                    Encontrar duo
                </button>
            </footer>
        </form>
    )
}