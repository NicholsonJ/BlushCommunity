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
  console.log('data: ' + selfie_data);
  // console.log('user: ' + user_data);
  axios.post('http://localhost:3000/likes/new', { selfie_data: selfie_data }).then(response => {
    console.log(response);
  });
}
