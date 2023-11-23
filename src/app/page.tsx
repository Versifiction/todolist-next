"use client";

import Todolist from "./components/Todolist";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="font-bold text-3xl mb-12">Todolist</h1>
      <Todolist />
    </main>
  );
};

export default Home;
