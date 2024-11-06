import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { CircleCheckBigIcon, Trash2Icon } from "lucide-react"

// A interface em que objetos do tipo Item respeitarão
interface Item {
  titulo: string,
  concluido: boolean,
}

function Menu() {
  return (
    <div className="py-2 border-b">
      Lista de Tarefas
    </div>
  );
}

function TodoItem({
    item,
    remover,
    concluir
  }: {
    item: Item,
    remover: () => void,
    concluir: () => void,
  }) {
  return (
    <div className={`flex items-center justify-between p-2 rounded-md border bg-slate-50 ${item.concluido ? 'opacity-50' : ''}`}>
      <div className={item.concluido ? 'line-through' : ''}>
        {item.titulo}
      </div>
      <div className="space-x-1">
        <Button variant="outline" size="icon" onClick={concluir}>
          <CircleCheckBigIcon className="h-4 w-4 text-green-700" />
        </Button>
        <Button variant="outline" size="icon" onClick={remover}>
          <Trash2Icon className="h-4 w-4 text-red-700" />
        </Button>
      </div>
    </div>
  );
}

function Conteudo() {
  const [itens, setItens] = useState([] as Item[]); // um array de itens

  function submeterFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // pegar o valor digitado no input
    const form = e.target as HTMLElement;
    const titulo = form.querySelector('input')?.value;

    if (titulo) {
      // instanciação de um novo objeto que respeita a interface Item
      const item: Item = {
        titulo: titulo,
        concluido: false,
      };

      // setar os itens do estado (setItens)
      setItens([...itens, item]);

      // limpar o input após inserção
      form.querySelector('input')!.value = '';
    }
  }

  function remover(index: number) {
    if (confirm("Tem certeza que deseja remover?")) {
      setItens(itens.filter((_, i) => i !== index));
    }
  }

  function concluir(index: number) {
    const item = itens[index];
    item.concluido = true; // modificando a propriedade concluido

    setItens([...itens]);
  }

  return (
    <div className="space-y-4">
      <form onSubmit={(e) => submeterFormulario(e)}>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Escreva uma tarefa..." />
          <Button type="submit">Adicionar</Button>
        </div>
      </form>

      <div className="space-y-2">
        {itens.map((item, index) => {
          return <TodoItem
              key={index}
              item={item}
              remover={() => remover(index)}
              concluir={() => concluir(index)}
            />
        })}
      </div>
    </div>
  );
}

function Rodape() {
  return (
    <div className="py-2 border-t">
      TADS &copy; 2024
    </div>
  );
}

function App() {
  return (
    <div className="m-4 space-y-6">
      <Menu />
      <Conteudo />
      <Rodape />
    </div>
  );
}

export default App
