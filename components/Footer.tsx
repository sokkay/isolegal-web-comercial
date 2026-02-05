import EmailIcon from "@/public/icons/email.svg";
import LinkedInIcon from "@/public/icons/linkedin.svg";
import Logo from "./Logo";
import Button from "./ui/Button";

export default function Footer() {
  const socialMedia = [
    {
      name: "Email",
      href: "mailto:contacto@isolegal.cl",
      icon: <EmailIcon className="w-5.5 h-5.5 fill-[#64748B]" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/isolegal",
      icon: <LinkedInIcon className="w-5.5 h-5.5 fill-[#64748B]" />,
    },
  ];

  return (
    <footer className="bg-white">
      <div className="container mx-auto py-16">
        <div className="flex flex-col md:flex-row justify-between">
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
              className="w-full md:w-auto mt-4 md:mt-0"
            />
          </div>
        </div>
        <div className="h-px bg-gray-200 my-6" />
        <div className=" flex flex-col md:flex-row justify-between">
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
            <div className="flex flex-row gap-4 mt-4">
              {socialMedia.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-md font-bold text-text">
              Av. Bosques de Montemar N°30, Of. 316, Viña del Mar.
            </span>
          </div>
        </div>
        <div className="h-px bg-gray-100 my-6" />
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
          <span className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Isolegal. Todos los derechos
            reservados.
          </span>
          <div className="flex flex-row gap-4 text-sm text-gray-500">
            <a className="hover:text-gray-900 transition-colors cursor-pointer">
              Política de privacidad
            </a>
            <a className="hover:text-gray-900 transition-colors cursor-pointer">
              Términos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
