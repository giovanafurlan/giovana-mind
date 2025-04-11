"use client";

import { Ban, Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";

interface Fact {
  id: string;
  key: string;
  value: string;
  category: "geral" | "pessoal" | "profissional";
  tone: "neutral" | "formal" | "informal";
}

interface FactEditorProps {
  facts: Fact[];
  setFacts: React.Dispatch<React.SetStateAction<Fact[]>>;
}

export default function FactEditor({ facts, setFacts }: FactEditorProps) {
  const [editando, setEditando] = useState<string | null>(null);
  const [novoFact, setNovoFact] = useState<Fact>({
    id: "",
    key: "",
    value: "",
    category: "geral",
    tone: "neutral",
  });

  const handleAdicionar = async () => {
    try {
      const resposta = await fetch("/api/facts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoFact),
      });

      if (resposta.ok) {
        const data = await resposta.json();
        setFacts([...facts, data]);
        setNovoFact({
          id: "",
          key: "",
          value: "",
          category: "geral",
          tone: "neutral",
        });
      }
    } catch (erro) {
      console.error("Erro ao adicionar:", erro);
    }
  };

  const handleAtualizar = async (id: string) => {
    try {
      const factAtualizado = facts.find((f) => f.id === id);
      if (factAtualizado) {
        const resposta = await fetch("/api/facts", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(factAtualizado),
        });

        if (resposta.ok) {
          setEditando(null);
        }
      }
    } catch (erro) {
      console.error("Erro ao atualizar:", erro);
    }
  };

  const handleRemover = async (id: string) => {
    try {
      const resposta = await fetch("/api/facts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (resposta.ok) {
        setFacts(facts.filter((fact) => fact.id !== id));
      }
    } catch (erro) {
      console.error("Erro ao remover:", erro);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    id: string | null,
    campo: keyof Fact
  ) => {
    const valor = e.target.value;
    if (id) {
      setFacts(
        facts.map((fact) =>
          fact.id === id ? { ...fact, [campo]: valor } : fact
        )
      );
    } else {
      setNovoFact({ ...novoFact, [campo]: valor });
    }
  };

  return (
    <div className="space-y-4">
      <div className="py-4">
        <h2 className="mb-2">Adicionar Nova Informação</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Chave"
            value={novoFact.key}
            onChange={(e) => handleChange(e, null, "key")}
            className="p-2 rounded bg-white border-1 border-purple-300"
          />
          <input
            type="text"
            placeholder="Valor"
            value={novoFact.value}
            onChange={(e) => handleChange(e, null, "value")}
            className="p-2 rounded bg-white border-1 border-purple-300"
          />
          <select
            value={novoFact.category}
            onChange={(e) => handleChange(e, null, "category")}
            className="p-2 rounded bg-white border-1 border-purple-300"
          >
            <option value="geral">Geral</option>
            <option value="pessoal">Pessoal</option>
            <option value="profissional">Profissional</option>
          </select>
          <button
            onClick={handleAdicionar}
            className="bg-pink-300 text-white p-2 rounded"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-purple-100">
              <th className="text-start">Chave</th>
              <th className="text-start">Valor</th>
              <th className="text-start">Categoria</th>
              <th className="text-start">Tom</th>
              <th className="text-start">Ações</th>
            </tr>
          </thead>
          <tbody>
            {facts.map((fact) => (
              <tr key={fact.id} className="border-b border-purple-300">
                <td className="py-2 pr-4">
                  {editando === fact.id ? (
                    <input
                      type="text"
                      value={fact.key}
                      onChange={(e) => handleChange(e, fact.id, "key")}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    fact.key
                  )}
                </td>
                <td className="py-2 pr-4">
                  {editando === fact.id ? (
                    <input
                      type="text"
                      value={fact.value}
                      onChange={(e) => handleChange(e, fact.id, "value")}
                      className="p-1 border rounded w-full"
                    />
                  ) : (
                    fact.value
                  )}
                </td>
                <td className="py-2 pr-4">
                  {editando === fact.id ? (
                    <select
                      value={fact.category}
                      onChange={(e) => handleChange(e, fact.id, "category")}
                      className="p-1 border rounded"
                    >
                      <option value="geral">Geral</option>
                      <option value="pessoal">Pessoal</option>
                      <option value="profissional">Profissional</option>
                    </select>
                  ) : (
                    fact.category
                  )}
                </td>
                <td className="py-2 pr-4">
                  {editando === fact.id ? (
                    <select
                      value={fact.tone}
                      onChange={(e) => handleChange(e, fact.id, "tone")}
                      className="p-1 border rounded"
                    >
                      <option value="neutral">Neutro</option>
                      <option value="formal">Formal</option>
                      <option value="informal">Informal</option>
                    </select>
                  ) : (
                    fact.tone
                  )}
                </td>
                <td className="flex justify-start py-2">
                  {editando === fact.id ? (
                    <>
                      <button
                        onClick={() => handleAtualizar(fact.id)}
                        className="px-2 py-1 rounded mt-1"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={() => setEditando(null)}
                        className="px-2 py-1 rounded mt-1"
                      >
                        <Ban size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditando(fact.id)}
                        className="px-2 py-1 rounded"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleRemover(fact.id)}
                        className="px-2 py-1 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
