
class Drink{
    constructor(name, price, img_src){
        this.name = name;
        this.price = price;
        this.img_src = img_src;
    }
};

let red_tea = new Drink("Red Tea", 100, "https://miro.medium.com/max/1021/1*yVdgPMqLl7B6jf6WKr28Tw.jpeg");
let green_tea = new Drink("Green Tea", 150,"https://images.immediate.co.uk/production/volatile/sites/30/2020/08/green-tea_400-237a32b.jpg");
let black_tea = new Drink("Black Tea", 50,"https://post.healthline.com/wp-content/uploads/2018/05/black-tea-732x549-thumbnail.jpg");
app_data = [red_tea, green_tea, black_tea]

function change_img(ind) {

    console.log(app_data);
    $('#main_img1').attr('src',app_data[ind].img_src);

}

function toggle_order_info_visiblity(){
    if ( $('#order_info').css('visibility') == 'hidden' )
        $('#order_info').css('visibility','visible');
    else
        $('#order_info').css('visibility','hidden');
}

function incrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

    if (!isNaN(currentVal)) {
        parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
    } else {
        parent.find('input[name=' + fieldName + ']').val(0);
    }
}

function decrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

    if (!isNaN(currentVal) && currentVal > 0) {
        parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
    } else {
        parent.find('input[name=' + fieldName + ']').val(0);
    }
}

$('.input-group').on('click', '.button-plus', function(e) {
    incrementValue(e);
});

$('.input-group').on('click', '.button-minus', function(e) {
    decrementValue(e);
});