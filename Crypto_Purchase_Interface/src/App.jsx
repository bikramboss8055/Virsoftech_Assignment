import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  Input,
  Button,
  VStack,
  Text,
  CloseButton,
  useToast,
  Heading,
} from "@chakra-ui/react";

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [quantities, setQuantities] = useState({});
  const toast = useToast();

  useEffect(() => {
    fetchCryptocurrencies();
  }, []);

  const fetchCryptocurrencies = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cryptocurrency data');
      }

      const data = await response.json();
      setCryptocurrencies(data);
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
    }
  };

  const handleQuantityButtonClick = (crypto) => {
    // Set the selected cryptocurrency for quantity input
    setSelectedCrypto(crypto);
  };

  const handleBuyButtonClick = () => {
    if (!selectedCrypto || isNaN(quantities[selectedCrypto.id]) || quantities[selectedCrypto.id] <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity greater than 0.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const existingItemIndex = cart.findIndex((item) => item.id === selectedCrypto.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += parseInt(quantities[selectedCrypto.id]);
      updatedCart[existingItemIndex].total += selectedCrypto.current_price * parseInt(quantities[selectedCrypto.id]);
      updatedCart[existingItemIndex].total = parseFloat(updatedCart[existingItemIndex].total.toFixed(2));
      setCart(updatedCart);
    } else {
      const newItem = {
        id: selectedCrypto.id,
        name: selectedCrypto.name,
        quantity: parseInt(quantities[selectedCrypto.id]),
        total: selectedCrypto.current_price * parseInt(quantities[selectedCrypto.id]),
      };
      newItem.total = parseFloat(newItem.total.toFixed(2));
      setCart([...cart, newItem]);
    }

    setSelectedCrypto(null);

    const updatedQuantities = { ...quantities };
    updatedQuantities[selectedCrypto.id] = '';
    setQuantities(updatedQuantities);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    setCart(updatedCart);
  };

  const cartTotal = cart.reduce((total, item) => total + item.total, 0);

  return (
    <Box textAlign="center" p={4}>
      <Heading>Crypto Purchase Interface</Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {cryptocurrencies.map((crypto) => (
          <Box key={crypto.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontSize="xl">{crypto.name}</Text>
            <Text fontSize="lg">Price: ${crypto.current_price}</Text>
            {selectedCrypto && selectedCrypto.id === crypto.id ? (
              <>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={quantities[crypto.id] || ''}
                  onChange={(e) => {
                    const updatedQuantities = { ...quantities };
                    updatedQuantities[crypto.id] = e.target.value;
                    setQuantities(updatedQuantities);
                  }}
                  mt={2}
                />
                <Button
                  colorScheme="green"
                  size="sm"
                  mt={2}
                  onClick={handleBuyButtonClick}
                >
                  Buy
                </Button>
              </>
            ) : (
              <Button
                colorScheme="blue"
                size="sm"
                mt={2}
                onClick={() => handleQuantityButtonClick(crypto)}
              >
                Quantity
              </Button>
            )}
          </Box>
        ))}
      </Grid>

      <Box mt={6}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <Text>Your cart is empty!</Text>
        ) : (
          <VStack spacing={2} align="start">
            {cart.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                p={2}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text>{item.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Total: ${item.total.toFixed(2)}</Text>
                <CloseButton onClick={() => removeFromCart(item)} />
              </Box>
            ))}
            <Text>Total: ${cartTotal.toFixed(2)}</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
}



export default App;
