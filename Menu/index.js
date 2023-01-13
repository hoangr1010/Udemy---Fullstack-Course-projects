const menu = [
    {
      id: 1,
      title: "buttermilk pancakes",
      category: "breakfast",
      price: 15.99,
      img: "./images/item-1.jpeg",
      desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    },
    {
      id: 2,
      title: "diner double",
      category: "lunch",
      price: 13.99,
      img: "./images/item-2.jpeg",
      desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    },
    {
      id: 3,
      title: "godzilla milkshake",
      category: "shakes",
      price: 6.99,
      img: "./images/item-3.jpeg",
      desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    },
    {
      id: 4,
      title: "country delight",
      category: "breakfast",
      price: 20.99,
      img: "./images/item-4.jpeg",
      desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
    },
    {
      id: 5,
      title: "egg attack",
      category: "lunch",
      price: 22.99,
      img: "./images/item-5.jpeg",
      desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
    },
    {
      id: 6,
      title: "oreo dream",
      category: "shakes",
      price: 18.99,
      img: "./images/item-6.jpeg",
      desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
    },
    {
      id: 7,
      title: "bacon overflow",
      category: "breakfast",
      price: 8.99,
      img: "./images/item-7.jpeg",
      desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
    },
    {
      id: 8,
      title: "american classic",
      category: "lunch",
      price: 12.99,
      img: "./images/item-8.jpeg",
      desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
    },
    {
      id: 9,
      title: "quarantine buddy",
      category: "shakes",
      price: 16.99,
      img: "./images/item-9.jpeg",
      desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
    },
  ];

var AllButton = document.querySelector('.all');
var BreakfastButton = document.querySelector('.breakfast');
var LunchButton = document.querySelector('.lunch');
var ShakeButton = document.querySelector('.shake');
var body = document.querySelector('.content-body')


const fetch_show = (data) => {
    const food_data = data.map(function (item) {
        return `<div class="col-lg-6 col-md-12 block-element">
                    <div class="row page-element">
                            
                        <img class="col-5" src="${item.img}" alt="food-image">
    
                        <div class="col">
                            <h5 class="food-name">
                                ${item.title}<h6 class="price">$${item.price}</h6>
                            </h5>
                            <hr class="underline-element">
                            <p>${item.desc}</p>
                        </div>
                        <hr>
                    </div>
                </div>`
    }) 
    
    body.innerHTML = food_data.join('')
} 

const filter = (array, keyword) => {
    var filtered_array = array.filter(function (item) {
        return item.category === keyword
    });
    return filtered_array;
}

fetch_show(menu)

AllButton.addEventListener('click', function () {
    fetch_show(menu)
})

BreakfastButton.addEventListener('click', function() {
    var filtered_array = filter(menu,'breakfast')
    fetch_show(filtered_array)
})

LunchButton.addEventListener('click', function() {
    var filtered_array = filter(menu,'lunch')
    fetch_show(filtered_array)
})

ShakeButton.addEventListener('click', function() {
    var filtered_array = filter(menu,'shakes')
    fetch_show(filtered_array)
})