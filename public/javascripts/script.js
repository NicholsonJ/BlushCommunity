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
  event.preventDefault();
  console.log('button clicked');
  const selfie_data = $this.id;

  const user_data = $this.user;
  // const newLike = {
  //   _user:
  // }
  console.log('data: ' + selfie_data);
  console.log('user: ' + user_data);
  axios.post('http://localhost:3000/likes/new').then(response => {
    console.log(response);

    // $.post('../../models/Likes.js', { _selfie: selfie_data, _user: user_data }, function(json) {
    //   Likes.create(productsToCreate).then(productsFromDb => {
    //     console.log(productsFromDb.length + ' products were created');
    //   });
    // });
  });
}

// document.getElementById("character-form").onsubmit = function() {
//   event.preventDefault();

//   const characterInfo = {
//     name: document.getElementById("the-name-input").value,
//     occupation: document.getElementById("the-occupation-input").value,
//     weapon: document.getElementById("the-weapon-input").value
//   };

//         // const newCharacterHtml = `
//         // <li>
//         //   <h3> ${response.data.name} </h3>
//         //   <p> Id: ${response.data.id} </p>
//         // </li>
//         // `;
//         // document.getElementById("characters-list").innerHTML += newCharacterHtml;
//     })
//     .catch(error => {
//         console.log(error)
//     })
// });
