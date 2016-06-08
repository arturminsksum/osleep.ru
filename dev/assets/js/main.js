 $(document).ready(function() {
    if (document.body.clientWidth < 900  && document.body.clientWidth>767) {
     $('.hit-sales__wrap').liquidCarousel({
         height: 340, 
         duration: 100, //the duration of the animation
         slideMargin: 20,
         hidearrows: true //hide arrows if all of the list items are visible
     });
    }
     if (document.body.clientWidth <= 767) {
     $('.hit-sales__wrap').liquidCarousel({
         height: 250, 
         duration: 100, //the duration of the animation
         slideMargin: 20,
         hidearrows: true //hide arrows if all of the list items are visible
     });
    }   
 });

 (function() {
     $('.sub-menu-wrap').outerWidth($(".drop-wrap").outerWidth() * 0.65);
 })();

 $(".h-mobile__toggle").on('click', function() {
     $(".fa-bars").toggleClass("active");
     $(".top-menu").fadeToggle(300);
 });

 $(".form-filter__title").on('click', function() {
     $(this).toggleClass("opened");
     $(".form-filter__wrap, .btn-wrap").toggle(300);
 });
 $(".sort__title").on('click', function() {
     $(this).toggleClass("opened");
     $(".sort-wrap").fadeToggle(300);
 });

     $('.review-card__title').on('click', function() {
         $(this).toggleClass('_active');
         $('.form__reviews, .comment__wrap').fadeToggle('slow');
     });
 // range Slider

 var snapSlider = document.getElementById('slider-snap');

 var inputNumberLower = document.getElementById('input-number-lower');
 var inputNumberUpper = document.getElementById('input-number-upper');

 if (inputNumberLower && inputNumberUpper) {

     noUiSlider.create(snapSlider, {
         start: [inputNumberLower.value, inputNumberUpper.value],
         // step: 1000,
         margin: 10000,
         connect: true,
         range: {
             'min': 5000,
             'max': 100000
         }
     });

     var snapValues = [
         document.getElementById('slider-snap-value-lower'),
         document.getElementById('slider-snap-value-upper')
     ];

     snapSlider.noUiSlider.on('update', function(values, handle) {
         snapValues[handle].innerHTML = Math.round(values[handle]);
     });


     snapSlider.noUiSlider.on('update', function(values, handle) {

         var value = values[handle];

         if (handle) {
             inputNumberUpper.value = value;
         } else {
             inputNumberLower.value = value;
         }
     });

     inputNumberLower.addEventListener('change', function() {
         snapSlider.noUiSlider.set([this.value, null]);
     });

     inputNumberUpper.addEventListener('change', function() {
         snapSlider.noUiSlider.set([null, this.value]);
     });

 }
 // //сортировка
 // $('p.sort').on('click','a', function(){
 //     var sortingBy = $(this).data('sort');
 //     $(this).find('i._up') ? sortingAs = 'DESC' : sortingAs = 'ASC';
 //     console.log('выполняем сортировку по полю '+sortingBy+' методом '+sortingAs);
 //     return false;
 // });

 $('.checkbox__input[name="range"]').on('change', function() {
     var checked = $('.checkbox__input[name="range"]:checked');
     var checkMin = checked.eq(0).data('chmin') || 0;
     var checkMax = checked.eq(0).data('chmax') || 100000;
     checked.each(function(i, elem) {
         if ($(this).data('chmin') < checkMin) {
             checkMin = $(this).data('chmin');
         }
         if ($(this).data('chmax') > checkMax) {
             checkMax = $(this).data('chmax');
         }
     });
     // console.log(checkMin,checkMax);
     snapSlider.noUiSlider.set([checkMin, checkMax]);
 });

 $('.noUi-handle').on('mousedown', function() {
     $('.checkbox__input[name="range"]:checked').removeAttr('checked');
 });


 $(document).ready(function() {

     $(".form-filter__more").on('click', function() {
         $(this).toggleClass('_open');
         $('.form-filter__item_hidden').toggle('slow');
     });

     $('.prod-list__rating').raty({
         half: true,
         readOnly: true,
         score: 3
     });
     $('.card-prod__rating').raty({
         half: true,
         readOnly: true,
         score: 3.5
     });
     $('.get-rate').raty({
         half: true
     });

     $('.flexslider').flexslider({
         animation: "slide",
         animationLoop: false,
         controlNav: "thumbnails"
     });

     // $(".slider__see-more").on('click', function() {
     //     $(".flex-control-nav").toggle(300);
     // });

     // basket
     function calcSum() {
         var sum = 0;
         $('.b-basket__amount').each(function(i, elem) {
             sum = sum + (+$(this).text());
         });
         $('.b-basket__sum').text(sum);
     }


     $('.b-minus').on('click', function() {
         var price = +$(this).parents('.b-basket__tr_prod').find('.b-basket__price').text();
         var result = +$(this).next('.b-result').text();
         if (result !== 1) {
             result--;
             $(this).next('.b-result').text(result);
             var amount = price * result;
             $(this).parents('.b-basket__tr_prod').find('.b-basket__amount').text(amount);
             calcSum();
         }

     });

     $('.b-plus').on('click', function() {
         var price = +$(this).parents('.b-basket__tr_prod').find('.b-basket__price').text();
         var result = +$(this).prev('.b-result').text();
         result++;
         $(this).prev('.b-result').text(result);
         var amount = price * result;
         $(this).parents('.b-basket__tr_prod').find('.b-basket__amount').text(amount);
         calcSum();
     });



     // validateForm

function validateForm(dir) {
         var form = dir;
         var name, phone;
         var error = [];
         // var checking;
         form.find('.errortext').html('');
         name = form.find('[name="f_name"]').val();
         phone = form.find('[name="f_phone"]').val();
         if (name === '') {
             error.push('Введите имя*');
         } else
         if (!/[А-Яа-яЁёa-zA-Z`\s]{1,100}/.test(name)) {
             error.push('Правильно введите имя');
         }
         if (phone === '') {
             error.push('Введите телефон*');
         } else
         if (!/[0-9()-\s+]{3,20}/.test(phone)) {
             error.push('Правильно введите телефон');
         }
         if (error.length > 0) {
             $.each(error, function() {
                 form.find('.errortext').append(this + '<br>');
             });
             return false;

         }
         return true;
}
    // cart-form
     $('#form_cart').on('submit', function(e) {
        var valid = validateForm($(this));
        if(!valid){
            return false;
        }
        //after request
         $('.b-basket__table, .form__cart').hide('fast');
         $('.letter').show('fast');
        // return false;
     });

    // contacts-form
     $('#form_contacts').on('submit', function(e) {
        var valid = validateForm($(this));
        if(!valid){
            return false;
        }
        //after request
         $('.form__contacts').hide('fast');
         $('.letter').show('fast');
        // return false;
     });

     $('#form_quick').on('submit', function(e) {
        var valid = validateForm($(this));
        if(!valid){
            return false;
        }
        //after request
         $('.quick').remove();
         $('.popUp__window_quick .message').show('fast');
        // return false;
     });

     // form__reviews

     $('#form_reviews').on('submit', function() {
         var form = $(this);
         var name, comment;
         var error = [];
         form.find('.errortext').html('');
         name = form.find('[name="f_name"]').val();
         comment = form.find('[name="f_text"]').val();
         if (name === '') {
             error.push('Введите имя*');
         }
         if (comment === '') {
             error.push('Введите отзыв*');
         }
         if (error.length > 0) {
             $.each(error, function() {
                 form.find('.errortext').append(this + '<br>');
             });
             return false;
         }
        //after request
         openModal('comment');
         form[0].reset();
         // return false;
     });

     // pop-up
     var target;

     $('.data-action').on('click', function() {
         console.log('open by');
         target = $(this);
         var dataType = $(this).attr('data-type');
         // var productNames = [];
         // if (dataType == 'prod') {
         //     var option = $('select.card-prod__value_select option:selected');
         //     productNames.push($('h1.card-prod__title._d-ib').text());
         //     var productId = $('div.popUp_quick form input[name="form[id]"]').val();

         //     var price = $('div.card-prod__bottom span.price-new').html();
         //     var oldPrice = $('div.card-prod__bottom span.price-old').html();
         //     var economy = null;
         // } else {
         //     $.each($(this).parents('div.section').find('div.prod-list'), function(index, value) {
         //         productNames.push($(value).find('p.prod-list__prod-name').text());
         //     });
         //     var productId = $(this).attr('data-pack-id');
         //     var price = $(this).attr('data-price');
         //     var oldPrice = $(this).attr('data-old-price');
         //     var economy = $(this).attr('data-economy');
         // }
         // //подставляем значения в popUp_quick
         // $('div.popUp_quick .quick__prod').html('');
         // $('div.popUp_quick .quick__price').html('');
         // $.each(productNames, function(index, value) {
         //     $('div.popUp_quick .quick__prod').append('<p class="quick__name">' + value + '</p>');
         // });

         // if (oldPrice) {
         //     $('div.popUp_quick .quick__price').append('<p class="price-old price-old_economy">' + oldPrice + ' Р</p>');
         // }
         // $('div.popUp_quick .quick__price').append('<p class="price-new price-new_economy">' + price + ' Р</p>');
         // if (economy) {
         //     $('div.popUp_quick .quick__price').append('<p class="economy__text">Вы сэкономили<br>' + economy + ' руб</p>');
         // }
         // $('div.popUp_quick form input[name="form[type]"]').val(dataType);
         // $('div.popUp_quick form input[name="form[id]"]').val(productId);

         //console.log(dataType+'|'+productId+'|'+price+'|'+oldPrice+'|'+economy);
         // console.log(productNames);
         var type = $(this).data('action');
         openModal(type);
     });

     $('.popUp__modal').on('click', function(e) {
         var type = $(this).parents('.popUp').data('type');
         var target = $(e.target);
         if (!target.parents().hasClass('popUp__window') && !target.hasClass('popUp__window')) {
             closeModal(type);
         }
     });

     $('.popUp__window__close').on('click', function() {
         var type = $(this).parents('.popUp').data('type');
         closeModal(type);
     });

     function openModal(type) {
         var modal = $('.popUp[data-type="' + type + '"]');
         modal.find('.popUp__modal, .popUp__window').fadeIn('fast');
     }

     function closeModal(type) {
         var modal = $('.popUp[data-type="' + type + '"]');
         modal.find('.popUp__modal, .popUp__window').fadeOut('fast');
         // clear form__feedback
         if (type === 'feedback') {
             $('.popUp__window_feedback .message').hide('fast');
             $('.form__feedback').show('fast');
             $('#form__feedback')[0].reset();
         }
     }

     // close pop-up ESC
     $(document).keyup(function(e) {
         if (e.keyCode == 27) {
             $('.popUp__modal, .popUp__window').fadeOut('fast');
         }
     });

     // order__one-click
     $('#addBasket').on('click', function() {
         $('.order').hide('fast');
         $('.product-add').show('fast');
     });

     // close product-add
     $('#shopping').on('click', function() {
         $('.popUp__modal, .popUp__window').fadeOut('fast');
     });
     $('#orderClick').on('click', function() {
         var type = $(this).parents('.popUp').data('type');
         closeModal(type);
         openModal('quick');
     });

     // hide placeholder textarea

     $('textarea').on('focus', function() {
         placeholderValue = $(this).attr('placeholder');
         $(this).attr('placeholder', '');
     }).on('blur', function() {
         $(this).attr('placeholder', placeholderValue);
     });

     //удаление из корзины

     $(".confirm__yes").on('click', function() {

         if ($('.b-basket__table .b-basket__tr_prod').length === 1) {
             target.parents('.b-basket__table').remove();
             $('.client-form').remove();
             $('.b-basket').append('<p class="letter__title">Ваша корзина пуста</p>');
         } else {
             target.parents('.b-basket__tr_prod').remove();
         }
         calcSum();
         closeModal('delete');

     });

     // $('table.b-basket__table .fa-times').on('click', function() {
     //     if (confirm("Удалить из корзины?")) {
     //         //отправка запроса
     //         $.ajax({
     //             url: '/del-from-cart',
     //             type: 'POST',
     //             data: {
     //                 productId: $(this).attr('data-id'),
     //                 dataType: $(this).attr('data-type')
     //             },
     //             dataType: 'json',
     //             success: function(data) {
     //                 console.log(data);
     //                 alert('Нажмите F5 и элемент удалится из корины!');
     //             }
     //         });
     //     }
     // });
     $('.show-table').on('click', function() {
         $(this).toggleClass('_active');
         $('.sticky-table').toggle('slow');
     });

     $('.sort__item').on('click', function() {

         $('.sort__desc').removeClass('_act');
         $(this).children('.sort__desc').addClass('_act');

         if ($(this).children().hasClass('sort__icon')) {
             $(this).children('.sort__icon').toggleClass('_up');
         }
         if ($(this).hasClass('_reset')) {
             $('.sort__icon').removeClass('_up');
         }
         if ($(this).hasClass('_price')) {
             $('._name').children('.sort__icon').removeClass('_up');
         }
         if ($(this).hasClass('_name')) {
             $('._price').children('.sort__icon').removeClass('_up');
         }
     });

});