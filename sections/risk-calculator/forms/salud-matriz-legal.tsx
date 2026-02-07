import FormContainer from "@/components/risk-calculator/FormContainer";
import FormHeader from "@/components/risk-calculator/FormHeader";

export default function SaludMatrizLegal() {
  return (
    <FormContainer step={2} totalSteps={5}>
      <FormHeader
        title="Salud de tu Matriz Legal actual"
        description="Ayúdanos a entender cómo gestionas tus requisitos legales actualmente para identificar puntos críticos de mejora."
      />
    </FormContainer>
  );
}
