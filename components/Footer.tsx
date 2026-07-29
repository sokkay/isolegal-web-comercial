import EmailIcon from "@/public/icons/email.svg";
import LinkedInIcon from "@/public/icons/linkedin.svg";
import NewsIcon from "@/public/icons/news.svg";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./ui/Button";

export default function Footer() {
  const socialMedia = [
    {
      name: "Email",
      href: "mailto:contacto@isolegal.cl",
      icon: (
        <EmailIcon className="h-5.5 w-5.5 fill-[#64748B] dark:fill-white/60" />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/isolegal",
      icon: (
        <LinkedInIcon className="h-5.5 w-5.5 fill-[#64748B] dark:fill-white/60" />
      ),
    },
    {
      name: "Blog",
      href: "/blog",
      icon: (
        <NewsIcon className="h-5.5 w-5.5 fill-[#64748B] dark:fill-white/60" />
      ),
    },
  ];

  return (
    <footer className="dark:bg-darkBlue bg-white">
      <div className="container mx-auto py-16">
        <div className="flex flex-col justify-between md:flex-row">
          <div>
            <h3 className="text-text text-xl font-bold dark:text-white">
              Suscríbete a Radar Legislativo
            </h3>
            <p className="text-text dark:text-white/80">
              Recibe las novedades legales más relevantes de la semana{" "}
            </p>
          </div>
          <div>
            <Button
              text="Suscribirme"
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7170086036545478656"
              className="mt-4 w-full md:mt-0 md:w-auto"
            />
          </div>
        </div>
        <div className="dark:bg-border my-6 h-px bg-gray-200" />
        <div className="flex flex-col justify-between md:flex-row">
          <div>
            <Logo
              colors={{ primary: "#1B3C59", secondary: "#E33421" }}
              className="mb-4"
              goToHome
            />
            <p className="text-sm text-gray-500 dark:text-white/60">
              Concimiento, cercanía y simplicidad.
            </p>
            <div className="mt-4 flex flex-row gap-4">
              {socialMedia.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:bg-surface-a20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-md text-text font-bold dark:text-white">
              Av. Bosques de Montemar N°30, Of. 316, Viña del Mar.
            </span>
          </div>
        </div>
        <div className="dark:bg-border my-6 h-px bg-gray-100" />
        <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-0">
          <span className="text-sm text-gray-500 dark:text-white/60">
            &copy; {new Date().getFullYear()} Isolegal. Todos los derechos
            reservados.
          </span>
          <div className="flex flex-row gap-4 text-sm text-gray-500 dark:text-white/60">
            {/* <a className="hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">
              Política de privacidad
            </a> */}
            <Link
              href="/terminos-y-condiciones"
              className="cursor-pointer transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
