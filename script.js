let first, second, startedValues, number;
let args = [];

$('.ui.dropdown').dropdown({
    onChange: function (value, text, el) {
        number = $('input.number').val();
        startedValues = $('.ui.dropdown').dropdown("get value").map(el => parseInt(el));
        if(validate(number, startedValues)){
            $('.result > h3').text(calculateSystem(number, startedValues[0], startedValues[1]));
        }
    }
})

$(':input').on('propertychange input', function (e) {
    var valueChanged = false;
    if (e.type == 'propertychange') {
        valueChanged = e.originalEvent.propertyName == 'value';
    } else {
        valueChanged = true;
    }
    if (valueChanged) {
        $('.result > h4.title').text("Result");
        startedValues = $('.ui.dropdown').dropdown("get value").map(el => parseInt(el));
        if(validate(e.target.value, startedValues)) {
            $('.result > h3').text(calculateSystem(e.target.value, startedValues[0], startedValues[1]));
        }
    }
});

function validate(number, systems){
    let first = systems[0], second = systems[1];
    if(typeof number == "string" && number != "") {
        // console.log(first);
        for(let i = 0; i <= number.length; i++){
            if(parseInt(number.charAt(i)) >= first) {
                sendMessage("more than first");
                return false;
            } else if(Number.isInteger(number.charAt(i))) {
                sendMessage("incorrect hexadecimal");
                return false;
            } else if(Number.isInteger(number.charAt(i)) && first == 16) {
                return true;
            } else if(!Number.isInteger(number.charAt(i)) && first == 16) {
                return true;
            }
        }
        return true;
    }
}

function sendMessage(type) {
    switch(type) {
        case "more than first": 
            $('.result > h3').text("Your number cannot be the same with your system");
        break;
        case "incorrect hexadecimal":
            $('.result > h3').text("Hex cannot be calculated");
        break;
    }
}

function calculateSystem(number, firstSystem, secondSystem) {
    var result = 0, remainders = [], remainder = 0, results = [];
    if(typeof number == "number") {
        number = number.toString();
            if(firstSystem != 10) {
                for(let i = 1; i <= number.length; i++) {
                    result += parseInt(number[number.length - i]) * Math.pow(firstSystem, i - 1);
                }
            } else result = number;
            let checkResults = (results) => {
                return results[results.length - 1] >= secondSystem;
            }
            results.push(result);
            remainders.push(result - Math.floor(result / secondSystem) * secondSystem);
            while(checkResults(results)) {
                results.push(Math.floor(results[results.length - 1] / secondSystem));
                remainder = results[results.length - 1] - Math.floor(results[results.length - 1] / secondSystem) * secondSystem;
                remainders.push(remainder);
            }
            return remainders.map(el => el.toString()).reverse().join("");
    } else {
        if(firstSystem == 16) { 
            return calculateSystem(parseInt(number, firstSystem), 10, secondSystem);
        } else {
            return calculateSystem(parseInt(number), firstSystem, secondSystem);
        }
    }
}
// Outputs 1010011010
// console.log(calculateSystem(666, 10, 2));

// console.log("sad5".split("").map(letter => Number.isInteger(parseInt(letter))).forEach());
