export function selectFormat(data) {
  return data.map((item) => ({
    label: item.name,
    value: item._id
  }));
}
