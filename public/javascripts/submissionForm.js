document.getElementById('selfie-form').onsubmit = function() {
  // event.preventDefault();
  //let products = document.getElementById('selfie-products').value.split()
  const selfieInfo = {
    title: document.getElementById('selfie-title').value,
    image: document.getElementById('selfie-image').value,
    comment: document.getElementById('selfie-comment').value,
    products: document.getElementById('selfie-products').value
  };
  console.log(selfieInfo);
  Product.create(selfieInfo).then(productFromDb => {
    console.log(productFromDb.title + ' was added');
  });
};
