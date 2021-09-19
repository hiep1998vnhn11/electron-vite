import { ref, unref } from "vue";

export default function useArray(defaultValue = [] as any[]) {
  const array = ref<any[]>(defaultValue);
  const pushArray = (value: any) => array.value.push(value);
  const unshiftArray = (value: any) => array.value.unshift(value);
  const filterArray = (cb: (arg1: any) => boolean) =>
    (array.value = array.value.filter(cb));

  const replaceArrayCB = (value: any, index: number) =>
    (array.value[index] = value);

  const replaceArray = (value: any, index: number) =>
    (array.value = [
      ...array.value.slice(0, index),
      value,
      ...array.value.slice(index + 1, array.value.length),
    ]);
  return {
    value: array,
    push: pushArray,
    unshift: unshiftArray,
    filter: filterArray,
    replace: replaceArray,
    replaceCB: replaceArrayCB,
  };
}
