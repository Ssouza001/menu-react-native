
// Importa componentes do React Native:
// View: container genérico
// Text: exibe textos
// StyleSheet: cria estilos
// ScrollView: permite rolagem
// Image: exibe imagens
// TouchableOpacity: botão que pode ser pressionado
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
// Importa o hook useState do React para gerenciar estados
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Snackbar from './snackbar';
import { useRouter } from 'expo-router';

export default function PizzasScreen() {
  return <InnerPizzas />;
}

function InnerPizzas() {
  const pizzas = [
    {
      id: 1,
      nome: 'Marguerita',
      descricao: 'Molho de tomate, mussarela e manjericão',
      precos: {
        pequena: 25.0,
        media: 35.0,
        grande: 45.0,
      },
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNwmEJNIEA6au57qmY_YBHD9jWZKD039pqg&s',
    },
    {
      id: 2,
      nome: 'Calabresa',
      descricao: 'Molho de tomate, mussarela e calabresa',
      precos: {
        pequena: 28.0,
        media: 38.0,
        grande: 48.0,
      },
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARDAerKioZxW6TKiKAPVWqDZPMCmplzG01Q&s',
    },
    {
      id: 3,
      nome: 'Portuguesa',
      descricao: 'Presunto, ovos, cebola, azeitona e mussarela',
      precos: {
        pequena: 32.0,
        media: 42.0,
        grande: 52.0,
      },
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1irSvwUAi9ifAD-mOqwjx4B231RYUZE8bRw&s',
    },
    {
      id: 4,
      nome: 'Quatro Queijos',
      descricao: 'Mussarela, gorgonzola, provolone e parmesão',
      precos: {
        pequena: 35.0,
        media: 45.0,
        grande: 55.0,
      },
      imagem: 'https://redefoodservice.com.br/wp-content/uploads/2023/07/Pizza-Quatro-Queijos.jpg',
    },
    {
      id: 5,
      nome: 'Frango com Catupiry',
      descricao: 'Frango desfiado, catupiry e mussarela',
      precos: {
        pequena: 30.0,
        media: 40.0,
        grande: 50.0,
      },
      imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/ada34cd2101afafaba465aad112ee3c1_XL.jpg',
    },
    {
      id: 6,
      nome: 'Pepperoni',
      descricao: 'Molho de tomate, mussarela e pepperoni',
      precos: {
        pequena: 38.0,
        media: 48.0,
        grande: 58.0,
      },
      imagem: 'https://www.galbani.com.br/wp-content/uploads/2025/04/image-51.jpeg',
    },
  ];

  const [tamanhosSelecionados, setTamanhosSelecionados] = useState({});
  const router = useRouter();
  const [addedMsg, setAddedMsg] = useState(null);

  const selecionarTamanho = (pizzaId, tamanho) => {
    setTamanhosSelecionados({
      ...tamanhosSelecionados,
      [pizzaId]: tamanho,
    });
  };

  const getTamanhoSelecionado = (pizzaId) => {
    return tamanhosSelecionados[pizzaId] || 'media';
  };

  const { addToCart, items } = useContext(CartContext);
  const totalQty = items.reduce((s, it) => s + (it.quantity || 0), 0);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Nossas Pizzas</Text>
          <Text style={styles.headerSubtitle}>Feitas com ingredientes frescos</Text>
        </View>

        <View style={styles.pizzaList}>
          {pizzas.map((pizza) => {
            const tamanhoAtual = getTamanhoSelecionado(pizza.id);
            const precoAtual = pizza.precos[tamanhoAtual];

            return (
              <View key={pizza.id} style={styles.pizzaCard}>
                <Image source={{ uri: pizza.imagem }} style={styles.pizzaImage} />
                <View style={styles.pizzaInfo}>
                  <Text style={styles.pizzaNome}>{pizza.nome}</Text>
                  <Text style={styles.pizzaDescricao}>{pizza.descricao}</Text>

                  <View style={styles.tamanhoContainer}>
                    <TouchableOpacity
                      style={[styles.tamanhoButton, tamanhoAtual === 'pequena' && styles.tamanhoButtonAtivo]}
                      onPress={() => selecionarTamanho(pizza.id, 'pequena')}
                    >
                      <Text style={[styles.tamanhoTexto, tamanhoAtual === 'pequena' && styles.tamanhoTextoAtivo]}>P</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.tamanhoButton, tamanhoAtual === 'media' && styles.tamanhoButtonAtivo]}
                      onPress={() => selecionarTamanho(pizza.id, 'media')}
                    >
                      <Text style={[styles.tamanhoTexto, tamanhoAtual === 'media' && styles.tamanhoTextoAtivo]}>M</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.tamanhoButton, tamanhoAtual === 'grande' && styles.tamanhoButtonAtivo]}
                      onPress={() => selecionarTamanho(pizza.id, 'grande')}
                    >
                      <Text style={[styles.tamanhoTexto, tamanhoAtual === 'grande' && styles.tamanhoTextoAtivo]}>G</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.pizzaPreco}>R$ {precoAtual.toFixed(2).replace('.', ',')}</Text>

                  <TouchableOpacity
                    style={[styles.addButton]}
                    onPress={() => {
                      addToCart(pizza, tamanhoAtual, 1);
                      setAddedMsg(`${pizza.nome} adicionada ao carrinho`);
                      setTimeout(() => setAddedMsg(null), 2000);
                    }}
                  >
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Adicionar ao carrinho</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Mensagem rápida */}
      <Snackbar message={addedMsg} />

      {/* Botão flutuante do carrinho (abre a página /carrinho) */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/carrinho')}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Carrinho ({totalQty})</Text>
      </TouchableOpacity>
    </View>
  );
}

// Objeto de estilos para os componentes da tela de pizzas
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
  pizzaList: {
    padding: 15, // Espaçamento interno
  },
  pizzaCard: {
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 15, // Espaço entre os cards
    overflow: 'hidden',
    elevation: 3, // Sombra (Android)
    shadowColor: '#000', // Cor da sombra (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pizzaImage: {
    width: '100%',
    height: 200,
  },
  pizzaInfo: {
    padding: 15,
  },
  pizzaNome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  pizzaDescricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  pizzaPreco: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f', // Vermelho
  },
  tamanhoContainer: {
    flexDirection: 'row', // Botões lado a lado
    gap: 10,
    marginVertical: 12,
  },
  tamanhoButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#d32f2f',
    backgroundColor: '#fff',
  },
  tamanhoButtonAtivo: {
    backgroundColor: '#d32f2f', // Botão ativo fica vermelho
  },
  tamanhoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  tamanhoTextoAtivo: {
    color: '#fff', // Texto branco quando ativo
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    elevation: 4,
  },
});
