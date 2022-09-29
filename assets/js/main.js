/**
* Template Name: Nova - v1.2.0
* Template URL: https://bootstrapmade.com/nova-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
getLocalStorage();

function showList(list) {
  document.getElementById("furnitureList").innerHTML = '';

  list.forEach(function (furniture) {
    let checkItem = furniture.checked ? 'checked' : null;
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.classList.add('clearfix');
    furniture.checked ? li.classList.add('checked') : '';
    let index = list.findIndex(object => {
      return object.item === furniture.item;
    });
    if (furniture.checked == true) {
      li.innerHTML =
        `<input type="checkbox" class="checkItem" id="myCheck-${index}" ${checkItem} onclick="checkFurniture(${index})">
  <span id="items-${index}" class="textInput text-decoration-line-through">${furniture.item}</span>
  <span class="pull-right">
    <button class="btn btn-dark btn-delete" id="deleteItem" onclick="deleteList(${index})">x</button>
  </span>`;
      document.getElementById("furnitureList").append(li);
    }
    else {
      li.innerHTML =
        `<input type="checkbox" class="checkItem" id="myCheck-${index}" ${checkItem} onclick="checkFurniture(${index})">
  <span id="items-${index}" class="textInput">${furniture.item}</span>
  <span class="pull-right">
    <button class="btn btn-dark btn-delete" id="deleteItem" onclick="deleteList(${index})">x</button>
  </span>`;
      document.getElementById("furnitureList").append(li);
    }
  });
}


function getLocalStorage() {
  let list = localStorage.getItem('checklist');
  furniture = JSON.parse(list);
  showList(furniture);
}

function addChecklist() {
  if (localStorage.getItem('checklist') === null) {
    document.getElementById("furnitureList").innerHTML = 'There is no data to display';
    let listFurniture = [];
    let input = document.getElementById("inputFurniture").value;
    if (input !== "") {
      let furnitureDetail = {
        item: input,
        checked: false
      };
      listFurniture.push(furnitureDetail);
      addLocalStorage(listFurniture);
      showList(listFurniture);
      document.getElementById("inputFurniture").value = "";
    }
  }
  else {
    let listFurniture = JSON.parse(localStorage.getItem('checklist'));
    let input = document.getElementById("inputFurniture").value;
    if (input !== "") {
      let furnitureDetail = {
        item: input,
        checked: false
      };
      listFurniture.push(furnitureDetail);
      addLocalStorage(listFurniture);
      showList(listFurniture);
      document.getElementById("inputFurniture").value = "";
    }
  }

}

function showAlert(message) {
  const alertDiv = document.getElementById('alertDiv');
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-dark alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  alertDiv.append(wrapper)
}

function checkFurniture(idx) {
  let listFurniture = JSON.parse(localStorage.getItem('checklist'));
  let checkBox = document.getElementById("myCheck-" + idx);
  if (checkBox.checked) {
    listFurniture[idx].checked = true;
    showAlert('Item ' + listFurniture[idx].item + ' is checked!');
  } else {
    listFurniture[idx].checked = false;
    showAlert('Item ' + listFurniture[idx].item + ' is unchecked!');
  }
  addLocalStorage(listFurniture);
  showList(listFurniture);
}

function deleteList(idx) {
  let listFurniture = JSON.parse(localStorage.getItem('checklist'));
  listFurniture.splice(idx, 1);
  addLocalStorage(listFurniture);
  showList(listFurniture);
}

function searchChecklist() {
  let listFurniture = JSON.parse(localStorage.getItem('checklist'));
  let inputSearch = document.getElementById("searchFurniture").value;
  let resultSearch = listFurniture.filter(list => {
    return list.item.includes(inputSearch);
  });
  document.getElementById("search-list").innerHTML = '';

  if (Object.keys(resultSearch).length === 0) {
    document.getElementById("search-list").innerHTML = 'There is no data to display';
  }
  else {
    resultSearch.forEach(function (furniture) {
      let li = document.createElement('li');
      li.classList.add('list-group-item');
      li.classList.add('clearfix');
      li.innerHTML = `<p>${furniture.item}</p>`;
      document.getElementById("search-list").append(li);
    });
  }

  document.getElementById("searchFurniture").value = "";
}

function addLocalStorage(list) {
  localStorage.setItem('checklist', JSON.stringify(list));
}

document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    document.addEventListener('scroll', () => {
      window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    });
  }

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function (el) {
        el.addEventListener('click', function () {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });
});

