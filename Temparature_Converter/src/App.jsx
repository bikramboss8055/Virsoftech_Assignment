import React, { useState } from "react";
import { Input, Button, } from "@nextui-org/react";

export default function App() {
  const [data, setData] = useState('')
  const [val, setVal] = useState('celsius')
  const [result, setResult] = useState('');

  function getData(e) {
    setData(e.target.value);

  }
  function getValue(e) {
    setVal(e.target.value)
    
  }

  const convertToCelsius = () => {
    const value = parseFloat(data);
    if (isNaN(value)) {
      setResult('ERROR: Please enter a valid number.');
      return;
    }

    if(val==='celsius'){
      setResult(`${value}°C is equal to ${value}°C`)
    }else{
      setResult(`${value}°F is equal to ${((value - 32) * 5 / 9).toFixed(2)}°C`)
    }

   
  };

  const convertToFahrenheit = () => {
    
    const value = parseFloat(data);
    if (isNaN(value)) {
      setResult('ERROR: Please enter a valid number.');
      return;
    }
    if(val==='farenheit'){
      setResult(`${value}°F is equal to ${value}°F`)
    }else{
      setResult(`${value}°C is equal to ${((value * 9 / 5) + 32).toFixed(2)}°F`);
    }

  };

  return (
  <div
    className="flex justify-center mt-10"
  >
    <div className="h-96 flex flex-col justify-between items-center p-2 border border-black rounded-xl bg-gray-400">
    <p className="text-white text-xl">Temperature Converter</p>
      <div className="flex gap-1">
        <Input type="text" label="Enter a value"
          className="w-[220px]"
          color={'primary'}
          variant={'bordered'}
          borderColor={"primary"}
          onChange={getData} />
        <select
          className="border-2 rounded-xl "
          onChange={getValue}
        >
          <option value='celsius'>Celsius</option>
          <option value='farenheit'>Farenheit</option>
        </select>
      </div>
      
      <div className=" flex gap-1">
        <Button color="primary"
          onClick={convertToCelsius}
        >
          Convert to Celsius
        </Button>
        <Button color="primary"
          onClick={convertToFahrenheit}>
          Convert to Fahrenheit
        </Button>
      </div>
      <div className="w-full">
      <p className="text-white">Result:</p>
      {result? <h1 className="h-16 border-2 rounded-xl p-1">{result}</h1>:<div className="h-16 border-2 rounded-xl p-1"></div>}
     

      </div>
    </div>
    </div>
  );
}
