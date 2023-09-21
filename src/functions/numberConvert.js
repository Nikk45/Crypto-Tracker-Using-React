export default function numberConvert(number){

    let newNumber = number.toLocaleString();
    let numArr = newNumber.split(',');

    if(numArr.length === 5)   // Trillions
        return numArr[0]+'.'+numArr[1].slice(0,2)+"T";
    else if(numArr.length === 4)  // Billions
        return numArr[0]+'.'+numArr[1].slice(0,2)+"B";
    else if(numArr.length === 3)  // Millions
        return numArr[0]+'.'+numArr[1].slice(0,2)+"M";
    else if(numArr.length === 2)  // Thousands
        return numArr[0]+'.'+numArr[1].slice(0,2)+"K";
    else  // Hundreds
        return number.toLocaleString();
}