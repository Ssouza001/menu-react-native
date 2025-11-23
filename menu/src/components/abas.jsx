
// Importa o componente Tabs do expo-router
// Tabs permite criar uma navegação por abas na parte inferior do app
import { Tabs } from 'expo-router';

// Importa os ícones Pizza e Coffee da biblioteca lucide-react-native
// Eles serão usados como ícones das abas
import { Coffee, Pizza } from 'lucide-react-native';


// Função principal que define o layout das abas
export default function TabLayout() {
  return (
    // Componente Tabs cria a navegação por abas
    <Tabs
      // screenOptions define o estilo geral das abas e do cabeçalho
      screenOptions={{
        // headerShown: true exibe o cabeçalho no topo da tela
        headerShown: true,
        // headerStyle define a cor de fundo do cabeçalho
        headerStyle: {
          backgroundColor: '#d32f2f', // vermelho
        },
        // headerTintColor define a cor dos ícones/texto do cabeçalho
        headerTintColor: '#fff', // branco
        // headerTitleStyle define o estilo do título do cabeçalho
        headerTitleStyle: {
          fontWeight: 'bold', // negrito
        },
        // tabBarActiveTintColor define a cor da aba ativa
        tabBarActiveTintColor: '#d32f2f',
        // tabBarInactiveTintColor define a cor das abas inativas
        tabBarInactiveTintColor: '#757575',
      }}>
      {/* Primeira aba: Pizzas */}
      <Tabs.Screen
        // name é o identificador interno da aba
        name="index"
        options={{
          // title: texto do cabeçalho
          title: 'Pizzaria Delícia',
          // tabBarLabel: texto exibido na aba
          tabBarLabel: 'Pizzas',
          // tabBarIcon: ícone exibido na aba
          tabBarIcon: ({ size, color }) => (
            // Ícone de pizza
            <Pizza size={size} color={color} />
          ),
        }}
      />
      {/* Segunda aba: Bebidas */}
      <Tabs.Screen
        name="bebidas"
        options={{
          title: 'Bebidas',
          tabBarLabel: 'Bebidas',
          tabBarIcon: ({ size, color }) => (
            // Ícone de café
            <Coffee size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
