var tipBtns = document.getElementsByClassName('btn')
console.log(tipBtns)
for (var i = 0; i < tipBtns.length; i++){
    var Btn = tipBtns[i];
    Btn.addEventListener('click', function(event) {
        click(event.target)
    });
}
var inputBill = document.getElementById('bill');
inputBill.addEventListener('change', function() {
    if (document.getElementsByClassName('btn-active')[0]){
    var tipSelected = document.getElementsByClassName('btn-active')[0].textContent;
    updateTip(tipSelected);
    updateTotal();
    };

});
var inputNumofPeople = document.getElementById('numofpeople');
inputNumofPeople.addEventListener('change', function() {
    
    console.log(inputNumofPeople.value);
    if (inputNumofPeople.value < 1){
        document.getElementById("numofpeople").classList.add("Error");
        document.getElementsByClassName("Error-Message")[0].classList.remove("hide");
    }
    else {
        document.getElementById("numofpeople").classList.remove("Error");
        document.getElementsByClassName("Error-Message")[0].classList.add("hide");
    }
    if (document.getElementsByClassName('btn-active')[0]){
    var tipSelected = document.getElementsByClassName('btn-active')[0].textContent;
    updateTip(tipSelected);
    updateTotal();
    };
})
document.getElementsByClassName("btn-reset")[0].addEventListener('click', function() {

    document.getElementById('bill').value = 0;
    document.getElementById('numofpeople').value = 0;
    if(document.getElementsByClassName('btn-active')[0]){
        document.getElementsByClassName('btn-active')[0].classList.remove("btn-active");
    };
    document.getElementById('tip').textContent = '$'+0;
    document.getElementById('total').textContent = '$'+0;
    document.getElementById("custom").outerHTML = `<button class='btn' id="custom" type="button">Custom</button>`
    document.getElementById("custom").addEventListener('click', function(event){
        click(event.target);
    });
});

function updateTip(tipSelected) {
    
    var tipValue = parseInt(tipSelected);
    var numberOfPeople = document.getElementById('numofpeople').value;

    var bill = document.getElementById('bill').value
    console.log(tipValue/100 * bill/numberOfPeople);
    var tip = tipValue/100 * bill/numberOfPeople;
    var tip = Math.round(tip*100)/100;
    document.getElementById('tip').textContent = '$'+tip;
}

function updateTotal() {

    var numberOfPeople = document.getElementById('numofpeople').value;
    var bill = document.getElementById('bill').value;
    var tippP = document.getElementById('tip').textContent.substring(1);
    var tippPNum = parseFloat(tippP);

    console.log(bill / numberOfPeople + tippPNum);
    var total = bill / numberOfPeople + tippPNum;
    total = Math.round(total*100) / 100;
    document.getElementById('total').textContent = '$'+total;
}

function click(target) {
    
    var activeBtn = document.getElementsByClassName('btn-active')[0];
    var numberOfPeople = document.getElementById('numofpeople').value;
    if (numberOfPeople > 0)
    { 
        document.getElementById("numofpeople").classList.remove("Error");
        document.getElementsByClassName("Error-Message")[0].classList.add("hide");
        console.log(activeBtn);
        console.log(target);
        if (activeBtn) {
            activeBtn.classList.remove("btn-active");
        }
        if (target == document.getElementById("custom")) {
            target.outerHTML = `<input class='btn-input' type='number'>`
            document.getElementsByClassName("btn-input")[0].addEventListener('change', function(event){
                if(document.getElementsByClassName('btn-active')[0]){
                    document.getElementsByClassName('btn-active')[0].classList.remove('btn-active');
                };
                let tipp = event.target.value
                event.target.outerHTML = `<button class='btn btn-active' id="custom" type="button">${tipp}%</button>`
                document.getElementById("custom").addEventListener('click', function(event){
                    click(event.target);
                })
                updateTip(tipp);
                updateTotal();
            });
        } else {
        var tipSelected = target.textContent;
        target.classList.add("btn-active");
        console.log(tipSelected);
        updateTip(tipSelected);
        updateTotal();
        }   
    } else {
        console.log("NumofPeople smaller than 1")
        document.getElementById("numofpeople").classList.add("Error");
        document.getElementsByClassName("Error-Message")[0].classList.remove("hide");
    }

}