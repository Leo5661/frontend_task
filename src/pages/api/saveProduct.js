const updateInfo = async (data) => {
  const response = await fetch("https://api-test.innoloft.com/product/6781/", {
    method: "PUT",
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export default async function SaveProduct(req, res) {
  if (req.method === "PUT") {
    try {
      const body = req.body;
      await updateInfo(body);
      res.status(200).json({ message: "Product updated successfuly!" });
    } catch (err) {
      res.status(400).json({ message: "Product updated failed!" });
    }
  } else {
    res.status(405).send({ message: "Only POST requests allowed" });
  }
}
