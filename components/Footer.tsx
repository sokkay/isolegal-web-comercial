export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">
          &copy; {new Date().getFullYear()} Isolegal. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}