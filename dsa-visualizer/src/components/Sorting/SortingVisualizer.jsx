import React from "react";
import { useState } from "react";
import {BubbleSort} from './BubbleSort.jsx';
import { SelectionSort } from "./SelectionSort.jsx";
import { InsertionSort } from "./InsertionSort.jsx";
import { MergeSort } from "./MergeSort.jsx";
import { QuickSort } from "./QuickSort.jsx";
import { useRef, useEffect } from "react";


export function SortingVisualizer(){
    const [array,setArray] = useState([]);
    const [len, setLen] = useState(0);
    const [mini,setMini] = useState(0);
    const [maxi,setMaxi] = useState(0);
    const [highlightedIndices, setHighlightedIndices] = useState([]);
    const [notes, setNotes] = useState("");
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(1000); 
    const [isSorting, setIsSorting] = useState(false);


    const shouldStopRef = useRef(false);

    const originalArrayRef = useRef([]);

    // useEffect(() => {const initial = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
    //   setArray(initial);
    //   originalArrayRef.current = initial; 
    // }, []);
    const pauseRef = useRef(isPaused);
    useEffect(() => {pauseRef.current = isPaused;}, [isPaused]);

    const speedRef = useRef(speed);
    useEffect(() => {speedRef.current = speed;}, [speed]);
    const wait = () => new Promise(resolve => setTimeout(resolve, speedRef.current));

    const handleReset = () => {
      shouldStopRef.current = true;
      pauseRef.current = false;
      setArray([...originalArrayRef.current]);   
      setHighlightedIndices([]);               
      setNotes("");                            
      pauseRef.current = false;                 
    };


    function handleGenerate(){
        const newArr = generate(len,mini,maxi);
        setArray(newArr);
        originalArrayRef.current = [...newArr]
    }
    function generate(length = 10, min = 0, max = 10){
        if(length < 1 || !Number.isInteger(length)){
          setNotes(`Invalid length. The length of array should be atleast 1`);
            return [];
        }
        if(min > max ) {
          setNotes(`Invalid Max Value!`)
          return [];}
        const newRandomArray = [];
        for(let i = 0 ; i < length; i++){
            const RandomNum = Math.floor(Math.random() * (max-min + 1)) + min;
            newRandomArray.push(RandomNum);
        }
        return newRandomArray;
    }
    const normalized = array.map((val) => {
        const range = maxi - mini || 1;
        const scale = (val - mini) / range;
        return 20 + scale * 80; 
        });

    
    return (<div className="sortingVisualiser-container">
   <div className="input-container">
    <label>Length:</label>
     <input type="number" step = '1' min="1" max="20"value={len} onChange={(e) => setLen(parseInt(Number(e.target.value)))} />
     <label>Min:</label>
    <input type="number" min="-100" max="100" value={mini} onChange={(e) => setMini(parseInt(Number(e.target.value)))} />
     <label>Max:</label>
     <input type="number" min="-100" max="100"value={maxi} onChange={(e) => setMaxi(parseInt(Number(e.target.value)))} />
   </div>
       <div className="control-panel">
  <button onClick={handleGenerate}>Generate</button>
   <button disabled={!isSorting} onClick={() => setIsPaused(prev => !prev)}>
   {isPaused ? "Play ▶️" : "Pause ⏸️"}</button>
   <button onClick={handleReset}>Reset</button>
   <div className="slider-container">
     <label>⏱️ Speed:</label>
     <input type="range"min="100" max="3000"step="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))}
    />
    <span>{speed} ms</span>
  </div>

</div>
    <div className="algorithm-container-wrapper">
  <div className="algorithm-container">
  <button disabled={isSorting||array.length === 0 || len < 1 || len > 20} onClick={() =>{shouldStopRef.current = false;setIsSorting(true);BubbleSort(array, setArray,setHighlightedIndices,setNotes,wait,pauseRef,shouldStopRef).then(() => setIsSorting(false)).catch(() => setIsSorting(false));}}>Bubble Sort</button>
  <button disabled={isSorting||array.length === 0 || len < 1 || len > 20} onClick={() => {shouldStopRef.current = false;setIsSorting(true);SelectionSort(array, setArray,setHighlightedIndices,setNotes,wait,pauseRef,shouldStopRef).then(() => setIsSorting(false)).catch(() => setIsSorting(false));}}>Selection Sort</button>
  <button disabled={isSorting||array.length === 0 || len < 1 || len > 20} onClick={() => {shouldStopRef.current = false;setIsSorting(true);InsertionSort(array, setArray,setHighlightedIndices,setNotes,wait,pauseRef,shouldStopRef).then(() => setIsSorting(false)).catch(() => setIsSorting(false));}}>Insertion Sort</button>
  <button disabled={isSorting||array.length === 0 || len < 1 || len > 20} onClick={() => {shouldStopRef.current = false;setIsSorting(true);MergeSort(array, setArray,setHighlightedIndices,setNotes,wait,pauseRef,shouldStopRef).then(() => setIsSorting(false)).catch(() => setIsSorting(false));}}>Merge Sort</button>
  <button disabled={isSorting||array.length === 0 || len < 1 || len > 20} onClick={() => {shouldStopRef.current = false;setIsSorting(true);QuickSort(array, setArray,setHighlightedIndices,setNotes,wait,pauseRef,shouldStopRef).then(() => setIsSorting(false)).catch(() => setIsSorting(false));}}>Quick Sort</button>
 </div></div>
<div className="bar-box">
  <div className="bar-container">
    {normalized.map((val, index) => (
      <div
        key={index}
        className={highlightedIndices.includes(index) ? "highlighted" : "bar"}
        style={{height: highlightedIndices.includes(index) ?`${val*1.5}px`:`${val}px`}}
      >
        <span className="bar-value">{array[index]}</span>
      </div>
    ))}
  </div>
    <div className="mx-auto my-4 max-w-xl rounded-xl bg-white p-4 shadow-lg text-center text-base italic text-gray-700">{notes}</div>

</div>
</div>)
}