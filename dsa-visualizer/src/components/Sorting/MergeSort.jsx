import { React } from 'react';

export async function MergeSort(array, setArray, setHighlightedIndices, setNotes, wait, pauseRef, shouldStopRef) {
  async function checkPause(pauseRef, shouldStopRef) {
    while (pauseRef.current) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (shouldStopRef.current) {
      throw new Error("Sorting stopped");
    }
  }

  async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[left + i];
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

    let i = 0, j = 0, k = left;

    setHighlightedIndices(Array.from({ length: right - left + 1 }, (_, idx) => left + idx));
    setNotes(`Merging parts: Left = [${left}-${mid}], Right = [${mid + 1}-${right}]`);
    await checkPause(pauseRef, shouldStopRef);
    await wait();

    while (i < n1 && j < n2) {
      await checkPause(pauseRef, shouldStopRef);
      if (L[i] <= R[j]) {
        arr[k] = L[i++];
      } else {
        arr[k] = R[j++];
      }
      setArray([...arr]);
      setHighlightedIndices([k]);
      setNotes(`Inserted sorted element at index ${k}`);
      await checkPause(pauseRef, shouldStopRef);
      await wait();
      k++;
    }

    while (i < n1) {
      await checkPause(pauseRef, shouldStopRef);
      arr[k] = L[i++];
      setArray([...arr]);
      setHighlightedIndices([k]);
      setNotes(`Inserting leftover element from Left at index ${k}`);
      await checkPause(pauseRef, shouldStopRef);
      await wait();
      k++;
    }

    while (j < n2) {
      await checkPause(pauseRef, shouldStopRef);
      arr[k] = R[j++];
      setArray([...arr]);
      setHighlightedIndices([k]);
      setNotes(`Inserting leftover element from Right at index ${k}`);
      await checkPause(pauseRef, shouldStopRef);
      await wait();
      k++;
    }

    setNotes(`Merged subarray from index ${left} to ${right}`);
    await checkPause(pauseRef, shouldStopRef);
    await wait();
  }

  async function mergeSort(arr, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    setHighlightedIndices(Array.from({ length: right - left + 1 }, (_, idx) => left + idx));
    setNotes(`Dividing array at index range [${left} - ${right}] with mid at ${mid}`);
    await checkPause(pauseRef, shouldStopRef);
    await wait();

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  }
  
  try {
    const narr = [...array];
    setNotes("Starting Merge Sort...");
    await checkPause(pauseRef, shouldStopRef);
    await wait();

    await mergeSort(narr, 0, narr.length - 1);

    setArray([...narr]);
    setHighlightedIndices([]);
    setNotes("Array is fully sorted! 🎉");
    await checkPause(pauseRef, shouldStopRef);
    await wait();
  } catch (err) {
    setNotes("Sorting was reset.");
    setHighlightedIndices([]);
  }
}
