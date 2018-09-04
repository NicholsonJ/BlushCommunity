document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('IronGenerator JS imported successfully!');
  },
  false
);

// var productType = [],
// var product =[];
//   initial = "";
//   $('div.tags').find('input:checked').each(function() {
//     if (($.inArray($(this).attr('value'), product)) === -1) {
//       product.push($(this).attr('value'));
//     }})

//     console.log("array test ",product);


  $(".r").click(function() {     
        let product = $("input[name=products]:checked").val();
        console.log(product)
        
  });
