import Logo from "./Logo";
import Button from "./ui/Button";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="container mx-auto py-16">
        <div className="flex flex-row justify-between">
          <div>
            <h3 className="text-xl font-bold">
              Suscríbete a Radar Legislativo
            </h3>
            <p className="">
              Recibe las novedades legales más relevantes de la semana{" "}
            </p>
          </div>
          <div>
            <Button
              text="Suscribirme"
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7170086036545478656"
            />
          </div>
        </div>
        <div className="h-px bg-gray-200 my-6" />
        <div className="">
          <div>
            <Logo
              colors={{ primary: "#1B3C59", secondary: "#E33421" }}
              className="mb-4"
              goToHome
            />
            <p className="text-sm text-gray-500">
              Si te auditan, necesitas evidencia.
              <br />
              No Explicaciones
            </p>
          </div>
        </div>
        <div className="h-px bg-gray-100 my-6" />
        <div className="flex flex-row justify-between">
          <span className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Isolegal. Todos los derechos
            reservados.
          </span>
          <div className="flex flex-row gap-4 text-sm text-gray-500">
            <span className="hover:text-gray-900 transition-colors cursor-pointer">
              Política de privacidad
            </span>
            <span className="hover:text-gray-900 transition-colors cursor-pointer">
              Términos y condiciones
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
