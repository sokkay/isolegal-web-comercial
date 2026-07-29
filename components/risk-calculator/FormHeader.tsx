type FormHeaderProps = {
  title: string;
  description: string;
};
export default function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-text text-lg dark:text-white/80">{description}</p>
    </div>
  );
}
