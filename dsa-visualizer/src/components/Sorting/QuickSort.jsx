import { React } from 'react';

export async function QuickSort(array, setArray, setHighlightedIndices, setNotes,wait,pauseRef,shouldStopRef) {
  
  async function checkPause(pauseRef, shouldStopRef) {
  while (pauseRef.current) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  if (shouldStopRef.current) {
    throw new Error("Sorting stopped"); 
  }
}


  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    setNotes(`Choosing pivot element at index ${high}: ${pivot}`);
    await checkPause(pauseRef,shouldStopRef);
    await wait();

    for (let j = low; j <= high - 1; j++) {
      setHighlightedIndices([j, high]);
      setNotes(`Comparing element at index ${j} with pivot ${pivot}`);
      await checkPause(pauseRef,shouldStopRef);
      await wait();

      if (arr[j] < pivot) {
        i++;
        setNotes(`Swapping elements at index ${i} and ${j} as ${arr[j]} < ${pivot}`);
        await swap(arr, i, j);
      }
    }

    setHighlightedIndices([i + 1, high]);
    setNotes(`Placing pivot in the correct position by swapping index ${i + 1} and ${high}`);
    await checkPause(pauseRef,shouldStopRef);
    await wait();
    await swap(arr, i + 1, high);

    setNotes(`Partitioned around pivot. Left: [${low}-${i}], Right: [${i + 2}-${high}]`);
    await checkPause(pauseRef,shouldStopRef);
    await wait();

    return i + 1;
  }

  async function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    setArray([...arr]);
    await checkPause(pauseRef,shouldStopRef);
    await wait();
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      setNotes(`Applying QuickSort on subarray [${low}-${high}]`);
      await checkPause(pauseRef,shouldStopRef);
      await wait();

      let pi = await partition(arr, low, high);

      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    } else if (low === high) {
      setNotes(`Single element at index ${low} is already sorted`);
      setHighlightedIndices([low]);
      await checkPause(pauseRef,shouldStopRef);
      await wait();
    }
  }

 let narr = [...array];
 
setNotes("Starting QuickSort...");
try {
  await checkPause(pauseRef, shouldStopRef);
  await wait();

  await quickSort(narr, 0, narr.length - 1);

  setHighlightedIndices([]);
  setNotes("Array is fully sorted! 🎉");
  await checkPause(pauseRef, shouldStopRef);
  await wait();
} catch (e) {

    setNotes("Sorting was reset.");
    setHighlightedIndices([]);

}}

