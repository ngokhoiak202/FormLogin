
$(document).ready(function(){
    //GOTOTOP
    $(window).scroll(function(){
        var posTopBt = $(this).scrollTop();
        if (posTopBt >= 850)
            $('.bttop').show('slow');
        else
            $('.bttop').hide('slow');

        if(posTopBt >= 650)
            $('.nav2').css({
                "background-color": "#007bff",
                "position": "fixed",
                "top": 0,
                "left": 0,
                "right": 0,
                "z-index": 1000,
                "opacity": 0.8
            });
        else
            $('.nav2').css({
                "position": "relative",
                "opacity": 1
            });

        if(posTopBt >= 1000 && posTopBt <=2850) {
            $("#category-holder").css({
                "position": "fixed",
                "top": "35px",
                "left": 0,
                "width": "15%",
                "z-index": "200"
            }).show("slow");
        }
        else
            $("#category-holder").css({
                "position": "unset",
                "z-index": 0,
                "top": "35px",
                "left": 0,
                "width": "100%"
            });
    })
    $(window).scroll(function(){
		const leftFadeIn = $('.scroll-left')
		const rightFadeIn = $('.scroll-right')
		const window_height = $(window).height()// chiều cao mà hình
		const window_top_position = $(window).scrollTop()// vị trí scroll top
		const plusHeight = window_height - 60// giảm chiều cao màn hình
		const window_bottom_position = window_top_position + plusHeight;
		
		//article
        if($('.home-news').length != 0) {
            var article_top_position = $('.home-news').offset().top;
            $(leftFadeIn).each(function() {
                if (article_top_position <= window_bottom_position) {
                    $(this).addClass('leftFadeIn');
                } else {
                    $(this).removeClass('leftFadeIn');
                }
            })
            $(rightFadeIn).each(function() {
                if (article_top_position <= window_bottom_position) {
                    $(this).addClass('rightFadeIn');
                } else {
                    $(this).removeClass('rightFadeIn');
                }
            })
        }
	})

    $(".bttop").click(function(){
        $('html, body').animate({
            scrollTop: 0,
        }, 750)
    })
    $("#phoneBt").click(function() {   
        $('html, body').animate({
            scrollTop: $('#phone').offset().top - 30
        }, 500)
    })

    $("#tabletBt").click(function() {   
        $('html, body').animate({
            scrollTop: $('#tablet').offset().top - 30
        }, 500)
    })

    $("#laptopBt").click(function() {   
        $('html, body').animate({
            scrollTop: $('#laptop').offset().top - 30
        }, 500)
    })
    var remainingTime = setInterval(function() {
        var date = new Date();
        var tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0);
        var distance = tomorrow - date;
        var hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var second = Math.floor((distance % (1000 * 60)) / 1000);
        if(hour < 10) hour = '0' + hour;
        if(minute < 10) minute = '0' + minute;
        if(second < 10) second = '0' + second;
        if(document.getElementById("hour") === null) clearInterval(remainingTime);
        else {
            document.getElementById("hour").innerText = `${hour}h`;
            document.getElementById("minute").innerText = `${minute}m`;
            document.getElementById("second").innerText = `${second}s`;
        }
        if(distance == 0) clearInterval(remainingTime);
    }, 1000)

    /* */
    $('input.search-field').on('input', function(){
        var searchContent = $(this).val();
        $('ul.s-item-list').html("")
        var section = $('section:not(:first-child) ul.products');
        $.each(section, function(){
            $.each($(this).children(), function(){ //li
                var name = $(this).children('div');
                var price = name.children('h4').text();
                name = name.children('a');
                name = name.children().text()
                if(name.toString().toLowerCase().includes(searchContent.toString().toLowerCase())){
                    var src = $(this).children('figure').children('a').children('img').attr("src");
                    $('ul.s-item-list').append(`
                        <li class="s-item">
                            <a href="product.html">
                                <img src="${src}"/>
                                <h6 class="s-name">${name}</h6>
                                <h6 class="s-price">${price}</h6>
                            </a>
                        </li>
                    `)
                }
            })
        })
        if(searchContent == "") $('ul.s-item-list').html("");
    })


    /* */

    $('div.item .thumb img').on('click', function() {
        var srcImg = $(this).attr('src');
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.imgMain img').attr('src', srcImg);
    })

    $('.attribute-list.storage .attribute-item').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        var price = $(this).attr('price');
        price = getPriceString(price);
        $(this).parent().parent().children().eq(1).children('.priceItem').text(price);
    })

    function getPriceString(price) {
        price = price.toString();
        return price.substring(0, price.length -6) + "." + price.substring(price.length - 6, price.length - 3)+ "." + price.substring(price.length - 3, price.length) + "Đ";
    }

    $('.attribute-list .dec').click(function() {
        var quantity = $(this).siblings('input').val();
        quantity = parseInt(quantity, 10);
        quantity--;
        $(this).siblings('input').val(updateQuantity(quantity));
    })
    $('.attribute-list .inc').click(function() {
        var quantity = $(this).siblings('input').val();
        quantity = parseInt(quantity, 10);
        quantity++;
        $(this).siblings('input').val(updateQuantity(quantity));
    })
    $('.attribute-list .quantity').on('change',function(){
        quantity = parseInt($(this).val())
        $(this).val(updateQuantity(quantity));
    })
    function updateQuantity(quantity) {
        quantity = parseInt(quantity, 10);
        if(quantity <= 0) return 1;
        if(quantity > 100) return 100;
        return quantity;
    }

    var postArea = $('.postArea');
    $('.post-comment').on('click', function(){
        var cmt = $(this).siblings().eq(0).val();
        if(cmt.trim() != "") {
            var d = new Date();
            h = d.getHours() > 9 ? d.getHours() : '0' + d.getHours();
            m = d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes();
            s = d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds();
            postArea.append(`<div class="comment">${cmt}<span class="date">at ${h}:${m}:${s}</span></div>`)
            $('.postArea').css({
                "display": "block"
            });
            $(this).siblings().eq(0).val("");
        }
    })
    $('button.order').click(function(){
        var address = $('input.address').val();
        if(address.trim() != ""){
            $('div.thanks').css({
                "animation": "scale",
                "display": "block"
            })
        }
    })
})