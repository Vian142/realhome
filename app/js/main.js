"use strict";


(function () {
    var urlAgents = '/data/agents.json',
        indexAgents = 0,
        navItem,
        agentContainer = $('#agent-container'),
        navContainer = $('#agents-navigation');
    //console.log(navItem);


    // Функция при загрузке страницы
    (function () {
        // Сколько нужно элементов -
        var numberLi;
        $.ajax({
            url: urlAgents,
            method: "GET",
            dataType: 'json',
            async: false
        }).done(function (data) {
            numberLi = data.length;
        });
        // Добавление элементов
        for (var i = 0; i < numberLi; i++) {
            $(navContainer).append('<li class="content-agent__nav-list__item"></li>');
            console.log('Сработало');
        }
        // Опред
        // еление всех элементов li
        navItem = $(navContainer).find('li');
        // Первому добавляем active
        $(navItem[0]).addClass('content-agent__nav-list__item--active');

        // Первоначальная загрузка
        agentContent(0);
    })();


    // При клике
    $(navItem).click(function () {
        var $this = this,
            indexItem = $(this).index(); // какой элемента li нажат

        //console.log(indexItem);

        agentContent(indexItem);
        // Проверка наличия класса active и добавление
        if (!$(this).hasClass("content-agent__nav-list__item--active")) {
            $(this).addClass("content-agent__nav-list__item--active");
            $(this).siblings().removeClass("content-agent__nav-list__item--active")
        } else {
        }

    });


    // Запрос информации об Агенте
    function agentContent(indexAgent) {
        var resultAjax;
        $.ajax({
            url: urlAgents,
            method: "GET",
            dataType: 'json',
            async: false

        }).done(function (data) {
            resultAjax = data[indexAgent];
        });


        // Вывод информации
        $('#agent-image').attr( "src", resultAjax.photo );
        $(agentContainer).find('.content-agent__agent-name').html(resultAjax.name.first + ' ' + resultAjax.name.last);
        $(agentContainer).find('.content-agent__description-agent').html(resultAjax.about);

        //console.log(resultAjax)


        // Очистка списка контактов агента
        $(agentContainer).find('.content-agent__agent-contacts').empty();

        // Перебор объекта contacts
        for (var key in resultAjax.contacts ){
            if (key === 'email' ){
                $(agentContainer).find('.content-agent__agent-contacts').append(
                    '<li class="content-agent__agent-contacts__item">' +
                    '<i class="fa fa-envelope"></i>'+
                    '<a href="mailto:' + resultAjax.contacts.email + '"class="content-agent__agent-contacts__item__link">' + "&nbsp" + resultAjax.contacts.email +'</a>'
                    + '</li>');
            }
            if (key === 'phone' ){
                $(agentContainer).find('.content-agent__agent-contacts').append(
                    '<li class="content-agent__agent-contacts__item">' +
                    '<i class="fa fa-phone"></i>'+
                    '<a href="mailto:' + resultAjax.contacts.phone + '"class="content-agent__agent-contacts__item__link">' + "&nbsp" + resultAjax.contacts.phone +'</a>'
                    + '</li>');
            }


        }

    }

})();

