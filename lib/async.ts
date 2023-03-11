export const delay = (time: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(1), time);
  });
