export async function timer(time: number) {
  await new Promise((resolve) => setTimeout(resolve, time));
}
