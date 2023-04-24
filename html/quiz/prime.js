onmessage = function (e) {
    let input_num = parseInt(e.data.num);
    let result = "소수";

    if (input_num == 2) {
        result = "소수";
    } else {
        for (let i = 2; i < input_num; i++) {
            if (input_num % i == 0) {
                result = "소수가 아님";
                break;
            }
        }
    }
    postMessage(result);
}
