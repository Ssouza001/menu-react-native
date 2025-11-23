// Importa Link e Stack do expo-router.
// - Link: componente que cria um link para outra rota (sem recarregar a app).
// - Stack: usado aqui para configurar opções da tela (por exemplo, o título).
import { Link, Stack } from 'expo-router';

// Importa utilitários do React Native para construir a interface:
// - StyleSheet: ajuda a criar objetos de estilo.
// - Text: componente para exibir texto.
// - View: contêiner básico para agrupar outros componentes.
import { StyleSheet, Text, View } from 'react-native';

// Exporta o componente padrão desta tela. Em React, um componente é uma função
// que retorna JSX (a "marcações" que descrevem a interface).
export default function NotFoundScreen() {
  return (
    <>
      {/* Stack.Screen é usado para configurar opções da barra de navegação
          para esta tela. Aqui definimos o título da tela como 'Oops!'. */}
      <Stack.Screen options={{ title: 'Oops!' }} />

      {/* View é um contêiner visual; aplicamos estilos via styles.container */}
      <View style={styles.container}>
        {/* Text exibe uma mensagem simples informando que a tela não existe */}
        <Text style={styles.text}>This screen doesn't exist.</Text>

        {/* Link cria um link para a rota '/' (tela inicial).
            Em apps web isso seria parecido com <a href="/">...</a>,
            mas em React Native com expo-router, Link faz a navegação interna. */}
        <Link href="/" style={styles.link}>
          {/* Link espera filhos; usamos um Text para mostrar o texto clicável */}
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

// Aqui definimos os estilos usados acima com StyleSheet.create.
// Isso deixa o código mais organizado e performático em React Native.
const styles = StyleSheet.create({
  // container: estila o View que envolve todo o conteúdo da tela
  container: {
    flex: 1, // ocupa todo o espaço disponível na tela
    alignItems: 'center', // alinha filhos horizontalmente ao centro
    justifyContent: 'center', // alinha filhos verticalmente ao centro
    padding: 20, // adiciona espaçamento interno
  },
  // text: estilo para o texto principal
  text: {
    fontSize: 20, // tamanho da fonte
    fontWeight: '600', // espessura da fonte (600 = semi-bold)
  },
  // link: estilo aplicado ao Link (aqui apenas espaçamento superior e vertical)
  link: {
    marginTop: 15, // distância para baixo em relação ao elemento anterior
    paddingVertical: 15, // espaçamento vertical interno do link
  },
});