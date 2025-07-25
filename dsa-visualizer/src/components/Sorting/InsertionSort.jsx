import React from "react";

export async function InsertionSort(array,setArray,setHighlightedIndices,setNotes,wait,pauseRef,shouldStopRef,setIsSorting) {

    async function checkPause(pauseRef, shouldStopRef) {
  while (pauseRef.current) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  if (shouldStopRef.current) {
    throw new Error("Sorting stopped");
  }
}


    let arr = [...array];
    
    try{
    for(let i = 1; i < arr.length; i++){
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            setHighlightedIndices([i,j]);
           setNotes(`Comparing index ${j} and ${i}`);
           await checkPause(pauseRef,shouldStopRef);
            await wait();

            arr[j + 1] = arr[j];
            setArray([...arr]);
            setNotes(`Shifting index ${j} to ${j + 1}`);
            await checkPause(pauseRef,shouldStopRef);
            await wait();
            j = j - 1;
        }
        arr[j + 1] = key;
        setHighlightedIndices([j + 1]);
        setNotes(`Inserting ${key} to its correct position index ${j + 1}`);
        setArray([...arr]);
        await checkPause(pauseRef,shouldStopRef);
        await wait();
        setHighlightedIndices([]);
    }
    setNotes("Array is fully sorted! 🎉");
    await checkPause(pauseRef,shouldStopRef);
    await wait();
    }catch(e){

      setNotes("Sorting was reset.");
      setHighlightedIndices([]);
    
    }
}