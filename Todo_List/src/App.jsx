import { Box,Flex ,Input, Button, VStack, Text,Heading} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <Box textAlign="center" p={4}>
      <Heading>Todo List</Heading>
      <Flex >
        <Input
          flex="1"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
          size="lg"
        />
        <Button colorScheme="blue" size="lg" ml={2} onClick={addTask}>
          Add
        </Button>
      </Flex>

      <VStack mt={4} spacing={2}>
        {tasks.length === 0 ? (
          <Text>No tasks added yet!</Text>
        ) : (
          tasks.map((task, index) => (
            <Flex
              key={index}
              borderWidth="1px"
              borderRadius="md"
              p={3}
              justifyContent="space-between"
              alignItems="center"
              w="50%"
            >
              <Text>{task}</Text>
              <Button colorScheme="red" size="sm" onClick={() => removeTask(index)}>
                Remove
              </Button>
            </Flex>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default App
