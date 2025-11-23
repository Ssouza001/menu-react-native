import { useRouter } from 'expo-router'; // importa o hook useRouter do expo-router, usado para controlar a navegação (trocar de tela/rota)
import { useEffect } from 'react'; // importa o hook useEffect do React, que permite executar código em momentos do ciclo de vida do componente
import { StyleSheet, Text, View } from 'react-native'; // importa componentes básicos e utilitários de estilo do React Native

export default function Index() { // define e exporta o componente funcional chamado Index — este é o componente da rota '/'
  const router = useRouter(); // chama o hook useRouter e guarda o objeto router em uma constante para usar a navegação

  useEffect(() => { // useEffect executa a função passada sempre depois que o componente for renderizado (por padrão, após a primeira render)
    
    if (!router || typeof router.replace !== 'function') return; // checa se o router existe e tem a função replace; se não, sai sem fazer nada
    const t = setTimeout(() => { // cria um temporizador (mesmo com 0 ms) para adiar a chamada de navegação para o próximo ciclo do loop de eventos
      router.replace('/components'); // usa router.replace para trocar a rota atual para '/components' (substitui a entrada atual no histórico)
    }, 0); // 0 ms -> roda logo em seguida, mas só após o fluxo atual terminar

    return () => clearTimeout(t); // cleanup: se o componente desmontar antes do timeout, cancela o temporizador
  }, []); // array de dependências vazio -> esse efeito roda apenas uma vez, na montagem inicial do componente

  return ( // o que o componente renderiza na tela
    <View style={styles.container}> {/* View é um contêiner; aplicamos estilos através de styles.container */}
      <Text style={styles.text}>Redirecionando...</Text> {/* mostra um texto simples enquanto a navegação acontece */}
    </View>
  );
}

const styles = StyleSheet.create({ // cria o objeto de estilos com StyleSheet do React Native
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }, // configura a View para ocupar a tela inteira e centralizar o conteúdo
  text: { fontSize: 16 } // define o tamanho da fonte do texto
});