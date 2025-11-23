
// Importa componentes do React Native:
// View: container genérico
// Text: exibe textos
// StyleSheet: cria estilos
// ScrollView: permite rolagem
// Image: exibe imagens
// TouchableOpacity: botão que pode ser pressionado
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Importa o hook useState do React para gerenciar estados
import { useState } from 'react';

// Função principal do componente de pizzas
export default function PizzasScreen() {
  // Lista de pizzas, cada uma com id, nome, descrição, preços por tamanho e imagem
  const pizzas = [
    {
      id: 1,
      nome: 'Marguerita',
      descricao: 'Molho de tomate, mussarela e manjericão',
      precos: {
        pequena: 25.00,
        media: 35.00,
        grande: 45.00
      },
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNwmEJNIEA6au57qmY_YBHD9jWZKD039pqg&s'
    },
    {
      id: 2,
      nome: 'Calabresa',
      descricao: 'Molho de tomate, mussarela e calabresa',
      precos: {
        pequena: 28.00,
        media: 38.00,
        grande: 48.00
      },
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARDAerKioZxW6TKiKAPVWqDZPMCmplzG01Q&s'
    },
    {
      id: 3,
      nome: 'Portuguesa',
      descricao: 'Presunto, ovos, cebola, azeitona e mussarela',
      precos: {
        pequena: 32.00,
        media: 42.00,
        grande: 52.00
      },
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1irSvwUAi9ifAD-mOqwjx4B231RYUZE8bRw&s'
    },
    {
      id: 4,
      nome: 'Quatro Queijos',
      descricao: 'Mussarela, gorgonzola, provolone e parmesão',
      precos: {
        pequena: 35.00,
        media: 45.00,
        grande: 55.00
      },
      imagem: 'https://redefoodservice.com.br/wp-content/uploads/2023/07/Pizza-Quatro-Queijos.jpg'
    },
    {
      id: 5,
      nome: 'Frango com Catupiry',
      descricao: 'Frango desfiado, catupiry e mussarela',
      precos: {
        pequena: 30.00,
        media: 40.00,
        grande: 50.00
      },
      imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/ada34cd2101afafaba465aad112ee3c1_XL.jpg'
    },
    {
      id: 6,
      nome: 'Pepperoni',
      descricao: 'Molho de tomate, mussarela e pepperoni',
      precos: {
        pequena: 38.00,
        media: 48.00,
        grande: 58.00
      },
      imagem: 'https://www.galbani.com.br/wp-content/uploads/2025/04/image-51.jpeg'
    }
  ];

  // Estado para armazenar o tamanho selecionado de cada pizza
  const [tamanhosSelecionados, setTamanhosSelecionados] = useState({});


  // Função para selecionar o tamanho de uma pizza
  // Atualiza o estado tamanhosSelecionados
  const selecionarTamanho = (pizzaId, tamanho) => {
    setTamanhosSelecionados({
      ...tamanhosSelecionados,
      [pizzaId]: tamanho
    });
  };


  // Retorna o tamanho selecionado para uma pizza (padrão: média)
  const getTamanhoSelecionado = (pizzaId) => {
    return tamanhosSelecionados[pizzaId] || 'media';
  };


  // O componente retorna uma ScrollView (permite rolar a tela)
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho da tela de pizzas */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nossas Pizzas</Text>
        <Text style={styles.headerSubtitle}>Feitas com ingredientes frescos</Text>
      </View>

      {/* Lista de pizzas */}
      <View style={styles.pizzaList}>
        {/* Para cada pizza na lista, cria um card */}
        {pizzas.map((pizza) => {
          const tamanhoAtual = getTamanhoSelecionado(pizza.id);
          const precoAtual = pizza.precos[tamanhoAtual];

          return (
            <View key={pizza.id} style={styles.pizzaCard}>
              {/* Exibe a imagem da pizza */}
              <Image source={{ uri: pizza.imagem }} style={styles.pizzaImage} />
              {/* Informações da pizza: nome, descrição, tamanhos e preço */}
              <View style={styles.pizzaInfo}>
                <Text style={styles.pizzaNome}>{pizza.nome}</Text>
                <Text style={styles.pizzaDescricao}>{pizza.descricao}</Text>

                {/* Botões para selecionar o tamanho da pizza */}
                <View style={styles.tamanhoContainer}>
                  {/* Botão para tamanho P */}
                  <TouchableOpacity
                    style={[
                      styles.tamanhoButton,
                      tamanhoAtual === 'pequena' && styles.tamanhoButtonAtivo
                    ]}
                    onPress={() => selecionarTamanho(pizza.id, 'pequena')}
                  >
                    <Text style={[
                      styles.tamanhoTexto,
                      tamanhoAtual === 'pequena' && styles.tamanhoTextoAtivo
                    ]}>P</Text>
                  </TouchableOpacity>

                  {/* Botão para tamanho M */}
                  <TouchableOpacity
                    style={[
                      styles.tamanhoButton,
                      tamanhoAtual === 'media' && styles.tamanhoButtonAtivo
                    ]}
                    onPress={() => selecionarTamanho(pizza.id, 'media')}
                  >
                    <Text style={[
                      styles.tamanhoTexto,
                      tamanhoAtual === 'media' && styles.tamanhoTextoAtivo
                    ]}>M</Text>
                  </TouchableOpacity>

                  {/* Botão para tamanho G */}
                  <TouchableOpacity
                    style={[
                      styles.tamanhoButton,
                      tamanhoAtual === 'grande' && styles.tamanhoButtonAtivo
                    ]}
                    onPress={() => selecionarTamanho(pizza.id, 'grande')}
                  >
                    <Text style={[
                      styles.tamanhoTexto,
                      tamanhoAtual === 'grande' && styles.tamanhoTextoAtivo
                    ]}>G</Text>
                  </TouchableOpacity>
                </View>

                {/* Exibe o preço da pizza conforme o tamanho selecionado */}
                <Text style={styles.pizzaPreco}>
                  R$ {precoAtual.toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
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
});
