//JSX = JS + XML (HTML)

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

function App() {
  return (
    <div>
      <h1>Hello NLW</h1>
      <Button title="Enviar 1"/>
      <Button title="Enviar 2"/>
      <Button title="Enviar 3"/>
    </div>
  )
}

export default App
