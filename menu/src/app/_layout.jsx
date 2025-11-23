import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { CartProvider, CartContext } from "../context/CartContext";
import { useContext } from 'react';
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons"; 

export default function RootLayout() {
  return (
    <CartProvider>
      <RootLayoutContent />
    </CartProvider>
  );
}

function RootLayoutContent() {
  const { count } = useContext(CartContext);

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#d32f2f" },
        headerTintColor: "#fff",
        drawerActiveTintColor: "#d32f2f",
        drawerLabelStyle: { fontSize: 18 },
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="pizza" size={28} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Pizzaria Delícia</Text>
          </View>
        ),
        headerRight: () => <HeaderCartButton />,
      }}
    >
      <Drawer.Screen
        name="(cardapio)"
        options={{ drawerLabel: "Cardápio", title: "Cardápio" }}
      />

      <Drawer.Screen
        name="carrinho"
        options={{ drawerLabel: "Carrinho", title: "Carrinho" }}
      />

      <Drawer.Screen
        name="index"
        options={{ drawerItemStyle: { display: 'none' }, title: "Início" }}
      />
    </Drawer>
  );
}

function HeaderCartButton() {
  const router = useRouter();
  const { count } = useContext(CartContext); // <- CORRIGIDO

  return (
    <TouchableOpacity onPress={() => router.push('/carrinho')} style={{ marginRight: 12 }}>
      <View style={{ width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}>
        <FontAwesome name="shopping-cart" size={22} color="#fff" />
        {count > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -6,
              backgroundColor: '#fff',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: 12 }}>
              {count}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
