
// Importa componentes básicos do React Native:
// View: para criar containers
// Text: para exibir textos
// StyleSheet: para criar estilos
// ScrollView: para permitir rolagem
// Image: para exibir imagens
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Snackbar from './snackbar';

// Função principal do componente de bebidas
export default function BebidasScreen() {
  // Lista de bebidas, cada uma com id, nome, descrição, preço e imagem
  const bebidas = [
    {
      id: 1,
      nome: 'Coca-Cola 2L',
      descricao: 'Refrigerante',
      preco: 'R$ 10,00',
      imagem: 'https://supermercadosimperatriz.vteximg.com.br/arquivos/ids/182881-800-800/cocacola-2litros.png?v=637774374772900000'
    },
    {
      id: 2,
      nome: 'Guaraná 2L',
      descricao: 'Refrigerante',
      preco: 'R$ 9,00',
      imagem: 'https://www.imigrantesbebidas.com.br/bebida/images/products/full/1885-refrigerante-guarana-antarctica-2l.20250131112123.jpg'
    },
    {
      id: 3,
      nome: 'Suco de Laranja',
      descricao: 'Natural 500ml',
      preco: 'R$ 8,00',
      imagem: 'https://zaffari.vtexassets.com/arquivos/ids/280452/1095727-00.jpg?v=638856996578000000'
    },
    {
      id: 4,
      nome: 'Água Mineral',
      descricao: 'Sem gás 500ml',
      preco: 'R$ 3,00',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqFg9oMlMNllSvaCckHFb5-GnYUZlZZnlBpQ&s'
    },
    {
      id: 5,
      nome: 'Cerveja Heineken',
      descricao: 'Long neck 330ml',
      preco: 'R$ 7,00',
      imagem: 'https://www.piramidesdistribuidora.com.br/images/original/3328-heineken-long-neck-330ml-normal-24un.20251029123916.png'
    },
    {
      id: 6,
      nome: 'Limonada',
      descricao: 'Suíça 500ml',
      preco: 'R$ 9,00',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaj6b1OW56LZLVHv8jrqY9onRu1YcUTzxYw&s'
    }
  ];

  const { addToCart } = useContext(CartContext);
  const [addedMsg, setAddedMsg] = useState(null);

  const parsePrice = (precoStr) => {
    if (!precoStr) return 0;
    // remove 'R$', spaces and convert comma to dot
    const s = precoStr.replace(/[^0-9,\.]/g, '').replace(',', '.');
    const n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  };

  // O componente retorna uma ScrollView (permite rolar a tela)
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
      {/* Cabeçalho da tela de bebidas */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bebidas</Text>
        <Text style={styles.headerSubtitle}>Para acompanhar sua pizza</Text>
      </View>

      {/* Lista de bebidas */}
      <View style={styles.bebidaList}>
        {/* Para cada bebida na lista, cria um card */}
        {bebidas.map((bebida) => (
          <View key={bebida.id} style={styles.bebidaCard}>
            {/* Exibe a imagem da bebida */}
            <Image source={{ uri: bebida.imagem }} style={styles.bebidaImage} />
            {/* Informações da bebida: nome, descrição e preço */}
            <View style={styles.bebidaInfo}>
              <Text style={styles.bebidaNome}>{bebida.nome}</Text>
              <Text style={styles.bebidaDescricao}>{bebida.descricao}</Text>
              <Text style={styles.bebidaPreco}>{bebida.preco}</Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  const price = parsePrice(bebida.preco);
                  const product = {
                    id: bebida.id,
                    nome: bebida.nome,
                    precos: { unidade: price },
                    imagem: bebida.imagem,
                  };
                  addToCart(product, 'unidade', 1);
                  setAddedMsg(`${bebida.nome} adicionada ao carrinho`);
                  setTimeout(() => setAddedMsg(null), 2000);
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Adicionar ao carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>

      <Snackbar message={addedMsg} />
    </View>
  );
}


// Objeto de estilos para os componentes da tela
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    backgroundColor: '#f5f5f5', // Cor de fundo clara
  },
  header: {
    backgroundColor: '#d32f2f', // Fundo vermelho
    padding: 20,
    alignItems: 'center', // Centraliza o conteúdo
  },
  headerTitle: {
    fontSize: 28, // Tamanho grande para o título
    fontWeight: 'bold', // Negrito
    color: '#fff', // Branco
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  bebidaList: {
    padding: 15, // Espaçamento interno
  },
  bebidaCard: {
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 15, // Espaço entre os cards
    flexDirection: 'row', // Imagem e info lado a lado
    overflow: 'hidden',
    elevation: 3, // Sombra (Android)
    shadowColor: '#000', // Cor da sombra (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bebidaImage: {
    width: 120,
    height: 120,
  },
  bebidaInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  bebidaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bebidaDescricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bebidaPreco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f', // Vermelho
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#d32f2f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start'
  },
  snackbar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  snackbarText: { color: '#fff' },
});
