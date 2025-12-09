document.getElementById('catForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const breed = document.getElementById('breed').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const age = document.getElementById('age').value;
    const meals = parseInt(document.getElementById('meals').value);
    const activity = document.getElementById('activity').value;

    // 計算每日熱量需求 (RER * 活動係數)
    // RER = 70 * (體重kg)^0.75
    const RER = 70 * Math.pow(weight, 0.75);

    // 根據年齡和活動量調整係數
    let activityFactor = 1.2;

    if (age === 'kitten') {
        activityFactor = 2.5; // 幼貓需要更多能量
    } else if (age === 'young') {
        activityFactor = activity === 'high' ? 1.6 : (activity === 'medium' ? 1.4 : 1.2);
    } else if (age === 'adult') {
        activityFactor = activity === 'high' ? 1.6 : (activity === 'medium' ? 1.4 : 1.2);
    } else if (age === 'senior') {
        activityFactor = activity === 'high' ? 1.4 : (activity === 'medium' ? 1.2 : 1.1);
    } else if (age === 'elderly') {
        activityFactor = activity === 'high' ? 1.3 : (activity === 'medium' ? 1.1 : 1.0);
    }

    const dailyCalories = Math.round(RER * activityFactor);

    // 計算食物份量
    // 罐頭：平均每100g約含70-90大卡
    const cannedFoodGrams = Math.round((dailyCalories / 80) * 100);

    // 飼料：平均每100g約含350-400大卡
    const dryFoodGrams = Math.round((dailyCalories / 375) * 100);

    // 計算每餐飼料份量
    const perMealGrams = Math.round(dryFoodGrams / meals);

    // 飲水量：每公斤體重約需50-60ml水
    const waterMl = Math.round(weight * 55);

    // 顯示結果
    document.getElementById('cannedFood').textContent = `${cannedFoodGrams}g`;
    document.getElementById('dryFood').textContent = `${dryFoodGrams}g`;
    document.getElementById('water').textContent = `${waterMl}ml`;
    document.getElementById('calories').textContent = `${dailyCalories} 大卡`;
    document.getElementById('perMeal').textContent = `${perMealGrams}g`;

    // 顯示結果區域
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.add('show');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});