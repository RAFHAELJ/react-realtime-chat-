export function NotFoundPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-medium">404</h1>
        <p className="text-xl font-medium m-6">
          Desculpa a pagina nao foi encontrada
        </p>
        <a href="/" className=" bg-teal-600 text-white py-2 px-4 rounded">
          Va para a principal
        </a>
      </div>
    </div>
  );
}
