"use client";
import { useState, useEffect } from "react";
import FactEditor from "../_components/FactEditor";

interface Fact {
  id: string;
  key: string;
  value: string;
  category: "geral" | "pessoal" | "profissional";
  tone: "neutral" | "formal" | "informal";
}

export default function AdminPage() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/facts")
      .then((res) => res.json())
      .then((data) => {
        setFacts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4 text-center">Admin</h1>
      <FactEditor facts={facts} setFacts={setFacts} />
    </div>
  );
}
