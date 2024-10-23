import { Button } from "./components/ui/button";

function Menu() {
  return (
    <div className="bg-purple-800 text-white">
      Menu
    </div>
  );
}

function Conteudo() {
  return (
    <div>
      <Button variant="default">
        Remover
      </Button>
      <Button variant="outline">
        Clique aqui agora!
      </Button>
    </div>
  );
}

function Rodape() {
  return (
    <div>Rodape</div>
  );
}

function App() {
  return (
    <>
      <Menu />
      <Conteudo />
      <Rodape />
    </>
  );
}

export default App
