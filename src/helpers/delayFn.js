export default async function delayFn(delay) {
  return await new Promise((res) => setTimeout(res, delay))
}
