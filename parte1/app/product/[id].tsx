import { Product } from '@/types/products';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    Alert.alert('Éxito', `Producto agregado al carrito (x${quantity})`);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color='#0086a5' />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Producto no encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.categoryPill}>{product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <View style={styles.quantitySelectorContainer}>
          <TouchableOpacity
            onPress={() => setQuantity((q) => Math.max(q - 1, 1))}
            style={styles.quantityButton}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityButtonText}>Cantidad: {quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity((q) => q + 1)}
            style={styles.quantityButton}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#f2f2f2',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#000',
    lineHeight: 26,
  },
  categoryPill: {
    backgroundColor: '#e6f4f7',
    color: '#1589ad',
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  description: {
    fontSize: 15,
    textAlign: 'justify',
    marginBottom: 16,
    color: '#333',
    lineHeight: 22,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0086a5',
    marginTop: 8,
  },
  quantitySelectorContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 24,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    minHeight: 250,
    justifyContent: 'center',
  },
  doneButton: {
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#1589ad',
    borderRadius: 6,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1589ad',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
  },
});
