import React from "react";


export async function SelectionSort(array,setArray,setHighlightedIndices,setNotes,wait,pauseRef,shouldStopRef) {

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
    for(let i = 0; i < arr.length; i++){
        let minind = i;
        setNotes(`Initially setting minimum index to  ${minind}`);
        await checkPause(pauseRef,shouldStopRef);
        await wait();
        for(let j = i + 1; j < arr.length; j++){
            setHighlightedIndices([minind, j]);
            setNotes(`Comparing index ${minind} and ${j}`);
            await checkPause(pauseRef,shouldStopRef);
            await wait();

            if(arr[j] < arr[minind]){
                minind = j;
                setNotes(`Updating minimum index to ${minind}`);
                await checkPause(pauseRef,shouldStopRef);
                await wait();
            }

        }
        [arr[i],arr[minind]] = [arr[minind],arr[i]];
        setArray([...arr]);
        setNotes(`Swapping index ${i} and ${minind}`);
        await checkPause(pauseRef,shouldStopRef);
        await wait();
        setHighlightedIndices([]);
    }
    setNotes("Array is fully sorted! 🎉");
    await checkPause(pauseRef,shouldStopRef);
    await wait();}catch(e){
        
            setNotes("Sorting was reset.");
      setHighlightedIndices([]);

    }


}