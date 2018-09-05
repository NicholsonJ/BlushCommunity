document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

// $('#like').click(function() {
//   console.log('I LIKED THIS');
// });

function likeThis($this) {
  // event.preventDefault();
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
  // event.preventDefault();
  console.log('button clicked');
  const addProduct = $this.id;
  console.log('data: ' + addProduct);
  // console.log('user: ' + user_data);
  axios.post('/collection/new', { addProduct: addProduct }).then(response => {
    console.log(response);
  });
}

// function delete(selfie) {
//   const selfie_data = $this.id;
//   <button class="delete" data-id="${selfie_data}">Delete</button>
//    axios.post('http://localhost:3000/likes/new', { selfie_data: selfie_data }).then(response => {
   
// });
