import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true
});

export async function generateRecipe(formData: any) {
  try {
    const prompt = `
      Por favor, gere uma receita medicinal tradicional considerando:
      
      Problema principal: ${formData.mainSymptom}
      ${formData.otherSymptom ? `Descrição adicional: ${formData.otherSymptom}` : ''}
      Restrições alimentares: ${formData.dietaryRestrictions.join(', ')}
      Tipo de receita preferido: ${formData.recipeType}
      Frequência do problema: ${formData.frequency}
      Duração do problema: ${formData.duration}
      Benefícios adicionais desejados: ${formData.additionalBenefits.join(', ')}

      Por favor, forneça:
      1. Nome da receita
      2. Lista de ingredientes com quantidades
      3. Modo de preparo detalhado
      4. Frequência de consumo recomendada
      5. Benefícios esperados
      6. Contraindicações ou avisos importantes
      7. Dicas adicionais de uso
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Você é um especialista em medicina tradicional e receitas ancestrais para saúde e bem-estar."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao gerar receita:', error);
    throw error;
  }
}