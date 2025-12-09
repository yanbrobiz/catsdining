document.getElementById('catForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const breed = document.getElementById('breed').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const age = document.getElementById('age').value;
    const meals = parseInt(document.getElementById('meals').value);
    const activity = document.getElementById('activity').value;
    const foodPreference = document.getElementById('foodPreference').value;

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

    // 根據飲食偏好計算食物份量
    let cannedFoodGrams = 0;
    let dryFoodGrams = 0;

    if (foodPreference === 'dryOnly') {
        // 只吃飼料：飼料提供 100% 熱量
        // 飼料：平均每100g約含350-400大卡
        dryFoodGrams = Math.round((dailyCalories / 375) * 100);
    } else if (foodPreference === 'wetOnly') {
        // 只吃罐頭：罐頭提供 100% 熱量
        // 罐頭：平均每100g約含70-90大卡
        cannedFoodGrams = Math.round((dailyCalories / 80) * 100);
    } else {
        // 都吃：罐頭和飼料各提供 50% 熱量
        cannedFoodGrams = Math.round(((dailyCalories * 0.5) / 80) * 100);
        dryFoodGrams = Math.round(((dailyCalories * 0.5) / 375) * 100);
    }

    // 飲水量：每公斤體重約需50-60ml水
    // 如果只吃飼料，需要更多水份
    let waterMl = Math.round(weight * 55);
    if (foodPreference === 'dryOnly') {
        waterMl = Math.round(weight * 65); // 增加水份建議
    } else if (foodPreference === 'wetOnly') {
        waterMl = Math.round(weight * 45); // 罐頭含水份，可減少飲水
    }

    // 根據飲食偏好顯示/隱藏對應項目
    const cannedFoodItem = document.getElementById('cannedFoodItem');
    const dryFoodItem = document.getElementById('dryFoodItem');
    const perMealItem = document.getElementById('perMealItem');

    if (foodPreference === 'dryOnly') {
        // 只吃飼料
        cannedFoodItem.style.display = 'none';
        dryFoodItem.style.display = 'flex';
        perMealItem.style.display = 'flex';

        const perMealGrams = Math.round(dryFoodGrams / meals);
        document.getElementById('dryFood').textContent = `${dryFoodGrams}g`;
        document.getElementById('perMeal').textContent = `${perMealGrams}g（飼料）`;

    } else if (foodPreference === 'wetOnly') {
        // 只吃罐頭
        cannedFoodItem.style.display = 'flex';
        dryFoodItem.style.display = 'none';
        perMealItem.style.display = 'flex';

        const perMealGrams = Math.round(cannedFoodGrams / meals);
        document.getElementById('cannedFood').textContent = `${cannedFoodGrams}g`;
        document.getElementById('perMeal').textContent = `${perMealGrams}g（罐頭）`;

    } else {
        // 都吃（各50%熱量）
        cannedFoodItem.style.display = 'flex';
        dryFoodItem.style.display = 'flex';
        perMealItem.style.display = 'flex';

        const perMealCanned = Math.round(cannedFoodGrams / meals);
        const perMealDry = Math.round(dryFoodGrams / meals);
        document.getElementById('cannedFood').textContent = `${cannedFoodGrams}g`;
        document.getElementById('dryFood').textContent = `${dryFoodGrams}g`;
        document.getElementById('perMeal').textContent = `罐頭 ${perMealCanned}g + 飼料 ${perMealDry}g`;
    }

    // 顯示共同結果
    document.getElementById('water').textContent = `${waterMl}ml`;
    document.getElementById('calories').textContent = `${dailyCalories} 大卡`;

    // 顯示結果區域
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.add('show');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});