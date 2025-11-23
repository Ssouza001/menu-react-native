import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// Importa os ícones
import { FontAwesome, Ionicons } from "@expo/vector-icons"; 

export default function RootLayout() {
  const router = useRouter();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#d32f2f" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#d32f2f",
        drawerLabelStyle: { fontSize: 18 },
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            
            {/* Ícone da Pizza */}
            <Ionicons
              name="pizza"
              size={28}
              color="#fff"
              style={{ marginRight: 10 }}
            />
            
            {/* Título */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Pizzaria Delícia
            </Text>
          </View>
        ),
        // Ícone do Carrinho
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push("/carrinho")} 
            style={{ marginRight: 15 }}
          >
            <FontAwesome name="shopping-cart" size={24} color="#fff" />
          </TouchableOpacity>
        ),
      }}
    >
      
      {/* 1. TELA DO CARDÁPIO (NOME BONITO) */}
      {/* 'drawerLabel' define o texto "Cardápio" */}
      <Drawer.Screen
        name="(cardapio)" // <--- Esta 'name' DEVE corresponder à pasta "app/(cardapio)"
        options={{
          drawerLabel: "Cardápio",
          title: "Cardápio",
        }}
      />

      {/* 2. TELA DO CARRINHO (NOME BONITO) */}
      <Drawer.Screen
        name="carrinho"
        options={{
          drawerLabel: "Carrinho",
          title: "Carrinho",
        }}
      />

      {/* --- CORREÇÃO: ESCONDENDO OS NOMES FEIOS --- */}

      {/* 3. Esconde a tela "índice" (app/index.tsx) */}
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' }, // ESCONDE DO MENU
          title: "Início",
        }}
      />
      
      {/* 4. Esconde a tela "Ops!" (app/Ops!.tsx) */}
      <Drawer.Screen
        name="Ops!" // Mude se o nome do seu arquivo for "Ops.tsx"
        options={{
          drawerItemStyle: { display: 'none' }, // ESCONDE DO MENU
        }}
      /> 
    </Drawer>
  );
}