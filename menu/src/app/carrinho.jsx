import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CarrinhoPage() {
  const { items, updateQuantity, removeFromCart, clearCart, getTotal, count } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [pixKey, setPixKey] = useState('');

  const handleConfirm = () => {
    if (items.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione ao menos uma pizza ao carrinho.');
      return;
    }

    if (paymentMethod === 'cartao') {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        Alert.alert('Pagamento', 'Preencha os dados do cartão.');
        return;
      }
    }

    if (paymentMethod === 'pix' && !pixKey) {
      Alert.alert('Pagamento', 'Preencha a chave PIX.');
      return;
    }

    const total = getTotal();
    const resumo = items.map((i) => `${i.nome} (${i.size}) x${i.quantity}`).join('\n');

    Alert.alert('Compra Confirmada', `Itens:\n${resumo}\n\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`, [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
        },
      },
    ]);
  };

  const totalQty = count;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho ({totalQty} itens)</Text>
      <ScrollView style={styles.list}>
        {items.length === 0 && <Text style={styles.empty}>Seu carrinho está vazio</Text>}
        {items.map((item) => (
          <View key={`${item.id}-${item.size}`} style={styles.item}>
            <View style={{flex:1}}>
              <Text style={styles.itemName}>{item.nome} ({item.size})</Text>
              <Text style={styles.itemPrice}>R$ {(item.precos[item.size] || 0).toFixed(2).replace('.', ',')}</Text>
            </View>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))} style={styles.qtyBtn}><Text>-</Text></TouchableOpacity>
              <Text style={styles.qty}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQuantity(item.id, item.size, item.quantity + 1)} style={styles.qtyBtn}><Text>+</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id, item.size)} style={styles.remove}><Text>Remover</Text></TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.total}>Total: R$ {getTotal().toFixed(2).replace('.', ',')}</Text>

      <View style={styles.paymentSection}>
        <Text style={styles.subtitle}>Forma de pagamento</Text>
        <View style={styles.methodsRow}>
          <TouchableOpacity style={[styles.methodButton, paymentMethod === 'pix' && styles.methodActive]} onPress={() => setPaymentMethod('pix')}><Text style={paymentMethod === 'pix' ? styles.methodTextActive : styles.methodText}>PIX</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.methodButton, paymentMethod === 'cartao' && styles.methodActive]} onPress={() => setPaymentMethod('cartao')}><Text style={paymentMethod === 'cartao' ? styles.methodTextActive : styles.methodText}>Cartão</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.methodButton, paymentMethod === 'dinheiro' && styles.methodActive]} onPress={() => setPaymentMethod('dinheiro')}><Text style={paymentMethod === 'dinheiro' ? styles.methodTextActive : styles.methodText}>Dinheiro</Text></TouchableOpacity>
        </View>

        {paymentMethod === 'pix' && (
          <TextInput placeholder="Chave PIX (e-mail, CPF ou telefone)" value={pixKey} onChangeText={setPixKey} style={styles.input} />
        )}

        {paymentMethod === 'cartao' && (
          <>
            <TextInput placeholder="Número do cartão" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Nome no cartão" value={cardName} onChangeText={setCardName} style={styles.input} />
            <View style={{flexDirection:'row', gap:10}}>
              <TextInput placeholder="MM/AA" value={cardExpiry} onChangeText={setCardExpiry} style={[styles.input, {flex:1}]} />
              <TextInput placeholder="CVV" value={cardCvv} onChangeText={setCardCvv} keyboardType="numeric" style={[styles.input, {width:100}]} />
            </View>
          </>
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.clearBtn} onPress={() => clearCart()}><Text>Limpar carrinho</Text></TouchableOpacity>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}><Text style={{color:'#fff'}}>Confirmar compra</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  list: { maxHeight: 360, marginBottom: 8 },
  empty: { color: '#666', textAlign: 'center', padding: 20 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  itemName: { fontWeight: 'bold' },
  itemPrice: { color: '#d32f2f' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  qtyBtn: { padding: 6, borderWidth: 1, borderRadius: 4, borderColor: '#ccc' },
  qty: { marginHorizontal: 8, minWidth: 20, textAlign: 'center' },
  remove: { padding: 6 },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'right', marginVertical: 8 },
  paymentSection: { marginTop: 8 },
  subtitle: { fontWeight: '600', marginBottom: 6 },
  methodsRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  methodButton: { paddingVertical: 8, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 6 },
  methodActive: { backgroundColor: '#d32f2f', borderColor: '#d32f2f' },
  methodText: { color: '#333' },
  methodTextActive: { color: '#fff' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginBottom: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  clearBtn: { padding: 12, borderRadius: 6, backgroundColor: '#eee' },
  confirmBtn: { padding: 12, borderRadius: 6, backgroundColor: '#d32f2f' },
});
