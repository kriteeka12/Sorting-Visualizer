export async function BubbleSort(array, setArray, setHighlightedIndices, setNotes, wait, pauseRef, shouldStopRef ) {
  async function checkPauseAndStop() {
    while (pauseRef.current) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (shouldStopRef.current) {
      throw new Error("Stopped");
    }
  }

  let arr = [...array];
  
  try {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        await checkPauseAndStop();

        setHighlightedIndices([j, j + 1]);
        setNotes(`Comparing index ${j} and ${j + 1}`);
        await wait();

        await checkPauseAndStop();

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          setNotes(`Swapping index ${j} and ${j + 1}`);
          await wait();
        }

        setHighlightedIndices([]);
        await wait();
        await checkPauseAndStop();
      }
    }

    setNotes("Array is fully sorted! 🎉");
  } catch (err) {
      setNotes("Sorting was reset.");
      setHighlightedIndices([]);
    
  }
}
