document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

function likeThis($this) {
  console.log('button clicked');
  const selfie_data = $this.id;
  // $this.parent().css('background-color: red');
  console.log('data: ' + selfie_data);
  // console.log('user: ' + user_data);
  axios.post('/like/new', { selfie_data: selfie_data }).then(response => {
    console.log(response);
  });
}

function addToMyCollection($this) {
  console.log('button clicked');
  const addProduct = $this.id;
  console.log('data: ' + addProduct);
  // console.log('user: ' + user_data);
  axios.post('/collection/new', { addProduct: addProduct }).then(response => {
    console.log(response);
  });
}


// function delete($this) {
// console.log('delete button clicked')
// const selfie_data = $this.id;
// axios.post('/delete', { selfie_data: selfie_data }).then(response => {
//   console.log(response);
// });
// }
