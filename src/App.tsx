import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { CircleCheckBigIcon, Trash2Icon } from "lucide-react"
import { authService } from "./api/authService";
import { Item } from "./types/Item";
import { todoRepository } from "./repositories/todoRepository";
import { NavLink } from "react-router";

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
    <div className={`flex items-center justify-between p-2 rounded-md border bg-slate-50 ${item.done ? 'opacity-50' : ''}`}>
      <div className={item.done ? 'line-through' : ''}>
        {item.name}
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

  useEffect(() => {
    // chamar a api
    todoRepository.getAll().then(result => {
      setItens(result);
    })
  }, []);

  function submeterFormulario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // pegar o valor digitado no input
    const form = e.target as HTMLElement;
    const titulo = form.querySelector('input')?.value;

    if (titulo) {
      todoRepository.add(titulo).then((item) => {
        // setar os itens do estado (setItens)
        setItens([item, ...itens]);

        // limpar o input após inserção
        form.querySelector('input')!.value = '';
      });
    }
  }

  function remover(index: number) {
    const item = itens[index];
    
    if (confirm("Tem certeza que deseja remover?")) {
      todoRepository.remove(item._id).then((removido) => {
        if (removido) {
          setItens(itens.filter((_, i) => i !== index));
        }
      })
    }
  }

  function concluir(index: number) {
    const item = itens[index];
    
    todoRepository.markAsDone(item._id, !item.done).then((item) => {
      itens[index] = item;
      setItens([...itens]); // forçar a renderização do componente
    });
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

function App() {
  const [logado, setLogado] = useState(false);

  // se o state estiver verdadeiro ou o localStorage tiver o token
  if (logado || authService.getToken()) {
    // mostrar a aplicação normalmente
    return (
      <Conteudo />
    );
  } else {
    // mostrar o formulário de login
    function submeterFormulario(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
  
      // pegar os valores digitado nos inputs
      const form = e.target as HTMLElement;
      const usuario = (form.querySelector('input[type=text]') as HTMLInputElement)?.value;
      const senha = (form.querySelector('input[type=password]') as HTMLInputElement)?.value;

      authService.login(usuario, senha).then((result) => {
        setLogado(true);
      });
    }

    return (
      <div>
        <form onSubmit={(e) => submeterFormulario(e)}>
          <div className="p-4 space-y-2">
            <Input type="text" placeholder="Nome de usuário" />
            <Input type="password" placeholder="Senha" />
            <Button type="submit">Autenticar</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default App
