$(document).ready(function(){
    // слайдер 
    $('.carousel__inner').slick({
        speed: 900,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/arrow-left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/arrow-right.png"></button>'
      });

      // переключение табов
      $('ul.catalogue__tabs').on('click', 'li:not(.catalogue__tab_active)', function() {
        $(this)
          .addClass('catalogue__tab_active').siblings().removeClass('catalogue__tab_active')
          .closest('div.container').find('div.catalogue__content').removeClass('catalogue__content_active').eq($(this).index()).addClass('catalogue__content_active');
      });

      // переключение на подробное описание карточки
      function toggleDescr(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e) {
            e.preventDefault();
  
            $('.catalogue-item__content').eq(i).toggleClass('catalogue-item__content_active');
            $('.catalogue-item__fulldescr').eq(i).toggleClass('catalogue-item__fulldescr_active');
          });
        });
      }
      toggleDescr('.catalogue-item__link');
      toggleDescr('.catalogue-item__back');

      // модальные окна
      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
      });
      
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalogue-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn();
        });
      });

      // закрытие мод. окна при клике на крестик
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
      });

      // валидация форм
      function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
      }
      validateForms('#consultation-form');
      validateForms('#consultation form');
      validateForms('#order form');

      // маска номера телефона
      $('input[name=phone]').mask("+7 (999) 999-99-99");

      // отправка писем с сайта при помощи AJAX
      $('form').submit(function(e) {
        e.preventDefault(); // отмена перезагрузки страницы после отправки формы
        $.ajax({ // отправка данных на сервер
          type: "POST", // указание того, что данные именно отправляются, а не принимаются
          url: "../mailer/smart.php", // указание обработчика, который обрабатывает отправку; адрес, куда отправляются данные
          data: $(this).serialize() // указание того, какие данные отправляются (данные из соответствующей формы); +подготовка данных для отправки 
        }).done(function() { // после того, как форма отправлена, происходит...
          $(this).find("input").val(""); // очистка полей ввода
          $('#consultation, #order').fadeOut(); // скрытие мод. окон с формами
          $('.overlay, #thanks').fadeIn(); // появление мод. окна с благодарностью 
          $('form').trigger('.reset'); // очистка форм
        });
        return false;
      });

      // появление кнопки наверх
      $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
      });

      // плавный скролл вверх
      $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });

      // анимация элементов списка в фидбеке
      new WOW().init();
});