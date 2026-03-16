

function combobox(id,items,itemcls,select) {
    var childhtml = '';
    for(var len = 0;len<items.length;len++){
        childhtml+= '<div id="'+items[len].id+'" class="'+itemcls+'"><p style="text-align: left;vertical-align: middle;margin: 6px 0 0 28px;">'+items[len].value+'</p></div>';
    }
    $("#"+id).html(childhtml);
    $("."+itemcls).click(function () {
        select(this.id.toString());
        $("#"+id).css("display","none");
    });
    $("#"+id).css({"border":"1px solid black;","border-radius":"4px","display":"none","background":"white","z-index":"1999"});
    $("#"+id).prev().click(function () {
        show_combobox();
    });
    $("#"+id).mouseleave(function () {
        $("#"+id).css("display","none");
    });
    this.id = id;
}

function combobox_item(id, value) {
    this.id = id;
    this.value = value;
}

function show_combobox() {
    $parent = $("#"+this.id).prev();
    var pheigh = $parent.height();
    var ptop   = $parent.offset().top;
    var pleft  = $parent.offset().left;

    $("#"+this.id).css({"position":"absolute","left":pleft,"top":ptop+pheigh});
    $("#"+this.id).css("display","block");
}