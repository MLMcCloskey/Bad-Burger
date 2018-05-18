$(function(){
    $(".change-devoured").on("click", function(event){
        var id = $(this).data("id");
        var justDevoured = $(this).data("justdevoured");
        var justDevouredState = {
            devoured: justDevoured
        };

        $.ajax("/api/burgers/"+ id, {
            type: "PUT",
            data: justDevouredState
        }).then(
            ()=> {
                console.log("Changed state to ", justDevoured);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event){
        event.preventDefault();

        var newBurger = {
            burger_name: $("#ba").val(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log(`Now presenting ${newBurger} for your enjoyment`);
                location.reload();
            }
        );
    });

    $(".delete-burger").on("click", function(event){
        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            ()=>{
                console.log(`Threw away ${id} burger`);
                location.reload();
            }
        );
    });
});